export type RiskLevel = "low" | "medium" | "high" | "critical";

export type RFPQuestionState = {
  question_id: string;
  raw_question: string;
  normalized_question: string;
  category: string[];
  risk_level: RiskLevel;
  assigned_agents: string[];
  conflict_detected: boolean;
  conflict_summary: string | null;
  final_answer: string | null;
  status: string;
  risk_tags: string[];
};

export type BandGateState = {
  rfp_id: string;
  buyer_name: string;
  vendor_name: string;
  policy_version: string;
  questions: Record<string, RFPQuestionState>;
  global_risk_score: number;
};
