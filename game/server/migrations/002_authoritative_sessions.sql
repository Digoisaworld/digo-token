-- Authoritative hold-session ledger. Existing migration 001 remains immutable.
CREATE TABLE IF NOT EXISTS game_sessions (
  session_id UUID PRIMARY KEY,
  wallet_address TEXT NOT NULL REFERENCES game_accounts(wallet_address),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','completed','expired','rejected')),
  elapsed_ms INTEGER,
  points_awarded INTEGER NOT NULL DEFAULT 0 CHECK (points_awarded >= 0),
  finish_request_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK ((status = 'active' AND ended_at IS NULL AND elapsed_ms IS NULL AND finish_request_id IS NULL)
      OR (status <> 'active' AND ended_at IS NOT NULL AND elapsed_ms IS NOT NULL AND finish_request_id IS NOT NULL))
);
CREATE UNIQUE INDEX IF NOT EXISTS game_sessions_one_active_per_wallet
  ON game_sessions(wallet_address) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS game_sessions_wallet_created_idx
  ON game_sessions(wallet_address, created_at DESC);

CREATE TABLE IF NOT EXISTS score_ledger (
  id BIGSERIAL PRIMARY KEY,
  wallet_address TEXT NOT NULL REFERENCES game_accounts(wallet_address),
  session_id UUID REFERENCES game_sessions(session_id),
  event_id UUID NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('hold_credit','bomb_debit','reward_credit','tap_credit','admin_adjustment')),
  points_delta INTEGER NOT NULL CHECK (points_delta <> 0),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(wallet_address,event_id)
);
CREATE INDEX IF NOT EXISTS score_ledger_wallet_created_idx
  ON score_ledger(wallet_address,created_at DESC);
