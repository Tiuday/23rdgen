import { formatDistanceToNow } from 'date-fns'

export function formatRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true })
}

export function formatDeployCount(count: number): string {
  if (count >= 1000) return (count / 1000).toFixed(1) + 'k'
  return count.toString()
}

export function formatPoints(points: number): string {
  if (points >= 1000) return (points / 1000).toFixed(1) + 'k pts'
  return points + ' pts'
}
