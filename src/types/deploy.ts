export interface Deployment {
  id: string
  agent_id: string
  user_id: string | null
  deployed_to: string | null
  created_at: string
}

export interface CreateDeploymentInput {
  agent_id: string
  deployed_to?: string
}

export interface PointsLedgerEntry {
  id: string
  creator_id: string
  agent_id: string | null
  deployment_id: string | null
  points: number
  reason: string | null
  created_at: string
}
