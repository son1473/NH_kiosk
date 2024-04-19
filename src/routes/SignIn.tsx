import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn(props: any) {
  const navigate = useNavigate();

  const postSignIn = async (address: any) => {
    const json = await (
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      })
    ).json();
    console.log(json);
  };
  const handleMetamask = async () => {
    // const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545")
    // const account = await web3.eth.getAccounts()
    // console.log("🚀 ~메타마스크 주소 겟 ~ handleMetamask ~ account", account)
  };

  // 로그인 버튼 누를 시
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("🚀 ~ file: SignIn.tsx ~ line 50 ~ handleSubmit ~ data", event);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const address = { address: "your address" };
    postSignIn(address);
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 큰 틀 끝 */}
        {/* 여기서부터 Sign In */}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {/* 여기서부터 로그인 폼 */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* 이메일 */}
          <TextField
            margin="normal"
            required //*자 표시
            fullWidth
            id="email" //모름
            label="Email Address"
            name="email" //모름 event에 올라가는 건가?
            autoComplete="email"
            autoFocus
          />
          {/* 비밀번호 */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* 리멤버미 */}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <ButtonGroup variant="contained" color="warning" aria-label="">
            <Button
              onClick={handleMetamask}
              fullWidth
              variant="contained"
              color="warning"
            >
              Sign in with MetaMask
            </Button>
            <Button fullWidth variant="contained" color="info">
              Sign up with Google
            </Button>
          </ButtonGroup>
          {/* 제출버튼 */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {/* 비밀번호 잃어버렸을 때, 회원가입 할 때 */}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* 카피라이트 */}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
