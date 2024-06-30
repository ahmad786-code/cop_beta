import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        storedUsers: {}

    },
    reducers: {


        setStoredUsers: (state, action) => {
            const newUser = action.payload.newUsers;
            const existingUsers = state.storedUsers;

            const usersArray = Object.values(newUser);
            for (let i = 0; i < usersArray.length; i++) {
                const userData = usersArray[i];
                existingUsers[userData.userId] = userData;
            }

            state.storedUsers = existingUsers;
        },
        removeGroupFromUser: (state, action) => {
            if (state.userData && state.userData.groups) {
                state.userData.groups = state.userData.groups.filter(groupId => groupId !== action.payload);
            }
        }

    }
});

export const { setStoredUsers,removeGroupFromUser  } = userSlice.actions;

export default userSlice.reducer;