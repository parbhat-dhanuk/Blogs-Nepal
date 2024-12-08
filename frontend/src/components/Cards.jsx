import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({data}) => {
  return (
    <Link to={`/blog/single/${data._id}`}>
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-4">
  <img className="w-full" src={data.imageUrl} alt="blogs" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{data.title}</div>
    <p></p>
    <p className="text-gray-700 text-base">
     {data.description}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.createdAt}</span>
    
  </div>
</div>
</Link>
  )
}

export default Cards