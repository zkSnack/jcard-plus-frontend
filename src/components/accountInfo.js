import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

function AccountInfo() {

  const [accountInfo, setAccountInfo] = useState({})
  
  useEffect(() => {
    async function getAccountInfo() {
        // const response = await fetch('http://localhost:8000/getAccountInfoResponse.json', {
        //     method: 'GET',
        //     mode: 'cors',
        // });
        const response = await fetch('http://localhost:8080/api/v1/getAccountInfo', {
            method: 'GET',
            mode: 'cors',
        });
        const data = await response.json();
        console.log('Account Info Data:', data);
        setAccountInfo(data);
    }
    getAccountInfo();
  }, [])

  return (
    <>
      <Typography variant="h5" sx={{
        fontWeight: "bold",
        paddingBottom: "1rem"
      }}> Account Information </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row"> Account ID </TableCell>
              <TableCell align="right"> {accountInfo.id} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"> Private Key </TableCell>
              <TableCell align="right"> {accountInfo.privateKey} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"> IDS </TableCell>
              <TableCell align="right"> {accountInfo.identityState} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AccountInfo;