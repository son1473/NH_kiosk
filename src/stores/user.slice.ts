import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultUser, User } from "domain/type/userInterface";
import authService from "services/auth.service";



const increment = createAction("user/INCREMENT");

export const login = createAsyncThunk(
  "users/LOGIN",
  async (address: string, thunkAPI) => {
    const response = await authService.login(address);
    return response;
  }
);

interface UserState {
  user: User;
  loading: boolean;
  error: any;
}
const initialState = {
  user: defaultUser,
  loading: false,
  error: "",
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //동기 작업
    increment: state => {
      state.user = defaultUser;
    },
  },
  extraReducers: {
    // 비동기 작업
    [login.pending.type]: state => {
      state.user = defaultUser;
      state.loading = true;
      state.error = "";
    },
    [login.fulfilled.type]: (state, action) => {
      state.user = action.payload ?? defaultUser;
      console.log("🚀 ~ file: user.slice.ts ~ line 45 ~ action.payload", action)
      state.loading = false;
      state.error = "";
    },
    [login.rejected.type]: (state, action) => {
      state.user = defaultUser;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;

///

// const userReducer = (state = initialUser, action: any) => {
//   switch (action.type) {
//     case "signIn":
//       // state = action.payload; //이렇게 하는 게 아닌가??? 왜 객체를 반환하지? state에 그냥 안 넣고?
//       console.log(state, "user info is stored");
//       return {...state, user: action.payload};

//     case "signOut":
//       state = initialUser;
//       console.log(state, "user info is deleted");
//       return state;

//     default:
//       return state;
//   }
// };

// export default userReducer;

// --------------------------------
