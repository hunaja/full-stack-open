"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const patients = patients_1.default;
const getAllPatientsWithoutSsns = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (patient) => {
    const newPatient = Object.assign(Object.assign({}, patient), { entries: [], id: (0, uuid_1.v1)() });
    patients.push(newPatient);
    return newPatient;
};
const getPatient = (id) => {
    var _a;
    return (_a = patients.find((({ id: i }) => i == id))) !== null && _a !== void 0 ? _a : null;
};
const addEntry = (patient, entry) => {
    const newEntry = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v1)() });
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getAllPatientsWithoutSsns,
    addPatient,
    getPatient,
    addEntry,
};
