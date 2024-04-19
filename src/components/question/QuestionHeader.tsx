import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "stores";
import { BlogPost } from "../../domain/type/blogPostInteface";
import BasicModal from "../modal/Modal";
import useQuestionHeader from "./hooks/useQuestionHeader";

interface QuestionHeaderProps {
  questions: BlogPost[];
}

export default function QuestionHeader({ questions }: QuestionHeaderProps) {
  const numberOfQuestion = questions.length;

  const { handleAddQuestion, setShowModal, showModal } =
    useQuestionHeader();

  return (
    <Box>
      <Grid
        container
        spacing={0}
        px={2}
        pt={2}
        justifyContent={"space-between"}
      >
        <Typography variant="h4" color="#D8D8D8">
          All BlogPosts
        </Typography>
        <Button onClick={handleAddQuestion} variant="contained" color="primary">
          Add BlogPost
        </Button>
      </Grid>
      {/* <BasicModal
        showModal={showModal}
        setShowModal={setShowModal}
      ></BasicModal> */}

      <Box sx={{ mt: 5 }}>
        <Typography px={2} color="#D8D8D8">
          {numberOfQuestion} questions
        </Typography>
        <Divider />
      </Box>
    </Box>
  );
}
