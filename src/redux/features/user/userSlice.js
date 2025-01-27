import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  refreshToken: null,
  logged: false,
  id: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, refreshToken } = action.payload;

      // Actualiza el estado global
      state.token = accessToken;
      state.refreshToken = refreshToken;
      state.logged = true;

      // Actualiza el localStorage
      const userId =
        localStorage.getItem("id") || action.payload.id || "defaultId";
      localStorage.setItem("id", userId);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("logged", true);
    },
    logout: (state) => {
      // Limpia el estado global
      state.token = null;
      state.refreshToken = null;
      state.logged = false;
      state.id = null;

      // Limpia el localStorage
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("logged");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
