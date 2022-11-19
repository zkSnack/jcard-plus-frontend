import { Card, CardActions, CardContent, Button, Typography, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';

const ClaimCard = styled(Card)(({ theme }) => ({
  maxWidth: 500,
  backgroundColor: green[600],
}));


function Claim({claim, handleDelete}) {

  return (
    <ClaimCard sx={{ elevation: "3" }}>
      <CardHeader 
        title={claim.DisplayName}
        subheader={claim.Description}
      />
      <CardContent>
        <Typography gutterBottom variant="body2" sx={{ wordBreak: "break-word" }}> {`Issued By: ${claim.IssuerID} (${claim.IssuerDescription})`} </Typography>
        <Typography gutterBottom variant="body2"> Index Slot A: {claim.Data[2]} </Typography>
        <Typography gutterBottom variant="body2"> Index Slot B: {claim.Data[3]} </Typography>
        <Typography gutterBottom variant="body2"> Value Slot A: {claim.Data[6]} </Typography>
        <Typography gutterBottom variant="body2"> Value Slot B: {claim.Data[7]} </Typography>
      </CardContent>
      <CardActions sx={{
        float: "right",
        padding: "1rem"
      }}>
        <Button size="small" style={{ backgroundColor: blue[700], padding: "0.5rem"}} onClick={() => handleDelete(claim.id)}>Delete</Button>
      </CardActions>
    </ClaimCard>
  )
}

export default Claim;