import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards'
import Navbar from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs, setStatus } from '../../redux/blogSlice'
import STATUS from '../../status/status'

const Blogs = () => {

    const [blogs,setBlogs]=useState([])

   const dispatch = useDispatch()       
   const {status,data} = useSelector((state)=>state.blog)
  const [query,setQuery]=useState('')


   useEffect(()=>{
     dispatch(fetchBlogs())
   },[])

useEffect(()=>{
if(status===STATUS.SUCCESS){
 setBlogs(data)
 dispatch(setStatus(null))
 
    }
},[status])


const handleChange = (e)=>{
    setQuery(e.target.value.toLowerCase())
 }

 

  return (
   <>
   <Navbar/>
   <div>
    

   <form  className="flex items-center max-w-sm mx-auto mt-4">   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <div className="relative w-full">
       
        <input onChange={handleChange} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search blogs name..." required />
    </div>
    <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search</span>
    </button>
</form>


   </div>
   <div className='flex flex-wrap justify-center space-x-5 mt-8'>

  {
   blogs.filter((blog)=>blog.title.includes(query)).map((blog)=>{
  return  <Cards key={blog._id} data={blog}/>
  })
  }
   
   </div>
    
   </>
  )
}

export default Blogs