'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SearchModal from '@/components/search/SearchModal'
import AnimatedTextCycle from '@/components/ui/animated-text-cycle'

const NAV_ITEMS = [
  { label: 'Browse All', href: '/browse' },
  { label: 'Agents', href: '/browse?category=agent' },
  { label: 'Prompts', href: '/browse?category=prompt' },
  { label: 'Skills', href: '/browse?category=skill' },
  { label: 'Workflows', href: '/browse?category=workflow' },
  { label: 'Teams', href: '/browse?category=team' },
  { label: 'Creators', href: '/browse?category=creator' },
]

const TICKER_ITEMS = ['Claude', 'ChatGPT', 'Gemini', 'n8n', 'Cursor', 'Windsurf', 'Make', 'Zapier']

// 135 dot-leaf positions in SVG viewBox "0 0 580 920" — weighted toward canopy tips
const LEAF_DOTS: { x: number; y: number }[] = [
  // Far-left canopy cluster
  { x: 8,  y: 22  }, { x: 15, y: 70  }, { x: 25, y: 120 }, { x: 30, y: 165 }, { x: 10, y: 195 },
  { x: 40, y: 10  }, { x: 48, y: 60  }, { x: 55, y: 105 }, { x: 62, y: 185 }, { x: 35, y: 218 },
  { x: 70, y: 30  }, { x: 65, y: 90  }, { x: 72, y: 148 }, { x: 68, y: 222 }, { x: 18, y: 142 },
  { x: 22, y: 100 }, { x: 5,  y: 152 }, { x: 12, y: 90  }, { x: 42, y: 142 }, { x: 52, y: 178 },
  { x: 28, y: 242 }, { x: 18, y: 228 }, { x: 60, y: 242 }, { x: 45, y: 202 }, { x: 75, y: 195 },
  // Far-right canopy cluster
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
  // Upper mid / near-vertical zone
  { x: 212, y: 28  }, { x: 225, y: 82  }, { x: 238, y: 128 }, { x: 250, y: 42  }, { x: 260, y: 92  },
  { x: 315, y: 42  }, { x: 328, y: 90  }, { x: 340, y: 130 }, { x: 352, y: 50  }, { x: 290, y: 18  },
  // Extra 25 — outer twig tips and canopy density
  { x: 20,  y: 48  }, { x: 35,  y: 18  }, { x: 8,   y: 85  }, { x: 45,  y: 135 }, { x: 15,  y: 175 },
  { x: 560, y: 48  }, { x: 545, y: 18  }, { x: 572, y: 85  }, { x: 535, y: 135 }, { x: 565, y: 175 },
  { x: 105, y: 22  }, { x: 125, y: 68  }, { x: 142, y: 118 }, { x: 158, y: 48  }, { x: 178, y: 138 },
  { x: 422, y: 22  }, { x: 438, y: 68  }, { x: 455, y: 118 }, { x: 468, y: 48  }, { x: 485, y: 138 },
  { x: 240, y: 22  }, { x: 255, y: 62  }, { x: 272, y: 105 }, { x: 310, y: 68  }, { x: 325, y: 25  },
]

function AnimatedTree() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', overflow: 'visible' }}>
      <svg
        viewBox="0 0 580 920"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax meet"
        style={{
          display: 'block',
          overflow: 'visible',
          animation: 'tree-sway 4.5s ease-in-out infinite',
          transformOrigin: '50% 100%',
        }}
      >
        {/* ── Trunk — wide organic fill (120px base) with root flares ── */}
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

        {/* ── Bark texture — 10 fine vertical strokes inside trunk ── */}
        <path d="M 285 326 C 283 392 281 458 282 524 C 283 590 282 656 281 722 C 280 782 281 842 282 898"
          stroke="#4a3060" strokeWidth="1.5" fill="none" opacity="0.30" strokeLinecap="round"/>
        <path d="M 297 326 C 299 392 301 458 300 524 C 299 590 300 656 301 722 C 302 782 301 842 300 898"
          stroke="#4a3060" strokeWidth="1.5" fill="none" opacity="0.30" strokeLinecap="round"/>
        <path d="M 279 342 C 277 408 276 474 277 540 C 278 606 277 672 276 738 C 275 798 276 852 277 898"
          stroke="#4a3060" strokeWidth="1.2" fill="none" opacity="0.22" strokeLinecap="round"/>
        <path d="M 303 342 C 305 408 306 474 305 540 C 304 606 305 672 306 738 C 307 798 306 852 305 898"
          stroke="#4a3060" strokeWidth="1.2" fill="none" opacity="0.22" strokeLinecap="round"/>
        <path d="M 274 360 C 271 426 270 492 272 558 C 274 624 273 690 271 756 C 269 816 271 866 272 912"
          stroke="#4a3060" strokeWidth="1"   fill="none" opacity="0.18" strokeLinecap="round"/>
        <path d="M 308 360 C 311 426 312 492 310 558 C 308 624 309 690 311 756 C 313 816 311 866 310 912"
          stroke="#4a3060" strokeWidth="1"   fill="none" opacity="0.18" strokeLinecap="round"/>
        <path d="M 284 535 C 281 580 279 625 281 670 C 283 715 282 760 281 805 C 280 848 281 880 282 912"
          stroke="#4a3060" strokeWidth="1"   fill="none" opacity="0.15" strokeLinecap="round"/>
        <path d="M 298 535 C 301 580 303 625 301 670 C 299 715 300 760 301 805 C 302 848 301 880 300 912"
          stroke="#4a3060" strokeWidth="1"   fill="none" opacity="0.15" strokeLinecap="round"/>
        <path d="M 269 644 C 267 696 268 748 271 800 C 273 844 272 878 273 912"
          stroke="#4a3060" strokeWidth="0.8" fill="none" opacity="0.12" strokeLinecap="round"/>
        <path d="M 313 644 C 315 696 314 748 311 800 C 309 844 310 878 309 912"
          stroke="#4a3060" strokeWidth="0.8" fill="none" opacity="0.12" strokeLinecap="round"/>

        {/* ── Primary branches — 8 thick structural limbs ── */}
        {/* P1: Low-left — sweeps down-left */}
        <path d="M 248 524 C 188 476 110 402 44 316 C 13 268 3 244 4 220"
          stroke="#0A0A0F" strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* P2: Low-right */}
        <path d="M 334 510 C 394 464 466 392 533 310 C 562 264 574 240 575 218"
          stroke="#0A0A0F" strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* P3: Mid-left */}
        <path d="M 252 444 C 192 394 120 318 58 230 C 26 184 10 152 8 112"
          stroke="#0A0A0F" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* P4: Mid-right */}
        <path d="M 330 430 C 390 380 460 304 520 220 C 550 177 567 144 570 107"
          stroke="#0A0A0F" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* P5: Upper-left — extends to negative x for canopy spread into left column */}
        <path d="M 260 380 C 198 326 120 242 48 152 C 14 104 -10 68 -20 30"
          stroke="#0A0A0F" strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* P6: Upper-right */}
        <path d="M 322 366 C 380 310 452 228 520 144 C 554 100 574 67 578 30"
          stroke="#0A0A0F" strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* P7: Leaning-left near-vertical */}
        <path d="M 277 340 C 260 296 240 244 226 180 C 215 124 215 80 220 40"
          stroke="#0A0A0F" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* P8: Right-leaning near-vertical */}
        <path d="M 305 330 C 319 287 330 234 334 170 C 338 114 334 70 329 30"
          stroke="#0A0A0F" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

        {/* ── Secondary branches — 3 per primary ── */}
        {/* From P1 */}
        <path d="M 118 406 C 78 352 40 290 12 216" stroke="#0A0A0F" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d="M 118 406 C 148 360 160 306 158 252" stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 57 324 C 30 270 14 224 18 174" stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
        {/* From P2 */}
        <path d="M 460 397 C 500 344 538 280 562 207" stroke="#0A0A0F" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d="M 460 397 C 430 350 420 300 422 250" stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 522 314 C 546 260 558 214 555 170" stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
        {/* From P3 */}
        <path d="M 142 318 C 98 260 58 198 28 130" stroke="#0A0A0F" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M 142 318 C 168 264 180 214 178 167" stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M 68 224 C 44 174 32 130 36 86" stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* From P4 */}
        <path d="M 440 307 C 480 250 520 187 550 120" stroke="#0A0A0F" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M 440 307 C 414 254 404 204 406 160" stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M 504 220 C 527 174 540 130 536 87" stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* From P5 */}
        <path d="M 122 220 C 82 164 45 110 20 64" stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 122 220 C 148 167 158 114 155 70" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 42 150 C 18 102 8 60 15 26" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* From P6 */}
        <path d="M 460 207 C 494 153 524 103 546 56" stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 460 207 C 437 154 427 104 430 60" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 536 144 C 554 100 564 60 560 27" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* From P7 */}
        <path d="M 233 220 C 215 174 208 128 212 86" stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M 233 220 C 250 174 256 128 252 86" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* From P8 */}
        <path d="M 330 190 C 316 147 312 106 316 67" stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M 330 190 C 343 147 348 106 341 67" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>

        {/* ── Tertiary twigs — fine lines at all branch tips ── */}
        {/* Near P1 endpoint (4, 220) */}
        <path d="M 4 220 C -4 186 -6 152 2 122"   stroke="#0A0A0F" strokeWidth="2"   fill="none" strokeLinecap="round"/>
        <path d="M 4 220 C 18 188 24 156 18 126"  stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 18 174 C 8 140 6 108 12 80"    stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 18 174 C 30 142 34 110 28 82"  stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        {/* Near P2 endpoint (575, 218) */}
        <path d="M 575 218 C 580 182 578 150 572 120" stroke="#0A0A0F" strokeWidth="2"   fill="none" strokeLinecap="round"/>
        <path d="M 575 218 C 565 184 562 154 568 124" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 555 170 C 562 134 564 102 558 74"  stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 555 170 C 544 136 540 104 548 76"  stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        {/* Near P3 endpoint (8, 112) */}
        <path d="M 8 112 C 0 78 -2 48 5 22"     stroke="#0A0A0F" strokeWidth="2"   fill="none" strokeLinecap="round"/>
        <path d="M 8 112 C 22 80 28 52 22 26"   stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 36 86 C 25 56 22 28 28 8"    stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 36 86 C 46 56 50 28 44 8"    stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        {/* Near P4 endpoint (570, 107) */}
        <path d="M 570 107 C 576 74 574 44 568 20" stroke="#0A0A0F" strokeWidth="2"   fill="none" strokeLinecap="round"/>
        <path d="M 570 107 C 560 74 556 46 562 20" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 536 87 C 542 56 544 28 537 6"   stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 536 87 C 526 56 522 28 530 6"   stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        {/* Near P5 endpoint (-20, 30) — canopy extends left */}
        <path d="M -20 30 C -26 10 -24 -8 -16 -22"  stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M -20 30 C -9  10 -6  -8 -13 -22"  stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        <path d="M 20 64 C 10 38 8 14 15 -4"         stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 20 64 C 32 38 36 14 28 -4"        stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        <path d="M 15 26 C 8 6 10 -10 18 -24"        stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 155 70 C 142 42 138 16 145 -4"    stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 155 70 C 166 42 170 16 163 -4"    stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        {/* Near P6 endpoint (578, 30) */}
        <path d="M 578 30 C 582 12 580 -6 573 -18"  stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 578 30 C 568 12 566 -6 574 -18"  stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        <path d="M 546 56 C 552 30 554 7 547 -12"   stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 560 27 C 564 7 562 -10 556 -24"  stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 430 60 C 416 32 412 7 420 -12"   stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 430 60 C 442 32 446 7 438 -12"   stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        {/* Near P7 endpoint (220, 40) */}
        <path d="M 212 86 C 202 54 200 26 208 4"    stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 212 86 C 224 54 228 26 220 4"    stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        <path d="M 252 86 C 242 54 240 26 248 4"    stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 252 86 C 262 54 266 26 258 4"    stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        <path d="M 220 40 C 213 18 216 -2 225 -14"  stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Near P8 endpoint (329, 30) */}
        <path d="M 316 67 C 308 40 309 16 317 -2"   stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 316 67 C 325 40 328 16 321 -2"   stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        <path d="M 341 67 C 333 40 334 16 343 -2"   stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 341 67 C 350 40 354 16 347 -2"   stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        <path d="M 329 30 C 322 10 325 -8 334 -20"  stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Secondary tip twigs */}
        <path d="M 158 252 C 148 220 144 187 148 158" stroke="#0A0A0F" strokeWidth="2"   fill="none" strokeLinecap="round"/>
        <path d="M 158 252 C 168 220 172 187 166 158" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 422 250 C 408 217 404 185 408 155" stroke="#0A0A0F" strokeWidth="2"   fill="none" strokeLinecap="round"/>
        <path d="M 422 250 C 434 217 438 185 432 155" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 178 167 C 165 134 161 102 166 72"  stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 178 167 C 190 134 194 102 188 72"  stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>
        <path d="M 406 160 C 393 127 389 95 395 65"   stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 406 160 C 418 127 422 95 416 65"   stroke="#0A0A0F" strokeWidth="1"   fill="none" strokeLinecap="round"/>

        {/* ── Animated violet dot-leaves — 135 total ── */}
        {LEAF_DOTS.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={i % 5 === 0 ? 5 : i % 5 === 1 ? 4.5 : i % 5 === 2 ? 4 : i % 5 === 3 ? 3.5 : 3}
            fill="#7C6A9E"
            style={{
              opacity: 0.65,
              animation: `leaf-float ${2.5 + (i % 9) * 0.17}s ease-in-out infinite`,
              animationDelay: `${(i * 0.11) % 4}s`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

function RootSection() {
  return (
    <div style={{
      width: '100%',
      height: 200,
      position: 'relative',
      overflow: 'visible',
      marginTop: -60,
      zIndex: 1,
      pointerEvents: 'none',
    }}>
      <svg
        viewBox="0 0 1440 200"
        width="100%"
        height="200"
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
        {/* Root 1 — sweeps far left */}
        <g style={{ animation: 'root-undulate 5.2s ease-in-out infinite', animationDelay: '0s' }}>
          <path d="M 1042 5 C 940 38 730 92 490 138 C 320 168 145 186 35 196"
            stroke="#0A0A0F" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 490 138 C 382 158 268 174 155 184"
            stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M 490 138 C 455 158 428 173 400 183"
            stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </g>
        {/* Root 2 — left sweep */}
        <g style={{ animation: 'root-undulate-up 6.1s ease-in-out infinite', animationDelay: '0.9s' }}>
          <path d="M 1042 5 C 978 42 858 92 725 132 C 598 165 468 183 348 193"
            stroke="#0A0A0F" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 725 132 C 640 155 548 172 450 183"
            stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 725 132 C 695 155 670 171 641 182"
            stroke="#0A0A0F" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </g>
        {/* Root 3 — center-left */}
        <g style={{ animation: 'root-undulate 4.8s ease-in-out infinite', animationDelay: '1.6s' }}>
          <path d="M 1042 5 C 1015 48 978 100 935 145 C 900 182 858 198 812 203"
            stroke="#0A0A0F" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 935 145 C 908 168 878 185 845 195"
            stroke="#0A0A0F" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M 935 145 C 912 170 892 186 868 196"
            stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>
        {/* Root 4 — center-right */}
        <g style={{ animation: 'root-undulate-up 5.6s ease-in-out infinite', animationDelay: '0.4s' }}>
          <path d="M 1042 5 C 1072 48 1115 100 1162 146 C 1198 183 1245 200 1288 205"
            stroke="#0A0A0F" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 1162 146 C 1188 170 1218 188 1250 198"
            stroke="#0A0A0F" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M 1162 146 C 1175 172 1185 190 1202 199"
            stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>
        {/* Root 5 — right sweep */}
        <g style={{ animation: 'root-undulate 6.4s ease-in-out infinite', animationDelay: '1.3s' }}>
          <path d="M 1042 5 C 1095 40 1192 88 1295 126 C 1360 152 1408 170 1436 183"
            stroke="#0A0A0F" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 1295 126 C 1345 148 1388 166 1419 177"
            stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 1295 126 C 1318 150 1335 165 1352 177"
            stroke="#0A0A0F" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </g>
        {/* Root 6 — far right */}
        <g style={{ animation: 'root-undulate-up 4.5s ease-in-out infinite', animationDelay: '2.1s' }}>
          <path d="M 1042 5 C 1128 28 1258 68 1368 105 C 1428 128 1466 145 1482 158"
            stroke="#0A0A0F" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 1368 105 C 1408 125 1441 143 1460 153"
            stroke="#0A0A0F" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M 1368 105 C 1386 128 1399 145 1413 156"
            stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>
        {/* Root 7 — extra left density */}
        <g style={{ animation: 'root-undulate 7s ease-in-out infinite', animationDelay: '0.7s' }}>
          <path d="M 1042 5 C 1000 55 918 118 808 158 C 732 186 648 198 572 203"
            stroke="#0A0A0F" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 808 158 C 762 178 715 192 665 200"
            stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M 808 158 C 785 180 765 194 740 202"
            stroke="#0A0A0F" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        </g>
      </svg>
    </div>
  )
}

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [imgErr, setImgErr]         = useState(false)

  return (
    <>
      {/* ── Responsive overrides ──────────────────────────────────── */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-grid    { grid-template-columns: 1fr !important; }
          .tree-col     { display: none !important; }
          .root-section { display: none !important; }
          .hero-left    { max-width: 560px !important; margin: 0 auto !important; text-align: center !important; }
          .hero-search  { margin-left: auto !important; margin-right: auto !important; }
          .hero-btns    { justify-content: center !important; }
        }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hero-h1   { font-size: clamp(40px, 12vw, 64px) !important; }
        }
      `}</style>

      {/* ── Parchment background ──────────────────────────────────── */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, background: '#E8E0D0', zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ── Dot grid overlay ──────────────────────────────────────── */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #C4B9A0 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: 0.45,
      }} />

      {/* ── TOP NAVIGATION — full obsidian ────────────────────────── */}
      <nav style={{
        position:       'fixed',
        top:            0,
        left:           0,
        right:          0,
        zIndex:         50,
        height:         56,
        background:     '#0A0A0F',
        borderBottom:   '1px solid rgba(124,106,158,0.2)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '0 28px',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          textDecoration: 'none', flexShrink: 0,
        }}>
          {imgErr ? (
            <span style={{
              fontSize: 15, fontWeight: 700, color: '#E8E0D0',
              fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
            }}>23rdGen</span>
          ) : (
            <div style={{ width: 28, height: 28, position: 'relative', flexShrink: 0 }}>
              <Image src="/inspiration/logo.png" alt="23rdGen" fill
                style={{ objectFit: 'contain' }} onError={() => setImgErr(true)} />
            </div>
          )}
        </Link>

        {/* Nav links — absolutely centered */}
        <div className="nav-links" style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: 2,
        }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href} style={{
              fontSize: 12,
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              color: '#E8E0D0',
              textDecoration: 'none',
              padding: '6px 11px',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              transition: 'color 120ms',
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#FFFFFF')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#E8E0D0')}
            >{item.label}</Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <Link href="/login" style={{
            fontSize: 12,
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            color: '#D4C9A8',
            textDecoration: 'none',
            padding: '6px 14px',
            letterSpacing: '0.04em',
          }}>Log in</Link>

          <Link href="/signup" style={{
            fontSize: 12,
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            color: '#E8E0D0',
            background: '#7C6A9E',
            textDecoration: 'none',
            padding: '14px 32px',
            border: '2px solid #E8E0D0',
            boxShadow: '3px 3px 0px #E8E0D0',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontWeight: 500,
            display: 'inline-block',
            transition: 'box-shadow 80ms, transform 80ms',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '1px 1px 0px #E8E0D0'; el.style.transform = 'translate(2px,2px)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '3px 3px 0px #E8E0D0'; el.style.transform = 'translate(0,0)' }}
          >Sign up</Link>
        </div>
      </nav>

      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <section style={{
        position:      'relative',
        zIndex:        1,
        minHeight:     '100vh',
        display:       'flex',
        alignItems:    'center',
        paddingTop:    56,
        paddingBottom: 56,
      }}>
        <div className="hero-grid" style={{
          width:               '100%',
          maxWidth:            1320,
          margin:              '0 auto',
          padding:             '0 48px',
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 64,
          alignItems:          'center',
        }}>

          {/* ── LEFT COLUMN ─────────────────────────────────────── */}
          <div className="hero-left">
            <h1 className="hero-h1" style={{
              fontFamily:    "'Akt', var(--font-dm-serif), DM Serif Display, serif",
              fontSize:      'clamp(52px, 5.5vw, 88px)',
              lineHeight:    1.04,
              color:         '#0A0A0F',
              margin:        '0 0 2rem 0',
              letterSpacing: '-0.01em',
              fontWeight:    400,
            }}>
              Step Into<br />
              <AnimatedTextCycle
                words={['Artificial', 'Agentic', 'Conscious', 'Automated', 'Intelligent']}
                interval={3000}
                className="text-[#7C6A9E]"
              />{' '}
              <br />
              Consciousness.
            </h1>

            <p style={{
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize:   14,
              lineHeight: 1.75,
              color:      '#2A1A0E',
              margin:     '0',
              maxWidth:   420,
            }}>
              Create AI agents, agentic teams, workflows and skills.<br />
              Embed them into your work. Save time. Earn automatically.
            </p>

            {/* Search bar */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hero-search"
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          10,
                width:        '100%',
                maxWidth:     440,
                height:       50,
                padding:      '0 16px',
                background:   '#F0E6D0',
                border:       '2px solid #0A0A0F',
                boxShadow:    '3px 3px 0px #0A0A0F',
                borderRadius: 0,
                cursor:       'text',
                marginTop:    '1.5rem',
                marginBottom: 22,
                fontFamily:   'var(--font-ibm-mono), IBM Plex Mono, monospace',
                transition:   'box-shadow 80ms, transform 80ms',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '1px 1px 0px #0A0A0F'; el.style.transform = 'translate(2px,2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '3px 3px 0px #0A0A0F'; el.style.transform = 'translate(0,0)' }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
                <circle cx="6.5" cy="6.5" r="5" stroke="#0A0A0F" strokeWidth="1.5"/>
                <path d="M10.5 10.5L13.5 13.5" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{
                flex: 1, textAlign: 'left', fontSize: 13,
                color: 'rgba(10,10,15,0.38)', letterSpacing: '0.01em',
              }}>
                Search agents, prompts, skills, workflows...
              </span>
              <kbd style={{
                display: 'flex', alignItems: 'center', gap: 2,
                padding: '3px 8px',
                background: '#E8E0D0',
                border: '2px solid #0A0A0F',
                borderRadius: 0,
                fontSize: 11,
                color: 'rgba(10,10,15,0.45)',
                fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
                flexShrink: 0,
              }}>⌘K</kbd>
            </button>

            {/* CTA buttons */}
            <div className="hero-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/browse" style={{
                display:        'inline-flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontFamily:     'var(--font-ibm-mono), IBM Plex Mono, monospace',
                fontSize:       12,
                fontWeight:     600,
                letterSpacing:  '0.09em',
                textTransform:  'uppercase',
                textDecoration: 'none',
                color:          '#E8E0D0',
                background:     '#7C6A9E',
                border:         '2px solid #0A0A0F',
                boxShadow:      '3px 3px 0px #0A0A0F',
                borderRadius:   0,
                padding:        '12px 28px',
                transition:     'box-shadow 80ms, transform 80ms',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '1px 1px 0px #0A0A0F'; el.style.transform = 'translate(2px,2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '3px 3px 0px #0A0A0F'; el.style.transform = 'translate(0,0)' }}
              >Browse Agents</Link>

              <Link href="/upload" style={{
                display:        'inline-flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontFamily:     'var(--font-ibm-mono), IBM Plex Mono, monospace',
                fontSize:       12,
                fontWeight:     600,
                letterSpacing:  '0.09em',
                textTransform:  'uppercase',
                textDecoration: 'none',
                color:          '#0A0A0F',
                background:     '#F0E6D0',
                border:         '2px solid #0A0A0F',
                boxShadow:      '3px 3px 0px #0A0A0F',
                borderRadius:   0,
                padding:        '12px 28px',
                transition:     'box-shadow 80ms, transform 80ms',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '1px 1px 0px #0A0A0F'; el.style.transform = 'translate(2px,2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '3px 3px 0px #0A0A0F'; el.style.transform = 'translate(0,0)' }}
              >Upload Yours</Link>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Animated SVG Tree ─────────────────── */}
          <div className="tree-col" style={{
            height: 'min(92vh, 920px)',
            display: 'flex',
            alignItems: 'flex-end',
            overflow: 'visible',
          }}>
            <AnimatedTree />
          </div>
        </div>
      </section>

      {/* ── ROOTS — below hero, visually connected to trunk ───────── */}
      <div className="root-section" style={{ position: 'relative', zIndex: 1 }}>
        <RootSection />
      </div>

      {/* ── BOTTOM TICKER ─────────────────────────────────────────── */}
      <div style={{
        position:   'fixed',
        bottom:     0,
        left:       0,
        right:      0,
        zIndex:     50,
        height:     44,
        background: '#0A0A0F',
        borderTop:  '1px solid #7C6A9E',
        display:    'flex',
        alignItems: 'center',
        overflow:   'hidden',
      }}>
        <div style={{
          display:    'flex',
          alignItems: 'center',
          animation:  'ticker-scroll 24s linear infinite',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}>
          {[0, 1].map(rep => (
            <span key={rep} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{
                fontFamily:    'var(--font-ibm-mono), IBM Plex Mono, monospace',
                fontSize:      11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'rgba(232,224,208,0.5)',
                padding:       '0 28px',
                flexShrink:    0,
              }}>Works with:</span>
              {TICKER_ITEMS.map((item, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <span style={{
                    fontFamily:    'var(--font-ibm-mono), IBM Plex Mono, monospace',
                    fontSize:      12,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color:         '#E8E0D0',
                    padding:       '0 20px',
                    flexShrink:    0,
                  }}>{item}</span>
                  {i < TICKER_ITEMS.length - 1 && (
                    <span style={{ color: '#7C6A9E', fontSize: 16, flexShrink: 0 }}>·</span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
