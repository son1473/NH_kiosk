import {
  Alert,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import useQuestionWrite from "./hooks/useQuestionWrite";

export default function QuestionWrite() {
  const {
    snackbar,
    reward,
    handleSnackbarOpen,
    handleChange,
    handleSubmit,
  } = useQuestionWrite();
  const { open } = snackbar;

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 5,
          border: 1,
          borderColor: "#888888",
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
        <Grid
          container
          direction="row"
          justifyContent={"flex-end"}
          sx={{
            marginTop: 8,
          }}
        >
          <Grid item mr={1}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleSnackbarOpen}
            >
              Save Temporarily
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={800}
              open={open}
              onClose={handleSnackbarOpen}
              key={"temporary-storage-top"}
            >
              <Alert severity="error">
                Failed to save your file temporarily!
              </Alert>
            </Snackbar>
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              // disabled
            >
              Post
            </Button>
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"}>
          <Grid item xs={10}>
            <Box sx={{ mt: 3, alignItems: "center" }}>
              <TextField
                name="title" //이게 값 연결
                variant="standard"
                placeholder="Title"
                required
                fullWidth
                sx={{
                  my: 8,
                  color: "white",
                }}
              />

              <TextField
                name="content"
                variant="standard"
                placeholder="Write your question..."
                multiline // 멀티라인하면 fontSize가 안바뀌구나
                fullWidth
                required
                minRows={16} //이게 중요
                maxRows={16}
                InputProps={{ disableUnderline: true }}
                sx={{
                  pt: 1,
                  pl: 0,
                  borderColor: "#808080",
                  minHeight: 400,
                  color: "white",
                }}
              ></TextField>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <p>YOUR QUESTION REWARD</p>
        <TextField
          id=""
          placeholder="eth"
          value={reward}
          onChange={handleChange}
          sx={{
            borderColor: "#808080",
          }}
        />
        eth
      </Box>
    </Container>
  );
}
