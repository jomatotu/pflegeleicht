SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict Z1rsy7dLeZDImG5LaX1UUnUYz7wJJ3XBN05TvkWg05awuZhOMHAAlp1c6bGtQVG

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Leistung; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Leistung" ("id", "created_at", "name", "budget", "pflegegrad") VALUES
	(1, '2026-04-25 17:12:46.967061+00', 'Entlastungsbeitrag', 131, 1);


--
-- Data for Name: Leistungsberechtigter; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Leistungsberechtigter" ("id", "created_at", "firstname", "lastname", "pflegegrad", "leistung_id") VALUES
	(1, '2026-04-25 17:22:45.567506+00', 'Max', 'Mustermann', 2, 1),
	(2, '2026-04-25 17:42:50.694206+00', 'Max', 'Mustermann', 2, 1),
	(3, '2026-04-25 17:47:30.399188+00', 'Max', 'Mustermann', 2, 1),
	(4, '2026-04-25 17:49:26.591069+00', 'Max', 'Mustermann', 2, 1);

--
-- Data for Name: Leistungselement; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Leistungselement" ("id", "created_at", "name", "budget", "rank", "icon", "title", "subtitle", "pflegegrad") VALUES
	(1, '2026-04-25 17:47:13.257981+00', 'Haushaltshilfe', 32, 1, 'Sparkles', 'Ich brauche Unterstützung im Haushalt', 'Wir helfen bei Reinigung, Wäsche und alltäglichen Aufgaben im Haushalt.', 1),
	(4, '2026-04-25 17:47:13.257981+00', 'Hilfe beim Einkauf', 30, 4, 'ShoppingCart', 'Ich brauche Hilfe beim Einkaufen', 'Wir übernehmen Einkäufe oder begleiten Sie dabei.', 1),
	(6, '2026-04-25 17:47:13.257981+00', 'Arztbegleitung', 35, 6, 'Stethoscope', 'Ich brauche Begleitung zum Arzt', 'Wir begleiten Sie sicher zu Arztterminen und zurück.', 1),
	(3, '2026-04-25 17:47:13.257981+00', 'Pflegebegleiter', 38, 3, 'Heart', 'Ich brauche Unterstützung bei der Pflegebegleitung', 'Begleitung und Entlastung im Pflegealltag für Angehörige und Betroffene.', 1),
	(2, '2026-04-25 17:47:13.257981+00', 'Alltagsbegleiter', 34, 2, 'House', 'Ich brauche Begleitung im Alltag', 'Unterstützung bei Spaziergängen, Terminen und sozialer Teilhabe.', 1),
	(5, '2026-04-25 17:47:13.257981+00', 'Sing- und Bastelgruppen', 28, 5, 'MicVocal', 'Ich möchte an Gruppenaktivitäten teilnehmen', 'Gemeinsame kreative und musikalische Aktivitäten für mehr Lebensfreude.', 1),
	(7, '2026-04-25 17:47:13.257981+00', 'Spaziergänge', 30, 7, 'Footprints', 'Ich möchte begleitet spazieren gehen', 'Gemeinsame Spaziergänge für Bewegung und Gesellschaft.', 1),
	(9, '2026-04-25 17:47:13.257981+00', 'Demenzbetreuung', 40, 9, 'Brain', 'Ich brauche Betreuung bei Demenz', 'Einfühlsame Betreuung und Aktivierung für Menschen mit Demenz.', 1),
	(8, '2026-04-25 17:47:13.257981+00', 'Behördengänge', 36, 8, 'Building2', 'Ich brauche Hilfe bei Behördengängen', 'Unterstützung bei Formularen, Terminen und Amtswegen.', 1),
	(10, '2026-04-25 17:47:13.257981+00', 'Entlastung Angehörige', 37, 10, 'UsersRound', 'Ich brauche Entlastung als Angehöriger', 'Wir übernehmen zeitweise Betreuung zur Entlastung pflegender Angehöriger.', 1);


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: Leistung_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Leistung_id_seq"', 5, true);


--
-- Name: Leistungsberechtiger_Leistungselemente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Leistungsberechtiger_Leistungselemente_id_seq"', 1, false);


--
-- Name: Leistungsberechtigter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Leistungsberechtigter_id_seq"', 4, true);


--
-- Name: Leistungselement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Leistungselement_id_seq"', 50, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict Z1rsy7dLeZDImG5LaX1UUnUYz7wJJ3XBN05TvkWg05awuZhOMHAAlp1c6bGtQVG

RESET ALL;
