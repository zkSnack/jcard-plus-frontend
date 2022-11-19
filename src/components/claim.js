import { Card, CardActions, CardContent, Button, Typography, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
import { pink, blue } from '@mui/material/colors';

const ClaimCard = styled(Card)(({ theme }) => ({
  maxWidth: 500,
  backgroundColor: pink[900],
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
        <Typography gutterBottom variant="body2"> Value Slot A: {claim.Data[4]} </Typography>
        <Typography gutterBottom variant="body2"> Value Slot B: {claim.Data[5]} </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" style={{ backgroundColor: blue[800] }} onClick={() => handleDelete(claim.id)}>Delete</Button>
      </CardActions>
    </ClaimCard>
  )
}

export default Claim;