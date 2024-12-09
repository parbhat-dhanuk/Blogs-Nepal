import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { addBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controllers/blogController.js"
import{uploadImage} from '../utils/cloudinary.js';
import verifyAuthor from "../middleware/checkPermission.js";

const router=express.Router()

router.post('/addBlog',uploadImage, isAuthenticated, addBlog)
router.get('/getBlogs', getBlogs)
router.get('/getBlog/:id', getBlog)
router.patch('/updateBlog/:id', uploadImage,isAuthenticated, verifyAuthor, updateBlog)
router.delete('/deleteBlog/:id',isAuthenticated, verifyAuthor, deleteBlog)

export default router