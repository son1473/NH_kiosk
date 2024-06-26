import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MENU, menuKey } from "utils/menu";
import OrderMenu from "./../components/baja/OrderMenu";
import { db } from "./../firebase";
import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp } from "firebase/firestore/lite";


function LandingOrder() {
  const [coffeeIceNum, setCoffeeIceNum] = useState(0);
  const [coffeeHotNum, setCoffeeHotNum] = useState(0);
  const [mixCoffeeIceNum, setMixCoffeeIceNum] = useState(0);
  const [mixCoffeeHotNum, setMixCoffeeHotNum] = useState(0);
  const [iceTeaNum, setIceTeaNum] = useState(0);
  const [iceChocoNum, setIceChocoNum] = useState(0);
  const [miSutGaruNum, setMiSutGaruNum] = useState(0);
  const [peppermintNum, setPeppermintNum] = useState(0);
  const [rooibosNum, setRooibosNum] = useState(0);
  const [etcNum, setEtcNum] = useState(0);
  
  const [orderNum, setOrderNum] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDetails, setOrderDetails] = useState<string>('');


  const resetAllValue = () => {
    setCoffeeIceNum(0);
    setCoffeeHotNum(0);
    setMixCoffeeIceNum(0);
    setMixCoffeeHotNum(0);
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
    const mixCoffeeIcePrice = mixCoffeeIceNum * MENU[menuKey[2]];
    const mixCoffeeHotPrice = mixCoffeeHotNum * MENU[menuKey[3]];
    const iceTeaPrice = iceTeaNum * MENU[menuKey[4]];
    const iceChocoPrice = iceChocoNum * MENU[menuKey[5]];
    const miSutGaruPrice = miSutGaruNum * MENU[menuKey[6]];
    const peppermintPrice = peppermintNum * MENU[menuKey[7]];
    const ruibosPrice = rooibosNum * MENU[menuKey[8]];
    const etcPrice = etcNum * MENU[menuKey[9]];

    setTotalPrice(
      coffeeIcePrice +
        coffeeHotPrice +
        mixCoffeeIcePrice +
        mixCoffeeHotPrice +
        iceTeaPrice +
        iceChocoPrice +
        miSutGaruPrice +
        peppermintPrice +
        ruibosPrice +
        etcPrice
    );

    let newOrderDetails: string = '';
    newOrderDetails += coffeeIceNum > 0 ? `${menuKey[0]}*${coffeeIceNum}, ` : '';
    newOrderDetails += coffeeHotNum > 0 ? `${menuKey[1]}*${coffeeHotNum}, ` : '';
    newOrderDetails += mixCoffeeIceNum > 0 ? `${menuKey[2]}*${mixCoffeeIceNum}, ` : '';
    newOrderDetails += mixCoffeeHotNum > 0 ? `${menuKey[3]}*${mixCoffeeHotNum}, ` : '';
    newOrderDetails += iceTeaNum > 0 ? `${menuKey[4]}*${iceTeaNum}, ` : '';
    newOrderDetails += iceChocoNum > 0 ? `${menuKey[5]}*${iceChocoNum}, ` : '';
    newOrderDetails += miSutGaruNum > 0 ? `${menuKey[6]}*${miSutGaruNum}, ` : '';
    newOrderDetails += peppermintNum > 0 ? `${menuKey[7]}*${peppermintNum}, ` : '';
    newOrderDetails += rooibosNum > 0 ? `${menuKey[8]}*${rooibosNum}, ` : '';
    newOrderDetails += etcNum > 0 ? `${menuKey[9]}*${etcNum}` : '';
    newOrderDetails = newOrderDetails.trim().replace(/,\s*$/, '');
    // 상태 업데이트
    setOrderDetails(newOrderDetails);
  }, [
    coffeeIceNum,
    coffeeHotNum,
    mixCoffeeIceNum,
    mixCoffeeHotNum,
    iceTeaNum,
    iceChocoNum,
    miSutGaruNum,
    peppermintNum,
    rooibosNum,
    etcNum,
  ]);

  // 주문 접수 코드
  const handleSubmit = async () => {
    // 총 가격 0원 이상일 경우에만 전송
    if (totalPrice > 0) {
      const currentTime = serverTimestamp(); // 현재 시간 가져오기

      const newOrderData = {
        'orderNum' : orderNum,
        'orderDetails' : orderDetails,
        'totalPrice' : totalPrice,
        'created_at' : currentTime,
      }
      const orderCollectionRef = collection(db, 'orders'); // 'orders' 컬렉션에 대한 참조 생성
      // console.log(newOrderData, "새로운 데이터 출력!") 
      try {
        const docRef = await addDoc(orderCollectionRef, newOrderData); // 새로운 주문 문서를 추가
        console.log('새로운 주문이 성공적으로 추가되었습니다. 문서 ID:', docRef.id);
    } catch (error) {
        console.error('주문 추가 중 오류 발생:', error);
    }
    // 모든 값 지우기
      resetAllValue();
    // 보냈으면 새로 주문 번호 가져오기
      getOrderId();
    }
    
  }



  async function getOrderId() {
    const collectionRef = collection(db, 'orders');
    const orderQuery = query(collectionRef, orderBy('created_at', 'desc'), limit(1)); // createdAt 필드를 기준으로 내림차순으로 정렬하여 최신 문서 1개만 가져오기
    const querySnapshot = await getDocs(orderQuery);
    let data = querySnapshot.docs.map((doc) => doc.data())
    const orderData = data[data.length-1]
    console.log(orderData,'가져온 주문 정보')
    const orderId = orderData['orderNum']
    setOrderNum(orderId+1)
  }

  // 랜더링 시에만, 주문 번호 가져오기.
  useEffect(() => {
    getOrderId();
  }, []);
  
  return (
    <React.Fragment>
      <Container sx={{height:"100%",  }}>
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
                fontFamily: "Gowum",
                textAlign: "center",
              }}
            >
              주문 번호 - {" "}
              <Typography
                sx={{
                  display: "inline",
                  font: "40px solid sans-serif",
                  fontFamily: "Gowum",
                  fontWeight: "bold",
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
                // fontFamily: "cursive",
                fontFamily: "Holtwood One SC",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              NH Cafe
            </Typography>
          </Grid>
          <Grid item xs={4} md={4} sx={{ display: 'flex', justifyContent: 'end', height: {xs: '50px', sm: '70px', lg:'90px'} }}>
          <img src="/assets/jang.png" alt="jang" style={{ width: 'auto', height: 'auto' }} />
          <img src="/assets/bae.png" alt="bae" style={{ width: 'auto', height: 'auto' }} />
          </Grid>
        </Grid>
        {/* 주문 탭 */}
        <Box>
        </Box>  
        <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
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
                md={3}
                lg={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[1]}
                  beverageNum={coffeeHotNum}
                  setBeverageNum={setCoffeeHotNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[2]}
                  beverageNum={mixCoffeeIceNum}
                  setBeverageNum={setMixCoffeeIceNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[3]}
                  beverageNum={mixCoffeeHotNum}
                  setBeverageNum={setMixCoffeeHotNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[4]}
                  beverageNum={iceTeaNum}
                  setBeverageNum={setIceTeaNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[5]}
                  beverageNum={iceChocoNum}
                  setBeverageNum={setIceChocoNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[6]}
                  beverageNum={miSutGaruNum}
                  setBeverageNum={setMiSutGaruNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[7]}
                  beverageNum={peppermintNum}
                  setBeverageNum={setPeppermintNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[8]}
                  beverageNum={rooibosNum}
                  setBeverageNum={setRooibosNum}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OrderMenu
                  menuName={menuKey[9]}
                  beverageNum={etcNum}
                  setBeverageNum={setEtcNum}
                />
              </Grid>
            </Grid>

        {/* 하단 바 */}
          <Grid container
            sx={{
              padding: '5px',
              marginTop: "5px",
            }}
          >
            <Grid item xs={12} sm={6} md={3} lg={3}>
            <Button
              variant="outlined"
              onClick={resetAllValue}
              color="error"
              sx={{
                boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "10px",
                width: "25vh",
                height: "12vh",
                textAlign: "center",
                font: "3.5vh Inter, sans-serif ",
                fontWeight: "bold",
                fontFamily: "Gowum",
              }}
            >
              전체 삭제
            </Button>
            </Grid>
            {/* 주문 내역 */}
            <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography sx={{
              fontSize: '2.4vh', 
              fontFamily: "Gowum",
              marginLeft:'10px'}}>
              {orderDetails}
            </Typography>
            </Grid>
              {/* 총 결제 금액 */}
              <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ marginRight: "20px"}}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "3.5vh",
                    textAlign: "end",
                    fontFamily: "Gowum",
                  }}
                >
                  총 결제금액
                </Typography> 
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: {sm: "4vh", md:"5vh", lg:"5.5vh"},
                    textAlign: "end",
                    fontFamily: "Gowum",
                  }}
                >
                  {totalPrice.toLocaleString()}원
                </Typography>
              </Box>
              </Grid>
              {/* 주문 접수 버튼 */}
              <Grid item xs={12} sm={6} md={3}>
              <Button
                onClick={handleSubmit}
                // color="success"
                sx={{
                  // background: "linear-gradient(180deg, #FFF 0%, #FBFCFF 100%)",
                  backgroundColor: "#0085FF",
                  boxShadow: "0px 1px 1px 0px #6F98FF",
                  border: "1px solid #6F98FF",
                  borderRadius: "10px",
                  width: "100%",
                  height: "13vh",
                  textAlign: "center",
                  font: "3.5vh Inter, sans-serif ",
                  color:'white',
                  fontWeight: "bold",
                  fontFamily: "Gowum",
                  "&:hover": {
                    color: "black",
                  },
                }}
              >
                주문하기
              </Button>
              </Grid>
          </Grid>
        {/* </Box> */}
      </Container>
    </React.Fragment>
  );
}

export default LandingOrder;
