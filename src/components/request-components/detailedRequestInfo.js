import {Typography, Paper} from "@mui/material";

function RequestInfoDetail({proofRequest}) {
  console.log("Request Info Detail:", proofRequest)
  return (
    <div className="request-info-detail">
      <Paper>
        <Typography variant="body1" sx={{
          fontWeight: "bold",
          paddingBottom: "1rem",
          textAlign: "center"
        }}> Full Proof Request Information </Typography>
        <Typography gutterBottom variant="body2"> {`ID: ${proofRequest.proofRequestData.id}`} </Typography>
        <Typography gutterBottom variant="body2"> {`Message: ${proofRequest.proofRequestData.body.message}`} </Typography>
        <Typography gutterBottom variant="body2"> {`Reason: ${proofRequest.proofRequestData.body.reason}`} </Typography>
        <Typography gutterBottom variant="body2"> {`Allowed Issuers: ${proofRequest.proofRequestData.body.scope[0].rules.query.allowedIssuers}`} </Typography>
        <Typography gutterBottom variant="body2"> {`Schema URL: ${proofRequest.proofRequestData.body.scope[0].rules.query.schema.url}`} </Typography>
        <Typography gutterBottom variant="body2"> {`Credential Type: ${proofRequest.proofRequestData.body.scope[0].rules.query.schema.type}`} </Typography>
      </Paper>
    </div>
  )
}

export default RequestInfoDetail