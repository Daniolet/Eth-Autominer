import CardContent from "@mui/material/CardContent";
// import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";

// const CardWrapper = styled(Card)({
//   background: "rgb(251 241 225)",
// });
const Input = styled("input")(({ theme }) => ({
  fontSize: 12,
  fontWeight: 300,
  borderRadius: 50,
  padding: 10,
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  background: "transparent",
  width: "100%",
  outline: "none",
  '& label.Mui-focused': {
    color: '#ffffff00',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#ffffff00',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ffffff00',
    },
    '&:hover fieldset': {
      borderColor: '#ffffff00',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffffff00',
    },
  },
}));

export default function ReferralLink({ address }) {
  const link = `${window.origin}?ref=${address}`;
  return (
    <>
      <Typography sx={{ mb: 3 }} variant="body1">
        Referral Link:
      </Typography>
      <Input value={address ? link : ""} readOnly/>
      <Typography variant="body2" color="primary" sx={{ mt: 3, mb: 3}}>
        Earn 3% of the ETH deposited from anyone who uses your referral link.
      </Typography>
    </>
  );
}
