// data/stats.ts
import { Stat } from "@/types";

export const stats: Stat[] = [
  { value: "0", unit: "g CO₂", label: "During Operation" },
  { value: "40–50%", unit: "", label: "Thermal Efficiency" },
  { value: "1,800°C+", unit: "", label: "TRISO Survival Temp" },
  { value: "10–50", unit: "MWe", label: "Per Module" },
  { value: "12–18", unit: "mo", label: "Factory Build" },
  { value: "3–6", unit: "mo", label: "Site Assembly" },
  { value: "4–8", unit: "/yr", label: "Units Per Line" },
  { value: "~7", unit: "yrs", label: "Founding → Criticality" },
];
