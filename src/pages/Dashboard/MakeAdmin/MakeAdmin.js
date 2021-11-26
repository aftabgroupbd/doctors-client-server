import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const { token } = useAuth();
    const handelOnBlur = (e) => {
        setEmail(e.target.value);
    }
    const handelAdminSubmit = (e) => {
        e.preventDefault();
        const user = { email };
        fetch('https://frozen-savannah-11594.herokuapp.com/users/admin', {
            method: "PUT",
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': "application/json"
            }, body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data)
                    setEmail('');
                    setSuccess(true);
                }

            })
    }
    return (
        <div>
            <h2>Make me admin</h2>
            <form onSubmit={handelAdminSubmit}>
                <TextField
                    sx={{ width: '75%', m: 1 }}
                    label="Your Email"
                    name="email"
                    onBlur={handelOnBlur}
                    variant="standard" />
                <Button varient="contained" type="submit">Make Admin</Button>
            </form>
            {success && <Alert severity="success">Make admin successfully</Alert>}
        </div>
    );
};

export default MakeAdmin;