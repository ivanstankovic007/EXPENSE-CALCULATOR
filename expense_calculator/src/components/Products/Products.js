import React from "react";
import "./Products.css";
import { NavLink } from "react-router-dom";
import { Table } from "../Table/Table";

export class Products extends React.Component {
  render() {
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

        <div className="alert">
          <div className="white_box">
            <h1>Delete Product</h1>
            <p>
              You are about to delete this product. Are you sure you wish to
              continue?
            </p>{" "}
            <br />
            <div className="buttons_alert">
              <button className="cancel">cancel</button>
              <button className="delete"><NavLink id="link_alert" to="/alert">
              delete
            </NavLink></button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
