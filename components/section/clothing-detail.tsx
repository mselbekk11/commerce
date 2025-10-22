"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import Image from "next/image"

type Hotspot = {
  id: number
  top: string
  left: string
  info: string
}

const hotspots: Hotspot[] = [
  {
    id: 1,
    top: "10%",
    left: "40%",
    info: "Premium water-resistant shell with durable ripstop fabric for all-weather protection.",
  },
  {
    id: 2,
    top: "45%",
    left: "20%",
    info: "700-fill power down insulation provides exceptional warmth without added bulk.",
  },
  {
    id: 3,
    top: "55%",
    left: "85%",
    info: "Secure zippered pockets with fleece lining to keep your hands warm and belongings safe.",
  },
  {
    id: 4,
    top: "82%",
    left: "60%",
    info: "Adjustable hem with elastic drawcord for a customizable fit and enhanced wind protection.",
  },
]

export default function ClothingDetail() {
  const [activeHotspot, setActiveHotspot] = useState<number>(1)

  const activeInfo = hotspots.find((h) => h.id === activeHotspot)?.info || ""

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      <div className="relative aspect-square w-full max-w-sm mx-auto">
        {/* Clothing Image */}
        <Image src='/jacket.png' alt='Black puffer jacket' fill className='w-full h-full object-contain' />

        {/* Hotspot Plus Icons */}
        {hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            onClick={() => setActiveHotspot(hotspot.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ top: hotspot.top, left: hotspot.left }}
            aria-label={`View detail ${hotspot.id}`}
          >
            <div
              className={`
                w-6 h-6 rounded-full flex items-center justify-center
                transition-all duration-300 ease-out
                group-hover:scale-110
                ${
                  activeHotspot === hotspot.id
                    ? "bg-yellow-600"
                    : "bg-white"
                }
              `}
            >
              <Plus
                className={`
                  w-3 h-3 transition-all duration-300
                  group-hover:rotate-90
                  ${activeHotspot === hotspot.id ? "text-white" : "text-gray-800"}
                `}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Information Text */}
      <div className="text-center w-[400px] items-center mx-auto">
        <p className="text-md text-gray-400 leading-relaxed min-h-[4rem] transition-opacity duration-300">
          {activeInfo}
        </p>
      </div>
    </div>
  )
}
