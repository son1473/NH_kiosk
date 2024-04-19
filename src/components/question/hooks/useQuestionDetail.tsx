import { Answer } from "domain/type/answerInterface";
import { defaultBlogPost, BlogPost } from "domain/type/blogPostInteface";
import { useEffect, useState } from "react";
import answerService from "services/answer.service";
import contractService from "services/contract.service";
import blogPostService from "services/blogPost.service";

export function useQuestionDetail(blogPostId: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    question: defaultBlogPost,
    // answers: [] as Answer[],
  });
  const [hasError, setHasError] = useState(false);
  const { question } = data;

  const handleCloseBlogPost = async () => {
    // execute contract first
    const isClosed = await contractService.closeQuestion(blogPostId);
    if (isClosed) {
      // then execute backend
      const closedQuestion: BlogPost = await blogPostService.closeBlogPost(blogPostId);
      setData({
        question: closedQuestion,
        // answers,
      });
    } else {
      console.error("Error. Fail to closeQuestion on blockchain");
    }
  };

  const handleChooseAnswer = async (
    answerId: string,
    winnerAddress: string
  ) => {
    // execute contract first
    const isTxSucceed = await contractService.chooseAnswer(
      blogPostId,
      winnerAddress
      );
    if (isTxSucceed) {
      // then execute backend
      const chosenAnswer: Answer = await answerService.chooseAnswer(answerId);
      setData({
        question,
        // answers: answers.map((answer: Answer) =>
          // answer.id === answerId ? chosenAnswer : answer
        // ),
      });
    } else {
      console.error("Error. Fail to upload on blockchain");
    }
  };

  const fetchData = async () => {
    try {
      //컨트랙트 선 실행하기
      const questionRes = await blogPostService.getBlogPost(blogPostId);
      console.log("🚀 ~ 출력 ~ questionRes", questionRes)
      console.log("🚀 출력 ~ blogPostId", blogPostId)
      // const answersRes = await answerService.getAnswers(blogPostId);
      setData({ question: questionRes });
    } catch (e) {
      setHasError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return {
    data,
    loading,
    hasError,
    handleCloseBlogPost,
    handleChooseAnswer,
  }; // 모든 값과 함수 반환
}

export default useQuestionDetail;
