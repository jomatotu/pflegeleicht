import { Home, Users, Heart, ShoppingCart, Music, Stethoscope, TreePine, Building2, Brain, HandHeart } from "lucide-react";

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  pricePerHour: number;
  minPflegegrad: number;
  icon: any;
}

export const SERVICES: ServiceData[] = [
  {
    id: "1",
    title: "Ich brauche Unterstützung im Haushalt",
    description: "Wir helfen bei Reinigung, Wäsche und alltäglichen Aufgaben im Haushalt.",
    pricePerHour: 32,
    minPflegegrad: 1,
    icon: Home,
  },
  {
    id: "2",
    title: "Ich brauche Begleitung im Alltag",
    description: "Unterstützung bei Spaziergängen, Terminen und sozialer Teilhabe.",
    pricePerHour: 34,
    minPflegegrad: 1,
    icon: Users,
  },
  {
    id: "3",
    title: "Ich brauche Unterstützung bei der Pflegebegleitung",
    description: "Begleitung und Entlastung im Pflegealltag für Angehörige und Betroffene.",
    pricePerHour: 38,
    minPflegegrad: 1,
    icon: Heart,
  },
  {
    id: "4",
    title: "Ich brauche Hilfe beim Einkaufen",
    description: "Wir übernehmen Einkäufe oder begleiten Sie dabei.",
    pricePerHour: 30,
    minPflegegrad: 1,
    icon: ShoppingCart,
  },
  {
    id: "5",
    title: "Ich möchte an Gruppenaktivitäten teilnehmen",
    description: "Gemeinsame kreative und musikalische Aktivitäten für mehr Lebensfreude.",
    pricePerHour: 28,
    minPflegegrad: 1,
    icon: Music,
  },
  {
    id: "6",
    title: "Ich brauche Begleitung zum Arzt",
    description: "Wir begleiten Sie sicher zu Arztterminen und zurück.",
    pricePerHour: 35,
    minPflegegrad: 1,
    icon: Stethoscope,
  },
  {
    id: "7",
    title: "Ich möchte begleitet spazieren gehen",
    description: "Gemeinsame Spaziergänge für Bewegung und Gesellschaft.",
    pricePerHour: 30,
    minPflegegrad: 1,
    icon: TreePine,
  },
  {
    id: "8",
    title: "Ich brauche Hilfe bei Behördengängen",
    description: "Unterstützung bei Formularen, Terminen und Amtswegen.",
    pricePerHour: 36,
    minPflegegrad: 1,
    icon: Building2,
  },
  {
    id: "9",
    title: "Ich brauche Betreuung bei Demenz",
    description: "Einfühlsame Betreuung und Aktivierung für Menschen mit Demenz.",
    pricePerHour: 40,
    minPflegegrad: 1,
    icon: Brain,
  },
  {
    id: "10",
    title: "Ich brauche Entlastung als Angehöriger",
    description: "Wir übernehmen zeitweise Betreuung zur Entlastung pflegender Angehöriger.",
    pricePerHour: 37,
    minPflegegrad: 1,
    icon: HandHeart,
  },
];
