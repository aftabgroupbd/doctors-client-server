import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import login from '../../images/login.png';
const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, isLoading, authError, signInWithGoogle } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const handelOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
        console.log(loginData);
    }
    const handelLoginSubmit = (e) => {
        e.preventDefault();
        loginUser(loginData.email, loginData.password, location, history)
    }


    const handelGoogleSign = () => {
        signInWithGoogle(location, history);
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handelLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            onBlur={handelOnChange}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onBlur={handelOnChange}
                            variant="standard" />


                        <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained"> Login</Button>
                        <NavLink style={{ textDecoration: 'none' }} to="/register">
                            <Button>New user? please register</Button>
                        </NavLink>
                    </form>
                    <p>---------------------------</p>
                    <Button sx={{ width: '75%', m: 1 }} onClick={handelGoogleSign} variant="contained"> Google Sign In</Button>
                    {
                        isLoading && <CircularProgress />
                    }
                    {user?.email && <Alert severity="success">User login successfully.</Alert>}
                    {authError && <Alert severity="error">{authError}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={login} style={{ width: '100%' }} alt="" />
                </Grid>
            </Grid>
        </Container >
    );
};

export default Login;