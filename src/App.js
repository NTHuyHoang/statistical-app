import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Environmental_Data_Line from "./scenes/Environmental_data_line";
import Soil_Data_Line from "./scenes/Soil_data_line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Register from "./scenes/Register_page";
import Login from "./scenes/Login";

function App() {
  const [isSidebar, setIsSidebar] = useState(true);
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const isSpecialPage = location.pathname === '/register' || location.pathname === '/login';

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className={`app ${isSpecialPage ? 'special-page' : ''}`}>
            {!isSpecialPage && <Sidebar isSidebar={isSidebar} />}
            <main className="content">
              {!isSpecialPage && <Topbar setIsSidebar={setIsSidebar} />}
              <Routes>
                 {/*<Route path="/" element={<Dashboard />} /> */}
                {/* <Route path="/team" element={<Team />} /> */}
                {/* <Route path="/contacts" element={<Contacts />} /> */}
                {/* <Route path="/invoices" element={<Invoices />} /> */}
                <Route path="/form" element={<Form />} />
                {/* <Route path="/bar" element={<Bar />} /> */}
                {/* <Route path="/pie" element={<Pie />} /> */}
                <Route path="/" element={<Environmental_Data_Line />} />
                <Route path="/Soil-data" element={<Soil_Data_Line />} />
                {/* <Route path="/faq" element={<FAQ />} /> */}
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/geography" element={<Geography />} /> */}
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
