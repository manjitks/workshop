export type ComponentId = 'lid' | 'sensor' | 'housing';
export function AssemblyDrawing({
  selected,
  onSelect,
  exploded = true,
}: {
  selected: ComponentId;
  onSelect: (id: ComponentId) => void;
  exploded?: boolean;
}) {
  const control = (id: ComponentId, label: string) => ({
    role: 'button',
    tabIndex: 0,
    'aria-label': `Inspect ${label}`,
    'aria-pressed': selected === id,
    onClick: () => onSelect(id),
    onKeyDown: (event: React.KeyboardEvent<SVGGElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect(id);
      }
    },
    className: `assembly-part ${selected === id ? 'selected' : ''}`,
  });
  return (
    <svg
      className="assembly"
      viewBox="0 0 700 520"
      role="group"
      aria-label="Interactive concept assembly. Select a component to inspect it."
    >
      <defs>
        <linearGradient id="shell" x2="1" y2="1">
          <stop stopColor="#fafcff" />
          <stop offset="1" stopColor="#c9d5e5" />
        </linearGradient>
        <linearGradient id="board" x2="1" y2="1">
          <stop stopColor="#1d6471" />
          <stop offset="1" stopColor="#113b55" />
        </linearGradient>
        <filter id="shadow" x="-40%" y="-40%" width="180%" height="200%">
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="12"
            floodColor="#283c59"
            floodOpacity=".15"
          />
        </filter>
      </defs>
      <ellipse
        cx="350"
        cy="454"
        rx="174"
        ry="28"
        fill="#203e65"
        opacity=".06"
      />
      <g
        stroke="#bbc7d6"
        strokeDasharray="4 7"
        fill="none"
        opacity={exploded ? 1 : 0}
      >
        <path d="M205 130v242M425 80v240M515 145v240M295 197v242" />
      </g>
      <g
        {...control('housing', 'housing')}
        stroke="#8196ad"
        strokeWidth="1.5"
        strokeLinejoin="round"
        filter="url(#shadow)"
      >
        <path d="m205 345 220-50 90 64-220 53Z" fill="url(#shell)" />
        <path d="m205 345 90 67v68l-90-68Z" fill="#aabbd0" />
        <path d="m295 412 220-53v68l-220 53Z" fill="#d5dfeb" />
        <path d="m224 346 198-44 69 50-196 48Z" fill="#859bb3" />
        <path d="m237 351 61 42 174-41-53-37Z" fill="#b8c8da" />
        <path d="m362 422 58-14v19l-58 14Z" fill="#344b65" />
        <circle cx="323" cy="440" r="4" fill="#7296b6" />
      </g>
      <g
        {...control('sensor', 'sensor board')}
        style={{ transform: exploded ? 'translateY(0px)' : 'translateY(85px)' }}
        stroke="#254b64"
        strokeWidth="1.5"
        strokeLinejoin="round"
        filter="url(#shadow)"
      >
        <path d="m231 256 178-40 76 52-177 43Z" fill="url(#board)" />
        <path d="m231 256v10l77 53 177-43v-8l-177 43Z" fill="#133a4c" />
        <g stroke="#62a0b2" strokeWidth="1" fill="none">
          <path d="m260 258 48 32 69-17M285 247l32 22 70-16 35 25M338 240l29 21M330 295l72-17" />
        </g>
        <path d="m300 253 58-13 32 22-58 14Z" fill="#152b3e" />
        <path d="m397 255 36-8 24 16-36 9Z" fill="#c3d5e5" />
        <g fill="#e1b86d" stroke="none">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`m${253 + i * 8} ${268 + i * 5} 9-2 4 3-9 2Z`} />
          ))}
        </g>
        <circle cx="456" cy="272" r="4" fill="#75e1ca" stroke="none" />
      </g>
      <g
        {...control('lid', 'vented lid')}
        style={{
          transform: exploded ? 'translateY(0px)' : 'translateY(204px)',
        }}
        stroke="#8499b1"
        strokeWidth="1.5"
        strokeLinejoin="round"
        filter="url(#shadow)"
      >
        <path d="m205 130 220-50 90 65-220 52Z" fill="url(#shell)" />
        <path d="m205 130v17l90 65v-15Z" fill="#aabbd0" />
        <path d="m295 197 220-52v17l-220 50Z" fill="#c3d1e2" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path
            key={i}
            d={`m${266 + i * 17} ${129 - i * 3.9} 48 34`}
            stroke="#748ba4"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
        <g fill="#8499ad" stroke="none">
          <circle cx="230" cy="134" r="3" />
          <circle cx="421" cy="98" r="3" />
          <circle cx="489" cy="146" r="3" />
          <circle cx="297" cy="184" r="3" />
        </g>
      </g>
      <g fontFamily="monospace" fontSize="11" fill="#63758c">
        <text x="24" y="485">
          CONCEPT • NOT TO SCALE
        </text>
        <path d="M605 460h30m-30 0v-30m0 30-15 13" stroke="#8297af" />
        <text x="640" y="464">
          X
        </text>
        <text x="601" y="423">
          Z
        </text>
      </g>
    </svg>
  );
}
