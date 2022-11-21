import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

function ProofRequests({rows}) {
    console.log("Approved Proof Requests:", rows)
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"/>
              <TableCell>Sender</TableCell>
              <TableCell align="center">Receiver</TableCell>
              <TableCell align="center">Claim Hash</TableCell>
              <TableCell align="center">Credential Type</TableCell>
              <TableCell align="center">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <ExpandableTableRow key={row.proofRequestData.id} expandComponent={<TableCell colSpan={6}><RequestInfoDetail proofRequest={row} /></TableCell>} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.proofRequestData.from}
                </TableCell>
                <TableCell align="center">{row.proofRequestData.to}</TableCell>
                <TableCell align="center">{row.proofRequestData.thid}</TableCell>
                <TableCell align="center">Age Credential</TableCell>
                <TableCell align="center">{row.timeStamp}</TableCell>
              </ExpandableTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default ProofRequests;