revoke delete on table "public"."Leistungsberechtiger_Leistungselemente" from "anon";

revoke insert on table "public"."Leistungsberechtiger_Leistungselemente" from "anon";

revoke references on table "public"."Leistungsberechtiger_Leistungselemente" from "anon";

revoke select on table "public"."Leistungsberechtiger_Leistungselemente" from "anon";

revoke trigger on table "public"."Leistungsberechtiger_Leistungselemente" from "anon";

revoke truncate on table "public"."Leistungsberechtiger_Leistungselemente" from "anon";

revoke update on table "public"."Leistungsberechtiger_Leistungselemente" from "anon";

revoke delete on table "public"."Leistungsberechtiger_Leistungselemente" from "authenticated";

revoke insert on table "public"."Leistungsberechtiger_Leistungselemente" from "authenticated";

revoke references on table "public"."Leistungsberechtiger_Leistungselemente" from "authenticated";

revoke select on table "public"."Leistungsberechtiger_Leistungselemente" from "authenticated";

revoke trigger on table "public"."Leistungsberechtiger_Leistungselemente" from "authenticated";

revoke truncate on table "public"."Leistungsberechtiger_Leistungselemente" from "authenticated";

revoke update on table "public"."Leistungsberechtiger_Leistungselemente" from "authenticated";

revoke delete on table "public"."Leistungsberechtiger_Leistungselemente" from "service_role";

revoke insert on table "public"."Leistungsberechtiger_Leistungselemente" from "service_role";

revoke references on table "public"."Leistungsberechtiger_Leistungselemente" from "service_role";

revoke select on table "public"."Leistungsberechtiger_Leistungselemente" from "service_role";

revoke trigger on table "public"."Leistungsberechtiger_Leistungselemente" from "service_role";

revoke truncate on table "public"."Leistungsberechtiger_Leistungselemente" from "service_role";

revoke update on table "public"."Leistungsberechtiger_Leistungselemente" from "service_role";

revoke delete on table "public"."Leistungsberechtigter" from "anon";

revoke insert on table "public"."Leistungsberechtigter" from "anon";

revoke references on table "public"."Leistungsberechtigter" from "anon";

revoke select on table "public"."Leistungsberechtigter" from "anon";

revoke trigger on table "public"."Leistungsberechtigter" from "anon";

revoke truncate on table "public"."Leistungsberechtigter" from "anon";

revoke update on table "public"."Leistungsberechtigter" from "anon";

revoke delete on table "public"."Leistungsberechtigter" from "authenticated";

revoke insert on table "public"."Leistungsberechtigter" from "authenticated";

revoke references on table "public"."Leistungsberechtigter" from "authenticated";

revoke select on table "public"."Leistungsberechtigter" from "authenticated";

revoke trigger on table "public"."Leistungsberechtigter" from "authenticated";

revoke truncate on table "public"."Leistungsberechtigter" from "authenticated";

revoke update on table "public"."Leistungsberechtigter" from "authenticated";

revoke delete on table "public"."Leistungsberechtigter" from "service_role";

revoke insert on table "public"."Leistungsberechtigter" from "service_role";

revoke references on table "public"."Leistungsberechtigter" from "service_role";

revoke select on table "public"."Leistungsberechtigter" from "service_role";

revoke trigger on table "public"."Leistungsberechtigter" from "service_role";

revoke truncate on table "public"."Leistungsberechtigter" from "service_role";

revoke update on table "public"."Leistungsberechtigter" from "service_role";

alter table "public"."Leistungselement" add column "icon" text;

alter table "public"."Leistungselement" add column "rank" bigint;

alter table "public"."Leistungselement" add column "subtitle" text;

alter table "public"."Leistungselement" add column "title" text;

alter table "public"."Leistungselement" add constraint "Leistungselement_rank_check" CHECK ((rank > 0)) not valid;

alter table "public"."Leistungselement" validate constraint "Leistungselement_rank_check";


