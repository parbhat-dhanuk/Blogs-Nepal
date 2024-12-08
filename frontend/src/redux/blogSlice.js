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


//Create

export function create(data){
    return async function createThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
      try {
        const response = await API.post("/addBlog",data,{
            headers:{
                "Content-Type":"multipart/form-data"
             },
             withCredentials: true, 
        })
        if(response.status===201){
         dispatch(setStatus(STATUS.SUCCESS))
        }else{
            dispatch(setStatus(STATUS.ERROR))
        }
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR))
      }
    }
}