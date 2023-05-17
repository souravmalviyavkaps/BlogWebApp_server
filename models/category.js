import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    catName: {
        type: String,
        required: true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
},
{
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema);

export default Category;