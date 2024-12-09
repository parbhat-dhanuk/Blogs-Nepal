import { createSlice } from "@reduxjs/toolkit"
import STATUS from "../status/status"
import API from "../http"

const blogSlice = createSlice({

    name:"blog",

    initialState:{

        data:null,
        status:null,
        message:null
        
    },

    reducers:{

        setData(state,action){
            state.data=action.payload
        },

        setStatus(state,action){
            state.status=action.payload
        },
        setMessage(state,action){
          state.message=action.payload
        }
        
    }
})

export const {setData,setStatus,setMessage} = blogSlice.actions

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

//Fetch Blogs

export function fetchBlogs (){
    return async function fetchBlogsThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
      try {
        const response = await API.get("/getBlogs")
        if(response.status===200){
         dispatch(setStatus(STATUS.SUCCESS))
         dispatch(setData(response.data.data))
        
        }else{
            dispatch(setStatus(STATUS.ERROR))
        }
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR))
      }
    }
}

//Fetch single blog

export function fetchSingle ({id}){
    return async function fetchSingleThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
      try {
        const response = await API.get(`/getBlog/${id}`)
        if(response.status===200){
         dispatch(setStatus(STATUS.SUCCESS))
         dispatch(setData(response.data.data))
        
        }else{
            dispatch(setStatus(STATUS.ERROR))
        }
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR))
      }
    }
}


//DELETE BLOG //

export function blogDelete({id}){
    return async function blogDeleteThunk(dispatch){
        try {
          dispatch(setStatus(STATUS.LOADING))
        const response = await API.delete(`/deleteBlog/${id}`,{
          withCredentials: true, 
        })
        dispatch(setStatus(STATUS.DELETED))
        } catch (error) {
          dispatch(setMessage(error.response.data.message))
        }
    }
}



//Update

export function update({data,id}){
  return async function updateThunk(dispatch){
      dispatch(setStatus(STATUS.LOADING))
      console.log(data)
    try {
      const response = await API.patch(`/updateBlog/${id}`,data,{
          headers:{
              "Content-Type":"multipart/form-data"
           },
           withCredentials: true, 
      })
      if(response.status===200){
       dispatch(setStatus(STATUS.SUCCESS))
      }else{
          dispatch(setStatus(STATUS.ERROR))
      }
    } catch (error) {
      dispatch(setMessage(error.response.data.message))
    }
  }
}