import User from '../models/user.js';
import Blog from '../models/blog.js'
import Category from '../models/category.js';

export const addUser = async (req, res)=>{
    try {

        if(! (req.body.password == req.body.confirm_password)){
            return res.status(200).json({
                success: false,
                message: 'Password and confirm password not matching !!'
            })
        }

        const user = await User.create(req.body);
        return res.status(200).json({
            success: true,
            message: 'User added successfully !!',
            data: user
        })
    } catch (error) {
        console.log('Error while adding user : ', error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addBlog = async (req, res)=>{
    try {
        let body = req.body;
        body.user = req.user; 
        console.log(body);
        const blog = await Blog.create(blog);

        return res.status(200).json({
            success: true,
            message: 'Blog added successfully !!',
            data: blog
        })
    } catch (error) {
        console.log('Error while creating blog : ', error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addCategory = async (req, res)=>{
    try {
        const category = await Category.create(req.body);
        return res.status(200).json({
            success: true,
            message: 'Category added successfully !!',
            data: category
        })

    } catch (error) {
        console.log('Error while adding category : ', error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }    
}

export const fetchUsers = async (req, res)=>{
    try {
        const users = await User.find({});
        console.log("Users list in backend : ", users)
        return res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users
        })
    } catch (error) {
        console.log('Error while fetching users : ', error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }    
}

export const updateUser = async (req, res)=> {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        const updates = Object.keys(req.body);
        updates.map((update)=> {
            user[update] = req.body[update];
            
        })

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'User updated successfully !!',
            data: user
        })

    } catch (error) {
        console.log('Error while updating user : ', error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}