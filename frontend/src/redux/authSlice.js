import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({

    name:"auth",

    initialState:{

        user:"",
        token:null,
        status:null
    },

    reducers:{

        setUser(state,action){
            state.user=action.payload
        },

        setToken(state,action){
            state.token=action.payload
        },
        setStatus(state,action){
            state.status=action.payload
        }
    }
})

export const {setUser,setToken,setStatus} = authSlice.actions

export default authSlice.reducer