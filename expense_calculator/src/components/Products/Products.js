import React from "react";
import "./Products.css";
import { NavLink } from "react-router-dom";
import { Table } from "../Table/Table";

export class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      error: {
        show: false,
        errorMsg: ""
      },
      isHidden: true,
      selectedId: {}
    };

    this.FetchProducts = this.FetchProducts.bind(this);
    this.DeleteProduct = this.DeleteProduct.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.toEditProduct = this.toEditProduct.bind(this);
    this.productFilter = this.productFilter.bind(this)
  }

  componentDidMount() {
    this.FetchProducts();
  }

  FetchProducts() {
    var access_token = localStorage.getItem("access_token")
    if (!access_token) {
      this.props.history.push("/")
    }

    fetch("http://localhost:3000/products", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Access-Control-Allow-Origin': '*',
        'mode': 'no-cors'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => this.setState({
        products: res
      }))
      .catch(err => {
        this.setState(state => {
          return {
            error: {
              ...state.error,
              show: true,
              errorMsg: err
            }
          };
        });
      });
  }


  toEditProduct = (product) => () => {
    this.props.history.push('/editproduct', { product });
  }


  toggleAlert(id) {
    this.setState(
      state => {
        return {
          isHidden: !state.isHidden,
          selectedId: id
        };
      },
      () => {
        console.log("IS HIDDEN: ", this.state.isHidden);
      }
    );
  }

  DeleteProduct(id) {
    fetch("http://localhost:3000/products/" + id, {
      method: "DELETE"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {

        this.setState({
          product: res,
          isHidden: true
        });

      })
      .then((res) => window.location.reload(res))
      .catch(err => {
        this.setState(state => {
          return {
            error: {
              ...state.error,
              show: true,
              errorMsg: err
            }
          };
        });
      });
  }

  productFilter(e) {
    var type = e.target.value;
    var products = this.state.products;

    if (type === 'lowestPrice') {
        this.setState({
            products: products.sort((x, y) => {
                if (x.price <= y.price) {
                    return -1;
                } else {
                    return 1;
                }
            })
        })
    }

    if (type === 'highestPrice') {
        this.setState({
            products: products.sort((x, y) => {
                if (x.price >= y.price) {
                    return -1;
                } else {
                    return 1;
                }
            })
        })
    }


    if (type === "latestPurchase") {
        this.setState({
            products: products.sort((x, y) => {
                if (x.purchasedate >= y.purchasedate) {
                    return -1;
                } else {
                    return 1;
                }
            })
        })
    }
}

  render() {
    console.log(this.state);
    return (
      <section id="products_section">
        <div className="product_top">
          <div>
            <h1 className="title">Products</h1>
          </div>

          <div className="filter_products">
            <select className="select_products" onChange={this.productFilter}>
              <option value="0"></option>
              <option value="highestPrice">Highest Price</option>
              <option value="lowestPrice">Lowest Price</option>
              <option value="latestPurchase">Latest Purchases</option>
            </select>
          </div>
          <p className="filter">Filter by:</p>
        </div>
        <Table products={this.state.products} toggleAlert={this.toggleAlert} toEditProduct={this.toEditProduct} />

        <div className="buttons_bottom">
          <button className="new_calculation">new calculation</button> <br />
          <button className="new_product">
            <NavLink id="link_np" to="/NewProduct">
              new product
            </NavLink>
          </button>
        </div>

        {!this.state.isHidden ? (
          <div className="alert">
            <div className="white_box">
              <h1>Delete Product</h1>
              <p>
                You are about to delete this product. Are you sure you wish to
                continue?
              </p>
              <br />
              <div className="buttons_alert">
                <button onClick={this.toggleAlert} className="cancel">
                  cancel
                </button>
                <button
                  onClick={() => this.DeleteProduct(this.state.selectedId)}
                  className="delete"
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    );
  }
}
