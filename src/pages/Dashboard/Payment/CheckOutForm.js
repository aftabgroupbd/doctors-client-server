import { CircularProgress } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOutForm = ({ appointment }) => {

    const { price, patientName, email, _id } = appointment;
    const stripe = useStripe();
    const elements = useElements();
    const [erroerMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [process, setProcess] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcess(true);
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('');
            console.log(paymentMethod);
        }


        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: email
                    },
                },
            },
        );

        if (intentError) {
            setErrorMessage(intentError);
            setSuccessMessage('');
        } else {
            setErrorMessage('');
            setSuccessMessage('your payment successfully');
            console.log(paymentIntent);
            setProcess(false);
            const paymentInfo = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice('_secret')[0]
            }
            const url = `http://localhost:5000/appointments/${_id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(paymentInfo)
            })
                .then(res => res.json())
                .then(data => console.log(data));
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    process ? <CircularProgress /> :
                        <button type="submit" disabled={!stripe || successMessage}>
                            Pay
                        </button>
                }

            </form>
            {
                erroerMessage && <p style={{ color: 'red' }}>{erroerMessage}</p>
            }
            {
                successMessage && <p style={{ color: 'green' }}>{successMessage}</p>
            }
        </div>
    );
};

export default CheckOutForm;