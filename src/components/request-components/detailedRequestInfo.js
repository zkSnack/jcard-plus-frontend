import {Typography, Paper} from "@mui/material";
import { Grid } from "@mui/material";
import { blue } from "@mui/material/colors";

function transfromProofReqData(queryData) {
  const transformedProofReqDataArr = [];
  for (let i = 0; i < queryData.length; i++) {
    let proofReqData = queryData[i].data;
    let transformedProofReqData = {};
    for (let data in proofReqData) {
      transformedProofReqData["field"] = data;
      transformedProofReqData["fieldPredicate"] = [];
      transformedProofReqData["value"] = [];
      for (let value in proofReqData[data]) {
        transformedProofReqData['fieldPredicate'].push(value);
        transformedProofReqData['value'].push(proofReqData[data][value]);
      }
    }
    transformedProofReqDataArr.push(transformedProofReqData);
  }
  return transformedProofReqDataArr
}

function RequestInfoDetail({proofRequest}) {

  const transformedProofReqDataArr = transfromProofReqData(proofRequest.queryData);

  return (
    <div className="request-info-detail">
      <Typography variant="body1" sx={{
        fontWeight: "bold",
        paddingBottom: "1rem",
        textAlign: "center"
      }}> Full Proof Request Information </Typography>
      <Typography gutterBottom variant="body2"> {`ID: ${proofRequest.id}`} </Typography>
      <Typography gutterBottom variant="body2"> {`Message: ${proofRequest.message}`} </Typography>
      <Typography gutterBottom variant="body2"> {`Reason: ${proofRequest.reason}`} </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {proofRequest.queryData.map((query, index) => (
            <>
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Paper elevation={5} sx={{
                  padding: "1rem",
                  backgroundColor: blue[300],
                  color: "black",
                }}>
                  <Typography gutterBottom variant="body1"> {`Query ${index + 1}`} </Typography>
                  <Typography gutterBottom variant="body2"> {`Allowed Issuers: ${query.allowedIssuers}`} </Typography>
                  <Typography gutterBottom variant="body2"> Schema URL: <a href={query.schemaURL} target="blank">View Schema</a> </Typography>
                  <Typography gutterBottom variant="body2"> {`Schema Hash: ${query.schemaHash}`} </Typography>
                  <Typography gutterBottom variant="body2"> {`Credential Type: ${query.credentialType}`} </Typography>
                  <Typography gutterBottom variant="body2"> Request Proof: </Typography>
                  {
                    transformedProofReqDataArr[index].fieldPredicate.map((fieldPredicate, fieldPredicateIndex) => (
                      <Typography gutterBottom variant="body2"> {`Condition ${fieldPredicateIndex+1}: ${transformedProofReqDataArr[index].field} ${fieldPredicate} ${transformedProofReqDataArr[index].value[fieldPredicateIndex]}`} </Typography>
                    ))
                  }
                </Paper>
              </Grid>
            </>
          ))}
      </Grid>
    </div>
  )
}

export default RequestInfoDetail