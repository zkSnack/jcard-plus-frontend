import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import Claim from "./claim";

function Claims() {

    const [claims, setClaims] = useState([])

    useEffect(() => {
        async function getClaims() {
            console.log("Getting claims");
            const response = await fetch('http://localhost:8000/getClaimsResponse.json', {
                method: 'GET',
                mode: 'cors',
            });
            const data = await response.json();
            console.log(data);
            setClaims(data.claims);
        }
        getClaims();
    }, [])

    function deleteClaim(id) {
        console.log("Deleting claim with ID: " + id);
    }

    return (
        <>
            <Typography> Claims: {claims.length} </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {claims.map((claim, index) => (
                    <>
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Claim key={index} claim={claim} handleDelete={deleteClaim}/>
                        </Grid>
                    </>
                ))}
            </Grid>
        </>
    )
}

export default Claims;