import { RotatingLines } from 'react-loader-spinner';
import { Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import AddClaimDialog from "./request-components/addClaimDialog";
import Button from '@mui/material/Button';
import Claim from "./claim";
import React from "react";
import axios from 'axios';

function Claims() {
    const [claims, setClaims] = useState([])
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();
    const [reload, setReload] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
  
    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    useEffect(() => {
        async function getClaims() {
            // Use this for testing with a local file
            // const response = await fetch('http://localhost:8000/getClaimsResponse.json', {
            //     method: 'GET',
            //     mode: 'cors',
            // });
            const response = await fetch('http://localhost:8080/api/v1/getClaims', {
                method: 'GET',
                mode: 'cors',
            });
            const data = await response.json();
            if (data.hasOwnProperty('claims')) {
                setClaims(data.claims || []); // if data.claims is null, set it to an empty array
            }
        }
        getClaims();
    }, [reload])

    useEffect(() => {
        async function getClaimsByIssuer() {
            let issuerURL = 'http://localhost:8080/api/v1/fetchClaimsByIssuer';
            await axios.post(issuerURL, {
                issuerURL: selectedValue
            })
            .then((response) => {
                // view by response.data
                setReload(!reload);
            })
            .catch((error) => {
                console.log("Error: ", error)
            })
            setLoading(false);
        }
        getClaimsByIssuer();
        setLoading(true)
    }, [selectedValue])
    
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>ADD CLAIM REQUEST</Button>
            <AddClaimDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}/>
            {loading && 
                <div style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)', color:'red'}}>
                    <RotatingLines 
                        height="80"
                        width="80"
                        radius="9"
                        strokeColor="lightblue"
                        ariaLabel="loading"
                        wrapperStyle
                        wrapperClass
                    />
                </div>
            }
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