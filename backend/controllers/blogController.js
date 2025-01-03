import Blog from "../models/blogModel.js"
import { cloudinary } from '../utils/cloudinary.js';

export const addBlog=async (req,res)=>{
    try {
        const {title,subtitle,description,}=req.body
        const authorId=req.user.id
         const file=req.file
    if(!title||!subtitle||!description){
        return res.status(400).json({message:"please provide all fields"})
    }

    let imageUrl="https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="
    let imagePublicId = null;
    if (file) {
             // Upload image to Cloudinary
     const uploadResult = await cloudinary.uploader.upload(file.path,{
      folder:'blog-nepal',
      transformation: [
        { width: 300, height: 300, crop: "fill"}, // Example crop
      ],
    });
    imageUrl = uploadResult.secure_url;
    imagePublicId = uploadResult.public_id;
    }
    
    await Blog.create({
        title,
        subtitle,
        description,
        imageUrl,
        imagePublicId,
        authorId

    })

    res.status(201).json({
        message:"Blog created successfully",
    })
    
    } catch (error) {
        console.log("Error in addBlog controller",error.message)
        res.status(500).json({error:`Internal server error`})
    }
}


export const getBlogs =async (req,res)=>{
    try {
        const products = await Blog.find()
        res.status(200).json({data:products})
      } catch (error) {
        console.log("Error in getBlog controller",error.message)
        res.status(500).json({error:`Internal server error`})
      }
}

export const getBlog =async (req,res)=>{
    try {
        const {id}=req.params
        const product = await Blog.findById(id);
        if(!product){
            return res.status(400).json({message:"No product available"})
        }
        res.status(200).json({data:product});
      } catch (error) {
        console.log("Error in singleBlog controller",error.message)
        res.status(500).json({error:`Internal server error`})
      }
}


export const updateBlog=async (req,res)=>{
    try {
    const {id}=req.params
    const {title,subtitle,description}=req.body
    const file=req.file
    const product = await Blog.findById(id);

    if(!product){
        return res.status(400).json({message:"product not available"})
    }

      let imageUrl = product.imageUrl;
      let imagePublicId = product.imagePublicId;
      
      if (file) {
        // Delete old image from Cloudinary if it exists
        if (product.imagePublicId) {
          await cloudinary.uploader.destroy(product.imagePublicId);
        }
  
        // Upload new image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: 'blog-nepal',
          transformation: [
            { width: 300, height: 300, crop: "fill"}, // Example crop
          ]
        })
  
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      }

       // Update product details
       const updatedProduct = await Blog.findByIdAndUpdate(id,{
        title,
        subtitle,
        description,
        imageUrl,
        imagePublicId
     },{new:true}
    )
  
      res.status(200).json({
        message:"blog updated successfully",
        data:updatedProduct
      });

      
    } catch (error) {
        console.log("Error in updateBlog controller",error.message)
        res.status(500).json({error:`Internal server error`})
    }
}


export const deleteBlog=async(req,res)=>{
    try {
        const {id}=req.params
        const product = await Blog.findById(id);
        if(!product){
            return res.status(400).json({message:"product not available"})
        }

        // Delete image from Cloudinary
      const publicId = product.imagePublicId; // Assuming your product model has `imagePublicId`
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
        // Delete product from database
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log("Error in deleteBlog controller",error.message)
        res.status(500).json({error:`Internal server error`})
    }
}