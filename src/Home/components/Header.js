// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { styled } from "@mui/system";
import { config } from "../../config";
import logo from "../../assets/logo.svg";
import Connect from "./Connect";

const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0,
    },
  },
}));
const CustomLinks = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: "600",
  cursor:"pointer",
  padding:"10px 16px",
  '&:hover': {
    color: theme.palette.text.textLight,
  },
  // '&:hover,&:focus,&:active': {
  //   color: theme.palette.primary.main,
  // },
}));

const LaunchTitle = styled("h3")(({ theme }) => ({
  color: theme.palette.text.textLight,
  marginTop: "10px",
  width: "100%",
  textAlign: "center",
  fontWeight: "bolder",
}));

const Countdown = styled("h3")(({ theme }) => ({
  color: theme.palette.text.textLight,
  width: "100%",
  textAlign: "center",
  fontWeight: "bolder",
  [theme.breakpoints.down("md")]: {
    fontSize: 15,
  },
}));


export default function Header() {

  const [countdown, setCountdown] = useState({
    alive: true,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const getCountdown = (deadline) => {
    const now = Date.now() / 1000;
    const total = deadline - now;
    const seconds = Math.floor((total) % 60);
    const minutes = Math.floor((total / 60) % 60);
    const hours = Math.floor((total / (60 * 60)) % 24);
    const days = Math.floor(total / (60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
        try {
            const data = getCountdown(1662968800)
            setCountdown({
                alive: data.total > 0,
                days: data.days,
                hours: data.hours,
                minutes: data.minutes,
                seconds: data.seconds
            })
        } catch (err) {
            console.log(err);
        }
    }, 1000);

    return () => clearInterval(interval);
  }, [])


  return (
    <Wrapper>
      <img src={logo} alt="" width={"42%"} style={{ marginTop: -10, minWidth: "225px" }} />
      <Connect responsive={false} />
      <Box component="div" sx={{width: "100%",display: "flex",alignItems: "center",justifyContent: "center",my:4}}>
        <CustomLinks href={config.scanLink} target="_blank" variant="header" component="a" rel="noreferrer">CONTRACT</CustomLinks>
        <CustomLinks href="https://t.me/PaycheckOrg" target="_blank" variant="header" component="a" rel="noreferrer">TELEGRAM</CustomLinks>
        <CustomLinks href="https://paycheck-org.gitbook.io/eth-autominer/" target="_blank" variant="header" component="a" rel="noreferrer">DOCS</CustomLinks>
      </Box>

      {/* {countdown.alive && 
        <>
        <LaunchTitle>LAUNCH COUNTDOWN</LaunchTitle>
        <Countdown>
          {`${countdown.days} Days, ${countdown.hours} Hours, ${countdown.minutes} Mins & ${countdown.seconds} Secs`}
        </Countdown>
        </>
      } */}
    </Wrapper>
  );
}
