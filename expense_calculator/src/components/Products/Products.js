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
    this.toEditProduct = this.toEditProduct.bind(this)
  }

  componentDidMount() {
    this.FetchProducts();
  }

  //get method
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

  
  // FetchProduct(id) {
  //   fetch("http://localhost:3000/products" + id)
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(res => this.setState({ product: res }))
  //     .catch(err => {
  //       this.setState(state => {
  //         return {
  //           error: {
  //             ...state.error,
  //             show: true,
  //             errorMsg: err
  //           }
  //         };
  //       });
  //     });
  // }


  // za Delete
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

  // // za EDIT
  // FetchProducts() {
  //   fetch("http://localhost:3000/products" + this.props.match.params.id)
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(res => this.setState({ product: res }))
  //     .catch(err => {
  //       this.setState(state => {
  //         return {
  //           error: {
  //             ...state.error,
  //             show: true,
  //             errorMsg: err
  //           }
  //         };
  //       });
  //     });
  // }

  render() {
    console.log(this.state);
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
