import Comment from "../models/commentModel.js";

export const createComment = async (req, res) => {
    try {
        const {id}=req.user
      const { content, postId, userId } = req.body;
  
      if (userId !== id) {
        return res.status(400).json({message:"you have no permission to comment"})
      }
  
      const newComment = await Comment.create({
        content,
        postId,
        userId,
      });
    
      res.status(200).json(newComment);
    } catch (error) {
        console.log("Error in addComment controller",error.message)
        res.status(500).json({error:`Internal server error`})
    }
  }
  
  export const getPostComments = async (req, res) => {
    try {
      const {postId}=req.params
      const comments = await Comment.find({ postId }).sort({
        createdAt: -1,
      });
      res.status(200).json(comments);
    } catch (error) {
        console.log("Error in getPostComment controller",error.message)
        res.status(500).json({error:`Internal server error`})
    }
  }
  
  export const likeComment = async (req, res) => {
    try {
        const {commentId}=req.params
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(400).json({message:"Comment not found"})
      }
      const userIndex = comment.likes.indexOf(req.user.id);
      if (userIndex === -1) {
        comment.numberOfLikes += 1;
        comment.likes.push(req.user.id);
      } else {
        comment.numberOfLikes -= 1;
        comment.likes.splice(userIndex, 1);
      }
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
        console.log("Error in getPostComment controller",error.message)
        res.status(500).json({error:`Internal server error`})
    }
  }
  
  export const editComment = async (req, res) => {
    try {
        const {commentId}=req.params
        const {content}=req.body
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(400).json({message:"comment not found"})
      }
      if (comment.userId !== req.user.id ) {
        return res.status(400).json({message:"You are not allowed to edit this comment"})
      }
  
      const editedComment = await Comment.findByIdAndUpdate(commentId, {
          content
        },
        { new: true }
      );
      res.status(200).json(editedComment);
    } catch (error) {
        console.log("Error in editComment controller",error.message)
        res.status(500).json({error:`Internal server error`})
    }
  }
  
  export const deleteComment = async (req, res) => {
    try {
        const {commentId}=req.params
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({message:"Comment not found"})
      }
      if (comment.userId !== req.user.id) {
        return res.status(400).json({message:"You are not allowed to delete this comment"})
      }
      await Comment.findByIdAndDelete(commentId);
      res.status(200).json({message:'Comment has been deleted'});
    } catch (error) {
        console.log("Error in deleteComment controller",error.message)
        res.status(500).json({error:`Internal server error`})
    }
  }
  
 