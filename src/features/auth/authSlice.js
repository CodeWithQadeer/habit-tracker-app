// src/features/auth/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { get, ref, set, push } from "firebase/database";

// default habits
const defaultHabits = [
  {
    name: "Drink Water",
    category: "Health",
    difficulty: "Easy",
    completed: false,
    history: {},
    streak: 0,
  },
  {
    name: "Workout",
    category: "Fitness",
    difficulty: "Moderate",
    completed: false,
    history: {},
    streak: 0,
  },
  {
    name: "Meditate",
    category: "Wellness",
    difficulty: "Easy",
    completed: false,
    history: {},
    streak: 0,
  },
];

// signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      // Save user profile
      await set(ref(db, "users/" + user.uid), {
        username: username,
        email: email,
      });

      // Add default habits
      for (const habit of defaultHabits) {
        await set(push(ref(db, `users/${user.uid}/habits`)), habit);
      }

      // **Important**: Firebase auto-signs-in the new user.
      // Sign them out so they must explicitly log in (so your UI won't auto-redirect).
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        // Non-fatal; continue
        console.warn("Failed to sign out after signup:", err);
      }

      // Return a flag that signup completed (no user object)
      return { signupOnly: true };
    } catch (error) {
      return rejectWithValue(error.message ?? "An unknown error occurred");
    }
  }
);

// login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      const snapshot = await get(ref(db, "users/" + user.uid));
      let username = null;
      if (snapshot.exists()) {
        username = snapshot.val().username;
      }

      return {
        uid: user.uid,
        email: user.email,
        displayName: username,
      };
    } catch (error) {
      return rejectWithValue(error.message ?? "An unknown error occurred");
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  signupSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
    resetSignup: (state) => {
      state.signupSuccess = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.signupSuccess = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "An unknown error occurred";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "An unknown error occurred";
      });
  },
});

export const { logout, resetSignup, setUser } = authSlice.actions;
export default authSlice.reducer;
