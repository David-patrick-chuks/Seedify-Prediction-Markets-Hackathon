interface CurrentInfoRoundCardProps {
  children?: any;
  className?: string;
}

const CurrentInfoRoundCard: React.FC<CurrentInfoRoundCardProps> = ({ children, className = "" }) => {
  return (
    <div className="p-2 bg-[rgba(255,255,255,0.4)] rounded-2.5xl md:rounded-full w-min shadow-[0px_4px_12px_rgba(0,0,0,0.25)]">
      <div
        className={`flex flex-col items-center justify-center rounded-[14px] md:rounded-full md:w-[220px] md:h-[220px] px-5 md:py-5 stroke-current stroke-[8px] ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default CurrentInfoRoundCard;
