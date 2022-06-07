import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const FAQNew = () => {
  return (
    <Box component="div" sx={{ width: "100%", py: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "400" }} gutterBottom>
            HELPFUL NOTES
          </Typography>
          <Box component="ul" sx={{ color: "text.textLight" }}>
            <Box component="li">
              <Typography variant="body2">Rewards can be reinvested (compound) or withdrawn (collect) every 7 days</Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                You can not deposit, compound, or collect during the 7-day timer
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                When making new deposits any pending rewards will auto compound
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                It is encouraged to make a new deposit at least once every three months of an equal or higher 
                value than your largest deposit for the best sustainable results
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                You can not unstake; only withdraw earnings
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FAQNew;
