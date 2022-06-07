import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Typography variant="footer" sx={{ fontWeight: "400" }} style={{textAlign: "center"}} gutterBottom>
        © Copyright The Paycheck Organization.<br/>
        All Rights Reserved
      </Typography>
    </Grid>
  );
}
