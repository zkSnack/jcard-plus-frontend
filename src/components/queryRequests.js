import { useState, useEffect } from "react";
import { Box, Tab, Button, Backdrop, CircularProgress } from "@mui/material";
import { TabContext, TabList, TabPanel } from '@mui/lab';

import PendingRequests from "./request-components/pendingRequests";
import ProofRequests from "./request-components/proofRequests";
import AddProofDialog from "./request-components/addProofDialog";

function QueryRequests() {

    const [currentTabState, setCurrentTabState] = useState("pending");
    const [pendingRequests, setPendingRequests] = useState([]);
    const [completedRequests, setCompletedRequests] = useState([]);
    const [openAddProofDialog, setOpenAddProofDialog] = useState(false);
    const [openBackToPendingDialog, setOpenBackToPendingDialog] = useState(false);
    const [fetchRequests, setFetchRequests] = useState(false);

    function updateRequestList(requests) {
        const pending = requests?.filter(request => request.status === "pending");
        const completed = requests?.filter(request => request.status === "accepted");
        setPendingRequests(pending);
        setCompletedRequests(completed);
    }

    const handleClickOpenAddProofDialog = () => {
        setOpenAddProofDialog(true);
    }

    const handleCloseAddProofDialog = () => {
        setOpenAddProofDialog(false);
    }

    // TO-DO: Add proper error handling
    const handleAddProofDialog = async (url) => {
        setOpenAddProofDialog(false);
        setOpenBackToPendingDialog(true);
        let response = await fetch('http://localhost:8080/api/v1/addProofRequest', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(url),
        });
        let data = await response.json();
        if (data.status === "success") {
            setFetchRequests(!fetchRequests);
        } else {
            console.log("Proof Request failed to add");
        }
        setOpenBackToPendingDialog(false);
    }
    

    useEffect(() => {
        async function getProofRequests() {
            // const response = await fetch('http://localhost:8000/getRequestsResponse.json', {
            //     method: 'GET',
            //     mode: 'cors',
            // });
            const response = await fetch('http://localhost:8080/api/v1/getProofRequests', {
                method: 'GET',
                mode: 'cors',
            });
            const data = await response.json();
            updateRequestList(data.proofRequests);
        }
        getProofRequests();
      }, [fetchRequests])

    const changeTabState = (event, newTabState) => {
        setCurrentTabState(newTabState);
    }

    const requestForReload = () => {
        setFetchRequests(!fetchRequests);
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackToPendingDialog}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Button variant="outlined" onClick={handleClickOpenAddProofDialog}>Add Proof Request</Button>
            <AddProofDialog open={openAddProofDialog} handleClose={handleCloseAddProofDialog} handleAdd={handleAddProofDialog}/>
            <TabContext value={currentTabState}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={changeTabState}>
                    <Tab label="Pending" value="pending" />
                    <Tab label="Approved" value="approved" />
                    <Tab label="Declined" value="declined" />
                </TabList>
                </Box>
                <TabPanel value="pending">
                    <PendingRequests rows={pendingRequests} reload={requestForReload} />
                </TabPanel>
                <TabPanel value="approved">
                    <ProofRequests rows={completedRequests}/>
                </TabPanel>
                <TabPanel value="declined">Currently not supported. Coming Soon!!</TabPanel>
            </TabContext>
        </Box>
    )
}

export default QueryRequests;