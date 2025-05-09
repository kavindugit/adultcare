import mongoose from 'mongoose';
import Prescription from '../models/prescriptionModel.js';
import Stock from '../models/stockModel.js';
import samplePrescriptions from '../data/samplePrescriptions.js';

const populatePrescriptions = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/adultcare', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Get all available medicines from stock
        const medicines = await Stock.find();
        
        if (medicines.length === 0) {
            console.log('No medicines found in stock. Please add medicines first.');
            return;
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
        await Prescription.insertMany(updatedPrescriptions);

        console.log('Sample prescriptions added successfully!');
    } catch (error) {
        console.error('Error populating prescriptions:', error);
    } finally {
        await mongoose.disconnect();
    }
};

// Run the script
populatePrescriptions();