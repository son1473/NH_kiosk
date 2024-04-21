import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MENU, menuKey } from "utils/menu";
import OrderMenu from "./../components/baja/OrderMenu";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function LandingOrder() {
  const [orderNum, setOrderNum] = useState(1);
  const [coffeeIceNum, setCoffeeIceNum] = useState(0);
  const [coffeeHotNum, setCoffeeHotNum] = useState(0);
  const [mixCoffeeNum, setMixCoffeeNum] = useState(0);
  const [iceTeaNum, setIceTeaNum] = useState(0);
  const [iceChocoNum, setIceChocoNum] = useState(0);
  const [miSutGaruNum, setMiSutGaruNum] = useState(0);
  const [peppermintNum, setPeppermintNum] = useState(0);
  const [rooibosNum, setRooibosNum] = useState(0);
  const [etcNum, setEtcNum] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const resetAllValue = () => {
    setCoffeeIceNum(0);
    setCoffeeHotNum(0);
    setMixCoffeeNum(0);
    setIceTeaNum(0);
    setIceChocoNum(0);
    setMiSutGaruNum(0);
    setPeppermintNum(0);
    setRooibosNum(0);
    setEtcNum(0);
  };

  useEffect(() => {
    const coffeeIcePrice = coffeeIceNum * MENU[menuKey[0]];
    const coffeeHotPrice = coffeeHotNum * MENU[menuKey[1]];
    const mixCoffeePrice = mixCoffeeNum * MENU[menuKey[2]];
    const iceTeaPrice = iceTeaNum * MENU[menuKey[3]];
    const iceChocoPrice = iceChocoNum * MENU[menuKey[4]];
    const miSutGaruPrice = miSutGaruNum * MENU[menuKey[5]];
    const peppermintPrice = peppermintNum * MENU[menuKey[6]];
    const ruibosPrice = rooibosNum * MENU[menuKey[7]];
    const etcPrice = etcNum * MENU[menuKey[8]];

    setTotalPrice(
      coffeeIcePrice +
        coffeeHotPrice +
        mixCoffeePrice +
        iceTeaPrice +
        iceChocoPrice +
        miSutGaruPrice +
        peppermintPrice +
        ruibosPrice +
        etcPrice
    );
  }, [
    coffeeIceNum,
    coffeeHotNum,
    mixCoffeeNum,
    iceTeaNum,
    iceChocoNum,
    miSutGaruNum,
    peppermintNum,
    rooibosNum,
    etcNum,
  ]);

  return (
    <React.Fragment>
      <Container>
        {/* Header 부분 */}
        <Grid
          container
          spacing={1}
          alignItems="center"
          sx={{ marginTop: "10px", width: "100%" }}
        >
          <Grid item xs={4} md={4}>
            <Typography
              sx={{
                display: "inline",
                font: "25px solid sans-serif ",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              주문 번호 :
              <Typography
                sx={{
                  display: "inline",
                  font: "40px solid sans-serif ",
                  fontWeight: "bold",
                  // textAlign: "center",
                }}
              >
                {orderNum}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={4} md={4} container justifyContent="center">
            <Typography
              sx={{
                fontSize: "40px",
                fontFamily: "cursive",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              NH Cafe
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            {/* 오른쪽에는 빈 공간 */}
          </Grid>
        </Grid>
        {/* 주문 탭 */}
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="탭 1" />
          <Tab label="탭 2" />
        </Tabs>
        <Box
          // sx={{ height: "580px" }}
        >
          <TabPanel value={value} index={0}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[0]}
                  beverageNum={coffeeIceNum}
                  setBeverageNum={setCoffeeIceNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[1]}
                  beverageNum={coffeeHotNum}
                  setBeverageNum={setCoffeeHotNum}
                />
              </Grid>
              {/* mixCoffeeNum, iceTeaNum, iceChocoNum, miSutGaruNum, pepermintNum,
            ruibosNum, etcNum, */}
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[2]}
                  beverageNum={mixCoffeeNum}
                  setBeverageNum={setMixCoffeeNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[3]}
                  beverageNum={iceTeaNum}
                  setBeverageNum={setIceTeaNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[4]}
                  beverageNum={iceChocoNum}
                  setBeverageNum={setIceChocoNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[5]}
                  beverageNum={miSutGaruNum}
                  setBeverageNum={setMiSutGaruNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[6]}
                  beverageNum={peppermintNum}
                  setBeverageNum={setPeppermintNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[7]}
                  beverageNum={rooibosNum}
                  setBeverageNum={setRooibosNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[8]}
                  beverageNum={etcNum}
                  setBeverageNum={setEtcNum}
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            2
          </TabPanel>
        </Box>

        <Box
          sx={{
            // minHeight: "150vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              // margin: "0px 500px",
            }}
          >
            <Button
              variant="outlined"
              onClick={resetAllValue}
              color="error"
              sx={{
                // background: "linear-gradient(180deg, #FFF 0%, #FBFCFF 100%)",
                boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.10)",
                // border: "1px solid rgba(201, 216, 255, 1)",
                borderRadius: "10px",
                width: "180px",
                // padding: "0px 25px",
                height: "90px",
                textAlign: "center",
                font: "25px Inter, sans-serif ",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              전체 삭제
            </Button>
            <Box
              sx={{
                display: "flex",
                // justifyContent: "space-between",
                // width: "100%",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Box sx={{ marginRight: "20px" }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "25px",
                    textAlign: "end",
                  }}
                >
                  총 결제금액
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "45px",
                    textAlign: "end",
                  }}
                >
                  {totalPrice.toLocaleString()}원
                </Typography>
              </Box>
              <Button
                variant="contained"
                // onClick={resetAllValue}
                color="success"
                sx={{
                  // background: "linear-gradient(180deg, #FFF 0%, #FBFCFF 100%)",
                  boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.10)",
                  border: "1px solid rgba(201, 216, 255, 1)",
                  borderRadius: "10px",
                  width: "340px",
                  height: "90px",
                  textAlign: "center",
                  font: "25px Inter, sans-serif ",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                주문 접수
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default LandingOrder;
