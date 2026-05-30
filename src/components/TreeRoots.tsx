'use client'

export default function TreeRoots() {
  return (
    <svg
      viewBox="0 0 1440 320"
      width="100%"
      height="320"
      preserveAspectRatio="none"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, display: 'block', overflow: 'visible' }}
    >
      {/* Root 1 — sweeps far LEFT across full viewport */}
      <g style={{ animation: 'rootPulse 5.2s ease-in-out infinite', animationDelay: '0s' }}>
        <path d="M 1042 5 C 940 38 730 92 490 138 C 320 168 145 186 35 196"
          stroke="#0A0A0F" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 490 138 C 382 158 268 174 155 184"
          stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M 490 138 C 455 158 428 173 400 183"
          stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 750 108 C 742 118 736 126 730 134" stroke="#2A1A0E" strokeWidth="0.8" fill="none" opacity="0.5"/>
        <path d="M 753 111 C 745 121 739 129 733 137" stroke="#2A1A0E" strokeWidth="0.8" fill="none" opacity="0.5"/>
      </g>
      {/* Root 2 — LEFT and DOWN steeply into lower section */}
      <g style={{ animation: 'rootPulse 6.1s ease-in-out infinite', animationDelay: '0.9s' }}>
        <path d="M 1042 5 C 978 42 858 92 725 132 C 598 165 468 183 348 193"
          stroke="#0A0A0F" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 725 132 C 640 155 548 172 450 183"
          stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 725 132 C 695 155 670 171 641 182"
          stroke="#0A0A0F" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M 890 80 C 883 90 877 99 872 108" stroke="#2A1A0E" strokeWidth="0.8" fill="none" opacity="0.5"/>
        <path d="M 893 83 C 886 93 880 102 875 111" stroke="#2A1A0E" strokeWidth="0.8" fill="none" opacity="0.5"/>
      </g>
      {/* Root 3 — nearly straight DOWN then curves left */}
      <g style={{ animation: 'rootPulse 4.8s ease-in-out infinite', animationDelay: '1.6s' }}>
        <path d="M 1042 5 C 1015 48 978 100 935 145 C 900 182 858 198 812 203"
          stroke="#0A0A0F" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 935 145 C 908 168 878 185 845 195"
          stroke="#0A0A0F" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M 935 145 C 912 170 892 186 868 196"
          stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 1005 62 C 999 72 994 82 990 91" stroke="#2A1A0E" strokeWidth="0.8" fill="none" opacity="0.5"/>
        <path d="M 1008 65 C 1002 75 997 85 993 94" stroke="#2A1A0E" strokeWidth="0.8" fill="none" opacity="0.5"/>
      </g>
      {/* Root 4 — short right-side root */}
      <g style={{ animation: 'rootPulse 5.6s ease-in-out infinite', animationDelay: '0.4s' }}>
        <path d="M 1042 5 C 1072 48 1115 100 1162 146 C 1198 183 1245 200 1288 205"
          stroke="#0A0A0F" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 1162 146 C 1188 170 1218 188 1250 198"
          stroke="#0A0A0F" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M 1162 146 C 1175 172 1185 190 1202 199"
          stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>
      {/* Root 5 — right sweep */}
      <g style={{ animation: 'rootPulse 6.4s ease-in-out infinite', animationDelay: '1.3s' }}>
        <path d="M 1042 5 C 1095 40 1192 88 1295 126 C 1360 152 1408 170 1436 183"
          stroke="#0A0A0F" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 1295 126 C 1345 148 1388 166 1419 177"
          stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 1295 126 C 1318 150 1335 165 1352 177"
          stroke="#0A0A0F" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </g>
      {/* Root 6 — far right */}
      <g style={{ animation: 'rootPulse 4.5s ease-in-out infinite', animationDelay: '2.1s' }}>
        <path d="M 1042 5 C 1128 28 1258 68 1368 105 C 1428 128 1466 145 1482 158"
          stroke="#0A0A0F" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 1368 105 C 1408 125 1441 143 1460 153"
          stroke="#0A0A0F" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M 1368 105 C 1386 128 1399 145 1413 156"
          stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>
      {/* Root 7 — extra left density */}
      <g style={{ animation: 'rootPulse 7s ease-in-out infinite', animationDelay: '0.7s' }}>
        <path d="M 1042 5 C 1000 55 918 118 808 158 C 732 186 648 198 572 203"
          stroke="#0A0A0F" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 808 158 C 762 178 715 192 665 200"
          stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 808 158 C 785 180 765 194 740 202"
          stroke="#0A0A0F" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  )
}
