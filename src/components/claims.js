import { Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import Claim from "./claim";

function Claims() {

    const [claims, setClaims] = useState([])

    useEffect(() => {
        async function getClaims() {
            console.log("Getting claims");
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
            console.log(data);
            setClaims(data.claims);
        }
        getClaims();
    }, [])

    return (
        <>
            <Paper elevation={5} sx={{
                width: "15%",
                padding: "1rem",
                textAlign: "center",
                margin: "1rem"
            }}>
                <Typography> Total Claims: {claims.length} </Typography>
            </Paper>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                {claims.map((claim, index) => (
                    <>
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Claim key={index} claim={claim}/>
                        </Grid>
                    </>
                ))}
            </Grid>
        </>
    )
}

export default Claims;