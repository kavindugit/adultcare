import express from 'express';
import {
  getAllPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription,
  preparePrescription,
  populateSamplePrescriptions
} from '../controllers/prescriptionController.js';

const router = express.Router();

// Get all prescriptions
router.get('/', getAllPrescriptions);

// Get prescription by ID
router.get('/:id', getPrescriptionById);

// Create new prescription
router.post('/', createPrescription);

// Update prescription
router.put('/:id', updatePrescription);

// Delete prescription
router.delete('/:id', deletePrescription);

// Prepare prescription
router.post('/:id/prepare', preparePrescription);

// Populate sample prescriptions
router.post('/populate-samples', populateSamplePrescriptions);

export default router;