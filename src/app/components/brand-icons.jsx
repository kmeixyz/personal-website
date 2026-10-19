/**
 * GitHub and LinkedIn marks, from Hugeicons (MIT). Stroked rather than filled,
 * so weight is one dial rather than baked into the outlines. Footer size is
 * 0.9; project-row size is the arrow's 1.75, applied in globals.css so both
 * marks darken and thicken together.
 *
 * `stroke` stays on the inner group, not the <svg>: `.row-icon` thickens
 * every mark on hover, and a `stroke` attribute on the <svg> is no longer
 * what distinguishes the two.
 */
function Mark({ className, children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="0.9"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function Github({ className }) {
  return (
    <Mark className={className}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 20.568c-3.429 1.157-6.286 0-8-3.568" />
        <path d="M10 22v-3.242c0-.598.184-1.118.48-1.588c.204-.322.064-.78-.303-.88C7.134 15.452 5 14.107 5 9.645c0-1.16.38-2.25 1.048-3.2c.166-.236.25-.354.27-.46c.02-.108-.015-.247-.085-.527c-.283-1.136-.264-2.343.16-3.43c0 0 .877-.287 2.874.96c.456.285.684.428.885.46s.469-.035 1.005-.169A9.5 9.5 0 0 1 13.5 3a9.6 9.6 0 0 1 2.343.28c.536.134.805.2 1.006.169c.2-.032.428-.175.884-.46c1.997-1.247 2.874-.96 2.874-.96c.424 1.087.443 2.294.16 3.43c-.07.28-.104.42-.084.526s.103.225.269.461c.668.95 1.048 2.04 1.048 3.2c0 4.462-2.134 5.807-5.177 6.643c-.367.101-.507.559-.303.88c.296.47.48.99.48 1.589V22" />
      </g>
    </Mark>
  );
}

export function Linkedin({ className }) {
  return (
    <Mark className={className}>
      <g fill="none" stroke="currentColor">
        <path d="M4.5 9.5H4c-.943 0-1.414 0-1.707.293S2 10.557 2 11.5V20c0 .943 0 1.414.293 1.707S3.057 22 4 22h.5c.943 0 1.414 0 1.707-.293S6.5 20.943 6.5 20v-8.5c0-.943 0-1.414-.293-1.707S5.443 9.5 4.5 9.5Zm2-5.25a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0Z" />
        <path strokeLinejoin="round" d="M12.326 9.5H11.5c-.943 0-1.414 0-1.707.293S9.5 10.557 9.5 11.5V20c0 .943 0 1.414.293 1.707S10.557 22 11.5 22h.5c.943 0 1.414 0 1.707-.293S14 20.943 14 20v-3.5c0-1.657.528-3 2.088-3c.78 0 1.412.672 1.412 1.5v4.5c0 .943 0 1.414.293 1.707s.764.293 1.707.293h.499c.942 0 1.414 0 1.707-.293c.292-.293.293-.764.293-1.706L22 14c0-2.486-2.364-4.5-4.703-4.5c-1.332 0-2.52.652-3.297 1.673c0-.63 0-.945-.137-1.179a1 1 0 0 0-.358-.358c-.234-.137-.549-.137-1.179-.137Z" />
      </g>
    </Mark>
  );
}
