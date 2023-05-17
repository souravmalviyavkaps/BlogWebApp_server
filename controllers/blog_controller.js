import Blog from '../models/blog.js';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import Category from '../models/category.js';

export const getBlogsList = async (req, res)=>{
    let {limit} = req.query;
    try {
        const blogs = await Blog.find({})
                                .populate('category')
                                .limit(limit)
                                .sort('-createdAt');
        // console.log(blogs)
        return res.status(200).json({
            success: true,
            message: "Blogs fetched successfully !!",
            data: blogs
        })

    } catch (error) {
        console.log('Error in getting blogs list : ', error);
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export const getBlogDetails = async (req, res)=>{
    
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId).populate('user');
        
        return res.status(200).json({
            data: blog,
            message: 'blog fetched successfully !!',
            success: true
        })

    } catch (error) {
        console.log('Error while fetching blog : ', error);
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }

}

export const postBlog = async (req, res)=>{
    const date = new Date();

    try {
        console.log('hey', req.file)

        if(req.file){
            const blog = await Blog.create({
                ...req.body,
                user: req.user._id,
                img: `uploads/blogs/${date.getTime()}${req.file.originalname}`
            });
    1
            await sharp(req.file.buffer)
                 .resize({ width: 400, height: 400 })
                .toFile(`uploads/blogs/${date.getTime()}${req.file.originalname}`)
    
            await blog.save()

            return res.status(200).json({
                success: true,
                message: 'Blog posted successfully !!',
                data: blog
            });
    
        }else{
            const blog = await Blog.create(req.body);
            return res.status(200).json({
                success: true,
                message: 'Blog posted successfully !!',
                data: blog
            });   
        }

    } catch (error) {
        // fs.unlinkSync(
        //     path.resolve(`uploads/blogs/${date.getTime()}${req.file.originalname}`)
        // )
        
        console.log('Error while posting blog : ', error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const fetchCategories = async(req, res)=>{
    try {
        const categories = await Category.find({}).populate('blogs');
        console.log(categories)
        return res.status(200).json({
            success: true,
            message: 'Categories fetched successfully',
            data: categories
        })
    } catch (error) {
        console.log('Error while fetching categories : ', error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const fetchCategory = async(req, res)=>{
    try {
        const catId = req.params.catid;
        const category = await Category.findById(catId);
        console.log(category)
        return res.status(200).json({
            success: true,
            message: 'Category fetched successfully',
            data: category
        })
    } catch (error) {
        console.log('Error while fetching category : ', error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}