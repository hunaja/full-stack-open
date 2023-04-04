import { Diagnosis, Entry } from "../../types";
import assertNever from "../../utils/assertNever";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";

const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
  case "Hospital":
    return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
  case "HealthCheck":
    return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
  case "OccupationalHealthcare":
    return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />;
  default:
    return assertNever(entry);
  }
}

export default EntryDetails;
