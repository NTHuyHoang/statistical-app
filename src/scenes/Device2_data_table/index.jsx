import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import Header from "../../components/Header";
import {useTheme} from "@mui/material";

const Device2_Data_Table = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [data, setData] = useState([]);

    useEffect(() => {
        // Hàm để lấy dữ liệu từ API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/soildata2');

                const result = response.data.data;

                // Kiểm tra nếu result là một mảng
                if (Array.isArray(result)) {
                    const formattedData = result.map((item,i) => ({
                        id: i+1, // Sử dụng _id làm id
                        Soil_temp: item.Soil_temp,
                        Soil_humi: item.Soil_humi,
                        Soil_pH: item.Soil_pH,
                        Soil_Nito: item.Soil_Nito,
                        Soil_Phosp: item.Soil_Phosp,
                        Soil_Kali: item.Soil_Kali,
                        Env_temp: item.Env_temp,
                        Env_Humi: item.Env_Humi,
                        Env_Lux: item.Env_Lux,
                        Time_real_Date: item.Time_real_Date,
                        Time_mqtt_Date: item.Time_mqtt_Date,
                    }));

                    console.log("Formatted Data:", formattedData); // Thêm dòng này để kiểm tra dữ liệu sau khi định dạng

                    setData(formattedData);
                } else {
                    console.error("API response is not an array:", result);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "Soil_temp",
            headerName: "Soil_temp",
            type: "number",
            headerAlign: "left",
            align: "left"
        },
        {
            field: "Soil_humi",
            headerName: "Soil_humi",
            type: "number",
            headerAlign: "left",
            align: "left"
        },
        {
            field: "Soil_pH",
            headerName: "Soil_pH",
            type: "number",
            headerAlign: "left",
            align: "left"
        },
        {
            field: "Soil_Nito",
            headerName: "Soil_Nito",
            type: "number",
            headerAlign: "left",
            align: "left"
        },
        {
            field: "Soil_Phosp",
            headerName: "Soil_Phosp",
            type: "number",
            headerAlign: "left",
            align: "left"
        },
        {
            field: "Soil_Kali",
            headerName: "Soil_Kali",
            type: "number",
            headerAlign: "left",
            align: "left"
        },
        {
            field: "Env_temp",
            headerName: "Env_temp",
            type: "number",
            headerAlign: "left",
            align: "left"
            // cellClassName: "name-column--cell",
        },
        {
            field: "Env_Humi",
            headerName: "Env_Humi",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "Env_Lux",
            headerName: "Env_Lux",
            type: "number",
            headerAlign: "left",
            align: "left"
        },

        {
            field: "Time_real_Date",
            headerName: "Time_real_Date",
            headerAlign: "left",
            type: "time",
            flex: 1,
        },
        {
            field: "Time_mqtt_Date",
            headerName: "Time_mqtt_Date",
            headerAlign: "left",
            type: "time",
            flex: 1,
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="Device2 Data Table"
                subtitle="Values of data fields"
            />
            <Box
                m="5px 0 0 0"
                height="80vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.redAccent[400],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.redAccent[400],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={data}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default Device2_Data_Table;
