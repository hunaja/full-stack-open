import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMark from "@mui/icons-material/QuestionMark";

import patientsService from "../../services/patients";
import { Diagnosis, Gender, Patient } from "../../types";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import { Button } from "@mui/material";

const GenderIcon: React.FC<{ gender: Gender }> = ({ gender }) => {
  switch (gender) {
  case Gender.Male:
    return <MaleIcon />;
  case Gender.Female:
    return <FemaleIcon />;
  case Gender.Other:
    return <QuestionMark />;
  }
}

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  diagnoses: Diagnosis[];
}

const ViewPatientPage = ({ patients, setPatients, diagnoses }: Props) => {
  const { id } = useParams()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [addingEntry, setAddingEntry] = useState(false)

  useEffect(() => {
    if (typeof id !== 'string') return
    patientsService.getOne(id)
      .then((data) => setPatient(data))
  }, [id])

  if (!patient) {
    return (
      <div className="App">
        This patient was not found.
      </div>
    )
  }

  const toggleAddEntry = () => {
    setAddingEntry(!addingEntry);
  }

  return (
    <div className="App">
      <h2>{patient.name} <GenderIcon gender={patient.gender} /></h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      {addingEntry
        ? <AddEntryForm patient={patient} setPatient={setPatient} diagnoses={diagnoses} onCancel={toggleAddEntry} />
        : <Button variant="contained" onClick={toggleAddEntry}>Add New Entry</Button>}

      <h3>Entries</h3>
      {patient.entries.map((entry) => <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />)}
    </div>
  )
}

export default ViewPatientPage;
