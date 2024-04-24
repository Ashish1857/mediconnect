import React from "react";
import "./Order.css";
import { Link } from 'react-router-dom';

export const Order = () => {

    return (
        <div id="OrderContent">


            <h1>Do you already have a prescription?</h1>

                <div>
                    <nav>
                        <ul>
                            <li className="liWithEnding">
                                <Link to="/orderWithPres">Yes, help me pick medicine</Link>
                            </li>
                            <li className="liWithEnding">
                                <Link to="/orderWithoutPres">No, i will order myself</Link>
                            </li>
                        </ul>
                    </nav>


                </div>

        </div>
    );
};
