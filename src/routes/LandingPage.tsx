import { CssBaseline, styled } from "@mui/material";
import MarkdownRenderer from "assets/markdown/Markdown";
import MyMdEditor from "assets/markdown/MdEditor";
import PlaceToVisit from "components/mui_styled/PlaceToVisit";
import Editor from "components/quill/Quill";
import React from "react";
import Header from "./../components/mui_styled/Header";

const Root = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg.jpg"})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

const LandingPage = () => {
  return (
    <Root>
      <CssBaseline />
      <Header />
      <PlaceToVisit />
      <Editor />
    </Root>
  );
};
export default LandingPage;
