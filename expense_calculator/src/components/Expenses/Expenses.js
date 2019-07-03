import React from "react";
import "./Expenses.css";
import { TableExpenses } from "../TableExpenses/TableExpenses";
import moment from "moment";

export class Expenses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // filterType: "monthly",
      products: [],
      error: {
        show: false,
        errorMsg: ""
      },
      total: "",
      selected: "monthly"
      // isHidden: true
    };

    // this.ChangeFilter = this.ChangeFilter.bind(this);
    this.FetchProducts = this.FetchProducts.bind(this);
    this.totalSum = this.totalSum.bind(this);
    this.setYearly = this.setYearly.bind(this);
    this.setMonthly = this.setMonthly.bind(this);
    this.yearlyFilter = this.yearlyFilter.bind(this);
    this.monthlyFilter = this.monthlyFilter.bind(this)
  }

  componentDidMount() {
    this.FetchProducts();
  }

  // ChangeFilter(type) {
  //   switch (type) {
  //     case "monthly":
  //       this.setState({
  //         filterType: "monthly"
  //       });
  //       break;
  //     case "yearly":
  //       this.setState({
  //         filterType: "yearly"
  //       });
  //       break;
  //   }
  // }

  totalSum() {
    var totalPrice = this.state.products.reduce(function (prev, total) {
      return prev + total.price;
    }, 0);

    return totalPrice
  }

  setYearly() {
    this.setState({
      selected: "yearly"
    })
  }

  setMonthly() {
    this.setState({
      selected: "monthly"
    })
  }

  monthlyFilter(e) {
    let months = e.target.value

    const filterProduct = this.state.Products.filter((product) => {
      if (String(moment(product.date).month()) === months) {
        return true;
      }
      return false;
    })
    this.setState({
      products: filterProduct
    })



    if (months === "products") {
      return this.setState({
        products: this.state.allProducts
      })
    }
  }

  yearlyFilter(e) {
    let years = e.target.value

    const filterProducts = this.state.allProducts.filter((product) => {
      if (String(moment(product.date).years()) === years) {
        return true;
      }
      return false;
    })
    this.setState({
      products: filterProducts
    })

    if (years === "products") {
      return this.setState({
        products: this.state.allProducts
      })
    }
  }

  // toggleFilter() {
  //   this.setState(
  //     state => {
  //       return {
  //         isHidden: !state.isHidden
  //       };
  //     },
  //     () => {
  //       console.log("IS HIDDEN: ", this.state.isHidden);
  //     }
  //   );
  // }

  FetchProducts() {
    var access_token = localStorage.getItem("access_token")
    if (!access_token) {
      this.props.history.push("/")
    }

    fetch("http://localhost:3000/expenses", {
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

  // toEditProduct = (product) => () => {
  //   this.props.history.push('/editproduct', { product });
  // }

  // FetchProducts() {
  //   fetch("http://localhost:3000/expenses")
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(res => this.setState({ products: res }))
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
    return (
      <section id="expenses_section">
        <div className="expenses_top">
          <div>
            <h1 className="title">Expenses</h1>
          </div>

          <div className="buttons_filter">
            <div className="buttons_expenses">
              <button
                // onClick={() => this.ChangeFilter("monthly")}
                // className="monthly"
                className={(this.state.selected === "monthly") ? "monthly1" : "yearly1"} onClick={this.setMonthly}
              >
                monthly
              </button>
              <button

                // onClick={this.toggleFilter}
                // className="yearly"
                className={(this.state.selected === "yearly") ? "monthly1" : "yearly1"} onClick={this.setYearly}
              >
                yearly
              </button>
            </div>
            

            <div className="filter_months">
              <div className="paragraph_filter">
                {this.state.filterType === "yearly" ? (
                  <p className="exp-filter">Choose Year</p>
                ) : (
                    <p className="exp-filter">Choose Month</p>
                  )}
              </div>
              {
                this.state.selected === "monthly" ?

                  <div className="select_months">
                    <select onChange={this.monthlyFilter} className="select_products">
                    <option value="products">Select a Month</option>
                      <option value='0'>January</option>
                      <option value='1'>February</option>
                      <option value='2'>March</option>
                      <option value='3'>April</option>
                      <option value='4'>May</option>
                      <option value='5'>June</option>
                      <option value='6'>July</option>
                      <option value='7'>August</option>
                      <option value='8'>September</option>
                      <option value='9'>October</option>
                      <option value='10'>November</option>
                      <option value='11'>December</option>
                    </select>
                  </div>
                  :

                  <div>
                    <select onChange={this.yearlyFilter} className="select_products">
                    <option value='products'>--Select Year--</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                    </select>
                  </div>
              }
            </div>
          </div>
          <TableExpenses products={this.state.products} />

          <div className="total_bottom">
            <p className="total_text">Total spent: {this.totalSum()} den.</p>
          </div>

        </div>
      </section>
    );
  }
}
