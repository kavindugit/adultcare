import Prescription from '../models/prescriptionModel.js';
import Stock from '../models/stockModel.js';

// Sample prescription data
const samplePrescriptions = [
    {
        patient: "John Smith",
        prescription: "Amoxicillin,Paracetamol,Loratadine",
        description: "Patient requires regular medication for blood pressure",
        status: "Pending",
        medicines: [
            {
                medicineId: null,
                quantity: 2
            }
        ]
    },
    {
        patient: "Mary Johnson",
        prescription: "Ibuprofen,Omeprazole,Metformin",
        description: "Pain management and antibiotics for post-surgery recovery",
        status: "Pending",
        medicines: [
            {
                medicineId: null,
                quantity: 1
            }
        ]
    },
    {
        patient: "Robert Brown",
        prescription: "Atorvastatin,Amlodipine,Aspirin",
        description: "Regular diabetes medication and monitoring",
        status: "Pending",
        medicines: [
            {
                medicineId: null,
                quantity: 3
            }
        ]
    },
    {
        patient: "Sarah Wilson",
        prescription: "Ciprofloxacin,Paracetamol,Vitamin C",
        description: "7-day antibiotic course for infection",
        status: "Pending",
        medicines: [
            {
                medicineId: null,
                quantity: 2
            }
        ]
    }
];

// Get all prescriptions
export const getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find()
            .populate('medicines.medicineId')
            .sort({ createdAt: -1 });
        res.status(200).json(prescriptions);
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get prescription by ID
export const getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id)
            .populate('medicines.medicineId');
        
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        
        res.status(200).json(prescription);
    } catch (error) {
        console.error('Error fetching prescription:', error);
        res.status(500).json({ error: error.message });
    }
};

// Create new prescription
export const createPrescription = async (req, res) => {
    try {
        const { patient, prescription, description, medicines } = req.body;
        
        const newPrescription = new Prescription({
            patient,
            prescription,
            description,
            medicines
        });

        const savedPrescription = await newPrescription.save();
        res.status(201).json(savedPrescription);
    } catch (error) {
        console.error('Error creating prescription:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update prescription
export const updatePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const { patient, prescription, description } = req.body;

        const updatedPrescription = await Prescription.findByIdAndUpdate(
            id,
            { patient, prescription, description },
            { new: true }
        ).populate('medicines.medicineId');

        if (!updatedPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        res.status(200).json(updatedPrescription);
    } catch (error) {
        console.error('Error updating prescription:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete prescription
export const deletePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPrescription = await Prescription.findByIdAndDelete(id);
        
        if (!deletedPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        
        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (error) {
        console.error('Error deleting prescription:', error);
        res.status(500).json({ error: error.message });
    }
};

// Prepare prescription
export const preparePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const { medicines, preparedBy } = req.body;

        // Check if all medicines are available in stock
        for (const med of medicines) {
            const stock = await Stock.findById(med.medicineId);
            if (!stock || stock.quantity < med.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${stock?.medicineName || 'medicine'}`
                });
            }
        }

        // Update stock quantities
        for (const med of medicines) {
            await Stock.findByIdAndUpdate(med.medicineId, {
                $inc: { quantity: -med.quantity }
            });
        }

        // Update prescription status
        const updatedPrescription = await Prescription.findByIdAndUpdate(
            id,
            {
                status: 'Prepared',
                medicines,
                preparedBy,
                preparedAt: new Date()
            },
            { new: true }
        ).populate('medicines.medicineId');

        if (!updatedPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        res.status(200).json(updatedPrescription);
    } catch (error) {
        console.error('Error preparing prescription:', error);
        res.status(500).json({ error: error.message });
    }
};

// Populate sample prescriptions
export const populateSamplePrescriptions = async (req, res) => {
    try {
        // Get all available medicines from stock
        const medicines = await Stock.find();
        
        if (medicines.length === 0) {
            return res.status(400).json({ 
                message: 'No medicines found in stock. Please add medicines first.' 
            });
        }

        // Update sample prescriptions with actual medicine IDs
        const updatedPrescriptions = samplePrescriptions.map(prescription => {
            // Randomly select a medicine from available stock
            const randomMedicine = medicines[Math.floor(Math.random() * medicines.length)];
            return {
                ...prescription,
                medicines: prescription.medicines.map(med => ({
                    ...med,
                    medicineId: randomMedicine._id
                }))
            };
        });

        // Clear existing prescriptions
        await Prescription.deleteMany({});

        // Insert sample prescriptions
        const insertedPrescriptions = await Prescription.insertMany(updatedPrescriptions);

        res.status(200).json({ 
            message: 'Sample prescriptions added successfully!',
            prescriptions: insertedPrescriptions
        });
    } catch (error) {
        console.error('Error populating prescriptions:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get sample prescription by name
export const getSamplePrescriptionByName = (req, res) => {
    const { name } = req.params;
    const prescription = samplePrescriptions.find(
        p => p.prescription.toLowerCase() === name.toLowerCase()
    );
    if (!prescription) {
        return res.status(404).json({ message: 'Prescription not found' });
    }
    res.status(200).json(prescription);
};

// Get sample prescription by index
export const getSamplePrescriptionByIndex = (req, res) => {
    const { index } = req.params;
    const prescription = samplePrescriptions[parseInt(index)];
    if (!prescription) {
        return res.status(404).json({ message: 'Prescription not found' });
    }
    res.status(200).json(prescription);
};