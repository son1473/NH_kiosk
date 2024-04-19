import { Box, Button, Divider, TextField } from "@mui/material";
import BasicModal from "components/modal/Modal";
import useAnswerWrite from "./hooks/useAnswerWrite";

export default function AnswerWrite({ userAddress }: { userAddress: string }) {
  const { titleProps, contentProps, handleSubmit, showModal, setShowModal } =
    useAnswerWrite(userAddress);
  
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
