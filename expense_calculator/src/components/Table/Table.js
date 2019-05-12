import React from "react";
import "../Table/Table.css";

export class Table extends React.Component {
  render() {
    return (
      <section id="table_section">
        <div className="table">
          <table className="table_head">
            <tr>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Product Description</th>
              <th>Purchase Date</th>
              <th>Product Price</th>
              <th>Edit/Delete</th>
            </tr>
            <tr>
              <td>Coca-cola</td>
              <td>Drink</td>
              <td>carbonated soft drink</td>
              <td>19.04.2019</td>
              <td>75</td>
              <td className="buttons_rows">
                <button className="edit" /> &nbsp;&nbsp;
                <button className="trash" />
              </td>
            </tr>
          </table>
        </div>
      </section>
    );
  }
}
