import React from "react";
import "./NewProduct.css";
import plusCircle from "../../assets/images/plus-circle.svg";

export class NewProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productname: "",
      productdescription: "",
      producttype: "",
      purchasedate: "",
      price: ""
    };

    this.HandleFieldsChange = this.HandleFieldsChange.bind(this);
    this.AddProduct = this.AddProduct.bind(this);
  }

  AddProduct() {
    let newproduct = {
      productname: this.state.productname,
      productdescription: this.state.productdescription,
      producttype: this.state.producttype,
      purchasedate: this.state.purchasedate,
      price: this.state.price
    };

    fetch("http://localhost:3000/newproduct", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newproduct)
    })
      .then(res => console.log("PRODUCT RESULT: ", res))
      .then((res) => window.location.reload(res))
      .catch(err => console.error(err));
  }

  HandleFieldsChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <section id="newProduct_section">
        <div>
          <h1 className="title">New Product</h1>
          <div className="middle_center">
            <div className="login middle_left">
              <div className="product_form">
                <label htmlFor="fname">Product Name</label>
                <input
                  name="productname"
                  value={this.state.productname}
                  onChange={this.HandleFieldsChange}
                  type="text"
                />

                <label htmlFor="lname">Product Description</label>
                <input
                  name="productdescription"
                  value={this.state.productdescription}
                  onChange={this.HandleFieldsChange}
                  type="text"
                />

                <label htmlFor="email">Product Type</label>
                <input
                  name="producttype"
                  value={this.state.producttype}
                  onChange={this.HandleFieldsChange}
                  type="email"
                />

                <label htmlFor="birth">Purchase Date</label>
                <input
                  name="purchasedate"
                  value={this.state.purchasedate}
                  onChange={this.HandleFieldsChange}
                  type="date"
                />

                <label htmlFor="phone">Product Price</label>
                <input
                  name="price"
                  value={this.state.price}
                  onChange={this.HandleFieldsChange}
                  type="number"
                />

                <button onClick={this.AddProduct} className="signin">
                  create product
                </button>
              </div>
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
