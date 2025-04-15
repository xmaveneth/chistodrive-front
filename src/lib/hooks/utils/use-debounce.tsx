import useTimeout from '@/lib/hooks/utils/use-timeout'
import { useEffect } from 'react'

type Callback = () => void

export default function useDebounce(
  callback: Callback,
  delay: number,
  dependencies: React.DependencyList
): void {
  const { reset, clear } = useTimeout(callback, delay)

  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}
