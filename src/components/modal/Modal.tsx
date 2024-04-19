//Use mui Modal

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.default",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
};

export default function BasicModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
  }) {
  
  const handleOpen = () => {
    setShowModal(!showModal);
  };

  return (
    <React.Fragment>
      <Modal
        open={showModal}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You need to sign in
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please connect to MetaMask
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

// import { Fragment, useState } from "react";
// import styles from "./Modal.module.css";
// // const styles = require("./Modal.module.css"); //ㅋㅋㅋ

// export default function Modal() {
//   const [showModal, setShowModal] = useState(false);

//   const openModal = () => {
//     setShowModal(true);
//   };
//   return (
//     <Fragment>
//       <section>
//         <h2>Introduction</h2>
//         <p>
//           This document provides a guide to help with the important task of
//           choosing the correct Apple.
//         </p>
//       </section>
//     </Fragment>
//   );
// }
