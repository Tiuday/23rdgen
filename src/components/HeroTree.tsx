'use client'

type LeafVariant = 'a' | 'b' | 'c' | 'd'

interface LeafData {
  x: number; y: number; rot: number; variant: LeafVariant
  w: number; h: number; dur: number; delay: number; op: number
}

const BASE_DOTS: { x: number; y: number }[] = [
  // Far-left canopy
  { x: 8,  y: 22  }, { x: 15, y: 70  }, { x: 25, y: 120 }, { x: 30, y: 165 }, { x: 10, y: 195 },
  { x: 40, y: 10  }, { x: 48, y: 60  }, { x: 55, y: 105 }, { x: 62, y: 185 }, { x: 35, y: 218 },
  { x: 70, y: 30  }, { x: 65, y: 90  }, { x: 72, y: 148 }, { x: 68, y: 222 }, { x: 18, y: 142 },
  { x: 22, y: 100 }, { x: 5,  y: 152 }, { x: 12, y: 90  }, { x: 42, y: 142 }, { x: 52, y: 178 },
  { x: 28, y: 242 }, { x: 18, y: 228 }, { x: 60, y: 242 }, { x: 45, y: 202 }, { x: 75, y: 195 },
  // Far-right canopy
  { x: 512, y: 22  }, { x: 525, y: 70  }, { x: 535, y: 120 }, { x: 540, y: 165 }, { x: 550, y: 195 },
  { x: 520, y: 10  }, { x: 528, y: 60  }, { x: 545, y: 105 }, { x: 558, y: 185 }, { x: 538, y: 218 },
  { x: 510, y: 30  }, { x: 515, y: 90  }, { x: 522, y: 148 }, { x: 518, y: 222 }, { x: 555, y: 142 },
  { x: 562, y: 100 }, { x: 570, y: 152 }, { x: 568, y: 90  }, { x: 542, y: 142 }, { x: 532, y: 178 },
  { x: 548, y: 242 }, { x: 558, y: 228 }, { x: 505, y: 242 }, { x: 515, y: 202 }, { x: 505, y: 195 },
  // Left upper-mid
  { x: 82,  y: 80  }, { x: 95,  y: 132 }, { x: 108, y: 55  }, { x: 118, y: 178 }, { x: 130, y: 102 },
  { x: 145, y: 228 }, { x: 155, y: 65  }, { x: 168, y: 148 }, { x: 178, y: 102 }, { x: 190, y: 52  },
  { x: 198, y: 188 }, { x: 88,  y: 242 }, { x: 112, y: 278 }, { x: 138, y: 298 }, { x: 162, y: 262 },
  // Right upper-mid
  { x: 392, y: 80  }, { x: 405, y: 132 }, { x: 418, y: 55  }, { x: 428, y: 178 }, { x: 440, y: 102 },
  { x: 452, y: 228 }, { x: 462, y: 65  }, { x: 472, y: 148 }, { x: 482, y: 102 }, { x: 492, y: 52  },
  { x: 498, y: 188 }, { x: 400, y: 242 }, { x: 422, y: 278 }, { x: 448, y: 298 }, { x: 468, y: 262 },
  // Left lower branches
  { x: 38,  y: 278 }, { x: 55,  y: 322 }, { x: 70,  y: 268 }, { x: 88,  y: 358 }, { x: 105, y: 298 },
  { x: 120, y: 378 }, { x: 140, y: 320 }, { x: 155, y: 360 }, { x: 172, y: 288 }, { x: 188, y: 338 },
  // Right lower branches
  { x: 395, y: 278 }, { x: 412, y: 322 }, { x: 428, y: 268 }, { x: 444, y: 358 }, { x: 462, y: 298 },
  { x: 478, y: 378 }, { x: 492, y: 320 }, { x: 504, y: 360 }, { x: 518, y: 288 }, { x: 532, y: 338 },
  // Upper mid / near-vertical
  { x: 212, y: 28  }, { x: 225, y: 82  }, { x: 238, y: 128 }, { x: 250, y: 42  }, { x: 260, y: 92  },
  { x: 315, y: 42  }, { x: 328, y: 90  }, { x: 340, y: 130 }, { x: 352, y: 50  }, { x: 290, y: 18  },
  // Extra outer twig tips
  { x: 20,  y: 48  }, { x: 35,  y: 18  }, { x: 8,   y: 85  }, { x: 45,  y: 135 }, { x: 15,  y: 175 },
  { x: 560, y: 48  }, { x: 545, y: 18  }, { x: 572, y: 85  }, { x: 535, y: 135 }, { x: 565, y: 175 },
  { x: 105, y: 22  }, { x: 125, y: 68  }, { x: 142, y: 118 }, { x: 158, y: 48  }, { x: 178, y: 138 },
  { x: 422, y: 22  }, { x: 438, y: 68  }, { x: 455, y: 118 }, { x: 468, y: 48  }, { x: 485, y: 138 },
  { x: 240, y: 22  }, { x: 255, y: 62  }, { x: 272, y: 105 }, { x: 310, y: 68  }, { x: 325, y: 25  },
  // Additional tips for density
  { x: -4,  y: 186 }, { x: 2,   y: 122 }, { x: -10, y: 62  }, { x: -20, y: 28  }, { x: -8,  y: 8   },
  { x: 580, y: 182 }, { x: 576, y: 120 }, { x: 582, y: 72  }, { x: 574, y: 20  }, { x: 570, y: -5  },
  { x: 212, y: 4   }, { x: 220, y: -14 }, { x: 225, y: -22 }, { x: 328, y: -20 }, { x: 334, y: -2  },
  { x: 166, y: -4  }, { x: 155, y: 12  }, { x: 430, y: -12 }, { x: 440, y: 12  }, { x: 160, y: 165 },
  { x: 420, y: 165 }, { x: 200, y: 245 }, { x: 380, y: 245 }, { x: 290, y: 30  }, { x: 295, y: 8   },
  { x: 280, y: 20  }, { x: 302, y: -5  }, { x: 315, y: 22  }, { x: 248, y: 8   }, { x: 260, y: 18  },
  { x: 50,  y: 160 }, { x: 42,  y: 190 }, { x: 78,  y: 110 }, { x: 90,  y: 58  }, { x: 100, y: 82  },
  { x: 490, y: 160 }, { x: 498, y: 122 }, { x: 472, y: 100 }, { x: 460, y: 175 }, { x: 480, y: 55  },
  { x: 360, y: 115 }, { x: 376, y: 55  }, { x: 348, y: 90  }, { x: 202, y: 100 }, { x: 218, y: 50  },
]

const variants: LeafVariant[] = ['a', 'b', 'c', 'd']

const LEAVES: LeafData[] = BASE_DOTS.map((dot, i) => ({
  x: dot.x,
  y: dot.y,
  rot: (i * 37 % 120) - 60,
  variant: variants[i % 4],
  w: 10 + (i * 3 % 7),
  h: 15 + (i * 5 % 9),
  dur: 2.5 + (i * 7 % 25) * 0.1,
  delay: (i * 11 % 40) * 0.1,
  op: 0.6 + (i % 5) * 0.08,
}))

export default function HeroTree() {
  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <style>{`
        @keyframes trunkSway {
          0%, 100% { transform: rotate(0deg); }
          25%       { transform: rotate(0.4deg); }
          75%       { transform: rotate(-0.3deg); }
        }
        @keyframes branchSway1 {
          0%, 100% { transform: rotate(0deg); }
          33%      { transform: rotate(1.2deg); }
          66%      { transform: rotate(-0.8deg); }
        }
        @keyframes branchSway2 {
          0%, 100% { transform: rotate(0deg); }
          40%      { transform: rotate(-1.5deg); }
          70%      { transform: rotate(0.9deg); }
        }
        @keyframes branchSway3 {
          0%, 100% { transform: rotate(0deg); }
          30%      { transform: rotate(0.7deg); }
          80%      { transform: rotate(-1.1deg); }
        }
        @keyframes branch-sway {
          0%, 100% { transform: rotate(0deg); }
          35%      { transform: rotate(0.5deg); }
          70%      { transform: rotate(-0.4deg); }
        }
        @keyframes leafDance {
          0%, 100% { transform: rotate(var(--r)) translateY(0px) scale(1); }
          20%      { transform: rotate(calc(var(--r) + 10deg)) translateY(-4px) scale(1.04); }
          50%      { transform: rotate(calc(var(--r) - 7deg)) translateY(-6px) scale(1.02); }
          80%      { transform: rotate(calc(var(--r) + 5deg)) translateY(-2px) scale(1.06); }
        }
        @keyframes leafShimmer {
          0%, 100% { opacity: var(--base-op, 0.7); }
          50%      { opacity: 1; }
        }
      `}</style>

      <svg
        viewBox="0 0 580 920"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax meet"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <symbol id="leaf-a" viewBox="0 0 14 22">
            <path d="M7 2 C10 6 12 10 11 16 C10 20 7 22 7 22 C7 22 4 20 3 16 C2 10 4 6 7 2Z" fill="#7C6A9E" stroke="#5A4A7A" strokeWidth="0.5"/>
            <line x1="7" y1="4" x2="7" y2="21" stroke="#5A4A7A" strokeWidth="0.4" opacity="0.6"/>
          </symbol>
          <symbol id="leaf-b" viewBox="0 0 18 16">
            <path d="M9 1 C14 3 17 7 16 12 C15 15 9 16 9 16 C9 16 3 15 2 12 C1 7 4 3 9 1Z" fill="#7C6A9E" stroke="#5A4A7A" strokeWidth="0.5"/>
            <line x1="9" y1="2" x2="9" y2="15" stroke="#5A4A7A" strokeWidth="0.4" opacity="0.6"/>
          </symbol>
          <symbol id="leaf-c" viewBox="0 0 10 18">
            <path d="M5 1 C8 5 9 9 8 14 C7 17 5 18 5 18 C5 18 3 17 2 14 C1 9 2 5 5 1Z" fill="#9B7EC8" stroke="#5A4A7A" strokeWidth="0.5"/>
          </symbol>
          <symbol id="leaf-d" viewBox="0 0 16 20">
            <path d="M8 1 C13 4 15 9 13 15 C11 19 8 20 8 20 C8 20 4 18 3 14 C1 8 3 4 8 1Z" fill="#6B5A8E" stroke="#5A4A7A" strokeWidth="0.5"/>
          </symbol>
        </defs>

        {/* Outer gentle sway — whole canopy */}
        <g style={{ animation: 'branch-sway 5s ease-in-out infinite', transformOrigin: '290px 920px' }}>

          {/* Trunk + bark — own sway around base */}
          <g style={{ animation: 'trunkSway 6s ease-in-out infinite', transformOrigin: '291px 920px' }}>
            <path
              d="M 150 920
                 C 163 912 182 907 202 908
                 C 218 909 228 914 232 920
                 C 235 904 237 878 239 852
                 C 241 820 243 787 245 750
                 C 246 713 247 675 248 638
                 C 249 601 251 562 254 524
                 C 257 486 261 448 266 413
                 C 270 380 275 350 280 330
                 C 284 318 288 313 294 311
                 L 300 311
                 C 306 313 310 318 314 330
                 C 319 350 324 380 328 413
                 C 333 448 337 486 340 524
                 C 343 562 345 601 346 638
                 C 347 675 348 713 349 750
                 C 351 787 353 820 355 852
                 C 357 878 359 904 362 920
                 C 366 914 376 909 392 908
                 C 412 907 430 912 442 920 Z"
              fill="#0A0A0F" stroke="none"
            />
            {/* Bark texture */}
            <path d="M 285 326 C 283 392 281 458 282 524 C 283 590 282 656 281 722 C 280 782 281 842 282 898" stroke="#2A1A0E" strokeWidth="1.5" fill="none" opacity="0.30" strokeLinecap="round"/>
            <path d="M 297 326 C 299 392 301 458 300 524 C 299 590 300 656 301 722 C 302 782 301 842 300 898" stroke="#2A1A0E" strokeWidth="1.5" fill="none" opacity="0.30" strokeLinecap="round"/>
            <path d="M 279 342 C 277 408 276 474 277 540 C 278 606 277 672 276 738 C 275 798 276 852 277 898" stroke="#2A1A0E" strokeWidth="1.2" fill="none" opacity="0.22" strokeLinecap="round"/>
            <path d="M 303 342 C 305 408 306 474 305 540 C 304 606 305 672 306 738 C 307 798 306 852 305 898" stroke="#2A1A0E" strokeWidth="1.2" fill="none" opacity="0.22" strokeLinecap="round"/>
            <path d="M 274 360 C 271 426 270 492 272 558 C 274 624 273 690 271 756 C 269 816 271 866 272 912" stroke="#2A1A0E" strokeWidth="1" fill="none" opacity="0.18" strokeLinecap="round"/>
            <path d="M 308 360 C 311 426 312 492 310 558 C 308 624 309 690 311 756 C 313 816 311 866 310 912" stroke="#2A1A0E" strokeWidth="1" fill="none" opacity="0.18" strokeLinecap="round"/>
            <path d="M 269 644 C 267 696 268 748 271 800 C 273 844 272 878 273 912" stroke="#2A1A0E" strokeWidth="0.8" fill="none" opacity="0.12" strokeLinecap="round"/>
            <path d="M 313 644 C 315 696 314 748 311 800 C 309 844 310 878 309 912" stroke="#2A1A0E" strokeWidth="0.8" fill="none" opacity="0.12" strokeLinecap="round"/>
          </g>

          {/* Primary branches — lower pair (left + right), branchSway1 */}
          <g style={{ animation: 'branchSway1 5.5s ease-in-out infinite', animationDelay: '0.3s', transformOrigin: '290px 516px' }}>
            <path d="M 248 524 C 188 476 110 402 44 316 C 13 268 3 244 4 220" stroke="#0A0A0F" strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 334 510 C 394 464 466 392 533 310 C 562 264 574 240 575 218" stroke="#0A0A0F" strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>

          {/* Primary branches — mid pair + upper pair, branchSway2 */}
          <g style={{ animation: 'branchSway2 6.2s ease-in-out infinite', animationDelay: '0.8s', transformOrigin: '290px 420px' }}>
            <path d="M 252 444 C 192 394 120 318 58 230 C 26 184 10 152 8 112" stroke="#0A0A0F" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 330 430 C 390 380 460 304 520 220 C 550 177 567 144 570 107" stroke="#0A0A0F" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 260 380 C 198 326 120 242 48 152 C 14 104 -10 68 -20 30" stroke="#0A0A0F" strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 322 366 C 380 310 452 228 520 144 C 554 100 574 67 578 30" stroke="#0A0A0F" strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>

          {/* Primary branches — near-vertical pair, branchSway3 */}
          <g style={{ animation: 'branchSway3 4.8s ease-in-out infinite', animationDelay: '1.5s', transformOrigin: '291px 335px' }}>
            <path d="M 277 340 C 260 296 240 244 226 180 C 215 124 215 80 220 40" stroke="#0A0A0F" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 305 330 C 319 287 330 234 334 170 C 338 114 334 70 329 30" stroke="#0A0A0F" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>

          {/* Secondary branches */}
          <path d="M 118 406 C 78 352 40 290 12 216" stroke="#0A0A0F" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <path d="M 118 406 C 148 360 160 306 158 252" stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M 57 324 C 30 270 14 224 18 174" stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M 460 397 C 500 344 538 280 562 207" stroke="#0A0A0F" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <path d="M 460 397 C 430 350 420 300 422 250" stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M 522 314 C 546 260 558 214 555 170" stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M 142 318 C 98 260 58 198 28 130" stroke="#0A0A0F" strokeWidth="7" fill="none" strokeLinecap="round"/>
          <path d="M 142 318 C 168 264 180 214 178 167" stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M 68 224 C 44 174 32 130 36 86" stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M 440 307 C 480 250 520 187 550 120" stroke="#0A0A0F" strokeWidth="7" fill="none" strokeLinecap="round"/>
          <path d="M 440 307 C 414 254 404 204 406 160" stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M 504 220 C 527 174 540 130 536 87" stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M 122 220 C 82 164 45 110 20 64" stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M 122 220 C 148 167 158 114 155 70" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 42 150 C 18 102 8 60 15 26" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 460 207 C 494 153 524 103 546 56" stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M 460 207 C 437 154 427 104 430 60" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 536 144 C 554 100 564 60 560 27" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 233 220 C 215 174 208 128 212 86" stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M 233 220 C 250 174 256 128 252 86" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 330 190 C 316 147 312 106 316 67" stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M 330 190 C 343 147 348 106 341 67" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>

          {/* Tertiary twigs — faster sway group A */}
          <g style={{ animation: 'branchSway2 2.6s ease-in-out infinite', animationDelay: '0.5s', transformOrigin: '100px 200px' }}>
            <path d="M 4 220 C -4 186 -6 152 2 122" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M 4 220 C 18 188 24 156 18 126" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 18 174 C 8 140 6 108 12 80" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 18 174 C 30 142 34 110 28 82" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M 8 112 C 0 78 -2 48 5 22" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M 8 112 C 22 80 28 52 22 26" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 36 86 C 25 56 22 28 28 8" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 36 86 C 46 56 50 28 44 8" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M -20 30 C -26 10 -24 -8 -16 -22" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M -20 30 C -9  10 -6  -8 -13 -22" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M 20 64 C 10 38 8 14 15 -4" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 20 64 C 32 38 36 14 28 -4" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M 15 26 C 8 6 10 -10 18 -24" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 155 70 C 142 42 138 16 145 -4" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 155 70 C 166 42 170 16 163 -4" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M 158 252 C 148 220 144 187 148 158" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M 158 252 C 168 220 172 187 166 158" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 178 167 C 165 134 161 102 166 72" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 178 167 C 190 134 194 102 188 72" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
          </g>

          {/* Tertiary twigs — faster sway group B */}
          <g style={{ animation: 'branchSway3 2.9s ease-in-out infinite', animationDelay: '1.1s', transformOrigin: '470px 200px' }}>
            <path d="M 575 218 C 580 182 578 150 572 120" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M 575 218 C 565 184 562 154 568 124" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 555 170 C 562 134 564 102 558 74" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 555 170 C 544 136 540 104 548 76" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M 570 107 C 576 74 574 44 568 20" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M 570 107 C 560 74 556 46 562 20" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 536 87 C 542 56 544 28 537 6" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 536 87 C 526 56 522 28 530 6" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M 578 30 C 582 12 580 -6 573 -18" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 578 30 C 568 12 566 -6 574 -18" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M 546 56 C 552 30 554 7 547 -12" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 560 27 C 564 7 562 -10 556 -24" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 430 60 C 416 32 412 7 420 -12" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 430 60 C 442 32 446 7 438 -12" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M 422 250 C 408 217 404 185 408 155" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M 422 250 C 434 217 438 185 432 155" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 406 160 C 393 127 389 95 395 65" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 406 160 C 418 127 422 95 416 65" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
          </g>

          {/* Tertiary twigs — near-vertical group C */}
          <g style={{ animation: 'branchSway1 3.2s ease-in-out infinite', animationDelay: '0.9s', transformOrigin: '285px 100px' }}>
            <path d="M 212 86 C 202 54 200 26 208 4" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 212 86 C 224 54 228 26 220 4" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M 252 86 C 242 54 240 26 248 4" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 252 86 C 262 54 266 26 258 4" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M 220 40 C 213 18 216 -2 225 -14" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 316 67 C 308 40 309 16 317 -2" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 316 67 C 325 40 328 16 321 -2" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M 341 67 C 333 40 334 16 343 -2" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 341 67 C 350 40 354 16 347 -2" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M 329 30 C 322 10 325 -8 334 -20" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </g>

          {/* Leaves — leafDance + leafShimmer per leaf */}
          {LEAVES.map((leaf, i) => (
            <g key={i} transform={`translate(${leaf.x}, ${leaf.y})`}>
              <use
                href={`#leaf-${leaf.variant}`}
                x={-(leaf.w / 2)}
                y={-leaf.h}
                width={leaf.w}
                height={leaf.h}
                style={{
                  ['--r' as string]: `${leaf.rot}deg`,
                  ['--base-op' as string]: `${leaf.op}`,
                  opacity: leaf.op,
                  animation: `leafDance ${leaf.dur}s ${leaf.delay}s ease-in-out infinite, leafShimmer ${2.5 + (i * 13 % 30) * 0.1}s ${(i * 17 % 40) * 0.1}s ease-in-out infinite`,
                  transformOrigin: `${leaf.w / 2}px ${leaf.h}px`,
                } as React.CSSProperties}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
