interface LCRIconProps {
  className?: string;
}

const LCRIcon = ({ className }: LCRIconProps) => {
  return (
    <svg
      width="20"
      height="25"
      viewBox="0 0 20 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M13.1996 15.6968L15.5996 17.2452L13.1996 18.7936L10.7996 17.2452L13.1996 15.6968Z" fill="white" />
      <path d="M6.80039 15.6968L4.40039 17.2452L6.80039 18.7936L9.20039 17.2452L6.80039 15.6968Z" fill="white" />
      <path d="M9.99961 17.6328L7.59961 19.1812L9.99961 20.6522L12.3996 19.1812L9.99961 17.6328Z" fill="white" />
      <path
        d="M2.8 8.72913L0 6.79365L10 0.600098L20 6.79365L17.2 8.72913L13.6 6.40655V14.5356L10 16.8582L6.4 14.5356V6.40655L2.8 8.72913Z"
        fill="#8DDCFF"
      />
      <path d="M2.4 9.03852L0 7.39819V19.1805L9.6 24.5998V21.1159L2.4 16.8579V9.03852Z" fill="white" />
      <path d="M17.6 9.03852L20 7.39819V19.1805L10.4 24.5998V21.1159L17.6 16.8579V9.03852Z" fill="white" />
    </svg>
  );
};

export default LCRIcon;
