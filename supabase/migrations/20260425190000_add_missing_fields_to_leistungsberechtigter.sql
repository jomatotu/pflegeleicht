ALTER TABLE "public"."Leistungsberechtigter"
  ADD COLUMN IF NOT EXISTS "street" character varying,
  ADD COLUMN IF NOT EXISTS "city" character varying,
  ADD COLUMN IF NOT EXISTS "postal_code" character varying,
  ADD COLUMN IF NOT EXISTS "date_of_birth" date,
  ADD COLUMN IF NOT EXISTS "contact_person_phone" character varying,
  ADD COLUMN IF NOT EXISTS "contact_person_email" character varying;