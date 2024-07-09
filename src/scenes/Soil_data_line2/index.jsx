import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box, Button, Grid, Typography, useTheme} from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import {tokens} from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import MultipleLineChart from "../../components/MultipleLineChart";
import LandscapeIcon from '@mui/icons-material/Landscape';


const Soil_Data_Line = ({isCustomLineColors = false, isDashboard = false, data}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/soildata2');
                const soil_temp = response.data.data.map(e => ({
                    x: e.Time_real_Date,
                    y: e.Soil_temp,
                }));
                const soil_humi = response.data.data.map(e => ({
                    x: e.Time_real_Date,
                    y: e.Soil_humi,
                }));

                setData1(soil_temp);
                setData2(soil_humi);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);


    return (
        <Box m="20px">
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                <Box
                    gridColumn="span 4"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="12,361"
                        subtitle="Soil Temperature"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <LandscapeIcon
                                sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 4"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="431,225"
                        subtitle="Soil Humidity"
                        progress="0.50"
                        increase="+21%"
                        icon={
                            <LandscapeIcon
                                sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 4"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="32,441"
                        subtitle="Predicted-soil-humidity"
                        progress="0.30"
                        increase="+5%"
                        icon={
                            <LandscapeIcon
                                sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                            />
                        }
                    />
                </Box>
            </Box>
            <Box height="75vh">
                <Grid container spacing={3} sx={{height: '100%'}}>
                    <Grid item xs={12} md={12} sx={{height: '80%', marginTop: '50px'}}>
                        <Typography variant="h3" align="center" gutterBottom>
                            <Header subtitle="Soil Temperature and Humidity"/>
                        </Typography>
                        <MultipleLineChart data={[data1,data2]} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Soil_Data_Line;
