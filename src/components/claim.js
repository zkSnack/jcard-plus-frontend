import { Card, CardActions, CardContent, Button, Typography, CardHeader, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { blue, green, purple } from '@mui/material/colors';

const ClaimCard = styled(Card)(({ theme }) => ({
  maxWidth: 500,
  backgroundColor: green[600],
  color: "black",
}));


function Claim({claim, handleDelete}) {

  return (
    <ClaimCard sx={{ elevation: "3" }}>
      <CardHeader 
        title={claim.credentialType}
        subheader={claim.id}
        sx={{ backgroundColor: purple[400]}}
      />
      <CardContent>
        <Typography gutterBottom variant="body2">
          {/* Careful: Opening a URL in new page might introduce some vulnerability if attacker can manipulate schemaURL*/}
          Schema URL: <a href={claim.schemaURL} target="blank">View Schema</a>
        </Typography>
        <Typography gutterBottom variant="body2"> {`Expiration: ${claim.expiration}`} </Typography>
        <Typography gutterBottom variant="body2"> {`Updatable: ${claim.updatable}`} </Typography>
        <Typography gutterBottom variant="body2"> {`Version: ${claim.version}`} </Typography>
        <Typography gutterBottom variant="body2"> {`Revocation Nonce: ${claim.revocationNonce}`} </Typography>
        <Typography gutterBottom variant="body2"> {`Revocation Status: ${claim.revocationStatus}`} </Typography>
        <Paper sx={{
          backgroundColor: blue[400],
          color: "black",
        }}>
          <Typography gutterBottom variant="body1" sx={{
            textAlign: "center",
          }}> Claim Data: </Typography>
          {Object.keys(claim.claimData).map((key, index) => {
            return (
              <Typography gutterBottom variant="body2"> {`${key}: ${claim.claimData[key]}`} </Typography>
            )
          })}
        </Paper>
        <Typography gutterBottom variant="body2" sx={{
          textAlign: "center",
          color: "white",
        }}> {`Issued By: ${claim.issuerID}`} </Typography>
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