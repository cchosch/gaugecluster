import { CarInfo } from ".";

export const calculateSpeed = (car: CarInfo, rpms: number, gear: number): number => {
    return ((rpms/60)*(car.tireCircumference/(car.gearRatios[gear]* car.driveRatio))*60*60)/63360;
};

export const getEngineHp = (car: CarInfo, rpms: number): number => {
    return car.horsepowerSpline.at(rpms);
};



