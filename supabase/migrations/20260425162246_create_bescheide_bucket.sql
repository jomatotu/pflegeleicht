-- Storage bucket for PDF Bescheide (care level certificates)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'bescheide',
  'bescheide',
  false,
  52428800, -- 50 MiB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Only service_role may upload (via Edge Function)
CREATE POLICY "service_role can upload bescheide"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'bescheide');

-- Only service_role may read
CREATE POLICY "service_role can read bescheide"
ON storage.objects FOR SELECT
TO service_role
USING (bucket_id = 'bescheide');