import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Dialog, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material'
import { useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { blue, red } from '@mui/material/colors';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';

import RequestInfoDetail from './detailedRequestInfo';

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

function PendingRequests({rows, reload}) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isDone , setIsDone] = useState(false);
    const [isFailed, setIsFailed] = useState(false);

    const handleClose = () => {
      setOpen(false);
      setIsDone(false);
      setIsFailed(false);
    }


    const sendVerificationRequest = async (proofRequest) => {
      setOpen(true);
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/v1/acceptProofRequest?' + new URLSearchParams({
        requestId: proofRequest.id,
      }), {
          method: 'GET',
          mode: 'cors',
      });
      const data = await response.json();
      setLoading(false);
      if (data.status === "success") {
        reload();
        setIsDone(true);
        return true;
      }
      reload();
      setIsFailed(true);
      // Request parent to reload the data
      return false;
    }

    // TODO: Add logic to inform server that the request has been rejected
    async function rejectVerificationRequest(proofRequest) {
      console.log("Rejecting request:", proofRequest)
    }

    return (
      <>
        <Dialog open={open} style={{
          textAlign: 'center',
        }}>
          <DialogTitle>Generating & checking Proof</DialogTitle>
          <DialogContent>
            <div>
            { loading && <CircularProgress /> }
            { isDone && <IconButton size="large"> <DoneIcon sx={{ color: blue[500],}}/> </IconButton> }
            { isFailed && <ErrorIcon sx={{ color: red[500] }} /> }
            </div>
            <div>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            </div>
          </DialogContent>
        </Dialog>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"/>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Sender</TableCell>
                <TableCell align="center">Receiver</TableCell>
                <TableCell align="center">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <ExpandableTableRow key={row.id} expandComponent={
                  <TableCell colSpan={4}>
                    <RequestInfoDetail proofRequest={row} />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                      <Button size="small" sx={{
                        backgroundColor: blue[400],
                        color: "black",
                        margin: "1rem",
                        padding: "0.5rem",
                      }} onClick={() => sendVerificationRequest(row)}>Approve</Button>
                      <Button size="small" sx={{
                        backgroundColor: red[400],
                        color: "black",
                        margin: "1rem",
                        padding: "0.5rem",
                      }} onClick={() => rejectVerificationRequest(row)}>Reject</Button>
                    </div>
                  </TableCell>
                } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.to}</TableCell>
                  <TableCell align="center">{row.from}</TableCell>
                  <TableCell align="center">{row.timeStamp}</TableCell>
                </ExpandableTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
}

export default PendingRequests;