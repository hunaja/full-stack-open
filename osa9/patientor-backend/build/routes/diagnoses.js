"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diagnosesService_1 = __importDefault(require("../services/diagnosesService"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => res.json(diagnosesService_1.default.getAll()));
exports.default = router;
