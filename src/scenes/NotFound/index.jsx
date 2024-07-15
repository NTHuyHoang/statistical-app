import React from 'react';
import {Box, Typography} from "@mui/material";

const NotFound = ({setIsSidebar}) => {
    React.useEffect(() => {
        if (setIsSidebar) {
            setIsSidebar(false);
        }
    }, [setIsSidebar]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Typography variant="h1" sx={{fontSize: '4.5rem'}}>404| </Typography>
            <Typography variant="h6" sx={{fontSize: '3rem'}}>Page Not Found</Typography>
        </Box>
    );
};

export default NotFound;
