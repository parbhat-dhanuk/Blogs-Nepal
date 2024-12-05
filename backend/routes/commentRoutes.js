import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createComment, deleteComment, editComment, getPostComments, likeComment } from "../controllers/commentController.js";

const router=express.Router()

router.post('/createComment', isAuthenticated, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', isAuthenticated, likeComment);
router.patch('/editComment/:commentId', isAuthenticated, editComment);
router.delete('/deleteComment/:commentId', isAuthenticated, deleteComment);


export default router