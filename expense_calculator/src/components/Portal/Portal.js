import React from "react";
import { Route } from "react-router-dom";
import { Products } from "../Products/Products";
import { Expenses } from "../Expenses/Expenses";
import { NewProduct } from "../NewProduct/NewProduct";
import { EditProduct } from "../EditProduct/EditProduct";

export class Portal extends React.Component {
  render() {
    return (
      <section id="portal">
        <Route path="/products" component={Products} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/newproduct" component={NewProduct} />
        <Route path="/editproduct" component={EditProduct} />
      </section>
    );
  }
}
