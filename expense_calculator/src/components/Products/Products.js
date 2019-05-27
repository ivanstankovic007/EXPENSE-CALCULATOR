import React from "react";
import "./Products.css";
import { NavLink } from "react-router-dom";
import { Table } from "../Table/Table";

export class Products extends React.Component {
  render() {
    // fetch("http://localhost:3000/products") // Call the fetch function passing the url of the API as a parameter
    //   .then(res => console.log("Products shown: ", res))
    //   .catch(err => console.error(err));

    return (
      <section id="products_section">
        <div className="product_top">
          <div>
            <h1 className="title">Products</h1>
          </div>

          <div className="filter_products">
            <select className="select_products">
              <option>Year</option>
              <option>Highest Price</option>
              <option>Lowest Price</option>
              <option>Latest Purchases</option>
            </select>
          </div>
        </div>
        <Table />

        <div className="buttons_bottom">
          <button className="new_calculation">new calculation</button> <br />
          <button className="new_product">
            <NavLink id="link_np" to="/NewProduct">
              new product
            </NavLink>
          </button>
        </div>
      </section>
    );
  }
}
