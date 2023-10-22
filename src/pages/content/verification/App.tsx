import VerificationCode from "@pages/content/verification/components/VerificationCode";
import * as types from "@src/types/types";

function App({ weekSchedules, studentIdentity }: AppProps) {
  return <VerificationCode weekSchedules={weekSchedules} studentIdentity={studentIdentity} />;
}

export default App;

interface AppProps {
  weekSchedules: types.WeekSchedules;
  studentIdentity: types.StudentIdentity;
}
