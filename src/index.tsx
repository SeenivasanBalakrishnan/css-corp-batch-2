import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Expenses from "./routes/expenses";
import Invoice from "./routes/invoice";
import Invoices from "./routes/invoices";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="expenses" element={<Expenses />} />
                <Route path="invoices" element={<Invoices />}>
                    <Route index element={<h3>Select a invoice</h3>} />
                    <Route path=":invoiceId" element={<Invoice />} />
                </Route>
                <Route path="*" element={<h2>There is nothing here</h2>} />
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);