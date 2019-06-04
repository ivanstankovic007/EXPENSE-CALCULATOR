import React from "react";
import { Route } from "react-router-dom";
import { Products } from "../Products/Products";
import { Expenses } from "../Expenses/Expenses";
import { NewProduct } from "../NewProduct/NewProduct";

export class Portal extends React.Component {
  render() {
    return (
      <section id="portal">
        <Route path="/products" component={Products} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/newproduct" component={NewProduct} />
        {/* <Route path="/edit/:id" component={EditProduct} /> */}
      </section>
    );
  }
}
