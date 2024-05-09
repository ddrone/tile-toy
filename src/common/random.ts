export function choose<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error("Can't choose out of empty array!");
  }

  return array[Math.floor(Math.random() * array.length)];
}
