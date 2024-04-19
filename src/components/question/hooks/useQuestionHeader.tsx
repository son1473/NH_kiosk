import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "stores";

export default function useQuestionHeader() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const address = useSelector((state: RootState) => state.user.user.address);

  const handleAddQuestion = () => {
    // if (address) {
    navigate("/write");
    // } else {
    // setShowModal(!showModal);
    // }
  };

  return {
    handleAddQuestion,
    setShowModal,
    address,
    showModal,
  };
}
