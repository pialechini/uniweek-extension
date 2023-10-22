import VerificationCode from "@pages/content/verification/components/VerificationCode";
import * as types from "@src/types/types";

function App({ weekSchedules }: AppProps) {
  return <VerificationCode weekSchedules={weekSchedules} />;
}

export default App;

interface AppProps {
  weekSchedules: types.WeekSchedules;
}
