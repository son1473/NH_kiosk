import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import contractService from "services/contract.service";
import blogPostService from "services/blogPost.service";
import { RootState } from "stores";
import { v4 as uuidv4 } from "uuid";

export default function useQuestionHeader() {
  const navigate = useNavigate();

  // 임시저장 로직
  const [snackbar, setSnackbar] = useState({
    open: false,
  });
  const { open } = snackbar;
  const [reward, setReward] = useState(0);

  const userAddress = useSelector(
    (state: RootState) => state.user.user.address
  );

  const handleSnackbarOpen = () => {
    setSnackbar({ open: !open });
  };

  const handleChange = (event: any) => {
    event.preventDefault();

    setReward(event.target.value);
  };

  // 전송 및 라우트 이동 로직
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    // const isTxSucceed = await contractService.openQuestion(id, reward);

    // if (isTxSucceed) {
    // const rewardNum: number = Number(reward);

    let blogPost = {
      title: data.get("title") as string, //textfield의 name 으로 정해놓은 걸 가져올 수 있음! value, onchange와는 다른 방식
      content: data.get("content") as string,
      owner: userAddress,
    };

    await blogPostService.postBlogPost(blogPost);

    navigate("/");
    // } else {
    // console.log("Error. Fail to upload on blockchain");
    // }
  };

  return {
    snackbar,
    reward,
    userAddress,
    handleSnackbarOpen,
    handleChange,
    handleSubmit,
  };

  // const questionHeaderProps = {
  //   questions,
  //   handleAddQuestion,
  //   setShowModal,
  //   address,
  //   showModal,
  // };

  // return <QuestionHeader {...questionHeaderProps}></QuestionHeader>;
}
