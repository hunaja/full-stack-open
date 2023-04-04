import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: Props) => {
  return (
    <div className="entry-details">
      {entry.date + ' '}
      <WorkIcon />
      <i>{' ' + entry.employerName}</i>
      <p>{entry.description}</p>
      {entry.sickLeave && <p>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>}

      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code + " "}
              {diagnoses.find ((d) => d.code === code)?.name ?? "Unknown"}
            </li>
          ))}
        </ul>
      )}

      <span className="smaller">Diagnosis by {entry.specialist}</span>
    </div>
  );
}

export default OccupationalHealthcareEntryDetails;
