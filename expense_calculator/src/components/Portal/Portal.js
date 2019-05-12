import React from "react";
import { Route } from "react-router-dom";

import { Header } from "../Header/Header";
import { Products } from "../Products/Products";
import { Expenses } from "../Expenses/Expenses";
import { NewProduct } from "../NewProduct/NewProduct";

export class Portal extends React.Component {
  render() {
    return (
      <section id="portal">
        <Header />
        <Route path="/products" component={Products} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/newProduct" component={NewProduct} />
      </section>
    );
  }
}
