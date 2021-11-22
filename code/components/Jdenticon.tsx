import { useEffect, useRef } from "react";
import { update } from 'jdenticon';

export default function Jdenticon({ value, size }: { value: string, size: any }) {
  const icon = useRef<SVGSVGElement>(null)
  useEffect(() => {
    update(icon.current as Element, value)
  }, [value])
  return (
    <svg ref={icon} width={size} height={size} data-jdenticon-value={value} />
  )
}