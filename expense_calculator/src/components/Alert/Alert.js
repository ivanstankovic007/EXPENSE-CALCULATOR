import React from "react";
import "./Alert.css";


export class Products extends React.Component {
  render() {
    return (
      <section id="alert_section">
        <Products />
        <div className="alert">
          <div className="white_box">
            <h1>Delete Product</h1>
            <p>
              You are about to delete this product. Are you sure you wish to
              continue?
            </p>
            <br />
            <div className="buttons_alert">
              <button className="cancel">cancel</button>
              <button className="delete">delete</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
