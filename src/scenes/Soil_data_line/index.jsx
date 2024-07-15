import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box, Grid, Typography, useTheme} from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import {tokens} from "../../theme";
import LandscapeIcon from '@mui/icons-material/Landscape';
import {parseISO, getDate} from 'date-fns';

const Soil_Data_Line = ({isCustomLineColors = false, isDashboard = false, data}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [forecastData, setForecastData] = useState([]);
    const [device1Data, setDevice1Data] = useState([]);
    const [soilTempAverage, setSoilTempAverage] = useState(null);
    const [soilHumiAverage, setSoilHumiAverage] = useState(null);
    const [PredictedSoilHumidityAverage, setPredictedSoilHumidityAverage] = useState(null);

    useEffect(() => {
        const fetchSoilData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/soildata1');
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

        const fetchForecastData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/dataforecast');
                const result = response.data.data;

                if (Array.isArray(result)) {
                    const formattedData = result.map((item) => {
                        // Trừ đi 7 giờ từ thời gian lấy về
                        const adjustedDateTime = new Date(parseISO(item.date_time));
                        adjustedDateTime.setHours(adjustedDateTime.getHours() - 7);

                        return {
                            Predicted_soil_humidity: item.predicted_soil_humidity,
                            Date_time: adjustedDateTime,
                        };
                    });

                    // Lấy ngày gần nhất
                    const latestDate = new Date(Math.max(...formattedData.map(item => item.Date_time.getTime())));

                    // Lấy dữ liệu của ngày gần nhất

                    const latestDayData = formattedData.filter(item =>
                        getDate(item.Date_time) === getDate(latestDate) &&
                        item.Date_time.getMonth() === latestDate.getMonth() &&
                        item.Date_time.getFullYear() === latestDate.getFullYear()
                    );


                    // Tính giá trị trung bình của predicted_soil_humidity cho ngày gần nhất
                    const averagePredictedSoilHumidity = latestDayData.reduce((acc, item) => acc + item.Predicted_soil_humidity, 0) / latestDayData.length;
                    setPredictedSoilHumidityAverage(averagePredictedSoilHumidity.toFixed(3));

                    setForecastData(formattedData);
                } else {
                    console.error("API response is not an array:", result);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchDevice1Data = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/soildata1');
                const result = response.data.data;

                if (Array.isArray(result)) {
                    const formattedData = result.map((item) => {
                        // Trừ đi 7 giờ từ thời gian lấy về
                        const adjustedDateTime = new Date(parseISO(item.Time_real_Date));
                        adjustedDateTime.setHours(adjustedDateTime.getHours());

                        return {
                            Soil_temp: item.Soil_temp,
                            Soil_humi: item.Soil_humi,
                            Date_time: adjustedDateTime,
                        };
                    });


                    // Lấy ngày gần nhất
                    const latestDate = new Date(Math.max(...formattedData.map(item => item.Date_time.getTime())));

                    // Lấy dữ liệu của ngày gần nhất
                    const latestDayData = formattedData.filter(item =>
                        getDate(item.Date_time) === getDate(latestDate) &&
                        item.Date_time.getMonth() === latestDate.getMonth() &&
                        item.Date_time.getFullYear() === latestDate.getFullYear()
                    );

                    // Tính giá trị trung bình của Soil_temp và Soil-humi cho ngày gần nhất
                    const averageSoilTemp = latestDayData.reduce((acc, item) => acc + item.Soil_temp, 0) / latestDayData.length;
                    const averageSoilHumi = latestDayData.reduce((acc, item) => acc + item.Soil_humi, 0) / latestDayData.length;

                    setSoilTempAverage(averageSoilTemp.toFixed(2));
                    setSoilHumiAverage(averageSoilHumi.toFixed(3));


                    setDevice1Data(formattedData);
                } else {
                    console.error("API response is not an array:", result);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };


        fetchSoilData();
        fetchForecastData();
        fetchDevice1Data();
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
                        title={soilTempAverage !== null ? `${soilTempAverage} °C` : "Loading..."}
                        subtitle="Soil Temperature"
                        progress="0.75"
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
                        title={soilHumiAverage !== null ? `${soilHumiAverage} %` : "Loading..."}
                        subtitle="Soil Humidity"
                        progress="0.50"
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
                        title={PredictedSoilHumidityAverage !== null ? `${PredictedSoilHumidityAverage} %` : "Loading..."}
                        subtitle="Predicted Soil Humidity"
                        progress="0.30"
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
                    <Grid item xs={12} md={6} sx={{height: '65%', marginTop: '120px'}}>
                        <Typography variant="h3" align="center" gutterBottom>
                            <Header subtitle="Soil Temperature"/>
                        </Typography>
                        <LineChart data={data1}/>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{height: '65%', marginTop: '120px'}}>
                        <Typography variant="h3" align="center" gutterBottom>
                            <Header subtitle="Soil Humidity"/>
                        </Typography>
                        <LineChart data={data2}/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Soil_Data_Line;
