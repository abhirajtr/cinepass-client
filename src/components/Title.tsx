import { FC } from "react";

interface TitleProps {
    text1: string;
    text2: string;
}


const Title: FC<TitleProps> = ({ text1, text2 }) => {
    return (
        <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-absolute-white">{text1} <span className="text-green-60 font-medium">{text2}</span></p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-green-60/50"></p>
        </div>
    )
}

export default Title