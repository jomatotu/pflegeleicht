  REVOKE ALL ON TABLE "public"."Leistungselement" FROM anon, authenticated, service_role;
  REVOKE ALL ON TABLE "public"."Leistung" FROM anon, authenticated, service_role;

  GRANT SELECT ON TABLE "public"."Leistungselement" TO service_role;
  GRANT SELECT ON TABLE "public"."Leistung" TO service_role;

  grant insert on table "public"."Leistungsberechtiger_Leistungselemente" to "service_role";
  grant insert on table "public"."Leistungsberechtigter" to "service_role";


