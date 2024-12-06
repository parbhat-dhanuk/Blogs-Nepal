import { createSlice } from "@reduxjs/toolkit"
import STATUS from "../status/status"
import API from "../http"

const authSlice = createSlice({

    name:"auth",

    initialState:{

        user:"",
        token:null,
        status:null,
        
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

//Register

export function register(data){
    return async function registerThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
      try {
        const response = await API.post("/signup",data)
        
        if(response.status===201){
         dispatch(setUser(data.username))
         dispatch(setStatus(STATUS.SUCCESS))
        }else{
            dispatch(setStatus(STATUS.ERROR))
        }
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR))
      }
    }
}