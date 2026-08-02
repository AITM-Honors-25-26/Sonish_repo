import React from 'react';

/**
 * The signature visual: a concentric ring "vault dial" with tick marks,
 * echoing a mechanical combination lock. Status text reflects auth state.
 */
const VaultDial = ({ status = 'LOCKED' }) => {
  const ticks = Array.from({ length: 36 });

  return (
    <div className="vault-dial-wrap">
      <svg viewBox="0 0 320 320" className="vault-dial" role="img" aria-label="Vault dial">
        <circle cx="160" cy="160" r="140" className="dial-ring-outer" />
        <circle cx="160" cy="160" r="112" className="dial-ring-mid" />
        <circle cx="160" cy="160" r="86" className="dial-ring-inner" />

        <g className="dial-ticks">
          {ticks.map((_, i) => {
            const angle = (i * 360) / ticks.length;
            const isMajor = i % 9 === 0;
            return (
              <line
                key={i}
                x1="160"
                y1={isMajor ? 24 : 32}
                x2="160"
                y2="40"
                transform={`rotate(${angle} 160 160)`}
                className={isMajor ? 'tick tick-major' : 'tick'}
              />
            );
          })}
        </g>

        <g className="dial-needle">
          <line x1="160" y1="160" x2="160" y2="58" />
          <circle cx="160" cy="160" r="7" />
        </g>

        <text x="160" y="166" textAnchor="middle" className="dial-label">
          {status}
        </text>
      </svg>
    </div>
  );
};

export default VaultDial;
