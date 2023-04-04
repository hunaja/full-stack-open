import React, { useState } from "react";
import { Diagnosis, HealthCheckRating, NewEntry, Patient } from "../../types"
import { Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

import patientsService from "../../services/patients";
import { isAxiosError } from "axios";

interface Props {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  onCancel: () => void;
  diagnoses: Diagnosis[];
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const entryTypeOptions = [{
  value: "HealthCheck",
  label: "Health Check",
}, {
  value: "Hospital",
  label: "Hospital",
}, {
  value: "OccupationalHealthcare",
  label: "Occupational Healthcare",
}];

interface FormOption<T> {
  value: T;
  label: string;
}

const healthCheckRatingOptions = Object.entries(HealthCheckRating)
  .filter(([,val]) => Number.isInteger(val))
  .map(([label, value]) => ({ value, label }))

const AddEntryForm = ({ patient, setPatient, diagnoses, onCancel }: Props) => {
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [specialist, setSpecialist] = useState("")
  const [type, setType] = useState<EntryType>("HealthCheck")
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveFrom, setSickLeaveFrom] = useState('');
  const [sickLeaveTo, setSickLeaveTo] = useState('');
  const [error, setError] = useState<string | null>(null)
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');

  const addEntry: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };
    let newEntry: NewEntry;

    switch (type) {
    case "HealthCheck":
      newEntry = {
        type: "HealthCheck",
        healthCheckRating,
        ...baseEntry,
      }
      break;
    case "Hospital":
      newEntry = {
        type: "Hospital",
        discharge: {
          criteria: dischargeCriteria,
          date: dischargeDate,
        },
        ...baseEntry,
      }
      break;
    case "OccupationalHealthcare":
      newEntry = {
        type: "OccupationalHealthcare",
        employerName,
        ...baseEntry,
      }

      if (sickLeaveFrom && sickLeaveTo) {
        newEntry.sickLeave = {
          startDate: sickLeaveFrom,
          endDate: sickLeaveTo,
        };
      }
      break;
    default:
      throw new Error('Unknown type: ' + type);
    }

    try {
      const entry = await patientsService.addEntry(patient, newEntry);
      const { entries: oldEntries, ...patientWithoutEntries } = patient;

      setPatient({
        ...patientWithoutEntries,
        entries: [
          ...oldEntries,
          entry,
        ],
      });
      onCancel();
    } catch (e) {
      if (isAxiosError(e)) {
        setError(e.response?.data ?? "Unknown API error");
      } else {
        setError("Unknown Error");
      }
    }
  }

  const diagnosisCodesOptions: FormOption<string>[] = diagnoses.map((val) => ({
    value: val.code,
    label: val.code,
  }));

  const onDiagnosisCodeChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    let value = event.target.value;
    if (!Array.isArray(value)) value = [value];
    setDiagnosisCodes(value);
  };

  return (
    <div className="entry-form">
      <h4>Add New Entry</h4>
      <b>{error}</b>

      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField
          label="Date"
          fullWidth
          value={date}
          type="date"
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Diagnoses</InputLabel>
        <Select
          label="Diagnoses"
          fullWidth
          multiple
          value={diagnosisCodes}
          onChange={onDiagnosisCodeChange}
        >
        {diagnosisCodesOptions.map((option) =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        )}
        </Select>

        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={type}
          onChange={({ target }) => setType(target.value as EntryType)}
        >
        {entryTypeOptions.map((option) =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        )}
        </Select>

        {type === "HealthCheck" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>Condition Rating</InputLabel>
            <Select
              label="Conditon Rating"
              fullWidth
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(target.value as HealthCheckRating)}
            >
            {healthCheckRatingOptions.map((option) =>
              <MenuItem
                key={option.label}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            )}
            </Select>
          </>
        )}

        {type === "Hospital" && (
          <>
            <TextField
              label="Discharge Date"
              fullWidth
              type="date"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick Leave From"
              fullWidth
              type="date"
              value={sickLeaveFrom}
              onChange={({ target }) => setSickLeaveFrom(target.value)}
            />
            <TextField
              label="Sick Leave To"
              fullWidth
              type="date"
              value={sickLeaveTo}
              onChange={({ target }) => setSickLeaveTo(target.value)}
            />
          </>
        )}

        <Grid>
          <Grid item>
            <Button
              style={{
                float: "left",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "right" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
        <br style={{ clear: "both" }} />
      </form>
    </div>
  )
}

export default AddEntryForm;
