CREATE TABLE public.chat_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  goal TEXT,
  has_website TEXT,
  website_url TEXT,
  budget TEXT,
  timeline TEXT,
  notes TEXT,
  score INTEGER,
  label TEXT,
  status TEXT NOT NULL DEFAULT 'nieuw',
  conversation JSONB NOT NULL DEFAULT '[]'::jsonb
);

GRANT ALL ON public.chat_leads TO service_role;

ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages chat leads"
  ON public.chat_leads FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX chat_leads_created_at_idx ON public.chat_leads (created_at DESC);