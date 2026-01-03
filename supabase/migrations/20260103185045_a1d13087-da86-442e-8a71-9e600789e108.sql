-- Add new columns to real_estate_tools table
ALTER TABLE public.real_estate_tools 
ADD COLUMN slug TEXT,
ADD COLUMN long_description TEXT,
ADD COLUMN submitter_email TEXT,
ADD COLUMN status TEXT NOT NULL DEFAULT 'approved';

-- Update all existing tools with slugs based on their names
UPDATE public.real_estate_tools SET 
  slug = LOWER(REPLACE(REPLACE(name, ' ', '-'), '''', '')),
  long_description = short_description || ' This powerful tool is designed specifically for real estate professionals, providing comprehensive features to streamline workflows and boost productivity.';

-- Now add unique constraint on slug and not null constraint
ALTER TABLE public.real_estate_tools ALTER COLUMN slug SET NOT NULL;
ALTER TABLE public.real_estate_tools ADD CONSTRAINT real_estate_tools_slug_unique UNIQUE (slug);

-- Add check constraint for status
ALTER TABLE public.real_estate_tools ADD CONSTRAINT real_estate_tools_status_check CHECK (status IN ('pending', 'approved', 'rejected'));

-- Add RLS policy for inserting pending submissions (anyone can submit)
CREATE POLICY "Anyone can submit tools" ON public.real_estate_tools FOR INSERT WITH CHECK (status = 'pending');