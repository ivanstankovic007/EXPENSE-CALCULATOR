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

            {this.props.products.map(product => (
              <tr key={product._id}>
                <td>{product.productname}</td>
                <td>{product.producttype}</td>
                <td>{product.productdescription}</td>
                <td>{product.purchasedate}</td>
                <td>{product.price} den.</td>
                <td className="buttons_rows">
                  <button className="edit" /> &nbsp;&nbsp;
                  <button onClick={this.props.toggleAlert} className="trash" />
                </td>
                {/* <NavLink to={"/edit/" + item.id}>icon</NavLink> */}
              </tr>
            ))}
          </table>
        </div>
      </section>
    );
  }
}
