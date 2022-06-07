// import { config } from "@fortawesome/fontawesome-svg-core";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { config } from "../../config";

import { useAuthContext } from "../../providers/AuthProvider";

const ConnectButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.textLight,
  border: `1px solid ${theme.palette.text.textLight}`,
  background: "transparent",
  position: "fixed",
  right: 48,
  top: 20,
  "&:disabled": {
    color: theme.palette.primary.main,
    borderColor: "#cfb1fb",
    backgroundImage: "linear-gradient(90deg, #ade6e7 0%, #9ac1e4 100%)"
  },
  '&:hover,&:focus': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
  },
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));

const SmallScreenConnectButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.textLight,
  border: `1px solid ${theme.palette.text.textLight}`,
  background: "transparent",
  "&:disabled": {
    color: theme.palette.primary.main,
    borderColor: "#cfb1fb",
    backgroundImage: "linear-gradient(90deg, #ade6e7 0%, #9ac1e4 100%)"
  },
  // '&:hover,&:focus': {
  //   backgroundColor: theme.palette.primary.light,
  //   // color: theme.palette.primary.main,
  // },
  display: "none",
  marginTop: 30,
  marginBottom: 18,
  width: "95%",
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.down("md")]: {
    display: "block"
  }
}));

export default function Connect({ responsive = true}) {
  const { address, loading, chainId, connect, disconnect } = useAuthContext();

  
  // console.log("ChainID", chainId);
  // console.log("Loading", loading);

  return responsive ? (
    <ConnectButton
      variant="contained"
      disabled={(address && chainId === config.chainId) ? true : false}
      onClick={() => (address ? disconnect() : connect())}
    >
      {(address && chainId === config.chainId) ? "Connected" : "Connect"}
    </ConnectButton>
  ) : (
    <SmallScreenConnectButton
      variant="contained"
      disabled={(address && chainId === config.chainId) ? true : false}
      onClick={() => (address ? disconnect() : connect())}
    >
      {(address && chainId === config.chainId) ? "Connected" : "Connect"}
    </SmallScreenConnectButton>
  );
}
