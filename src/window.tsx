import Dial from "./Dial";
import { E55_M113K } from "./engines/e55_m113k";
import { useEngine } from "./hooks";
import { ASPECT_RATIO } from "./util";
import styles from "./window.module.scss";


export const Window = () => {
    const engineData = useEngine(E55_M113K);
    return <div className={styles.window} style={{
        height: `${(1/ASPECT_RATIO) * (window.innerWidth-2)}px`,
        width: `${window.innerWidth-2}px`,
    }}>
        <Dial/>
        <svg><rect height="10" width={`${engineData.throttle*100}`} fill="white"></rect></svg>
        <Dial isRight/>
    </div>;
};