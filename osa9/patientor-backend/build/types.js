"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = exports.EntryType = exports.HealthCheckRating = void 0;
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating = exports.HealthCheckRating || (exports.HealthCheckRating = {}));
var EntryType;
(function (EntryType) {
    EntryType["Hospital"] = "Hospital";
    EntryType["HealthCheck"] = "HealthCheck";
    EntryType["OccupationalHealthcare"] = "OccupationalHealthcare";
})(EntryType = exports.EntryType || (exports.EntryType = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender = exports.Gender || (exports.Gender = {}));
