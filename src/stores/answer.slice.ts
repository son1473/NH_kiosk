//Redux Ducks pattern
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { defaultAnswer } from "domain/type/answerInterface";
import answerService from "services/answer.service";

//action
export const add = createAction("answer/ADD");

//async action
export const getAnswers = createAsyncThunk(
  "answer/GET_ANSWERS",
  (questionId: string, thunkAPI) => {
    return answerService.getAnswers(questionId);
  }
);

//async action
export const chooseAnswer = createAsyncThunk(
  "answer/GET_ANSWERS",
  (answerId: string, thunkAPI) => {
    return answerService.chooseAnswer(answerId);
  }
);

const initialState = {
  answers: [defaultAnswer],
  loading: false,
  error: "",
};
// reducer
const answerSlice = createSlice({
  name: "Answer",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<any>) => {
      state.answers.push(action.payload);
    },
  },
  extraReducers: {
    [getAnswers.pending.type]: state => {
      state.answers = [defaultAnswer];
      state.loading = true;
      state.error = "";
    },
    [getAnswers.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.answers = action.payload ?? [defaultAnswer];
      state.loading = false;
      state.error = "";
    },
    [getAnswers.rejected.type]: (state, action: PayloadAction<any>) => {
      state.answers = [defaultAnswer];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default answerSlice.reducer;
