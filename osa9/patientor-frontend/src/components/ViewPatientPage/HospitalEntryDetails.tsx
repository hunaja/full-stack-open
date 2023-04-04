import { Diagnosis, HospitalEntry } from "../../types";
import VaccinesIcon from '@mui/icons-material/Vaccines';

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryDetails = ({ entry, diagnoses }: Props) => {
  return (
    <div className="entry-details">
      {entry.date + ' '}
      <VaccinesIcon />

      <p>{entry.description}</p>

      <p>Discharged on {entry.discharge.date} with criteria "{entry.discharge.criteria}"</p>

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

export default HospitalEntryDetails;
