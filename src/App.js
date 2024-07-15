import {useState} from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Environmental_Data_Table from "./scenes/Env_data_table";
import Environmental_Data_Line from "./scenes/Environmental_data_line";
import Soil_Data_Line from "./scenes/Soil_data_line";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ColorModeContext, useMode} from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Register from "./scenes/Register_page";
import Login from "./scenes/Login";
import Soil_data_line2 from "./scenes/Soil_data_line2";
import Device1_Data_Table from "./scenes/Device1_data_table";
import Device2_Data_Table from "./scenes/Device2_data_table";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./scenes/NotFound";

function App() {
    const [isSidebar, setIsSidebar] = useState(true);
    const [theme, colorMode] = useMode();
    const location = useLocation();

    const isNotFound = ![
        '/env-data-table',
        '/device1-data-table',
        '/device2-data-table',
        '/environmental-data',
        '/soil-data-1',
        '/soil-data-2',
        '/faq',
        '/calendar',
        '/geography'
    ].includes(location.pathname);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className={`app ${isNotFound ? 'special-page' : ''}`}>
                    {!isNotFound && <Sidebar isSidebar={isSidebar}/>}
                    <main className="content">
                        {!isNotFound && <Topbar setIsSidebar={setIsSidebar}/>}
                        <Routes>
                            <Route path="/" element={<Login/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/env-data-table"
                                   element={<PrivateRoute element={<Environmental_Data_Table/>}/>}/>
                            <Route path="/device1-data-table"
                                   element={<PrivateRoute element={<Device1_Data_Table/>}/>}/>
                            <Route path="/device2-data-table"
                                   element={<PrivateRoute element={<Device2_Data_Table/>}/>}/>
                            <Route path="/environmental-data"
                                   element={<PrivateRoute element={<Environmental_Data_Line/>}/>}/>
                            <Route path="/soil-data-1" element={<PrivateRoute element={<Soil_Data_Line/>}/>}/>
                            <Route path="/soil-data-2" element={<PrivateRoute element={<Soil_data_line2/>}/>}/>
                            <Route path="/faq" element={<PrivateRoute element={<FAQ/>}/>}/>
                            <Route path="/calendar" element={<PrivateRoute element={<Calendar/>}/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/geography" element={<PrivateRoute element={<Geography/>}/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
