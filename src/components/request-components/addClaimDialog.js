import * as React from 'react';
import { useState } from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, FormControl, Typography } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Box } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';

// TODO: Fetch data from backend or atleast don't hardcode token into the code
const issuerURLs = [{
  url: 'localhost:8090',
  token: 'fe7d9c51-5dcf-46dd-8bbc-ae9a0b716ee3'
}]

function AddClaimDialog({onClose, open, onSelect}) {
  const [issuerURL, setIssuerURL] = useState('');
  const [issuerToken, setIssuerToken] = useState('');
  const [addIssuerOpen, setAddIssuerOpen] = useState(false);

  const handleListItemClick = (value) => {
    if (value == null) {
      value = issuerURLs[0];
    }
    onSelect(value);
  };

  // TODO: Check if issuerURL is valid and already exists in issuerURLs or not
  const addIssuerURL = () => {
    const issuerData = {
      url: issuerURL,
      token: issuerToken,
    };
    issuerURLs.push(issuerData);
    setIssuerURL('');
    setIssuerToken('');
    setAddIssuerOpen(false);
  };

  const addIssuer = () => {
    setAddIssuerOpen(true);
  };

  const handleAddIssuerClose = () => {
    setAddIssuerOpen(false);
  };

  return (
    <>
      <Dialog onClose={() => onClose()} open={open}>
        <DialogTitle sx={{
          textAlign: 'center',
        }}>Select Claim Issuer</DialogTitle>
        <List sx={{ pt: 0 }}>
          {issuerURLs.map((issuerURL) => (
            <ListItem key={issuerURL.token}>
              <ListItemButton onClick={() => handleListItemClick(issuerURL)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                  <>
                    <Typography variant='body1'>{issuerURL.url}</Typography>
                    <Typography variant='body2'>{issuerURL.token}</Typography>
                  </>
                } />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem key="add-issuer-button" onClick={() => addIssuer()}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
        <Dialog open={addIssuerOpen} onClose={handleAddIssuerClose}>
        <DialogTitle>Add Issuer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the URL of the issuer you would like to add without http/https(e.g. localhost:8090)
          </DialogContentText>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 2 },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl variant="standard">
              <TextField
                autoFocus
                margin="dense"
                id="issuerURL"
                label="Issuer URL"
                type="url"
                variant="standard"
                onChange={(event) => setIssuerURL(event.target.value)}
              />
            </FormControl>
            <FormControl variant="standard">
              <TextField
                autoFocus
                margin="dense"
                id="issuerToken"
                label="Auth Token"
                variant="standard"
                onChange={(event) => setIssuerToken(event.target.value)}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddIssuerClose}>Cancel</Button>
          <Button onClick={() => addIssuerURL()}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddClaimDialog