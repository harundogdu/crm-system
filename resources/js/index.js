import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./features/Authentication/AuthContext";

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <Main/>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
