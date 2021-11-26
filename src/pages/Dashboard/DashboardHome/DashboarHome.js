import { Grid } from '@mui/material';
import * as React from 'react';
import Calander from '../../Shared/Navigation/Calander/Calander';
import Appintments from '../Appintments/Appintments';

const DashboarHome = () => {
    const [date, setDate] = React.useState(new Date());
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Calander date={date} setDate={setDate}></Calander>
            </Grid>
            <Grid item xs={12} md={8}>
                <Appintments date={date}></Appintments>
            </Grid>
        </Grid>
    );
};

export default DashboarHome;