import mongoose from 'mongoose';

const orderSchema = mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;