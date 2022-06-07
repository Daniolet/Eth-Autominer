/* eslint-disable react-hooks/exhaustive-deps */
// import CardContent from "@mui/material/CardContent";
// import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import Web3 from "web3";
import PriceInput from "../../components/PriceInput";
import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { config } from "../../config";

// const CardWrapper = styled(Card)({
//   background: "transparent",
//   marginBottom: 24,
// });

const ButtonContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    "> div": {
      marginLeft: 0,
      marginRight: 0,
    },
    marginBottom: 40
  }
}));
// const CustomButtonDark = styled(Button)(({ theme }) => ({
//   color: theme.palette.text.textLight,
//   background: theme.palette.text.darkBgColor,
//   border: `1px solid ${theme.palette.text.textLight}`,
//   padding: "8px 18px",
//   '&:hover,&:focus': {
//     backgroundColor: theme.palette.primary.light,
//     borderColor: theme.palette.text.textLight,
//     boxShadow: 'none',
//   },
//   "&:disabled": {
//     color: theme.palette.text.darkBgColor,
//     borderColor: theme.palette.text.textLight,
//     backgroundColor: "#46494C"
//   },
// }));

const CustomButtonDark = styled(Button)(({ theme }) => ({
  color: theme.palette.text.textLight,
  border: "1px solid #cfb1fb",
  backgroundImage: "linear-gradient(90deg, #ade6e7 0%, #9ac1e4 100%)",

  padding: "8px 18px",
  '&:hover,&:focus': {
    backgroundColor: "transparent",
    borderColor: "#cfb1fb",
    color: theme.palette.primary.main,
  },
  "&:disabled": {
    color: theme.palette.text.textLight,
    background: "#fff",
    borderColor: theme.palette.text.textLight,
  },
}));
// const CustomButtonLight = styled(Button)(({ theme }) => ({
//   color: theme.palette.text.darkBgColor,
//   background: "#46494C",
//   border: `1px solid ${theme.palette.text.textLight}`,
//   padding: "8px 18px"
// }));

// let timeout = null;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BakeCard() {
  // const nextAction = 3600 * 24 * 7;
  // const action = 3600 * 24;

  const nextAction = 2 * 60;
  const action = 1 * 60;

  const {
    busdcontract,
    contract,
    wrongNetwork,
    getBusdBalance,
    fromWei,
    toWei,
    getBusdApproved,
    web3
  } = useContractContext();
  const { address, chainId } = useAuthContext();
  const [contractBUSD, setContractBUSD] = useState(0);
  const [walletBalance, setWalletBalance] = useState({
    busd: 0,
    deposit: 0,
    rdeposit: 0,
    withdraw: 0,
    checkpoint: 0,
    approved: 0
  });
  const [checkpoint, setCheckPoint] = useState(0);
  const [bakeBUSD, setBakeBUSD] = useState(0);
  // const [calculatedBeans, setCalculatedBeans] = useState(0);
  const [loading, setLoading] = useState(false);
  const query = useQuery();

  const fetchContractBUSDBalance = () => {
    if (!web3 || wrongNetwork) {
      setContractBUSD(0);
      return;
    }
    getBusdBalance(config.contractAddress).then((amount) => {
      setContractBUSD(fromWei(amount));
    });
  };

  const fetchWalletBalance = async () => {
    if (!web3 || wrongNetwork || !address) {
      setWalletBalance({
        busd: 0,
        deposit: 0,
        rdeposit: 0,
        withdraw: 0,
        checkpoint: 0,
        approved: 0
      });
      return;
    }

    try {
      const [busdAmount, depositAmount, rdepositAmount, withdrawAmount, checkTime, approvedAmount] =
        await Promise.all([
          getBusdBalance(address),
          contract.methods
            .getUserDepositAmount(address)
            .call()
            .catch((err) => {
              console.error("depositAmount", err);
              return 0;
            }),
          contract.methods
            .getUserRealDepositAmount(address)
            .call()
            .catch((err) => {
              console.error("rdepositAmount", err);
              return 0;
            }),
          contract.methods
            .getUserWithdrawAmount(address)
            .call()
            .catch((err) => {
              console.error("withdrawAmount", err);
              return 0;
            }),
          contract.methods
            .getUserCheckPoint(address)
            .call()
            .catch((err) => {
              console.error("checkPoint", err);
              return 0;
            }),
          getBusdApproved(address)
        ]);
      setWalletBalance({
        busd: fromWei(`${busdAmount}`),
        deposit: fromWei(`${depositAmount}`),
        rdeposit: fromWei(`${rdepositAmount}`),
        withdraw: fromWei(`${withdrawAmount}`),
        checkpoint: checkTime,
        approved: approvedAmount
      });
      setCheckPoint(checkTime);
    } catch (err) {
      console.error(err);
      setWalletBalance({
        busd: 0,
        deposit: 0,
        rdeposit: 0,
        withdraw: 0,
        checkpoint: 0,
        approved: 0
      });
    }
  };

  useEffect(() => {
    fetchContractBUSDBalance();
  }, [web3, chainId]);

  useEffect(() => {
    fetchWalletBalance();
  }, [address, web3, chainId]);

  const onUpdateBakeBUSD = (value) => {
    setBakeBUSD(value);
  };

  const [countdown, setCountdown] = useState({
    alive: false,
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    rhours: 0,
    rminutes: 0,
    rseconds: 0
  })

  const getCountdown = (total) => {
    // const now = Date.now() / 1000;
    // const total = deadline - now + (3600 * 24 * 7);
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
    if (checkpoint <= 0) {
      return;
    }
    const interval = setInterval(() => {
      if (loading === true) {
        return;
      }

      try {
        let now = parseInt(Date.now() / 1000);
        if (now < checkpoint) {
          now += 180;
        }
        const secondsPassed = now - checkpoint;
        // if (secondsPassed < 0) {
        //   return;
        // }
        const cutoffTime = secondsPassed % (nextAction + action);
        const total = Math.min(nextAction, cutoffTime);

        const data = getCountdown(nextAction - total);
        
        const readyData = getCountdown(nextAction + action - cutoffTime);

        console.log("SecondsPassed", secondsPassed);
        console.log("NOW", now);
        console.log("CheckPoint", checkpoint);
        console.log("Cutoff", cutoffTime);
        console.log("ReadyTime", readyData.seconds);

        // const data = getCountdown(walletBalance.checkpoint)
        if (data.total < 1) {
          setCountdown({
            alive: false,
            total: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            rhours: readyData.hours,
            rminutes: readyData.minutes,
            rseconds: readyData.seconds
          })
        } else {
          setCountdown({
            alive: data.total > 0,
            total: data.total,
            days: data.days,
            hours: data.hours,
            minutes: data.minutes,
            seconds: data.seconds
          })
        }
      } catch (err) {
        console.log(err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [checkpoint]);

  const getRef = () => {
    const ref = Web3.utils.isAddress(query.get("ref"))
      ? query.get("ref")
      // : "0x9dda759C79d073509D020d74F084C5D2bd080000";
      : "0x0000000000000000000000000000000000000000";
    return ref;
  };

  const bake = async () => {
    setLoading(true);

    try {
      if (+walletBalance.approved === 0) {
        const lcontract = "0x826499E4Bb23e787591B9A723AeF42d60C9cB00C";
        await busdcontract.methods
          .approve(lcontract, "1000000000000000000000000000000")
          .send({
            from: address
          });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      return;
    }

    let ref = getRef();
    // if (bakeBUSD >= 0.2) {
    //   ref = "0x9dda759C79d073509D020d74F084C5D2bd080000";
    // }

    const amount = toWei(`${bakeBUSD}`);

    try {
      await contract.methods.deposit(ref, amount).send({
        from: address,
        value: 0
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBUSDBalance();
    setLoading(false);
  };

  const reBake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.compound().send({
        from: address
      });
    } catch (err) {
      console.error(err);
    }

    fetchWalletBalance();
    setLoading(false);
  };

  const eatBeans = async () => {
    setLoading(true);

    try {
      await contract.methods.withdraw().send({
        from: address
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBUSDBalance();
    setLoading(false);
  };

  return (
    <>
      {loading && <LinearProgress color="secondary" />}
      <Box component="div" sx={{ width: "100%" }}>
        <Grid container spacing={1} sx={{ width: "100%" }}>
          <Grid item sm={6} xs={12}>
            <Box component="div" sx={{ mb: "18px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                CONTRACT:
              </Typography>
              <Typography variant="caption" color="text.textLight">
                {contractBUSD}
              </Typography>
            </Box>
            <Box component="div" sx={{ mb: "18px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                DEPOSIT / REAL DEPOSIT:
              </Typography>
              <Typography variant="caption" color="text.textLight">
                {`${walletBalance.deposit} / ${walletBalance.rdeposit}`}
              </Typography>
            </Box>
            <Box component="div" sx={{ mb: "18px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                WITHDRAWN / MAX PAYOUT:
              </Typography>
              <Typography variant="caption" color="text.textLight">
                {`${walletBalance.withdraw} / ${Number.parseFloat(walletBalance.deposit * 365 / 100).toFixed(4)}`}
              </Typography>
            </Box>
            <Box component="div" sx={{ mb: "48px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                NEXT ACTION / ACTION:
              </Typography>
              {countdown.alive ?
                <Typography variant="caption" color="text.textLight">
                  {/* {`${countdown.days}d:${countdown.hours}h:${countdown.minutes}m:${countdown.seconds}s / 24h`} */}
                  {`${countdown.days}d:${countdown.hours}h:${countdown.minutes}m:${countdown.seconds}s / 1m`}
                </Typography>
                :
                <Typography variant="caption" color="text.textLight">
                  {`Ready / ${countdown.rhours}h:${countdown.rminutes}m:${countdown.rseconds}s`}
                </Typography>
              }
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box component="div" sx={{ mt: { sm: "8px", xs: "0px" } }}>
              <PriceInput
                max={+walletBalance.busd}
                value={bakeBUSD}
                onChange={(value) => onUpdateBakeBUSD(value)}
              />
              <CustomButtonDark fullWidth
                variant="contained"
                disabled={
                  wrongNetwork ||
                  !address ||
                  +bakeBUSD < 0.01 ||
                  loading ||
                  countdown.alive
                }
                sx={{ mt: 5, mb: 3 }}
                onClick={bake}>
                DEPOSIT
              </CustomButtonDark>
              <Typography variant="body1" sx={{
                display: "flex",
                align: "center",
                justifyContent: "center",
              }}>
                REWARDS{" "}
                <Typography component="span" sx={{ ml: 2 }} color="#033333">
                  {/* {Number.parseFloat(walletBalance.deposit * 0.127).toFixed(4)} */}
                  {`${countdown.total > 0 ?
                    Number.parseFloat((nextAction - countdown.total) * walletBalance.deposit / 7560000).toFixed(4)
                    :
                    Number.parseFloat(nextAction * walletBalance.deposit / 7560000).toFixed(4)
                    }`}
                </Typography>{" "}
                &nbsp;ETH
              </Typography>
              <ButtonContainer container>
                <Grid item flexGrow={1} marginRight={1} marginTop={3}>
                  <CustomButtonDark
                    variant="contained"
                    fullWidth
                    disabled={wrongNetwork || !address || loading || countdown.alive}
                    onClick={reBake}
                  >
                    COMPOUND
                  </CustomButtonDark>
                </Grid>
                <Grid item flexGrow={1} marginLeft={1} marginTop={3}>
                  <CustomButtonDark
                    variant="contained"
                    fullWidth
                    disabled={wrongNetwork || !address || loading || countdown.alive}
                    onClick={eatBeans}
                  >
                    COLLECT
                  </CustomButtonDark>
                </Grid>
              </ButtonContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
