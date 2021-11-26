import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51HQ921CrgDj5AUGRUjVZnHVFCGbTIOFqRKTeM2qQ7svEAxPi7wLJneujMmf7QtIbRG4BfWYZ7w8SGQl901imhs0700HsNVliM2');

const Payment = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data));
    }, [appointmentId]);
    return (
        <div>
            <h2>patient name: {appointment.patientName}</h2>
            <h2>for: {appointment.serviceName}</h2>
            <h4>Price: {appointment.price}</h4>
            {
                appointment?.price && <Elements stripe={stripePromise}>
                    <CheckOutForm
                        appointment={appointment}
                    ></CheckOutForm>
                </Elements>
            }

        </div>
    );
};

export default Payment;