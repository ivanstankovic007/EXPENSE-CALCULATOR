import React from "react";
import "./Products.css";
import { NavLink } from "react-router-dom";
import avatar from "../../assets/images/avatar.png";


export class Products extends React.Component {
    render() {
        return (
            <section id='products_section'>
                <div className="header">
                    <div className="buttons">
                        <button className="products"> <a id="link_products" href="Products.html"> products</a></button>
                        <button className="expenses"> <a id="link_expenses" href="Expenses.html"> expenses </a></button>
                    </div>
                    <div className="avatar">
                        <img src={avatar} alt="Avatar" className="image" height="40px" width="40px" />
                        <p>Homer Simpson</p>
                    </div>
                </div>

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
                                <label id="edit"><i className="far fa-edit"></i> &nbsp; <i className="far fa-trash-alt"></i></label>
                            </td>
                        </tr>
                        <tr>
                            <td>Coca-cola</td>
                            <td>Drink</td>
                            <td>carbonated soft drink</td>
                            <td>19.04.2019</td>
                            <td>75</td>
                            <td className="buttons_rows">
                                <label id="edit"><i className="far fa-edit"></i> &nbsp; <i className="far fa-trash-alt"></i></label>
                            </td>
                        </tr>
                        <tr>
                            <td>Coca-cola</td>
                            <td>Drink</td>
                            <td>carbonated soft drink</td>
                            <td>19.04.2019</td>
                            <td>75</td>
                            <td className="buttons_rows">
                                <label id="edit"><i className="far fa-edit"></i> &nbsp; <i className="far fa-trash-alt"></i></label>
                            </td>
                        </tr>
                        <tr>
                            <td>Coca-cola</td>
                            <td>Drink</td>
                            <td>carbonated soft drink</td>
                            <td>19.04.2019</td>
                            <td>75</td>
                            <td className="buttons_rows">
                                <label id="edit"><i className="far fa-edit"></i> &nbsp; <i className="far fa-trash-alt"></i></label>
                            </td>
                        </tr>
                        <tr>
                            <td>Coca-cola</td>
                            <td>Drink</td>
                            <td>carbonated soft drink</td>
                            <td>19.04.2019</td>
                            <td>75</td>
                            <td className="buttons_rows">
                                <label id="edit"><i className="far fa-edit"></i> &nbsp; <i className="far fa-trash-alt"></i></label>
                            </td>
                        </tr>
                        <tr>
                            <td>Coca-cola</td>
                            <td>Drink</td>
                            <td>carbonated soft drink</td>
                            <td>19.04.2019</td>
                            <td>75</td>
                            <td className="buttons_rows">
                                <label id="edit"><i className="far fa-edit"></i> &nbsp; <i className="far fa-trash-alt"></i></label>
                            </td>
                        </tr>
                        <tr>
                            <td>Coca-cola</td>
                            <td>Drink</td>
                            <td>carbonated soft drink</td>
                            <td>19.04.2019</td>
                            <td>75</td>
                            <td className="buttons_rows">
                                <label id="edit"><i className="far fa-edit"></i> &nbsp; <i className="far fa-trash-alt"></i></label>
                            </td>
                        </tr>
                        <tr>
                            <td>Coca-cola</td>
                            <td>Drink</td>
                            <td>carbonated soft drink</td>
                            <td>19.04.2019</td>
                            <td>75</td>
                            <td className="buttons_rows">
                                <label id="edit"><i className="far fa-edit"></i> &nbsp; <i className="far fa-trash-alt"></i></label>
                            </td>
                        </tr>
                    </table>

                    <div className="buttons_bottom">
                        <button className="new_calculation">new calculation</button> <br />
                        <button className="new_product"> <a id="link_np" href="New Product.html">new product</a></button>
                    </div>
                </div>

                <div className="alert">
                    <div className="white_box">
                        <h1>Delete Product</h1>

                        <p>You are about to delete this product. Are you sure you wish to continue?</p> <br />

                        <div className="buttons_alert">
                            <button className="cancel">cancel</button>
                            <button className="delete">delete</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}