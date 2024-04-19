import SortIcon from "@mui/icons-material/Sort";
import { AppBar, Collapse, styled, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { Fragment, useEffect, useState } from "react";
import classes from "./Header.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link as Scroll } from "react-scroll";

// const CustomAppBar = styled(AppBar)(({ theme }) => ({
//   background: "none",
//   fontFamily: "Nunito",
// }));

// const AppbarWrapperToolbar = styled(Toolbar)(({ theme }) => ({
//   width: "80%",
//   margin: "0 auto",
// }));
// const AppbarTitle = styled("h1")(({ theme }) => ({
//   flexGrow: "1",
//   // 플렉스 그로우는 0보다 크면 플렉스 박스로 바뀌고, 해당 엘리먼트가 나머지 모든 공간 차지한다.
// }));
// const ColorText = styled("span")(({ theme }) => ({
//   color: "#5AFF3D",
//   // 플렉스 그로우는 0보다 크면 플렉스 박스로 바뀌고, 해당 엘리먼트가 나머지 모든 공간 차지한다.
// }));
// const CustomSortIcon = styled(SortIcon)(({ theme }) => ({
//   color: "#fff",
//   fontSize: "1rem",
// }));

const Header = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(true);
  }, []);

  return (
    // <Fragment>
    //   <CustomAppBar elevation={0}>
    //     <AppbarWrapperToolbar>
    //       <AppbarTitle>
    //         My<ColorText>Island</ColorText>
    //       </AppbarTitle>
    //       <IconButton>
    //         <CustomSortIcon></CustomSortIcon>
    //       </IconButton>
    //     </AppbarWrapperToolbar>
    //   </CustomAppBar>
    //   <div>
    //     <h1>
    //       Welcome to <br /> My <span>Island</span>!
    //     </h1>
    //   </div>

    // </Fragment>
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            My<span className={classes.colorText}>Island</span>
          </h1>
          <IconButton>
            <SortIcon className={classes.icon}></SortIcon>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Collapse in={isChecked} {...(isChecked ? { timeout: 1000 } : {})}>
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br /> My{" "}
            <span className={classes.colorText}>Island</span>!
          </h1>
          <Scroll to="place-to-visit" smooth={true}>
            <IconButton>
              <KeyboardArrowDownIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
};
export default Header;
