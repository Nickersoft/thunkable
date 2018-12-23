import React from "react";
import ReactDOM from "react-dom";

import { Projects } from "./pages";

import * as serviceWorker from "./serviceWorker";

import "./index.css";
import "./overrides.css";

ReactDOM.render(<Projects />, document.getElementById("root"));

serviceWorker.unregister();
