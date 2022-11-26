import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'
import QrReader from 'react-qr-scanner'

function  AddProofDialog({open, handleClose, handleAdd}) {

  const handleScan = (data) => {
      if (data != null ) {
        data = JSON.parse(data.text);
        if (data.hasOwnProperty('url')) {
            handleAdd(data)
        }
    }
  }

  const previewStyle = {
    height: 240,
    width: 320,
  }

  const handleError = (data) => {
      console.log(data);
  }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Proof Request</DialogTitle>
            <DialogContent>
                <QrReader
                    delay={100}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddProofDialog