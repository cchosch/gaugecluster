import { Duration } from "ts-duration";

export const ASPECT_RATIO = 2640/939;

/**
 * @param type name of event
 * @param listener listener callback
 * @param options options for event listener
 * @returns function that removes event listener from document
 *
 * allows you to put an event listener in your useEffect without removing the function from the function call
 */
export const effectEvent = (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined, target?: any): () => void => {
    if (!target)
        target = document;
    target.addEventListener(type, listener, options);
    return () => {
        target.removeEventListener(type, listener, options);
    };
};

export const stallFor = async (dur: Duration) => new Promise((resolve, _reject) => {
    setTimeout(resolve, dur.milliseconds);
});
