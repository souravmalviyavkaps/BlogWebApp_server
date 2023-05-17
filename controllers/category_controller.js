import Category from '../models/category.js';

export const getBlogsCategoryWise = async (req, res)=>{
    
    try {
        const blogs = await Category.find({}).sort({catName: 1}).populate('blogs');
        console.log(blogs);

        return res.status(200).json({
            success: true,
            message: 'Blogs fetched category wise',
            data: blogs
        })
    } catch (error) {
        console.log('Error in finding blogs category wise : ', error);
        return res.status(500).json({
            success: false,
            message: error.message,

        })    
    }
}

export const getBlogsByCategory = async(req, res)=>{
    try {
        
        const catId = req.params.id;
        const blogs = Category.findById(catId)
                                .populate('blogs')
                                .blogs
                                .sort({createdAt: -1});


        return res.status(200).json({
            success: true,
            message: 'Blogs fetched for given category successful !!',
            data: blogs
        })

    } catch (error) {
        console.log('Error in finding blogs with category id : ', error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

