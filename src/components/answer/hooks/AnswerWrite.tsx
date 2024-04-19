import { Box, Button, Divider, TextField } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import answerService from "services/answer.service";
import { v4 as uuidv4 } from "uuid";
import BasicModal from "components/modal/Modal";

export default function AnswerWrite({ userAddress }: { userAddress: string }) {
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
  return (
    <Box>
      <Divider />
      <h2>Your Answer</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name="answer"
          {...titleProps}
          variant="standard"
          placeholder="Title"
          fullWidth
          required
          sx={{
            mb: 3,
          }}
        />
        <TextField
          name="answer"
          {...contentProps}
          // value={answerContent}
          // onChange={onAnswerBodyChange}
          variant="outlined"
          placeholder="answer"
          multiline
          required
          minRows={10}
          fullWidth
          sx={{
            mt: 3,
            mb: 3,
          }}
        />
        <Button type="submit" variant="contained" color="secondary">
          Post Your Answer
        </Button>
        <BasicModal
          showModal={showModal}
          setShowModal={setShowModal}
        ></BasicModal>
      </form>
    </Box>
  );
}
