import React from "react";
import "./Portal.css";
import { NavLink } from "react-router-dom";


export class Portal extends React.Component {
    render() {
        return (
            <main id='portal'>
                 <Route exact path="/" component={Login} />
                 <Route path="/Register" component={Register} />
            </main>
        )
    }
}