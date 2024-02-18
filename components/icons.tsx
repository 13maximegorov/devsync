type IconProps = React.HTMLAttributes<SVGElement>;

export const YandexIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z"
      fill="#FC3F1D"
    />
    <path
      d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z"
      fill="#fff"
    />
  </svg>
);

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
