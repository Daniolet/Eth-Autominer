import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";

const CardWrapper = styled(Card)(({ theme }) => ({
  border: "1px solid #cfb1fb",
  backgroundImage: "linear-gradient(90deg, #9ac1e4 0%, #ade6e7 100%)",
  marginTop: "30px"
}));

const CustomButtonDark = styled(Button)(({ theme }) => ({
  color: "#F8F0E3",
  border: `1px solid ${theme.palette.text.textLight}`,
  backgroundColor: "#46494C",

  padding: "8px 18px",
  '&:hover,&:focus': {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.text.textLight,
    boxShadow: 'none',
    color: "#f4b52d",
  },
  "&:disabled": {
    color: theme.palette.text.textLight,
    background: theme.palette.text.darkBgColor,
    borderColor: theme.palette.text.textLight,
  },
}));
const ButtonContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    "> div": {
      marginLeft: 0,
      marginRight: 0
    }
  }
}));

export default function Statistics() {
  return (
    <CardWrapper>
      <CardContent sx={{ p: 3 }}>
        <Typography sx={{ mb: 1 }} variant="body1">
          STATISTICS:
        </Typography>
        <Divider sx={{ mb: 2 }} style={{color: "#282cbb", height: 2}}></Divider>
        <Grid container columnSpacing={3}>
          <Grid item md={5} xs={12}>
            <Box component="div" sx={{ width: "100%" }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="primary" gutterBottom>
                    Weekly Return
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    8%
                  </Typography>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="primary" gutterBottom>
                    APR
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    417.14%
                  </Typography>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="primary" gutterBottom>
                    Minimum Deposit
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    0.01 ETH
                  </Typography>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="primary" gutterBottom>
                    Max Compound
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    100%
                  </Typography>
                </Grid>
            </Box>
          </Grid>
          <Grid item md={0.5} xs={12}></Grid>
          <Grid item md={6.5} xs={12}>
            <Box component="div" sx={{ width: "100%" }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="primary" gutterBottom>
                    Deposit Fee
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    10% (5% TVL 5% DEV)
                  </Typography>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="primary" gutterBottom>
                    Withdraw Fee
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    10% (5% TVL 5% DEV)
                  </Typography>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="primary" gutterBottom>
                    Compound Fee
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    0%
                  </Typography>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="primary" gutterBottom>
                    Referral Collect Fee
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    0%
                  </Typography>
                </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </CardWrapper>
  );
}
