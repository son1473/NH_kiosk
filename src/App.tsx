import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from "./components/header/AppBar";
// import Detail from "./routes/Detail";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import Write from "./routes/Write";
import LandingPage from "routes/LandingPage";
import Apollo from "routes/Apollo";
import QuillWritePage from "routes/QuillWritePage";
import LandingOrder from "routes/baja_LandingOrder";

const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: "#1f1f1f",
    },
    secondary: { main: "#2f00ff" },
    background: {
      default: "#ffffff",
    },
    text: {
      // primary: "#fff",
      primary: "#000000",
    },
  },
});

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          {/* <AppBar /> */}
          {/* 이렇게 해야 앱바 전체 적용 된다*/}
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="signin" element={<SignIn />} /> */}
            {/* <Route path="landing" element={<LandingPage />} /> */}
            <Route path="/" element={<LandingOrder />} />
            {/* <Route path="apollo" element={<Apollo />} /> */}
            {/* <Route path="write" element={<Write />} /> */}
            {/* <Route path="question/:id" element={<Detail />} /> */}
            {/* <Route path="quillWrite" element={<QuillWritePage />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
