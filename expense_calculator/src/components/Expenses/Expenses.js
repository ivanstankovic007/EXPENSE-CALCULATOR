import React from "react";
import "./Expenses.css";
import { TableExpenses } from "../TableExpenses/TableExpenses";

export class Expenses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterType: "monthly",
      products: [],
      error: {
        show: false,
        errorMsg: ""
      },
      isHidden: true
    };

    this.ChangeFilter = this.ChangeFilter.bind(this);
    this.FetchProducts = this.FetchProducts.bind(this);
  }

  componentDidMount() {
    this.FetchProducts();
  }

  ChangeFilter(type) {
    switch (type) {
      case "monthly":
        this.setState({
          filterType: "monthly"
        });
        break;
      case "yearly":
        this.setState({
          filterType: "yearly"
        });
        break;
    }
  }

  toggleFilter() {
    this.setState(
      state => {
        return {
          isHidden: !state.isHidden
        };
      },
      () => {
        console.log("IS HIDDEN: ", this.state.isHidden);
      }
    );
  }

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
                onClick={() => this.ChangeFilter("monthly")}
                className="monthly"
              >
                monthly
              </button>
              <button
                // onClick={()=> {this.ChangeFilter("yearly"); this.toggleFilter}}
                onClick={this.toggleFilter}
                className="yearly"
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
              <div className="select_months">
                <select className="select_products">
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>

              {!this.state.isHidden ? <div>
                <select className="select_products">
                  <option>2019</option>
                  <option>2018</option>
                </select>
              </div> : null}

            </div>
          </div>
          <TableExpenses products={this.state.products} />

          <div className="total_bottom">
            <p>Total spent: 1205 den.</p>
          </div>

        </div>
      </section>
    );
  }
}
