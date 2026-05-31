'use client'

export default function TreeRoots() {
  return (
    <>
      <style>{`
        @keyframes rootBreath {
          0%, 100% { transform: translateY(0px) scaleX(1); }
          50%       { transform: translateY(3px) scaleX(1.002); }
        }
      `}</style>
      <svg
        viewBox="0 0 1440 900"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{ display: 'block', overflow: 'visible', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        {/* Roots originate from ~(1000, 900) — bottom of trunk area — and spread across viewport */}

        {/* Root 1 — sweeps far left along full bottom edge */}
        <g style={{ animation: 'rootBreath 5.2s ease-in-out infinite', animationDelay: '0s' }}>
          <path d="M 1000 900 C 860 898 660 895 460 896 C 300 897 140 898 10 899"
            stroke="#0A0A0F" strokeWidth="20" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 600 896 C 520 894 440 893 360 895"
            stroke="#0A0A0F" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <path d="M 600 896 C 560 897 520 898 478 899"
            stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 780 897 C 772 894 766 892 760 894" stroke="#2A1A0E" strokeWidth="1" fill="none" opacity="0.5"/>
          <path d="M 783 898 C 775 895 769 893 763 895" stroke="#2A1A0E" strokeWidth="1" fill="none" opacity="0.5"/>
        </g>

        {/* Root 2 — left sweep, slightly above bottom */}
        <g style={{ animation: 'rootBreath 6.1s ease-in-out infinite', animationDelay: '0.9s' }}>
          <path d="M 1000 900 C 840 888 640 878 440 876 C 280 874 130 876 20 882"
            stroke="#0A0A0F" strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 560 878 C 480 876 400 875 318 876"
            stroke="#0A0A0F" strokeWidth="7" fill="none" strokeLinecap="round"/>
          <path d="M 560 878 C 525 879 490 880 450 881"
            stroke="#0A0A0F" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M 750 882 C 742 879 736 877 730 879" stroke="#2A1A0E" strokeWidth="1" fill="none" opacity="0.5"/>
          <path d="M 753 883 C 745 880 739 878 733 880" stroke="#2A1A0E" strokeWidth="1" fill="none" opacity="0.5"/>
        </g>

        {/* Root 3 — left with upward arc across bottom 15% */}
        <g style={{ animation: 'rootBreath 4.8s ease-in-out infinite', animationDelay: '1.6s' }}>
          <path d="M 1000 900 C 880 876 718 860 556 852 C 394 845 228 848 55 856"
            stroke="#0A0A0F" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 630 855 C 562 852 492 851 420 853"
            stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M 630 855 C 598 857 564 859 526 860"
            stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M 820 866 C 813 862 807 859 802 861" stroke="#2A1A0E" strokeWidth="1" fill="none" opacity="0.5"/>
          <path d="M 823 868 C 816 864 810 861 805 863" stroke="#2A1A0E" strokeWidth="1" fill="none" opacity="0.5"/>
        </g>

        {/* Root 4 — diagonal toward center-left */}
        <g style={{ animation: 'rootBreath 5.6s ease-in-out infinite', animationDelay: '0.4s' }}>
          <path d="M 1000 900 C 898 868 786 840 674 822 C 562 806 444 800 328 808"
            stroke="#0A0A0F" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 680 824 C 620 818 558 814 490 816"
            stroke="#0A0A0F" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
          <path d="M 680 824 C 648 826 616 829 580 830"
            stroke="#0A0A0F" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
        </g>

        {/* Root 5 — right sweep along bottom */}
        <g style={{ animation: 'rootBreath 6.4s ease-in-out infinite', animationDelay: '1.3s' }}>
          <path d="M 1000 900 C 1072 886 1165 874 1264 870 C 1354 866 1415 872 1440 878"
            stroke="#0A0A0F" strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 1220 871 C 1268 868 1308 868 1346 869"
            stroke="#0A0A0F" strokeWidth="7" fill="none" strokeLinecap="round"/>
          <path d="M 1220 871 C 1248 873 1274 874 1298 875"
            stroke="#0A0A0F" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        </g>

        {/* Root 6 — far right, higher arc */}
        <g style={{ animation: 'rootBreath 4.5s ease-in-out infinite', animationDelay: '2.1s' }}>
          <path d="M 1000 900 C 1090 878 1210 860 1332 852 C 1402 847 1436 852 1440 856"
            stroke="#0A0A0F" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 1280 854 C 1322 851 1362 851 1398 853"
            stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M 1280 854 C 1306 856 1330 858 1356 859"
            stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </g>

        {/* Root 7 — upper-left diagonal toward center */}
        <g style={{ animation: 'rootBreath 7s ease-in-out infinite', animationDelay: '0.7s' }}>
          <path d="M 1000 900 C 928 872 838 846 748 828 C 658 812 554 804 452 810"
            stroke="#0A0A0F" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 750 830 C 700 824 648 820 590 822"
            stroke="#0A0A0F" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
          <path d="M 750 830 C 718 832 688 835 652 836"
            stroke="#0A0A0F" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
          <path d="M 878 858 C 870 854 864 851 859 853" stroke="#2A1A0E" strokeWidth="1" fill="none" opacity="0.5"/>
          <path d="M 881 860 C 873 856 867 853 862 855" stroke="#2A1A0E" strokeWidth="1" fill="none" opacity="0.5"/>
        </g>
      </svg>
    </>
  )
}
