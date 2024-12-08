import React, { useEffect } from 'react'
import Blogform from './Blogform'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { create, setStatus } from '../../redux/blogSlice'
import STATUS from '../../status/status'

const Createblog = () => {

  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {status}=useSelector((state)=>state.blog)

  const handleCreate=(data)=>{
   dispatch(create(data))
  }

  useEffect(()=>{
    if(status===STATUS.SUCCESS){
      navigate("/blogs")
      dispatch(setStatus(null))
    }
    },[status])

  return (
    <Blogform type="Create" submit={handleCreate}/>
  )
}

export default Createblog