import { createSlice } from "@reduxjs/toolkit"


const commentSlice = createSlice({

    name:"comment",

    initialState:{

        comment:'',
        status:null,
        message:null
        
    },

    reducers:{

        setComment(state,action){
            state.comment=action.payload
        },

        setStatus(state,action){
            state.status=action.payload
        },
        setMessage(state,action){
          state.message=action.payload
        }
        
    }
})

export const {setData,setStatus,setMessage} = commentSlice.actions

export default commentSlice.reducer