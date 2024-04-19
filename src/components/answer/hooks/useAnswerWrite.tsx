import { useState } from "react";
import { useParams } from "react-router-dom";
import answerService from "services/answer.service";
import { v4 as uuidv4 } from "uuid";

export default function useAnswerWrite(userAddress: string) {
  const params = useParams();

  const [answerTitle, setAnswerTitle] = useState("");
  const [answerContent, setAnswerContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const titleProps = {
    value: answerTitle,
    onChange: (e: any) => setAnswerTitle(e.target.value),
  };
  const contentProps = {
    value: answerContent,
    onChange: (e: any) => setAnswerContent(e.target.value),
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userAddress) {
      setShowModal(!showModal);
    } else {
      let answer = {
        title: answerTitle,
        id: uuidv4(),
        content: answerContent,
        adopted: false,
        owner: userAddress,
        related: params.id!,
      };

      answerService.postAnswer(answer).then((data: any) => {
        data ? window.location.reload() : console.log("ERROR");
      });
    }
  };

  return {
    titleProps,
    contentProps,
    handleSubmit,
    showModal,
    setShowModal,
  };
}
