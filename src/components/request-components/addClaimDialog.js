import * as React from 'react';
import { useState } from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemButton } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';

const issuerURLs = ['localhost:8090'];

function AddClaimDialog({onClose, open, onSelect}) {
  const [issuerURL, setIssuerURL] = useState('');
  const [addIssuerOpen, setAddIssuerOpen] = useState(false);

  const handleListItemClick = (value) => {
    if (value == null) {
      value = issuerURLs[0];
    }
    onSelect(value);
  };

  // TODO: Check if issuerURL is valid and already exists in issuerURLs or not
  const addIssuerURL = () => {
    issuerURLs.push(issuerURL);
    setIssuerURL('');
    setAddIssuerOpen(false);
  };

  const addIssuer = () => {
    setAddIssuerOpen(true);
  };

  const handleAddIssuerClose = () => {
    setAddIssuerOpen(false);
  };

  const handleUrlChange = (event) => {
    setIssuerURL(event.target.value);
  };

  return (
    <>
      <Dialog onClose={() => onClose()} open={open}>
        <DialogTitle sx={{
          textAlign: 'center',
        }}>Select Claim Issuer</DialogTitle>
        <List sx={{ pt: 0 }}>
          {issuerURLs.map((issuerURL) => (
            <ListItem key={issuerURL}>
              <ListItemButton onClick={() => handleListItemClick(issuerURL)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={issuerURL} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem onClick={() => addIssuer()}>
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
          <TextField
            autoFocus
            margin="dense"
            id="issuerURL"
            label="Issuer URL"
            type="url"
            fullWidth
            variant="standard"
            onChange={handleUrlChange}
          />
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