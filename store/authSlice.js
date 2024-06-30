import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        userData: null,
        didTryAutoLogin: false,
        isNewUser: false,

    },
    reducers: {
        authenticate: (state, action) => {
            const { payload } = action;
            state.token = payload.token;
            state.userData = payload.userData;
            state.isNewUser = payload.isNewUser; 
            state.didTryAutoLogin = true;
           
            
        },
        setDidTryAutoLogin: (state, action) => {
             
            state.didTryAutoLogin = true;
           
            
            
        },
        setNewUser: (state, action) => {
            const { payload } = action;
            state.isNewUser = payload.isNewUser;
        },

        logout: (state, action) => {
            state.token = null
            state.userData = null
            state.didTryAutoLogin = false
        },

        updateLoginUserData: (state, action) => {
            state.userData = {...state.userData, ...action.payload.newData}
        }
        
    }
});
 
export const {authenticate, setDidTryAutoLogin, setNewUser,logout,updateLoginUserData} = authSlice.actions;
 
export default authSlice.reducer;