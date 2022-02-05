import React from 'react';
import { useParams } from 'react-router-dom';
import { getInvoice } from '../data';
import { InvoiceType } from '../types';

type Props = {};

const Invoice = (props: Props) => {
    const params = useParams();
    const invoiceId = params.invoiceId || '';
    const invoice: InvoiceType | undefined = getInvoice(parseInt(invoiceId, 10));

    return (
        <main style={{ padding: "1rem" }}>
            <h2>Total Due: {invoice?.amount}</h2>
            <p>
                {invoice?.name}: {invoice?.number}
            </p>
            <p>Due Date: {invoice?.due}</p>
        </main>
    );
};

export default Invoice;
