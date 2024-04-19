import { Box, Button, Container } from "@mui/material";
import React, { useEffect } from "react";

function LandingOrder() {
  useEffect(() => {
    // 이 곳에 필요한 초기화 작업을 수행할 수 있습니다.
  }, []);

  const handleStartOrder = () => {
    // 주문 시작하기 버튼 클릭 시 실행되는 함수
    console.log("주문 시작하기");
    // 추가적인 작업을 수행할 수 있습니다.
  };

  return (
    <React.Fragment>
      <Container fixed>
        <Box
          sx={{
            // minHeight: "150vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          남현 솔라이트 바자회
          <Button
            variant="contained"
            onClick={handleStartOrder}
            color="secondary"
            sx={{
              width: "150px"
            }}
          >
            주문 시작하기
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default LandingOrder;
