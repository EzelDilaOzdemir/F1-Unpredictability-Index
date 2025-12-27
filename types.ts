
export interface Circuit {
  id: string;
  name: string;
  location: string;
  country: string;
  lengthKm: number;
  corners: number;
  image: string;
}

export interface UnpredictabilityMetrics {
  score: number; // 0-100
  weatherVolatility: number; // 0-100
  safetyCarFrequency: number; // 0-1 (e.g., 0.8 per race)
  overtakesPerRace: number;
  dnfRate: number; // Percentage
  strategyVariance: number; // 0-100
}

export interface CircuitAnalysis {
  circuitId: string;
  metrics: UnpredictabilityMetrics;
  historicalContext: string;
  topContributingFactors: string[];
  recentTriggers: {
    event: string;
    impact: string;
  }[];
  historicalTrend: {
    season: number;
    score: number;
  }[];
  safetyCarTrend: {
    season: number;
    deployments: number;
  }[];
}

export interface ComparisonData {
  circuits: CircuitAnalysis[];
  ranking: string[]; // IDs
  insight: string;
}
