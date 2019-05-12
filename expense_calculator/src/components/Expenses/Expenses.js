import React from "react";
import "./Expenses.css";
import { Table } from "../Table/Table";

export class Expenses extends React.Component {
  render() {
    return (
      <section id="expenses_section">
        <div className="expenses_top">
          <div>
            <h1 className="title">Expenses</h1>
          </div>
          <div className="buttons_filter">
            <div className="buttons_expenses">
              <button className="monthly">monthly</button>
              <button className="yearly">yearly</button>
            </div>

            <div className="filter_months">
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
          </div>
        </div>
        <Table />

        <div className="total_bottom">
          <p>Total spent: 1205 den.</p>
        </div>
      </section>
    );
  }
}
