import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material'

function  AddProofDialog({open, handleClose, handleAdd}) {
  let url = "";

  const handleUrlChange = (event) => {
    url = event.target.value;
  }

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Proof Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the URL of the proof request you would like to add.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="proofRequestURL"
            label="Proof Request URL"
            type="url"
            fullWidth
            variant="standard"
            onChange={handleUrlChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleAdd(url)}>Add</Button>
        </DialogActions>
      </Dialog>
  )
}

export default AddProofDialog