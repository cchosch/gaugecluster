import { deg2rad } from "detect-collisions";
import { FC, useMemo } from "react";
import { Vec2, Vector2 } from "three";
import styles from "./dial.module.scss";

export interface DialProps {
    isRight?: boolean
}

const _gap = 105;
export const Dial: FC<DialProps> = ({isRight}) => {
    const maskId = useMemo(() => `gagueMask${Math.random()}`, []);
    const secondMaskId = useMemo(() => `secondMask${Math.random()}`, []);
    const gradientId = useMemo(() => `gradient${Math.random()}`, []);
    const noiseId = useMemo(() => `noise${Math.random()}`, []);
    const tick = getTickPoint(140, -35);
    const tick2 = getTickPoint(140, -42);
    const gradCenter = {x: 150, y: 150};

    return <svg viewBox="0 0 300 300" className={styles.dial + " " + (isRight ? "" : styles.right)}>
        <defs>
            <radialGradient id={gradientId} x1="0" x2="0" y1="0" y2="0">
                <stop offset="70%" stopColor="black" />
                <stop offset="100%" stopColor="#777" />
            </radialGradient>
            <filter id={noiseId} opacity={0.09}>
                <feTurbulence
                    type='fractalNoise'
                    baseFrequency='1'
                    stitchTiles='stitch' opacity={0.09} />
            </filter>

        </defs>
        <path/>
        <g style={{
            // transform: "rotate(-135deg)",
            transformOrigin: "50% 50%",
        }}>
            <mask id={maskId}>
                <circle cx="150" cy="150" r="150" fill="white"></circle>
                <circle cx="150" cy="150" r="88.3" fill="black"></circle>

                {/* 72 degrees, generated using _generateBottomClip function below */}
                <path d="M150,150 l-197.53766811902756 -31.286893008046174 l166.25077511098138 -166.25077511098138" />
                <path d={`M150,150 l${tick.x} ${tick.y}`} strokeWidth="1.5" stroke="black"/>
                <path d={`M150,150 l${tick2.x} ${tick2.y}`} strokeWidth="1.5" stroke="black"/>
            </mask>
            <mask id={secondMaskId}>
                <g mask={`url(#${maskId})`}>
                    <circle cx="150" cy="150" r="137" strokeWidth="5"  stroke="white"/>
                    <circle cx="150" cy="150" r="114" strokeWidth="42" stroke="white"/>
                </g>
            </mask>
            
            <g mask={`url(#${maskId})`}>
                <circle cx="150" cy="150" r="148" strokeWidth="3" stroke="white"/>

                <circle cx="150" cy="150" r="137" strokeWidth="5" stroke={`url(#${gradientId})`}/>
                {<circle cx="150" cy="150" r="137" strokeWidth="5" opacity={0.3} stroke="white"/>}
                {<circle cx={gradCenter.x} cy={gradCenter.y} r="114" strokeWidth="42" stroke={`url(#${gradientId})`}/>}

                <circle cx="150" cy="150" r="89.3" fill="white"/>
            </g>
            <rect width="300" height="300" filter={`url(#${noiseId})`} opacity={0.05} mask={`url(#${secondMaskId})`}/>
            <path d="M 150 150 c "/>



        </g>
    </svg>;
};

function _generateBottomClip(angle: number): string {
    const x1 = -Math.cos(deg2rad(45-(angle/2)))*200;
    const y1 = -Math.sin(deg2rad(45-(angle/2)))*200;
    const x2 = y1-x1;
    const y2 = x1-y1;
    return `l${x1} ${y1} l${x2} ${y2}`;
}

function getTickPoint(dist: number, angle: number): Vec2 {
    return getPointFromAngle(dist, -angle-135);
}

function getPointFromAngle(dist: number, angle: number): Vec2 {
    const ang = deg2rad(angle);
    return new Vector2(Math.abs(dist)*-Math.cos(ang), Math.abs(dist)*Math.sin(ang));
}

