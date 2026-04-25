import {
  Home,
  House,
  Users,
  UsersRound,
  Heart,
  ShoppingCart,
  Music,
  Stethoscope,
  TreePine,
  Building2,
  Brain,
  HandHeart,
  Sparkles,
  MicVocal,
  Footprints,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  pricePerHour: number;
  minPflegegrad: number;
  icon: any;
}

interface ServiceRow {
  id: number;
  title: string;
  subtitle: string;
  budget: number;
  pflegegrad: number | null;
  icon: string | null;
}

interface BudgetRow {
  budget: number | null;
}

const ICONS_BY_NAME: Record<string, any> = {
  Home,
  House,
  Users,
  UsersRound,
  Heart,
  ShoppingCart,
  Music,
  Stethoscope,
  TreePine,
  Building2,
  Brain,
  HandHeart,
  Sparkles,
  MicVocal,
  Footprints,
};

export async function fetchServices(): Promise<ServiceData[]> {
  const { data, error } = await supabase
    .from("Leistungselement")
    .select("id,title,subtitle,budget,pflegegrad,icon,rank")
    .order("rank", { ascending: true });

  if (error) {
    throw error;
  }

  return ((data ?? []) as ServiceRow[]).map((row) => ({
    id: String(row.id),
    title: row.title,
    description: row.subtitle,
    pricePerHour: row.budget,
    minPflegegrad: row.pflegegrad ?? 1,
    icon: (row.icon && ICONS_BY_NAME[row.icon]) || Home,
  }));
}

export async function fetchTotalBudget(pflegegrad?: number): Promise<number> {
  let query = supabase
    .from("Leistung")
    .select("budget")
    .order("pflegegrad", { ascending: true })
    .limit(1);

  if (typeof pflegegrad === "number" && !Number.isNaN(pflegegrad)) {
    query = query.lte("pflegegrad", pflegegrad);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw error;
  }

  return ((data as BudgetRow | null)?.budget ?? 0);
}
