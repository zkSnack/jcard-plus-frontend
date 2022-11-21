import { useState, useEffect } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from '@mui/lab';

import PendingRequests from "./request-components/pendingRequests";
import ProofRequests from "./request-components/proofRequests";

function QueryRequests() {
    
    const [currentTabState, setCurrentTabState] = useState("pending");
    const [pendingRequests, setPendingRequests] = useState([]);
    const [completedRequests, setCompletedRequests] = useState([]);

    function updateRequestList(requests) {
        const pending = requests.filter(request => request.status === "pending");
        const completed = requests.filter(request => request.status === "accepted");
        setPendingRequests(pending);
        setCompletedRequests(completed);
    }

    useEffect(() => {
        async function getProofRequests() {
            const response = await fetch('http://localhost:8000/getRequestsResponse.json', {
                method: 'GET',
                mode: 'cors',
            });
            const data = await response.json();
            console.log('Proof Response Data:', data);
            updateRequestList(data.requests);
        }
        getProofRequests();
      }, [])

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
                    <PendingRequests rows={pendingRequests}/>
                </TabPanel>
                <TabPanel value="approved">
                    <ProofRequests rows={completedRequests}/>
                </TabPanel>
                <TabPanel value="declined">DeclinedRequests</TabPanel>
            </TabContext>
        </Box>
    )
}

export default QueryRequests;