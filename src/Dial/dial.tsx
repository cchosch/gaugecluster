import { FC, useMemo } from "react";
import styles from "./dial.module.scss";

export interface DialProps {
    isRight?: boolean
}

const _gap = 105;
export const Dial: FC<DialProps> = ({isRight}) => {
    const maskId = useMemo(() => `gagueMask${Math.random()}`, []);
    const secondMaskId = useMemo(() => `secondMask${Math.random()}`, []);
    const gradientId = useMemo(() => `gradient${Math.random()}`, []);

    return <svg viewBox="0 0 300 300" className={styles.dial + " " + (isRight ? "" : styles.right)}>
        <defs>
            <radialGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="60%" stop-color="black" />
                <stop offset="100%" stop-color="#aaa" />
            </radialGradient>
        </defs>
        <g style={{
            transform: "rotate(-135deg)",
            transformOrigin: "50% 50%",
            opacity: 0
        }}>
            <mask id={maskId}>
                <path d="M150,150 h-150 a 150 150 0 1 0 150 -150 z"  fill="white"/>
                <circle cx="150" cy="150" r="88.3"  fill="black"></circle>
            </mask>
            <mask id={secondMaskId}>
                <g mask={`url(#${maskId})`}>
                    <circle cx="150" cy="150" r="137" strokeWidth="5" stroke="white"/>
                    <circle cx="150" cy="150" r="114" strokeWidth="42" stroke="white"/>
                </g>
            </mask>
            
            <g mask={`url(#${maskId})`}>
                <circle cx="150" cy="150" r="148" strokeWidth="3" stroke="white"/>

                <circle cx="150" cy="150" r="137" strokeWidth="5" stroke="#aaa"/>
                <circle cx="150" cy="150" r="114" strokeWidth="42" stroke="white"/>

                <circle cx="150" cy="150" r="89.3" fill="white"/>
            </g>
            <rect mask={`url(#${secondMaskId})`} width="300" height="300" fill={`url(#${gradientId})`}/>



        </g>
    </svg>;
};
