import apiSendWeekSchedule from "@pages/content/verification/api/send-week-schedule";
import { extractIdentity } from "@src/shared/golestan/payload-78";
import tryMultipleTimes from "@src/shared/try-multiple-times";
import * as types from "@src/types/types";
import { useEffect, useMemo, useState } from "react";

function useVerificationCode() {
  const [expire, setExpire] = useState<number>(undefined);
  const [verificationCode, setVerificationCode] = useState<number>(undefined);
  const [weekSchedules, setWeekSchedules] = useState<types.WeekSchedules>(undefined);
  const identity = useMemo(() => extractIdentity(), []);

  const sendWeekSchedule = async (succeed, failed) => {
    const serverResponse = await apiSendWeekSchedule(identity, weekSchedules);

    if (!serverResponse) {
      failed("server did not respond");
    } else {
      succeed(serverResponse);
    }
  };

  useEffect(() => {
    if (!weekSchedules) {
      return;
    }

    (async () => {
      const { status, result: serverResponse } =
        await tryMultipleTimes<types.ServerResponseForSendWeekSchedules>(sendWeekSchedule, 3);

      if (status === "succeed") {
        setVerificationCode(serverResponse.verificationCode);
        setExpire(serverResponse.expire);
      }
    })();
  }, [weekSchedules]);

  const getVerificationCodeFor = (weekSchedules: types.WeekSchedules) =>
    setWeekSchedules(weekSchedules);

  return {
    getVerificationCodeFor,
    verificationCode,
    expire,
  };
}

export default useVerificationCode;
