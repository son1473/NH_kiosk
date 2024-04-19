import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AnswerWrite from "components/answer/AnswerWrite";
import useQuestionDetail from "components/question/hooks/useQuestionDetail";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "stores";

export default function QuestionDetail() {
  const params = useParams();
  const questionId = params.id!;
  console.log("🚀 questionId 출력 ", questionId)
  const { loading, hasError, data, handleCloseBlogPost, handleChooseAnswer } =
    useQuestionDetail(questionId);
  const { question } = data;

  const userAddress = useSelector(
    (state: RootState) => state.user.user.address
  );

  return (
    <div>
      {loading ? (
        <h1>로딩중....</h1>
      ) : hasError ? (
        <h1>에러발생...</h1>
      ) : (
        <Container maxWidth="lg">
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              borderLeft: 1,
              borderRight: 1,
              borderColor: "#888888",
              py: 10,

              alignItems: "center",
              "& input": {
                fontSize: "22px",
              },
              "& input::placeholder": {
                //이렇게 컴포넌트의 각 속성에도 넣을 수도 있다
                fontSize: "22px",
              },
            }}
          >
            <Grid container justifyContent={"center"}>
              <Grid item xs={10}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  {question.closed && (
                    <Typography color={"secondary"} component="h6" variant="h6">
                      this question is closed
                    </Typography>
                  )}{" "}
                  {question.owner === userAddress && !question.closed && (
                    <Button
                      variant="contained"
                      color={"secondary"}
                      onClick={() => handleCloseBlogPost()}
                    >
                      close this question
                    </Button>
                  )}
                </Box>

                <Box sx={{ height: "400px" }}>
                  <Typography sx={{ mt: 5, mb: 3 }} component="h3" variant="h3">
                    {question.title}
                  </Typography>
                  <Divider />
                  <Typography sx={{ mt: 10 }} component="h6" variant="h6">
                    {question.content}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Grid container direction="column" alignItems={"flex-end"}>
                    <Grid item>
                      <Typography gutterBottom>
                        {/* closed: {question.closed.toString()} */}
                      </Typography>

                      <Typography gutterBottom>
                        creator: {question.owner}
                      </Typography>
                      <Typography gutterBottom>
                        {/* created_at: {question.created_at} */}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box>
                  {/* <h2>{answers.length} Answers</h2>
                  {answers.map((answer, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          mt: 3,
                          mb: 10,
                          pb: 5,

                          borderBottom: 1,
                        }}
                      >
                        <Grid container direction="column" spacing={2}>
                          <Grid item container justifyContent={"flex-end"}>
                            {answer.adopted && (
                              <Typography
                                color={"secondary"}
                                component="h6"
                                variant="h6"
                              >
                                Adopted
                              </Typography>
                            )}
                            {question.owner === userAddress &&
                              !question.closed &&
                              !answer.adopted && (
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() =>
                                    handleChooseAnswer(answer.id, answer.owner)
                                  }
                                >
                                  adapt this
                                </Button>
                              )}
                          </Grid>
                          <Grid item sx={{ height: "200px" }}>
                            <Typography
                              variant="h5"
                              sx={{ pb: 3 }}
                              gutterBottom
                            >
                              {answer.title}
                            </Typography>
                            <Typography sx={{ my: 1 }}>
                              {answer.content}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            direction="column"
                            justifyContent={"flex-end"}
                            alignContent={"flex-end"}
                          >
                            <Typography gutterBottom>
                              adopted : {answer.adopted.toString()}
                            </Typography>
                            <Typography gutterBottom>
                              created_at : {answer.created_at}
                            </Typography>
                            <Typography gutterBottom>
                              answerer : {answer.owner}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })} */}
                </Box>
                <AnswerWrite userAddress={userAddress}></AnswerWrite>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </div>
  );
}
