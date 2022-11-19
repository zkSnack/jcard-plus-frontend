import { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from '@mui/lab';

import PendingRequests from "./request-components/pendingRequests";

function QueryRequests() {
    
    const [currentTabState, setCurrentTabState] = useState("pending");

    const changeTabState = (event, newTabState) => {
        setCurrentTabState(newTabState);
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={currentTabState}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={changeTabState}>
                    <Tab label="Pending" value="pending" />
                    <Tab label="Approved" value="approved" />
                    <Tab label="Declined" value="declined" />
                </TabList>
                </Box>
                <TabPanel value="pending">
                    <PendingRequests />
                </TabPanel>
                <TabPanel value="approved">ApprovedRequests</TabPanel>
                <TabPanel value="declined">DeclinedRequests</TabPanel>
            </TabContext>
        </Box>
    )
}

export default QueryRequests;