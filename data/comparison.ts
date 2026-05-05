// data/comparison.ts
import { ComparisonTable } from "@/types";

export const comparisonTable: ComparisonTable = {
  headers: ["", "Traditional LWR", "FRKTL HTGR", "Solar + Battery"],
  rows: [
    { feature: "Efficiency", lwr: "~33%", frktl: "40–50%", solar: "~20%*" },
    { feature: "Capacity Factor", lwr: "~92%", frktl: "~95%", solar: "~25%" },
    { feature: "Water Needed", lwr: "Enormous", frktl: "Zero", solar: "Zero" },
    { feature: "Meltdown Risk", lwr: "Yes", frktl: "No (physics)", solar: "N/A" },
    { feature: "24/7 Baseload", lwr: "Yes", frktl: "Yes", solar: "No" },
    { feature: "Factory Built", lwr: "No", frktl: "Yes", solar: "Partially" },
    { feature: "Road Transportable", lwr: "No", frktl: "Yes — modular", solar: "N/A" },
    { feature: "Time to Power", lwr: "10–15 years", frktl: "~7 yrs (program)", solar: "6–18 months" },
    { feature: "Production Rate", lwr: "1 per decade", frktl: "4–8 /line/yr", solar: "Variable" },
  ],
  footnote:
    "* Panel efficiency; lower with storage. Time to Power for FRKTL = full program from founding to first criticality. Subsequent units: 15–24 months.",
};
