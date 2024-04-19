//Redux Ducks pattern
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import blogPostService from "../services/blogPost.service";
import { BlogPost } from "../domain/type/blogPostInteface";

//action
export const add = createAction("BlogPost/ADD");

//async action
export const getAllBlogPosts = createAsyncThunk(
  "BlogPost/GET_BLOGPOSTS",
  thunkAPI => {
    //try catch 여기로 옮겨야 한다.
    return blogPostService.getBlogPosts();
  }
);

//async action
export const getOneBlogPost = createAsyncThunk(
  "BlogPost/GET_BlogPost",
  (blogPostId: string, thunkAPI) => {
    return blogPostService.getBlogPost(blogPostId);
  }
);

//async action
export const closeBlogPostAction = createAsyncThunk(
  "BlogPost/CLOSE",
  (blogPostId: string, thunkAPI) => {
    return blogPostService.closeBlogPost(blogPostId);
  }
);

const initialState = {
  blogPosts: [] as BlogPost[],
  loading: false,
  error: "",
};
// reducer
const blogPostSlice = createSlice({
  name: "blogPost",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<any>) => {
      state.blogPosts.push(action.payload);
    },
  },
  extraReducers: {
    [getAllBlogPosts.pending.type]: state => {
      state.blogPosts = [];
      console.log("🚀 블로그 목록 로딩 중", state.blogPosts);
      state.loading = true;
      state.error = "";
    },
    [getAllBlogPosts.fulfilled.type]: (state, action: PayloadAction<any>) => {
      console.log("🚀 블로그 목록 받았음", state.blogPosts);
      state.blogPosts = action.payload ?? [];
      state.loading = false;
      state.error = "";
    },
    [getAllBlogPosts.rejected.type]: (state, action: PayloadAction<any>) => {
      console.log("🚀 블로그 목록 에러", state.blogPosts);
      state.blogPosts = [];
      state.loading = false;
      state.error = action.payload;
    },
    [getOneBlogPost.pending.type]: state => {
      console.log("🚀 질문 one 로딩 중", state.blogPosts);
      state.loading = true;
      state.error = "";
    },
    [getOneBlogPost.fulfilled.type]: (state, action: PayloadAction<any>) => {
      console.log("🚀 질문 one 받아짐", action.payload);

      const isExist = state.blogPosts.includes(action.payload);
      if (!isExist) {
        state.blogPosts.push(action.payload);
      }
      state.loading = false;
      state.error = "";
    },
    [getOneBlogPost.rejected.type]: (state, action: PayloadAction<any>) => {
      console.log("🚀 질문 one 에러", state.blogPosts);

      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default blogPostSlice.reducer;
