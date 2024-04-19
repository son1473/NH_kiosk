import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Link,
  List,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { BlogPost } from "domain/type/blogPostInteface";


const Questions = ({ questions }: { questions: BlogPost[] }) => {
  return (
    <List>
      {questions
        .map((question, index) => {
          return (
            <Card
              key={index}
              sx={{ minWidth: 275, mb: 1, backgroundColor: "#1E1E1E" }}
            >
              <Grid container direction="row" alignContent="center">
                {/* views and answers */}
                <Grid item xs={1}>
                  <Box
                    sx={{
                      my: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      color: "#616161",
                    }}
                    component="div"
                  >
                    <Typography variant="h6" gutterBottom>
                      2 {/* {item.vote} 나중에 추가 일단 서버대로*/}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      vote
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      0 {/* {item.answer}  나중에 추가 일단 서버대로*/}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      answer
                    </Typography>
                  </Box>
                </Grid>
                {/* content-body */}
                <Grid item xs={11} mx={"auto"}>
                  <CardContent>
                    <Link
                      component={RouterLink}
                      to={`/question/${question.id}`}
                      // id={question._id}
                      underline="none"
                    >
                      <Typography
                        sx={{ fontSize: 20, color: "#BB86FC" }}
                        gutterBottom
                      >
                        {question.title}
                      </Typography>
                    </Link>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="#D8D8D8"
                      gutterBottom
                    >
                      {question.content}
                    </Typography>
                  </CardContent>
                  {/* tags and writer */}
                  <CardActions sx={{ fontSize: 15 }}>
                    <Grid
                      container
                      spacing={0}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      alignContent="center"
                      wrap="nowrap"
                    >
                      <Grid item xs={1}>
                        <Button size="small">#tag</Button>
                        {/* {item.tags.map((tag, index) => {
                              return (
                                <Button key={index} size="small">
                                  #{tag}
                                </Button>
                              )
                            })} */}
                      </Grid>
                      <Grid item mr={5}>
                        <Typography color="#616161">
                          {question.created_at}
                        </Typography>
                        <AccessibilityNewIcon></AccessibilityNewIcon>
                        <Link href="/user" underline="none">
                          <Typography color="#BB86FC">
                            {question.owner}
                          </Typography>
                        </Link>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Grid>
              </Grid>
              <Divider />
            </Card>
          );
        })
        .reverse()}
    </List>
  );
};

export default Questions;
