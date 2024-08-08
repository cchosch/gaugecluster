import { useEffect, useRef } from "react";
import { Duration } from "ts-duration";
import { CarInfo } from "../engines";
import { calculateSpeed } from "../engines/car";
import { effectEvent, stallFor } from "../util";
import useUpdate from "./useUpdate";

export interface EngineData {
    gear: number,
    rpms: number,
    speed: number,
    throttle: number,
    throttleOn: boolean,
    transitionGears: null | number
}

// how long it takes to go full throttle
const throttleSpeed = 20;
export const useEngine = (car: CarInfo): EngineData => {
    const engineData = useRef<EngineData>({
        gear: 1,
        rpms: car.idle,
        speed: calculateSpeed(car, car.idle, 1),
        throttle: 0,
        throttleOn: false,
        transitionGears: null
    });
    const throttleRunning = useRef<boolean>(false);
    const update = useUpdate();

    const runThrottle = async () => {
        if(throttleRunning.current)
            return;
        throttleRunning.current = true;
        let i = 0;
        if(!engineData.current.throttleOn) {
            i = throttleSpeed-1;
        }
        for(; i < throttleSpeed && i >= 0;) {
            await stallFor(Duration.millisecond(1));
            if(engineData.current.throttleOn) {
                i+=1;
            } else {
                i-=1;
            }
            engineData.current.throttle = smoothstep(0, 1, i/20);
        }
        throttleRunning.current = false;
    };

    useEffect(() => {
        const cancels: (()=>void)[] = [];
        const clear = setInterval(update);
        cancels.push(() => clearInterval(clear));
        cancels.push(effectEvent("keydown", (ev: any) => {
            if(ev.key.toLowerCase() === "a" && engineData.current.throttleOn == false) {
                engineData.current.throttleOn = true;
                runThrottle();
            }
        }));
        cancels.push(effectEvent("keyup", (ev: any) => {
            if(ev.key.toLowerCase() === "a") {
                engineData.current.throttleOn = false;
                runThrottle();
            }
        }));
        return () => {
            for(let i = 0; i < cancels.length; i++) {
                cancels[i]();
            }
        };
    }, []);


    return engineData.current;
};

function smoothstep(edge0: number, edge1: number, x: number) {
    // Scale, and clamp x to 0..1 range
    x = clamp((x - edge0) / (edge1 - edge0));
 
    return x * x * (3.0 - 2.0 * x);
 }
 
function clamp(x: number, lowerlimit = 0, upperlimit = 1.0) {
    if (x < lowerlimit) return lowerlimit;
    if (x > upperlimit) return upperlimit;
    return x;
}

