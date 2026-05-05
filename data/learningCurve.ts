// data/learningCurve.ts
import { LearningCurveCard } from "@/types";
import { TOKENS } from "@/lib/tokens";

export const learningCurveCards: LearningCurveCard[] = [
  {
    unit: "Unit 1–2",
    phase: "FOAK",
    desc: "Highest cost — tooling, procedures, NRC ITAAC. But factory-built, not field-built.",
    color: TOKENS.orange,
  },
  {
    unit: "Unit 3–10",
    phase: "Early Production",
    desc: "Procedures locked. Workforce trained. Weld cycles drop 20–30%.",
    color: TOKENS.gold,
  },
  {
    unit: "Unit 11–50",
    phase: "Serial Production",
    desc: "Full learning curve. Second line online. Per-unit cost approaches NOAK.",
    color: TOKENS.cyan,
  },
  {
    unit: "Unit 50+",
    phase: "Fleet Scale",
    desc: "NOAK economics. Shared fuel services. Cost competitive with natural gas.",
    color: TOKENS.tealLight,
  },
];
