'use client'

const SVG_PROPS = { viewBox: '0 0 24 24', fill: 'none' as const }
const SVG_STYLE = { imageRendering: 'pixelated' as const, display: 'block', width: '100%', height: '100%' }

function WizardFace() {
  return (
    <svg {...SVG_PROPS} style={SVG_STYLE}>
      {/* pointed hat */}
      <rect x="11" y="0" width="2"  height="1" fill="#5B21B6"/>
      <rect x="10" y="1" width="4"  height="1" fill="#6D28D9"/>
      <rect x="9"  y="2" width="6"  height="1" fill="#7C3AED"/>
      <rect x="8"  y="3" width="8"  height="1" fill="#7C3AED"/>
      <rect x="5"  y="4" width="14" height="2" fill="#4C1D95"/>
      {/* star on hat */}
      <rect x="11" y="1" width="1"  height="1" fill="#FCD34D"/>
      {/* face */}
      <rect x="5"  y="6" width="14" height="9" fill="#FDE68A"/>
      {/* ears */}
      <rect x="4"  y="8" width="1"  height="5" fill="#FDE68A"/>
      <rect x="19" y="8" width="1"  height="5" fill="#FDE68A"/>
      {/* eye left */}
      <rect x="8"  y="8" width="2"  height="2" fill="#1C1917"/>
      <rect x="8"  y="8" width="1"  height="1" fill="white" opacity="0.7"/>
      {/* eye right */}
      <rect x="14" y="8" width="2"  height="2" fill="#1C1917"/>
      <rect x="14" y="8" width="1"  height="1" fill="white" opacity="0.7"/>
      {/* nose */}
      <rect x="11" y="11" width="2" height="1" fill="#D97706"/>
      {/* smile */}
      <rect x="9"  y="13" width="1" height="1" fill="#92400E"/>
      <rect x="10" y="14" width="4" height="1" fill="#92400E"/>
      <rect x="14" y="13" width="1" height="1" fill="#92400E"/>
      {/* beard */}
      <rect x="5"  y="15" width="14" height="3" fill="#F3F4F6"/>
      <rect x="7"  y="18" width="10" height="2" fill="#E5E7EB"/>
      <rect x="9"  y="20" width="6"  height="2" fill="#D1D5DB"/>
    </svg>
  )
}

function ElfFace() {
  return (
    <svg {...SVG_PROPS} style={SVG_STYLE}>
      {/* cap */}
      <rect x="12" y="0"  width="1"  height="2" fill="#065F46"/>
      <rect x="10" y="2"  width="5"  height="2" fill="#065F46"/>
      <rect x="8"  y="4"  width="9"  height="2" fill="#047857"/>
      <rect x="6"  y="6"  width="13" height="2" fill="#059669"/>
      {/* pom-pom */}
      <rect x="12" y="0"  width="1"  height="1" fill="#FAFAFA"/>
      {/* face */}
      <rect x="5"  y="8"  width="14" height="8" fill="#FEF3C7"/>
      {/* pointed ears */}
      <rect x="3"  y="9"  width="2"  height="4" fill="#FEF3C7"/>
      <rect x="2"  y="10" width="1"  height="2" fill="#FEF3C7"/>
      <rect x="19" y="9"  width="2"  height="4" fill="#FEF3C7"/>
      <rect x="21" y="10" width="1"  height="2" fill="#FEF3C7"/>
      {/* eye left */}
      <rect x="7"  y="10" width="3"  height="2" fill="#047857"/>
      <rect x="7"  y="10" width="1"  height="1" fill="white" opacity="0.6"/>
      {/* eye right */}
      <rect x="14" y="10" width="3"  height="2" fill="#047857"/>
      <rect x="14" y="10" width="1"  height="1" fill="white" opacity="0.6"/>
      {/* rosy cheeks */}
      <rect x="5"  y="13" width="2"  height="1" fill="#FCA5A5" opacity="0.55"/>
      <rect x="17" y="13" width="2"  height="1" fill="#FCA5A5" opacity="0.55"/>
      {/* smile */}
      <rect x="8"  y="14" width="1"  height="1" fill="#78716C"/>
      <rect x="9"  y="15" width="6"  height="1" fill="#78716C"/>
      <rect x="15" y="14" width="1"  height="1" fill="#78716C"/>
      {/* collar */}
      <rect x="7"  y="16" width="10" height="2" fill="#047857"/>
      <rect x="6"  y="18" width="12" height="3" fill="#065F46"/>
    </svg>
  )
}

function FairyFace() {
  return (
    <svg {...SVG_PROPS} style={SVG_STYLE}>
      {/* sparkle crown */}
      <rect x="11" y="0"  width="2"  height="3" fill="#F59E0B"/>
      <rect x="7"  y="1"  width="2"  height="2" fill="#FBBF24"/>
      <rect x="15" y="1"  width="2"  height="2" fill="#FBBF24"/>
      <rect x="9"  y="2"  width="6"  height="1" fill="#FDE68A"/>
      {/* star dots on crown */}
      <rect x="5"  y="0"  width="1"  height="1" fill="#FCD34D"/>
      <rect x="18" y="0"  width="1"  height="1" fill="#FCD34D"/>
      {/* wings (sides) */}
      <rect x="0"  y="8"  width="4"  height="5" fill="#F9A8D4" opacity="0.55"/>
      <rect x="1"  y="7"  width="3"  height="7" fill="#FBCFE8" opacity="0.4"/>
      <rect x="20" y="8"  width="4"  height="5" fill="#F9A8D4" opacity="0.55"/>
      <rect x="20" y="7"  width="3"  height="7" fill="#FBCFE8" opacity="0.4"/>
      {/* face */}
      <rect x="5"  y="4"  width="14" height="12" fill="#FFF7ED"/>
      {/* big eyes */}
      <rect x="7"  y="7"  width="4"  height="3"  fill="#7C3AED"/>
      <rect x="7"  y="7"  width="2"  height="1"  fill="white" opacity="0.6"/>
      <rect x="13" y="7"  width="4"  height="3"  fill="#7C3AED"/>
      <rect x="13" y="7"  width="2"  height="1"  fill="white" opacity="0.6"/>
      {/* rosy cheeks */}
      <rect x="5"  y="11" width="3"  height="2" fill="#FCA5A5" opacity="0.6"/>
      <rect x="16" y="11" width="3"  height="2" fill="#FCA5A5" opacity="0.6"/>
      {/* small smile */}
      <rect x="10" y="13" width="4"  height="1" fill="#FB7185"/>
      {/* sparkle dots */}
      <rect x="2"  y="3"  width="1"  height="1" fill="#FCD34D"/>
      <rect x="21" y="4"  width="1"  height="1" fill="#FCD34D"/>
    </svg>
  )
}

function RobotFace() {
  return (
    <svg {...SVG_PROPS} style={SVG_STYLE}>
      {/* antenna */}
      <rect x="11" y="0"  width="2"  height="3" fill="#9CA3AF"/>
      <rect x="10" y="3"  width="4"  height="1" fill="#6B7280"/>
      {/* head */}
      <rect x="3"  y="4"  width="18" height="14" fill="#D1D5DB"/>
      <rect x="4"  y="5"  width="16" height="12" fill="#E5E7EB"/>
      {/* LED eye left */}
      <rect x="6"  y="8"  width="4"  height="3" fill="#0E7490"/>
      <rect x="6"  y="8"  width="2"  height="1" fill="#67E8F9" opacity="0.85"/>
      {/* LED eye right */}
      <rect x="14" y="8"  width="4"  height="3" fill="#0E7490"/>
      <rect x="14" y="8"  width="2"  height="1" fill="#67E8F9" opacity="0.85"/>
      {/* mouth grill */}
      <rect x="7"  y="13" width="10" height="3" fill="#9CA3AF"/>
      <rect x="8"  y="14" width="1"  height="1" fill="#E5E7EB"/>
      <rect x="10" y="14" width="1"  height="1" fill="#E5E7EB"/>
      <rect x="12" y="14" width="1"  height="1" fill="#E5E7EB"/>
      <rect x="14" y="14" width="1"  height="1" fill="#E5E7EB"/>
      {/* bolt corners */}
      <rect x="4"  y="5"  width="2"  height="2" fill="#9CA3AF"/>
      <rect x="18" y="5"  width="2"  height="2" fill="#9CA3AF"/>
      <rect x="4"  y="15" width="2"  height="2" fill="#9CA3AF"/>
      <rect x="18" y="15" width="2"  height="2" fill="#9CA3AF"/>
      {/* side vents */}
      <rect x="0"  y="8"  width="3"  height="6" fill="#6B7280"/>
      <rect x="21" y="8"  width="3"  height="6" fill="#6B7280"/>
      {/* body base */}
      <rect x="6"  y="18" width="12" height="4" fill="#CBD5E1"/>
    </svg>
  )
}

function InvaderFace() {
  return (
    <svg {...SVG_PROPS} style={SVG_STYLE}>
      {/* antennae */}
      <rect x="5"  y="0"  width="2"  height="2" fill="#22C55E"/>
      <rect x="17" y="0"  width="2"  height="2" fill="#22C55E"/>
      {/* head top */}
      <rect x="7"  y="2"  width="10" height="2" fill="#16A34A"/>
      {/* body */}
      <rect x="3"  y="4"  width="18" height="10" fill="#22C55E"/>
      {/* big eyes */}
      <rect x="5"  y="6"  width="4"  height="3" fill="#0A0A0F"/>
      <rect x="5"  y="6"  width="2"  height="1" fill="#86EFAC" opacity="0.8"/>
      <rect x="15" y="6"  width="4"  height="3" fill="#0A0A0F"/>
      <rect x="15" y="6"  width="2"  height="1" fill="#86EFAC" opacity="0.8"/>
      {/* invader mouth pattern */}
      <rect x="5"  y="11" width="2"  height="2" fill="#0A0A0F"/>
      <rect x="9"  y="12" width="2"  height="2" fill="#0A0A0F"/>
      <rect x="13" y="12" width="2"  height="2" fill="#0A0A0F"/>
      <rect x="17" y="11" width="2"  height="2" fill="#0A0A0F"/>
      {/* claws */}
      <rect x="2"  y="14" width="3"  height="3" fill="#22C55E"/>
      <rect x="10" y="14" width="4"  height="2" fill="#22C55E"/>
      <rect x="19" y="14" width="3"  height="3" fill="#22C55E"/>
      {/* glow center */}
      <rect x="10" y="8"  width="4"  height="2" fill="#86EFAC" opacity="0.25"/>
    </svg>
  )
}

function GhostFace() {
  return (
    <svg {...SVG_PROPS} style={SVG_STYLE}>
      {/* ghost blob - round top */}
      <rect x="7"  y="1"  width="10" height="2" fill="#F9FAFB"/>
      <rect x="5"  y="3"  width="14" height="2" fill="#F9FAFB"/>
      <rect x="4"  y="5"  width="16" height="12" fill="#F9FAFB"/>
      <rect x="3"  y="7"  width="1"  height="8"  fill="#F9FAFB"/>
      <rect x="20" y="7"  width="1"  height="8"  fill="#F9FAFB"/>
      {/* wavy bottom */}
      <rect x="3"  y="17" width="3"  height="3" fill="#F9FAFB"/>
      <rect x="7"  y="18" width="3"  height="2" fill="#F9FAFB" opacity="0.35"/>
      <rect x="11" y="17" width="3"  height="3" fill="#F9FAFB"/>
      <rect x="15" y="18" width="3"  height="2" fill="#F9FAFB" opacity="0.35"/>
      <rect x="19" y="17" width="3"  height="3" fill="#F9FAFB"/>
      {/* big eyes */}
      <rect x="7"  y="8"  width="4"  height="4" fill="#1C1917"/>
      <rect x="7"  y="8"  width="2"  height="2" fill="#374151"/>
      <rect x="13" y="8"  width="4"  height="4" fill="#1C1917"/>
      <rect x="13" y="8"  width="2"  height="2" fill="#374151"/>
      {/* O mouth */}
      <rect x="9"  y="13" width="6"  height="1" fill="#1C1917"/>
      <rect x="8"  y="14" width="1"  height="1" fill="#1C1917"/>
      <rect x="15" y="14" width="1"  height="1" fill="#1C1917"/>
      <rect x="10" y="15" width="4"  height="1" fill="#1C1917"/>
      {/* blush */}
      <rect x="5"  y="12" width="2"  height="2" fill="#FCA5A5" opacity="0.4"/>
      <rect x="17" y="12" width="2"  height="2" fill="#FCA5A5" opacity="0.4"/>
    </svg>
  )
}

function NinjaFace() {
  return (
    <svg {...SVG_PROPS} style={SVG_STYLE}>
      {/* dark head wrap */}
      <rect x="4"  y="1"  width="16" height="4" fill="#1E1B4B"/>
      <rect x="3"  y="5"  width="18" height="14" fill="#1E1B4B"/>
      <rect x="2"  y="7"  width="1"  height="10" fill="#1E1B4B"/>
      <rect x="21" y="7"  width="1"  height="10" fill="#1E1B4B"/>
      {/* red forehead band */}
      <rect x="3"  y="5"  width="18" height="3"  fill="#DC2626"/>
      {/* eye slot amber glow */}
      <rect x="5"  y="9"  width="5"  height="3"  fill="#D97706"/>
      <rect x="5"  y="9"  width="2"  height="1"  fill="#FDE68A" opacity="0.75"/>
      <rect x="14" y="9"  width="5"  height="3"  fill="#D97706"/>
      <rect x="14" y="9"  width="2"  height="1"  fill="#FDE68A" opacity="0.75"/>
      {/* eye shadow depth */}
      <rect x="4"  y="8"  width="7"  height="5"  fill="#0A0A0F" opacity="0.18"/>
      <rect x="13" y="8"  width="7"  height="5"  fill="#0A0A0F" opacity="0.18"/>
      {/* mask folds */}
      <rect x="4"  y="15" width="16" height="1"  fill="#312E81" opacity="0.35"/>
      <rect x="4"  y="17" width="16" height="1"  fill="#312E81" opacity="0.25"/>
      {/* shoulders */}
      <rect x="5"  y="19" width="14" height="3"  fill="#111827"/>
    </svg>
  )
}

function AstronautFace() {
  return (
    <svg {...SVG_PROPS} style={SVG_STYLE}>
      {/* helmet outer */}
      <rect x="6"  y="1"  width="12" height="2" fill="#E5E7EB"/>
      <rect x="4"  y="3"  width="16" height="2" fill="#F3F4F6"/>
      <rect x="3"  y="5"  width="18" height="12" fill="#F9FAFB"/>
      <rect x="2"  y="7"  width="1"  height="8"  fill="#F3F4F6"/>
      <rect x="21" y="7"  width="1"  height="8"  fill="#F3F4F6"/>
      <rect x="4"  y="17" width="16" height="2"  fill="#E5E7EB"/>
      <rect x="6"  y="19" width="12" height="2"  fill="#D1D5DB"/>
      {/* dark visor */}
      <rect x="5"  y="6"  width="14" height="9"  fill="#1F2937"/>
      <rect x="6"  y="7"  width="12" height="7"  fill="#111827"/>
      {/* visor reflection shine */}
      <rect x="6"  y="7"  width="4"  height="3"  fill="#374151"/>
      <rect x="7"  y="8"  width="2"  height="1"  fill="#6B7280"/>
      {/* face glow inside visor */}
      <rect x="8"  y="9"  width="2"  height="2"  fill="#FDE68A"/>
      <rect x="14" y="9"  width="2"  height="2"  fill="#FDE68A"/>
      {/* suit collar */}
      <rect x="7"  y="21" width="10" height="2"  fill="#3B82F6"/>
      <rect x="5"  y="21" width="2"  height="1"  fill="#2563EB"/>
      <rect x="17" y="21" width="2"  height="1"  fill="#2563EB"/>
    </svg>
  )
}

function AlchemistFace() {
  return (
    <svg {...SVG_PROPS} style={SVG_STYLE}>
      {/* teal pointed cap */}
      <rect x="11" y="0"  width="2"  height="2" fill="#0F766E"/>
      <rect x="9"  y="2"  width="6"  height="1" fill="#0F766E"/>
      <rect x="7"  y="3"  width="10" height="1" fill="#0D9488"/>
      <rect x="5"  y="4"  width="14" height="2" fill="#14B8A6"/>
      {/* flask on cap */}
      <rect x="16" y="1"  width="2"  height="1" fill="#FCD34D"/>
      {/* face */}
      <rect x="5"  y="6"  width="14" height="10" fill="#FDE68A"/>
      <rect x="4"  y="8"  width="1"  height="6"  fill="#FDE68A"/>
      <rect x="19" y="8"  width="1"  height="6"  fill="#FDE68A"/>
      {/* glasses frames — left */}
      <rect x="6"  y="9"  width="5"  height="1"  fill="#6B7280"/>
      <rect x="6"  y="12" width="5"  height="1"  fill="#6B7280"/>
      <rect x="6"  y="9"  width="1"  height="4"  fill="#6B7280"/>
      <rect x="10" y="9"  width="1"  height="4"  fill="#6B7280"/>
      {/* glasses frames — right */}
      <rect x="13" y="9"  width="5"  height="1"  fill="#6B7280"/>
      <rect x="13" y="12" width="5"  height="1"  fill="#6B7280"/>
      <rect x="13" y="9"  width="1"  height="4"  fill="#6B7280"/>
      <rect x="17" y="9"  width="1"  height="4"  fill="#6B7280"/>
      {/* glasses bridge */}
      <rect x="11" y="11" width="2"  height="1"  fill="#6B7280"/>
      {/* eyes inside glasses */}
      <rect x="7"  y="10" width="3"  height="2"  fill="#0D9488"/>
      <rect x="7"  y="10" width="1"  height="1"  fill="white" opacity="0.5"/>
      <rect x="14" y="10" width="3"  height="2"  fill="#0D9488"/>
      <rect x="14" y="10" width="1"  height="1"  fill="white" opacity="0.5"/>
      {/* smile */}
      <rect x="9"  y="14" width="6"  height="1"  fill="#78716C"/>
      {/* collar / robe */}
      <rect x="6"  y="16" width="12" height="4"  fill="#0D9488"/>
      <rect x="8"  y="17" width="8"  height="2"  fill="#0F766E"/>
    </svg>
  )
}

function DragonFace() {
  return (
    <svg {...SVG_PROPS} style={SVG_STYLE}>
      {/* horns */}
      <rect x="7"  y="0"  width="2"  height="3"  fill="#D97706"/>
      <rect x="6"  y="3"  width="3"  height="1"  fill="#B45309"/>
      <rect x="15" y="0"  width="2"  height="3"  fill="#D97706"/>
      <rect x="15" y="3"  width="3"  height="1"  fill="#B45309"/>
      {/* head */}
      <rect x="4"  y="3"  width="16" height="14" fill="#15803D"/>
      {/* scale dots */}
      <rect x="5"  y="4"  width="2"  height="1"  fill="#16A34A" opacity="0.5"/>
      <rect x="9"  y="4"  width="2"  height="1"  fill="#16A34A" opacity="0.5"/>
      <rect x="13" y="4"  width="2"  height="1"  fill="#16A34A" opacity="0.5"/>
      <rect x="17" y="4"  width="2"  height="1"  fill="#16A34A" opacity="0.5"/>
      <rect x="6"  y="6"  width="2"  height="1"  fill="#16A34A" opacity="0.4"/>
      <rect x="11" y="6"  width="2"  height="1"  fill="#16A34A" opacity="0.4"/>
      <rect x="16" y="6"  width="2"  height="1"  fill="#16A34A" opacity="0.4"/>
      {/* slit eyes — yellow iris, dark pupil */}
      <rect x="6"  y="8"  width="4"  height="3"  fill="#EAB308"/>
      <rect x="8"  y="8"  width="1"  height="3"  fill="#1C1917"/>
      <rect x="14" y="8"  width="4"  height="3"  fill="#EAB308"/>
      <rect x="15" y="8"  width="1"  height="3"  fill="#1C1917"/>
      {/* snout */}
      <rect x="9"  y="13" width="6"  height="3"  fill="#166534"/>
      <rect x="9"  y="14" width="2"  height="1"  fill="#1C1917"/>
      <rect x="13" y="14" width="2"  height="1"  fill="#1C1917"/>
      {/* teeth */}
      <rect x="10" y="16" width="1"  height="2"  fill="#FAFAFA"/>
      <rect x="12" y="16" width="1"  height="2"  fill="#FAFAFA"/>
    </svg>
  )
}

function PhoenixFace() {
  return (
    <svg {...SVG_PROPS} style={SVG_STYLE}>
      {/* flame crest */}
      <rect x="11" y="0"  width="2"  height="4"  fill="#EF4444"/>
      <rect x="9"  y="1"  width="2"  height="3"  fill="#F97316"/>
      <rect x="13" y="1"  width="2"  height="3"  fill="#F97316"/>
      <rect x="7"  y="2"  width="2"  height="2"  fill="#FBBF24"/>
      <rect x="15" y="2"  width="2"  height="2"  fill="#FBBF24"/>
      {/* feathery head */}
      <rect x="4"  y="4"  width="16" height="12" fill="#EA580C"/>
      <rect x="3"  y="6"  width="1"  height="8"  fill="#F97316"/>
      <rect x="20" y="6"  width="1"  height="8"  fill="#F97316"/>
      {/* feather highlights */}
      <rect x="4"  y="5"  width="3"  height="2"  fill="#FBBF24" opacity="0.5"/>
      <rect x="17" y="5"  width="3"  height="2"  fill="#FBBF24" opacity="0.5"/>
      {/* eyes */}
      <rect x="7"  y="8"  width="4"  height="3"  fill="#FDE68A"/>
      <rect x="8"  y="8"  width="2"  height="1"  fill="white"   opacity="0.6"/>
      <rect x="9"  y="9"  width="1"  height="2"  fill="#1C1917"/>
      <rect x="13" y="8"  width="4"  height="3"  fill="#FDE68A"/>
      <rect x="14" y="8"  width="2"  height="1"  fill="white"   opacity="0.6"/>
      <rect x="15" y="9"  width="1"  height="2"  fill="#1C1917"/>
      {/* beak */}
      <rect x="10" y="13" width="4"  height="1"  fill="#B45309"/>
      <rect x="11" y="14" width="2"  height="2"  fill="#92400E"/>
      {/* tail feathers at base */}
      <rect x="4"  y="16" width="16" height="4"  fill="#F97316"/>
      <rect x="5"  y="17" width="3"  height="3"  fill="#FBBF24" opacity="0.55"/>
      <rect x="16" y="17" width="3"  height="3"  fill="#FBBF24" opacity="0.55"/>
    </svg>
  )
}

function OracleFace() {
  return (
    <svg {...SVG_PROPS} style={SVG_STYLE}>
      {/* deep hood */}
      <rect x="6"  y="0"  width="12" height="2"  fill="#4C1D95"/>
      <rect x="4"  y="2"  width="16" height="2"  fill="#5B21B6"/>
      <rect x="2"  y="4"  width="20" height="16" fill="#4C1D95"/>
      <rect x="0"  y="8"  width="2"  height="8"  fill="#3B0764"/>
      <rect x="22" y="8"  width="2"  height="8"  fill="#3B0764"/>
      {/* shadow depth inside hood */}
      <rect x="4"  y="6"  width="16" height="12" fill="#3B0764"/>
      {/* glowing eyes */}
      <rect x="6"  y="10" width="5"  height="3"  fill="#A855F7"/>
      <rect x="6"  y="10" width="3"  height="1"  fill="#E9D5FF" opacity="0.8"/>
      <rect x="13" y="10" width="5"  height="3"  fill="#A855F7"/>
      <rect x="13" y="10" width="3"  height="1"  fill="#E9D5FF" opacity="0.8"/>
      {/* glow bloom */}
      <rect x="5"  y="9"  width="7"  height="5"  fill="#9333EA" opacity="0.2"/>
      <rect x="12" y="9"  width="7"  height="5"  fill="#9333EA" opacity="0.2"/>
      {/* mystical star dots */}
      <rect x="3"  y="4"  width="1"  height="1"  fill="#E9D5FF" opacity="0.5"/>
      <rect x="20" y="6"  width="1"  height="1"  fill="#E9D5FF" opacity="0.45"/>
      <rect x="5"  y="3"  width="1"  height="1"  fill="#DDD6FE" opacity="0.4"/>
      <rect x="18" y="5"  width="1"  height="1"  fill="#DDD6FE" opacity="0.35"/>
      {/* robe fold */}
      <rect x="5"  y="16" width="14" height="4"  fill="#4C1D95"/>
      <rect x="7"  y="17" width="10" height="2"  fill="#3B0764"/>
    </svg>
  )
}

const FACES = [
  WizardFace,
  ElfFace,
  FairyFace,
  RobotFace,
  InvaderFace,
  GhostFace,
  NinjaFace,
  AstronautFace,
  AlchemistFace,
  DragonFace,
  PhoenixFace,
  OracleFace,
]

export const AVATAR_NAMES = [
  'Wizard', 'Elf', 'Fairy', 'Robot', 'Invader', 'Ghost',
  'Ninja', 'Astronaut', 'Alchemist', 'Dragon', 'Phoenix', 'Oracle',
]

export function stableAvatarIdx(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0
  }
  return Math.abs(hash) % 12
}

export interface CartoonAvatarProps {
  index: number
  size?: number
  className?: string
}

export default function CartoonAvatar({ index, size = 64, className }: CartoonAvatarProps) {
  const safeIdx = ((index % 12) + 12) % 12
  const Face = FACES[safeIdx]
  return (
    <div
      className={className}
      style={{ width: size, height: size, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Face />
    </div>
  )
}
