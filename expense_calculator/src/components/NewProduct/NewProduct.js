import React from "react";
import "./NewProduct.css";
import plusCircle from "../../assets/images/plus-circle.svg";

export class NewProduct extends React.Component {
  render() {
    return (
      <section id="newProduct_section">
        <div>
          <h1 className="title">New Product</h1>
          <div className="middle_center">
            <div className="login middle_left">
              <form className="product_form">
                <label className="product_label" for="fname">
                  Product Name
                </label>
                <input type="text" />
                <label className="product_label" for="lname">
                  Product Description
                </label>
                <input type="text" />
                <label className="product_label" for="email">
                  Product Type
                </label>
                <input type="email" />
                <label className="product_label" for="birth">
                  Purchase Date
                </label>
                <input type="date" />
                <label className="product_label" for="phone">
                  Product Price
                </label>
                <input type="number" />

                <button className="signin">create product</button>
              </form>
            </div>
            <div className="middle_right">
              <span className="product_label">
                <img
                  src={plusCircle}
                  alt="plusCircle"
                  className="logo_circle"
                  width="40px"
                  height="40px"
                />
              </span>
              <p id="product_paragraph">You are creating a new product</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
