import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box, Grid, Typography} from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Environmental_Data_Line = ({isCustomLineColors = false, isDashboard = false, data}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Env_Humi_data, setEnv_Humi_data] = useState([]);
    const [Env_temp_data, setEnv_temp_data] = useState([]);
    const [Env_Lux_data, setEnv_Lux_data] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/enviromentdata');
                let env_humi = []
                let env_temp = []
                let env_lux = []

                response.data.data.forEach((e) => {
                    env_humi.push({
                        x: e.Time_real_Date,
                        y: e.Env_Humi,
                    })
                    env_temp.push({
                        x: e.Time_real_Date,
                        y: e.Env_temp,
                    })
                    env_lux.push({
                        x: e.Time_real_Date,
                        y: e.Env_Lux,
                    })
                })
                setEnv_Humi_data(env_humi);
                setEnv_temp_data(env_temp);
                setEnv_Lux_data(env_lux);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Box m="20px">
            <Box height="75vh">
                <Grid container spacing={3} sx={{ height: '100%' }}>
                    <Grid item xs={12} md={6} sx={{ height: '50%' }}>
                        <Typography variant="h3" align="center" gutterBottom>
                            <Header subtitle="Environmental Humidity"/>
                        </Typography>
                        <LineChart data={Env_Humi_data} />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ height: '50%' }}>
                        <Typography variant="h3" align="center" gutterBottom>
                            <Header subtitle="Environmental Temperature"/>
                        </Typography>
                        <LineChart data={Env_temp_data} />
                    </Grid>
                    <Grid item xs={12} md={1} sx={{ height: '55%', marginTop: '40px' }}>
                    </Grid>
                    <Grid item xs={12} md={10} sx={{ height: '55%', marginTop: '40px' }}>
                        <Typography variant="h3" align="center" gutterBottom>
                            <Header subtitle="Environmental Lux"/>
                        </Typography>
                        <LineChart data={Env_Lux_data} />
                    </Grid>
                    <Grid item xs={12} md={1} sx={{ height: '55%', marginTop: '40px' }}>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Environmental_Data_Line;
