import Spline from "typescript-cubic-spline";
import { CarInfo } from ".";
import { calculateSpeed } from "./car";

const curve = {
    1000: 50,
    1500: 100,
    2500: 230,
    3000: 285,
    3500: 330,
    4000: 385,
    4800: 469,
    6200: 469,
    6500: 430
};
export const E55_M113K: CarInfo = {
    gearRatios: {
        1: 3.59,
        2: 2.19,
        3: 1.41,
        4: 1,
        5: 0.83
    },
    horsepowerCurve: curve,
    horsepowerSpline: new Spline(Object.keys(curve).map(v => parseFloat(v)), Object.values(curve)),
    tireCircumference: 80.4248,
    idle: 850,
    driveRatio: 2.82
};

console.debug(calculateSpeed(E55_M113K, 900, 1)); //eslin
