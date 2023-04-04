import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryDetails = ({ entry, diagnoses }: Props) => {
  const condition = HealthCheckRating[entry.healthCheckRating]

  return (
    <div className="entry-details">
      {entry.date + ' '}
      <MonitorHeartIcon />
      <i>{condition} Condition</i>

      <p>{entry.description}</p>

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

export default HealthCheckEntryDetails;
