import { NextRequest, NextResponse } from "next/server";

interface GenerateRequest {
  gender: "all" | "boy" | "girl";
  style: "classic" | "modern" | "nature" | "strong";
  count: number;
}

// Fallback names data for when AI is unavailable
const fallbackNames = {
  boy: [
    { name: "浩然", pinyin: "Hào Rán", meaning: "Grand and righteous / 正气高大" },
    { name: "子轩", pinyin: "Zǐ Xuān", meaning: "Scholarly and elegant / 温文尔雅" },
    { name: "宇轩", pinyin: "Yǔ Xuān", meaning: "Vast and lofty / 胸怀广阔" },
    { name: "天宇", pinyin: "Tiān Yǔ", meaning: "Universal, boundless / 包容天地" },
    { name: "瑞霖", pinyin: "Ruì Lín", meaning: "Auspicious dew / 吉祥甘霖" },
    { name: "浩然", pinyin: "Hào Rán", meaning: "Grand and righteous / 正气高大" },
    { name: "明远", pinyin: "Míng Yuǎn", meaning: "Bright and far-sighted / 聪明睿智" },
    { name: "博然", pinyin: "Bó Rán", meaning: "Knowledgeable and natural / 博学多才" },
    { name: "云飞", pinyin: "Yún Fēi", meaning: "Soaring clouds / 志向高远" },
    { name: "思远", pinyin: "Sī Yuǎn", meaning: "Thoughtful and far-sighted / 深谋远虑" },
  ],
  girl: [
    { name: "梓涵", pinyin: "Zǐ Hán", meaning: "Elegant and contained / 优雅内涵" },
    { name: "欣怡", pinyin: "Xīn Yí", meaning: "Joyful harmony / 快乐和睦" },
    { name: "雨涵", pinyin: "Yǔ Hán", meaning: "Rain nurtures / 滋润成长" },
    { name: "诗涵", pinyin: "Shī Hán", meaning: "Poetic depth / 诗意盎然" },
    { name: "雅静", pinyin: "Yǎ Jìng", meaning: "Elegant and serene / 温文尔雅" },
    { name: "思涵", pinyin: "Sī Hán", meaning: "Thoughtful and contained / 善解人意" },
    { name: "欣悦", pinyin: "Xīn Yuè", meaning: "Joyful and delightful / 开心快乐" },
    { name: "语桐", pinyin: "Yǔ Tóng", meaning: "Words like phoenix tree / 才华出众" },
    { name: "诗琪", pinyin: "Shī Qí", meaning: "Poetic fortune / 诗情画意" },
    { name: "雅婷", pinyin: "Yǎ Tíng", meaning: "Elegant and graceful / 优雅端庄" },
  ],
};

function getRandomNames(category: "boy" | "girl", count: number) {
  const names = fallbackNames[category];
  const shuffled = [...names].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, names.length));
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { gender, style, count = 5 } = body;

    // Determine which category to use
    let category: "boy" | "girl" = "boy";
    if (gender === "girl") {
      category = "girl";
    } else if (gender === "all") {
      category = Math.random() > 0.5 ? "boy" : "girl";
    }

    // Try to call AI API (Gemini or DeepSeek)
    let names: { name: string; pinyin: string; meaning: string }[] = [];

    const aiResult = await callAI(category, style, count);
    if (aiResult) {
      names = aiResult;
    } else {
      // Fallback to local data
      names = getRandomNames(category, count);
    }

    return NextResponse.json({
      success: true,
      names: names.map((n) => ({
        ...n,
        gender: category,
        style,
      })),
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { success: false, error: "生成失败，请稍后重试" },
      { status: 500 }
    );
  }
}

async function callAI(
  gender: "boy" | "girl",
  style: string,
  count: number
): Promise<{ name: string; pinyin: string; meaning: string }[] | null> {
  // Try Gemini first
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const prompt = `Generate ${count} unique Chinese baby names for a ${gender === "boy" ? "baby boy" : "baby girl"} with "${style}" style.

Output ONLY a JSON array with this exact format, no other text:
[
  {"name": "ChineseName", "pinyin": "Xing Ming", "meaning": "English meaning / Chinese meaning"},
  ...
]

Requirements:
- Names should be 2 characters each
- Pinyin should be in proper format (e.g., "Zhang Wei")
- Meaning should be bilingual (English first, then Chinese in brackets)
- Style "${style}" means:
  - classic: traditional elegant names
  - modern: contemporary trendy names
  - nature: names inspired by nature
  - strong: powerful dignified names`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.9,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          // Extract JSON from response
          const jsonMatch = text.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
          }
        }
      }
    } catch (error) {
      console.error("Gemini API error:", error);
    }
  }

  // Try DeepSeek as fallback
  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  if (deepseekKey) {
    try {
      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${deepseekKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "user",
              content: `Generate ${count} unique Chinese baby names for a ${gender === "boy" ? "baby boy" : "baby girl"} with "${style}" style.

Output ONLY a JSON array with this exact format, no other text:
[
  {"name": "ChineseName", "pinyin": "Xing Ming", "meaning": "English meaning / Chinese meaning"}
]`,
            },
          ],
          temperature: 0.9,
          max_tokens: 1024,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) {
          const jsonMatch = text.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
          }
        }
      }
    } catch (error) {
      console.error("DeepSeek API error:", error);
    }
  }

  return null;
}
