import { useEffect } from 'react'
import Blogform from './Blogform'
import { useDispatch, useSelector } from 'react-redux'
import { setStatus, update } from '../../redux/blogSlice'
import { useNavigate, useParams } from 'react-router-dom'
import STATUS from '../../status/status'

const Editblog = () => {

  const {status,data}=useSelector((state)=>state.blog)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const {id}=useParams()
   
  const filterData={
    title:data?.title,
    subtitle:data?.subtitle,
    description:data?.description,
    image:data?.imageUrl
  }

  const handleEdit=(data)=>{
    dispatch(update({data,id}))
   }


   useEffect(()=>{
    if(status===STATUS.SUCCESS){
      navigate("/blogs")
      dispatch(setStatus(null))
    }
   },[status])
  return (
   <Blogform type="Edit" Edata={filterData} submit={handleEdit}/>
  )
}

export default Editblog