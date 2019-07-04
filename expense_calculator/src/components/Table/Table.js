import React from "react";
import "../Table/Table.css";
import moment from "moment";


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
                <td>{moment(product.purchasedate).format('DD MMM YYYY')}</td>
                <td>{product.price} den.</td>
                <td className="buttons_rows">
                  <button onClick={this.props.toEditProduct(product)} className="edit">
                  </button>&nbsp;&nbsp;
                  <button onClick={() => this.props.toggleAlert(product._id)} className="trash" />
                </td>
              </tr>
            ))}
          </table>
        </div>
      </section>
    );
  }
}
