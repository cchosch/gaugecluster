import { createRoot } from "react-dom/client";
import "./index.scss";
import { ASPECT_RATIO } from "./util";
import { Window } from "./window";

const root = document.getElementById("root");

if(!root) {
    alert("no root found");
    process.exit();
} else {
    createRoot(root).render(
        <Window/>
    );
    ASPECT_RATIO * window.innerWidth;
}

