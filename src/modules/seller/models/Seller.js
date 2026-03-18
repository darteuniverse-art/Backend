/* This seller model defines the schema for store related data for an online store owner,
it's not the same as the user model which is used for authentication and general user data. 
The seller model will have specific fields related to the store such as store name, description,
contact info, and a reference to the user account that owns the store. 
This allows us to manage store-specific information separately from general user
data while still linking them together through the user reference.
*/
const mongoose = require('mongoose');
const sellerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    storeName: { type: String, required: true },
    description: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    address: { type: String },
    isSuspended: { type: Boolean, default: false }
}, { timestamps: true });

sellerSchema.index({ storeName: 'text', description: 'text' });

module.exports = mongoose.model('Seller', sellerSchema);