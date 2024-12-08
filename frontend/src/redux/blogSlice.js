import { createSlice } from "@reduxjs/toolkit"
import STATUS from "../status/status"
import API from "../http"

const blogSlice = createSlice({

    name:"blog",

    initialState:{

        data:"",
        status:null
        
    },

    reducers:{

        setData(state,action){
            state.data=action.payload
        },

        setStatus(state,action){
            state.status=action.payload
        }
        
    }
})

export const {setUser,setStatus} = blogSlice.actions

export default blogSlice.reducer