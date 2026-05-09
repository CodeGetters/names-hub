-- Cloudflare D1 Schema for Names Hub

-- Names table: stores all name data
CREATE TABLE IF NOT EXISTS names (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  nameChinese TEXT,
  pinyin TEXT,
  gender TEXT CHECK(gender IN ('boy', 'girl', 'neutral')) NOT NULL,
  origin TEXT,
  meaning TEXT,
  description TEXT,
  popularity INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);

-- Index for search performance
CREATE INDEX IF NOT EXISTS idx_names_gender ON names(gender);
CREATE INDEX IF NOT EXISTS idx_names_name ON names(name);
CREATE INDEX IF NOT EXISTS idx_names_popularity ON names(popularity DESC);

-- Name meanings and cultural context
CREATE TABLE IF NOT EXISTS name_details (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nameId INTEGER NOT NULL REFERENCES names(id),
  culture TEXT,
  history TEXT,
  famousPeople TEXT,
  variants TEXT,
  updatedAt TEXT DEFAULT (datetime('now'))
);

-- AI generation logs (for rate limiting and analytics)
CREATE TABLE IF NOT EXISTS generation_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ipHash TEXT NOT NULL,
  gender TEXT,
  style TEXT,
  count INTEGER,
  createdAt TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_logs_ip ON generation_logs(ipHash);
CREATE INDEX IF NOT EXISTS idx_logs_date ON generation_logs(createdAt);

-- Favorite names (client-side stored as well, but this allows sync)
CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitorId TEXT NOT NULL,
  nameId INTEGER NOT NULL REFERENCES names(id),
  createdAt TEXT DEFAULT (datetime('now')),
  UNIQUE(visitorId, nameId)
);

CREATE INDEX IF NOT EXISTS idx_favorites_visitor ON favorites(visitorId);
