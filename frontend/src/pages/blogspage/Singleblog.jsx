import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { blogDelete, fetchSingle, setStatus } from '../../redux/blogSlice'
import STATUS from '../../status/status'

const Singleblog = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const lToken = localStorage.getItem('access-token')
    setIsLoggedIn(!!token || lToken)
  }, [token])

  const [blog, setBlog] = useState({})
  const { id } = useParams()
  const { status, data, message } = useSelector((state) => state.blog)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchSingle({ id }))
  }, [])

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      setBlog(data)
      dispatch(setStatus(null))
    }
  }, [status])

  const handleDelete = () => {
    dispatch(blogDelete({ id }))
  }

  useEffect(() => {
    if (status === STATUS.DELETED) {
      navigate('/blogs')
      setStatus(null)
    }
  }, [status])

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8 h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-cover"
                src={blog.imageUrl}
                alt="Blog Image"
              />
            </div>

            {isLoggedIn && (
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <Link to={`/blog/edit/${blog._id}`}>
                    <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                      Edit
                    </button>
                  </Link>
                </div>
                <div className="w-1/2 px-2">
                  <button
                    onClick={handleDelete}
                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </div>

                <div className="w-1/2 px-2">
                  <button
                    onClick={() => navigate(`/comment/${blog._id}`)}
                    className="w-full bg-blue-500 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Comment
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {blog.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {blog.subtitle}
            </p>
            <div className="flex mb-4">
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Published At:{' '}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {blog.createdAt}
                </span>
              </div>
            </div>

            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Blog Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {blog.description}
              </p>
            </div>

            <p className="text-red-500 text-3xl mt-10">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Singleblog
