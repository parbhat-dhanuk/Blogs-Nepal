import Blog from "../models/blogModel.js"

const verifyAuthor = async (req, res, next) => {
    try {
        const contentId = req.params.id
        const userId = req.user.id

        // Find the content
        const content = await Blog.findById(contentId)
        if (!content) {
            return res.status(404).json({ message: 'Content not found' })
        }

        // Check if the current user is the author
        if (content.authorId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not author' })
        }

        // Attach content to request for further use (optional)
        req.content = content
        next()
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

export default verifyAuthor
