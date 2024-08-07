import Dial from "./Dial";
import { ASPECT_RATIO } from "./util";
import styles from "./window.module.scss";


export const Window = () => {
    return <div className={styles.window} style={{
        height: `${(1/ASPECT_RATIO) * (window.innerWidth-2)}px`,
        width: `${window.innerWidth-2}px`,
    }}>
        <Dial/>
        <Dial/>
    </div>;
};