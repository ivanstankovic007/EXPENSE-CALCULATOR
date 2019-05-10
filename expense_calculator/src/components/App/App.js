import React from "react";
import { Route } from 'react-router-dom';
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import {Products} from "../Products/Products";
// import { Portal } from "../Portal/Portal";

export class App extends React.Component {
    render () {
        return(
            <main id="app"> 
                 <Route exact path="/" component={Login} />
                 <Route path="/Register" component={Register} />
                 <Route path="/Products" component={Products} />
                 {/* <Route path="/Portal" component={Portal} /> */}
            </main>
        )
    }
}

