/**
 *
 * @param num
 * @param startAt default 1
 */
export function range(num: number, startAt = 1) {
  if (num < 0) {
    return []
  }
  return [...Array(num)].map((_, i) => i + startAt)
}
