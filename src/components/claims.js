import { Typography, Paper, CircularProgress, Backdrop } from "@mui/material";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import AddClaimDialog from "./request-components/addClaimDialog";
import Button from '@mui/material/Button';
import Claim from "./claim";

function Claims() {
    const [claims, setClaims] = useState([])
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);

    const getClaimsByIssuer = async (issuerURL) => {
        if(issuerURL) {
            setLoading(true);
            let protocol = 'https://';
            // Add protocol if not present
            if (issuerURL.startsWith('http') || issuerURL.startsWith('https')) {
                protocol = '';
            } else if (issuerURL.includes('localhost')) {
                protocol = 'http://';
            }
            const body = {
                issuerURL: protocol + issuerURL
            };
            try {
                // Use this for testing with a local file
                // await fetch('http://localhost:8000/fetchClaimsResponse.json', {
                //     method: 'GET',
                //     mode: 'cors',
                // });
                await fetch('http://localhost:8080/api/v1/fetchClaimsByIssuer', {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(body),
                });
                setReload(reload => !reload);
            } catch (error) {
                console.log("Error: ", error);
            }
            setLoading(false);
        }
    }
  
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    }
  
    const handleDialogSelection = (value) => {
        setOpen(false);
        getClaimsByIssuer(value);
    };

    useEffect(() => {
        async function getClaims() {
            // Use this for testing with a local file
            // const response = await fetch('http://localhost:8000/getClaimsResponse.json', {
            //     method: 'GET',
            //     mode: 'cors',
            // });
            try {
                const response = await fetch('http://localhost:8080/api/v1/getClaims', {
                    method: 'GET',
                    mode: 'cors',
                });
                const data = await response.json();
                if (data.hasOwnProperty('claims')) {
                    setClaims(data.claims || []); // if data.claims is null, set it to an empty array
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        getClaims();
    }, [reload]);
    
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>ADD CLAIM REQUEST</Button>
            <AddClaimDialog
                open={open}
                onClose={handleDialogClose}
                onSelect={handleDialogSelection}/>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Paper elevation={5} sx={{width: "15%", padding: "1rem", textAlign: "center", margin: "1rem"}}>
                <Typography> Total Claims: {claims.length} </Typography>
            </Paper>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                {claims.map((claim, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Claim key={index} claim={claim}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default Claims;