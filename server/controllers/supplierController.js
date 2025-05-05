import Supplier from "../models/supplierModel.js";

export const createSupplier = async (req, res) => {
    try {
      const { name, contact, email, medicineSupplied } = req.body;
      const newSupplier = new Supplier({ name, contact, email, medicineSupplied });
      const savedSupplier = await newSupplier.save();
      res.status(201).json(savedSupplier);
    } catch (error) {
      res.status(500).json({ message: 'Error creating supplier', error });
    }};

    
// Get all suppliers
export const getAllSuppliers = async (req, res) =>  {
    try {
      const suppliers = await Supplier.find().populate('medicineSupplied');
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching suppliers', error });
    }
  };

  export const updateSupplier = async (req, res) =>  {
    try {
      const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedSupplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }
      res.status(200).json(updatedSupplier);
    } catch (error) {
      res.status(500).json({ message: 'Error updating supplier', error });
    }
  };


    export const deleteSupplier = async (req, res) => {
        try {
        const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!deletedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200).json({ message: 'Supplier deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: 'Error deleting supplier', error });
        }
    };