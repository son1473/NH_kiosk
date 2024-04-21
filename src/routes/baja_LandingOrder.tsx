import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MENU, menuKey } from "utils/menu";
import OrderMenu from "./../components/baja/OrderMenu";

function LandingOrder() {
  const [coffeeIceNum, setCoffeeIceNum] = useState(0);
  const [coffeeHotNum, setCoffeeHotNum] = useState(0);
  const [mixCoffeeNum, setMixCoffeeNum] = useState(0);
  const [iceTeaNum, setIceTeaNum] = useState(0);
  const [iceChocoNum, setIceChocoNum] = useState(0);
  const [coffeeNum, setCoffeeNum] = useState(0);
  const [miSutGaruNum, setMiSutGaruNum] = useState(0);
  const [pepermintNum, setPepermintNum] = useState(0);
  const [ruibosNum, setRuibosNum] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // const handleChangeCoffee = () => {
  //   setCoffeeNum(coffeeNum + 1);
  // };

  const handleChildValueChange = (value: number) => {
    setTotalPrice(value);
  };

  // useEffect(() => {
  //   setTotalPrice(coffeeNum * 2000);
  // }, [coffeeNum]);

  return (
    <React.Fragment>
      <Container fixed>
        <Typography
          sx={{
            fontSize: "50px",
            textAlign: "center",
          }}
        >
          남현 솔라이트 바자회 Cafe
        </Typography>
        <Box
          sx={{
            // minHeight: "150vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <OrderMenu
            menuName={menuKey[0]}
            totalPrice={totalPrice}
            setTotalPrice={handleChildValueChange}
            />
          <OrderMenu
            menuName={menuKey[1]}
            totalPrice={totalPrice}
            setTotalPrice={handleChildValueChange}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
                총 결제금액
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "25px", textAlign: "end" }}
              >
                {totalPrice}
              </Typography>
            </Box>
            <Button
              variant="contained"
              // onClick={handleStartOrder}
              color="secondary"
              sx={{
                background: "linear-gradient(180deg, #FFF 0%, #FBFCFF 100%)",
                boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.10)",
                border: "1px solid rgba(201, 216, 255, 1)",
                borderRadius: "10px",
                width: "336px",
                height: "110px",
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
      </Container>
    </React.Fragment>
  );
}

export default LandingOrder;
