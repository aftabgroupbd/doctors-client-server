import { Button, Input, TextField } from '@mui/material';
import React, { useState } from 'react';

const AddDoctor = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);


    const handelSubmit = (e) => {
        e.preventDefault();
        if (!image) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', image);

        fetch()
    }
    return (
        <div>
            <h1>Add doctor</h1>
            <form>
                <TextField
                    sx={{ width: '50%' }}
                    label="name"
                    required
                    onChange={e => setName(e.target.value)}
                    variant="standard" />
                <br />
                <TextField
                    sx={{ width: '50%' }}
                    label="email"
                    required
                    onChange={e => setEmail(e.target.value)}
                    variant="standard" />
                <br />
                <Input
                    accept="image/*"
                    onChange={e => setImage(e.target.files[0])}
                    type="file" />
                <br />
                <Button variant="contained" type="submit">
                    Add Doctor
                </Button>
            </form>
        </div>
    );
};

export default AddDoctor;