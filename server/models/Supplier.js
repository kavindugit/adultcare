const SupplierSchema = new mongoose.Schema({
    name: String,
    contact: String,
    email: String,
    medicinesSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }]
});

export default mongoose.model('Supplier', SupplierSchema);