export const DEFAULT_POINTS_PER_DEPLOY = 10

export function calculateDeployPoints(
  pointsPerDeploy: number = DEFAULT_POINTS_PER_DEPLOY
): number {
  return pointsPerDeploy
}

export function calculateTotalEarnings(deployments: number, pointsPerDeploy: number): number {
  return deployments * pointsPerDeploy
}
