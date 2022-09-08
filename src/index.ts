import { createElement } from "react";
import { createRoot } from "react-dom/client";
import "./app.scss";
import { App } from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(createElement(App));
