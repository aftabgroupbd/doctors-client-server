import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import doctor from '../../../images/doctor.png';
import Bg from '../../../images/appointment-bg.png';

const appointmentBanner = {
    background: `url(${Bg})`,
    backgroundColor: 'rgba(45,58,74,.8)',
    backgroundBlendMode: 'darken,luminosity',
    marginTop: 175
}

const AppoinmentBanner = () => {
    return (
        <Box style={appointmentBanner} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <img
                        style={{ width: 400, marginTop: '-110px' }}
                        src={doctor} alt="" />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h6" sx={{ mb: 5 }} style={{ color: '#5CE7ED' }}>
                            Appointment
                        </Typography>
                        <Typography variant="h6" style={{ color: 'white' }}>
                            Make and Appointment Today
                        </Typography>
                        <Typography variant="h6" style={{ color: 'white', fontSize: '14px', fontWeight: 'normal' }}>
                            Make and Appointment Today.Make and Appointment Today.Make and Appointment Today.Make and Appointment Today.
                        </Typography>
                        <Button variant="contained">Learn More</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
};

export default AppoinmentBanner;