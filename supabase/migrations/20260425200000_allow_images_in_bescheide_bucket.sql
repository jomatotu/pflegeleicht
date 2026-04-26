-- Allow image uploads in addition to PDF in the bescheide bucket
UPDATE storage.buckets
SET allowed_mime_types = ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
WHERE id = 'bescheide';