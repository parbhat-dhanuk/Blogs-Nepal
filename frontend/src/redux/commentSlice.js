import { createSlice } from "@reduxjs/toolkit"
import API from "../http"
import STATUS from "../status/status"


const commentSlice = createSlice({

    name:"comment",

    initialState:{

        comments:'',
        status:null,
        message:null
        
    },

    reducers:{

        setComment(state,action){
            state.comments=action.payload
        },

        setStatus(state,action){
            state.status=action.payload
        },
      
        
    }
})

export const {setComment,setStatus} = commentSlice.actions

export default commentSlice.reducer



//post comment

export function createComment({content},postId,userId){
    return async function createCommentThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
        const commentData={
          content,
          postId,
          userId
        }
     
      try {
        const response = await API.post("/createComment",commentData,{withCredentials:true})
        if(response.status===200){
         dispatch(setStatus(STATUS.SUCCESS))
         dispatch(setComment(commentData))
        }else{
            dispatch(setStatus(STATUS.ERROR))
        }
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR))
      }
    }
}