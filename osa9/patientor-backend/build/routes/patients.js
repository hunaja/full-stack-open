"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../utils");
const patientsService_1 = __importDefault(require("../services/patientsService"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    return res.json(patientsService_1.default.getAllPatientsWithoutSsns());
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.toNewPatient)(req.body);
        const addedPatient = patientsService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.get('/:id', (req, res) => {
    const patient = patientsService_1.default.getPatient(req.params.id);
    if (patient) {
        res.json(patient);
    }
    else {
        res.status(404);
    }
});
router.post('/:id/entries', (req, res) => {
    const patient = patientsService_1.default.getPatient(req.params.id);
    if (!patient)
        return res.status(404);
    try {
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const addedPatient = patientsService_1.default.addEntry(patient, newEntry);
        return res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        return res.status(400).send(errorMessage);
    }
});
exports.default = router;
