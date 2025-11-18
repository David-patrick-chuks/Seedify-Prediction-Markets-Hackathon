import { TbArrowBigDownFilled, TbArrowBigUpFilled } from "react-icons/tb";
import EnteredIcon from "./Entered.icon";
import WinIcon from "./Win.icon";

interface CardProps {
    legend?: string;
    legendColor?: string;
    color?: string;
    children?: any;
    className?: string;
    classNameParent?: string;
    didWin?: boolean;
    didParticipate?: boolean;
    showLegendOnMobile?: boolean;
    expired?: boolean;
    isEnteredDown?: boolean;
}

const Card: React.FC<CardProps> = ({
    legend,
    legendColor,
    color = "purple",
    children,
    className = "",
    classNameParent = "",
    didWin = false,
    didParticipate = false,
    showLegendOnMobile = true,
    expired = false,
    isEnteredDown,
}) => {
    legend = legend?.toUpperCase();

    return (
        <div
            className={`
            relative p-2 bg-[rgba(255,255,255,0.4)] rounded-3xl shadow-[0px_1px_2px_rgba(0,0,0,0.1)] md:shadow-[0px_4px_12px_rgba(0,0,0,0.1)]
            ${classNameParent}
        `}
        >
            {legend && (
                <div
                    className={`${showLegendOnMobile ? "flex" : "hidden"
                        } md:flex w-full justify-center z-20 relative select-none`}
                >
                    <p
                        title={legend}
                        className={`with-border absolute -top-7 z-20 text-3xl whitespace-nowrap ${legendColor || color
                            }-text-stroke`}
                    >
                        {legend}
                    </p>
                </div>
            )}
            {didParticipate && (
                <>
                    <div className="absolute -top-7 left-8">
                        <EnteredIcon color={color} />
                    </div>
                    <div className="flex items-center absolute bottom-5 left-5 text-sm bg-[#363636]/10 px-2 py-1 rounded-[4px]">
                        <p>PLACED</p>
                        {isEnteredDown ? (
                            <TbArrowBigDownFilled color="white" size={15} />
                        ) : (
                            <TbArrowBigUpFilled color="white" size={15} />
                        )}
                    </div>
                </>
            )}
            {/* {!expired && didParticipate && (
                <>
                    <div className="absolute -top-7 right-6">
                        <TbArrowBigDownFilled color="white" size={50} />
                    </div>
                </>
            )} */}
            {expired && didWin && (
                <>
                    <div className="absolute -top-7 right-6">
                        <WinIcon isRed={color === "limeGreen"} />
                    </div>
                    <div className="absolute bottom-5 right-6 text-sm bg-[#363636]/10 px-2 py-1 rounded-[4px]">
                        <p>WON</p>
                    </div>
                </>
            )}
            {expired && didParticipate && !didWin && (
                <>
                    <div className="absolute bottom-5 right-6 text-sm bg-[#363636]/10 px-2 py-1 rounded-[4px]">
                        <p>LOST</p>
                    </div>
                </>
            )}
            <div
                className={`rounded-2.5xl stroke-current stroke-[8px] ${className}
                ${color === "purple" && "bg-gradient-to-b from-[#8B30FF] to-[#7110ED]"}
                ${color === "limeGreen" && "bg-gradient-to-b from-[#3FC229] to-[#13DBB7]"} 
                ${color === "pinia" && "bg-gradient-to-b from-[#EA1F59] to-[#FF862E]"} 
                ${color === "elektricPurple" && "bg-gradient-to-b from-[#BD1ECB] to-[#D5183A]"}
            `}
            >
                {children}
            </div>
        </div>
    );
};

export default Card;
