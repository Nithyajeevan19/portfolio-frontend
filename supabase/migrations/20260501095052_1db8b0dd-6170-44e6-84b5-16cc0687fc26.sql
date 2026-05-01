
CREATE TABLE public.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  client text NOT NULL,
  category text NOT NULL,
  year integer NOT NULL,
  services text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  description text NOT NULL,
  content text NOT NULL DEFAULT '',
  cover_image text NOT NULL,
  gallery text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "case_studies are publicly readable"
ON public.case_studies FOR SELECT
USING (true);

CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  project_type text NOT NULL,
  budget_range text NOT NULL,
  message text NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact form"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);
