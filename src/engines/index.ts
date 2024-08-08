import Spline from "typescript-cubic-spline";

export interface CarInfo {
    gearRatios: {[gear: number]: number},
    horsepowerCurve: {[rpms: number]: number},
    horsepowerSpline: Spline,
    idle: number
    driveRatio: number,
    tireCircumference: number,
}

