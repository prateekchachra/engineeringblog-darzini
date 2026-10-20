/**
 * The react-native-audio-effects logo, inlined from the repo's assets/logo.svg.
 *
 * Inlined rather than loaded through <img>: the wordmark is painted with
 * `currentColor` so it can sit on a light or dark background, and an <img>
 * would render it in its own document where `currentColor` resolves to black.
 */
export default function AudioEffectsLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 150"
      className={className}
      role="img"
      aria-label="react-native-audio-effects"
    >
      <defs>
        <linearGradient id="rnae-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b49bff" />
          <stop offset="1" stopColor="#7c5cff" />
        </linearGradient>
      </defs>

      {/* Mark: the headphones from the app icon, without the tile. */}
      <g transform="translate(8,14)">
        <path
          d="M 20 76 A 44 44 0 0 1 108 76"
          fill="none"
          stroke="url(#rnae-metal)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <rect x="12" y="70" width="19" height="42" rx="9.5" fill="url(#rnae-metal)" />
        <rect x="97" y="70" width="19" height="42" rx="9.5" fill="url(#rnae-metal)" />
        <text
          x="64"
          y="104"
          textAnchor="middle"
          fontFamily="Avenir Next, Helvetica Neue, Helvetica, Arial, sans-serif"
          fontSize="42"
          fontWeight="700"
          fill="currentColor"
        >
          RN
        </text>
      </g>

      {/* Wordmark. */}
      <g fontFamily="Avenir Next, Helvetica Neue, Helvetica, Arial, sans-serif">
        <text
          x="146"
          y="74"
          fontSize="33"
          fontWeight="700"
          fill="currentColor"
          letterSpacing="-0.4"
        >
          audio-effects
        </text>
        <text
          x="147"
          y="104"
          fontSize="15"
          fontWeight="500"
          fill="#8d84a8"
          letterSpacing="2.6"
        >
          REACT NATIVE · NEW ARCH
        </text>
      </g>
    </svg>
  );
}
