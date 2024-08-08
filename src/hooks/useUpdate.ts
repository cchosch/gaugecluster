import { useState } from "react";

const useUpdate = () => {
    const [_u, setU] = useState(false);
    return () => setU(u => !u);
};

export default useUpdate;