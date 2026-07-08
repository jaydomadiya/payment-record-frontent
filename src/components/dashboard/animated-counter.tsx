import { useEffect, useRef, useState } from "react"
import { animate } from "framer-motion"

export function AnimatedCounter({
  value,
  formatter,
}: {
  value: number
  formatter?: (value: number) => string
}) {
  const [display, setDisplay] = useState(0)
  const previousValue = useRef(0)

  useEffect(() => {
    const controls = animate(previousValue.current, value, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(latest),
    })
    previousValue.current = value
    return () => controls.stop()
  }, [value])

  const rounded = Math.round(display)
  return <>{formatter ? formatter(rounded) : rounded}</>
}
