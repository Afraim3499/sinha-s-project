"use client"



interface TechnicalOverlayProps {
  label?: string
  coordinates?: string
  color?: string
}

export function TechnicalOverlay({ 
  label = "STRICT_COMPLIANCE", 
  coordinates = "23.8103° N, 90.4125° E"
}: TechnicalOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Distilled Metadata - No lines/grids as requested */}
      <div className="absolute top-10 left-10 flex flex-col gap-1 items-start">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40">{label}</span>
      </div>

      <div className="absolute bottom-10 right-10 flex flex-col gap-1 items-end">
        <span className="text-[7px] font-mono tracking-widest opacity-30">{coordinates}</span>
      </div>
    </div>
  )
}
