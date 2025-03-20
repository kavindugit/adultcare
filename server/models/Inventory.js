
const InventorySchema = new mongoose.Schema({
    medicineName: String,
    quantity: Number,
    price: Number,
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    restockThreshold: Number
});

export default mongoose.model('Inventory', InventorySchema);