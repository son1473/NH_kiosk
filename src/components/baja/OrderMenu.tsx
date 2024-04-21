import { Box, Button, TextField, Typography } from "@mui/material";
import { MENU } from "utils/menu";

interface OrderMenuProps {
  menuName: string;
  beverageNum: number;

  setBeverageNum: React.Dispatch<React.SetStateAction<number>>;
}

const OrderMenu = ({
  menuName,
  beverageNum,
  setBeverageNum,
}: OrderMenuProps) => {
  return (
    <Box>
      <Button
        onClick={() => {
          setBeverageNum(beverageNum + 1);
        }}
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
        {menuName} <br />
        {MENU[menuName].toLocaleString()}원
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            verticalAlign: "middle",
          }}
        >
          <Button
            sx={{
              minWidth: "auto",
              "& .MuiButton-startIcon": {
                margin: "0px 10px",
              },
            }}
            onClick={() => {
              if (beverageNum > 0) {
                setBeverageNum(beverageNum - 1);
              }
            }}
            startIcon={
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_22_513)">
                  <path
                    d="M15.44 0C23.9742 0 30.88 6.90578 30.88 15.44C30.88 23.9742 23.9742 30.88 15.44 30.88C6.90578 30.88 0 23.9742 0 15.44C0 6.90578 6.90578 0 15.44 0ZM15.44 28.9802C22.8886 28.9802 28.95 22.8886 28.95 15.44C28.95 7.99141 22.8886 1.93 15.44 1.93C7.99141 1.93 1.93 7.99141 1.93 15.44C1.93 22.8886 7.99141 28.9802 15.44 28.9802ZM14.3845 16.405H8.685C8.14219 16.405 7.72 15.9828 7.72 15.44C7.72 14.8972 8.14219 14.475 8.685 14.475H22.195C22.7378 14.475 23.16 14.8972 23.16 15.44C23.16 15.9828 22.7378 16.405 22.195 16.405H14.3845Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_22_513">
                    <rect width="30.88" height="30.88" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
          ></Button>

          <TextField
            variant="outlined"
            defaultValue={beverageNum}
            value={beverageNum}
            InputProps={{
              inputProps: {
                style: {
                  textAlign: "center",
                  verticalAlign: "middle",
                  padding: "6px",
                  fontSize: "1.2rem",
                },
              },
              style: {
                borderRadius: "50px",
                // minWidth: "38px",
                width: "50px",
                height: "50px",
                // padding: "6px",
                fontWeight: "bold",
                textAlign: "center",
              },
            }}
            sx={{
              textAlign: "center",
              width: "auto",
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = parseInt(event.target.value);
              if (isNaN(newValue)) {
                setBeverageNum(0);
              } else {
                setBeverageNum(newValue);
              }
            }}
          />
          <Button
            onClick={() => {
              setBeverageNum(beverageNum + 1);
            }}
            sx={{
              minWidth: "auto", // 최소 너비를 자동으로 설정하여 아이콘에 맞춤
              "& .MuiButton-startIcon": {
                margin: "0px 10px", // 아이콘과 텍스트 사이의 간격 조정
              },
            }}
            startIcon={
              <svg
                width="32"
                height="31"
                viewBox="0 0 32 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_16_43)">
                  <path
                    d="M16.375 0.0625C7.84916 0.0625 0.9375 6.97416 0.9375 15.5C0.9375 24.0263 7.84916 30.9375 16.375 30.9375C24.9013 30.9375 31.8125 24.0263 31.8125 15.5C31.8125 6.97416 24.9013 0.0625 16.375 0.0625ZM16.375 29.0382C8.92689 29.0382 2.86719 22.9481 2.86719 15.4999C2.86719 8.05183 8.92689 1.99213 16.375 1.99213C23.8231 1.99213 29.8828 8.05186 29.8828 15.4999C29.8828 22.948 23.8231 29.0382 16.375 29.0382ZM23.1289 14.5352H17.3398V8.74609C17.3398 8.2135 16.9076 7.78125 16.375 7.78125C15.8424 7.78125 15.4102 8.2135 15.4102 8.74609V14.5352H9.62109C9.0885 14.5352 8.65625 14.9674 8.65625 15.5C8.65625 16.0326 9.0885 16.4648 9.62109 16.4648H15.4102V22.2539C15.4102 22.7865 15.8424 23.2188 16.375 23.2188C16.9076 23.2188 17.3398 22.7865 17.3398 22.2539V16.4648H23.1289C23.6615 16.4648 24.0938 16.0326 24.0938 15.5C24.0938 14.9674 23.6615 14.5352 23.1289 14.5352Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_16_43">
                    <rect
                      width="30.875"
                      height="30.875"
                      fill="white"
                      transform="translate(0.9375 0.0625)"
                    />
                  </clipPath>
                </defs>
              </svg>
            }
          ></Button>
        </Box>
        <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
          {(beverageNum * MENU[menuName]).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderMenu;
