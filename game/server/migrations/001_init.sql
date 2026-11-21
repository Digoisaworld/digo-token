CREATE TABLE IF NOT EXISTS game_accounts (
  wallet_address TEXT PRIMARY KEY,
  total_points BIGINT NOT NULL DEFAULT 0 CHECK (total_points >= 0),
  total_taps BIGINT NOT NULL DEFAULT 0 CHECK (total_taps >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_tap_at TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS auth_nonces (
  nonce TEXT PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  consumed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS auth_nonces_expiry_idx ON auth_nonces(expires_at);
CREATE TABLE IF NOT EXISTS score_events (
  id BIGSERIAL PRIMARY KEY,
  wallet_address TEXT NOT NULL REFERENCES game_accounts(wallet_address),
  request_id UUID NOT NULL,
  taps INTEGER NOT NULL CHECK (taps BETWEEN 1 AND 10),
  points_awarded INTEGER NOT NULL CHECK (points_awarded = taps),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(wallet_address, request_id)
);
CREATE INDEX IF NOT EXISTS score_events_wallet_created_idx ON score_events(wallet_address, created_at DESC);
