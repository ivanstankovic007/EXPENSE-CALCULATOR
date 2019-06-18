import React from "react";
import "../NewProduct/NewProduct";
import Axios from "axios";
import plusCircle from "../../assets/images/plus-circle.svg";

export class EditProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productname: "",
      productdescription: "",
      producttype: "",
      purchasedate: "",
      price: "",
      product: this.props.location.state.product
    }

    this.EditProduct = this.EditProduct.bind(this);
    this.handleField = this.handleField.bind(this);
  }

 

  EditProduct(){
    const access_token = localStorage.getItem('access_token')
    Axios.patch('http://localhost:3000/editproduct/' + this.state.product._id , this.state.product, {
        headers: {
            access_token
        }
    })
    .then( res => {
        
        this.props.history.push('/products')
    })
        .catch(err => console.log(err))

}
  

  handleField(e) {
    let newEditProduct = { ...this.state.product, [e.target.name]: e.target.value };
    this.setState({
        product: newEditProduct
    })
  }


  render() {
    var product = this.state.product
    return (
      <section id="newProduct_section">
        <div>
          <h1 className="title">Edit Product</h1>
          <div className="middle_center">
            <div className="login middle_left">
              <div className="product_form">
                <label htmlFor="fname">Product Name</label>
                <input
                  name="productname"
                  value={product.productname}
                  onChange={this.handleField}
                  type="text"
                />

                <label htmlFor="lname">Product Description</label>
                <input
                  name="productdescription"
                  value={product.productdescription}
                  onChange={this.handleField}
                  type="text"
                />

                <label htmlFor="email">Product Type</label>
                <input
                  name="producttype"
                  value={product.producttype}
                  onChange={this.handleField}
                  type="email"
                />

                <label htmlFor="birth">Purchase Date</label>
                <input
                  name="purchasedate"
                  value={product.purchasedate}
                  onChange={this.handleField}
                  type="date"
                />

                <label htmlFor="phone">Product Price</label>
                <input
                  name="price"
                  value={product.price}
                  onChange={this.handleField}
                  type="number"
                />

                <button onClick={this.EditProduct} className="signin">
                  edit product
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
              <p id="product_paragraph">You are editing the product</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
