alter table "public"."Leistung" disable row level security;
alter table "public"."Leistungsberechtiger_Leistungselemente" disable row level security;
alter table "public"."Leistungsberechtigter" disable row level security;
alter table "public"."Leistungselement" disable row level security;

grant select on table "public"."Leistungsberechtiger_Leistungselemente" to "service_role";
grant select on table "public"."Leistungsberechtigter" to "service_role";


