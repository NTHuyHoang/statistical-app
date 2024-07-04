import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box, Grid, Typography} from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Soil_Data_Line = ({isCustomLineColors = false, isDashboard = false, data}) => {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://sanslab.ddns.net:5001/api/getdata?device_name=device_3');
                let soil_temp = []
                let soil_humi = []
                let soil_pH = []
                // let soil_nito = [];
                // let soil_phosp = [];
                // let soil_kali = [];
                // let soil_npk = [
                //     { id: 'Nito', data: [] },
                //     { id: 'Phosp', data: [] },
                //     { id: 'Kali', data: [] },
                // ];

                response.data.data.forEach((e) => {
                    soil_temp.push({
                        x: e.Time_real_Date,
                        y: e.Soil_temp,
                    })
                    soil_humi.push({
                        x: e.Time_real_Date,
                        y: e.Soil_humi,
                    })
                    // soil_pH.push({
                    //     x: e.Time_real_Date,
                    //     y: e.Soil_pH,
                    // })
                    // soil_npk[0].data.push({
                    //     x: e.Time_real_Date,
                    //     y: e.Soil_Nito,
                    // });
                    // soil_npk[1].data.push({
                    //     x: e.Time_real_Date,
                    //     y: e.Soil_Phosp,
                    // });
                    // soil_npk[2].data.push({
                    //     x: e.Time_real_Date,
                    //     y: e.Soil_Kali,
                    // });
                })
                setData1(soil_temp);
                setData2(soil_humi);
                setData3(soil_pH);
                // setData4(soil_npk);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box m="20px">
            {/*<Header title="Line Charts" subtitle="Data Line Charts"/>*/}
            <Box height="75vh">
                <Grid container spacing={3} sx={{height: '100%'}}>
                    <Grid item xs={12} md={12} sx={{height: '50%'}}>
                        <Typography variant="h3" align="center" gutterBottom>
                            <Header subtitle="Soil Temparature"/>
                        </Typography>
                        <LineChart data={data1}/>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{height: '50%', marginTop: '75px'}}>
                        <Typography variant="h3" align="center" gutterBottom>
                            <Header subtitle="Soil Humidity"/>
                        </Typography>
                        <LineChart data={data2}/>
                    </Grid>
                    {/*<Grid item xs={12} md={6} sx={{height: '50%', marginTop: '100px'}}>*/}
                    {/*    <Typography variant="h3" align="center" gutterBottom>*/}
                    {/*        <Header subtitle="Soil pH"/>*/}
                    {/*    </Typography>*/}
                    {/*    <LineChart data={data3}/>*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={12} md={6} sx={{height: '50%', marginTop: '100px'}}>*/}
                    {/*    <Typography variant="h3" align="center" gutterBottom>*/}
                    {/*        <Header subtitle="Soil NPK"/>*/}
                    {/*    </Typography>*/}
                    {/*    <LineChart data={data4}/>*/}
                    {/*</Grid>*/}
                </Grid>
            </Box>
        </Box>
    );
};

export default Soil_Data_Line;
