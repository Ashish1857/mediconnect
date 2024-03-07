import React, { useState } from "react";
import Header from "../shared/Header";
import "./Order.css";

import LoginModal from "../registration/loginModal/LoginModal";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

export const Order = () => {

    return (
        <div id="OrderContent">


            <h1>Do you already have a prescription?</h1>

                <div>
                    <nav>
                        <ul>
                            <li class="liWithEnding">
                                <Link to="/orderWithPres">Yes, help me pick medicine</Link>
                            </li>
                            <li class="liWithEnding">
                                <Link to="/orderWithoutPres">No, i will order myself</Link>
                            </li>
                        </ul>
                    </nav>


                </div>

        </div>
    );
};
