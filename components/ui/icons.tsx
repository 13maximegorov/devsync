type IconProps = React.HTMLAttributes<SVGElement>;

export const Logo = (props: IconProps) => (
  <svg
    viewBox="0 0 36 7"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 0H0v7h16V0ZM4 1H1v5h4V2H4V1Zm0 1v3H2V2h2Zm2-1h3v1H7v1h2V2h1v2H7v1H6V1Zm1 4h3v1H7V5Zm5-4h-1v4h1v1h2V5h1V1h-1v4h-2V1Zm6 0h3v1h-3V1Zm2 4V4h-3V2h1v1h3v2h-1Zm0 0v1h-3V5h3Zm3-4h-1v2h1v1h2v1h-3v1h4V1h-1v2h-2V1Zm4 0h3v1h-2v4h-1V1Zm3 1h1v4h-1V2Zm5-1h-3v5h4V5h-3V2h2v1h1V2h-1V1Z"
      fill="currentColor"
    />
  </svg>
);
