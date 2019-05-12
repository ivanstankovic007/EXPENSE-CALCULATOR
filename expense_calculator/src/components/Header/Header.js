import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import avatar from "../../assets/images/avatar.png";

export class Header extends React.Component {
  render() {
    return (
      <section id="header_section">
        <div className="header">
          <div className="buttons">
            <button className="products">
              <NavLink id="link_products" to="/Products">
                products
              </NavLink>
            </button>
            <button className="expenses">
              <NavLink id="link_expenses" to="/Expenses">
                expenses
              </NavLink>
            </button>
          </div>
          <div className="avatar">
            <img
              src={avatar}
              alt="Avatar"
              className="image"
              height="40px"
              width="40px"
            />
            <p>Homer Simpson</p>
          </div>
        </div>
      </section>
    );
  }
}
