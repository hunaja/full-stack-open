export default function assertNever(value: never): never {
  throw new Error('Unexpected never:', value)
}