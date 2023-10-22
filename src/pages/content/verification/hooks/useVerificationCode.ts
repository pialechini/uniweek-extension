import apiSendWeekSchedule from "@root/src/pages/content/verification/api/send-week-schedules";
import tryMultipleTimes from "@src/shared/try-multiple-times";
import * as types from "@src/types/types";
import { useEffect, useState } from "react";

function useVerificationCode() {
  const [expire, setExpire] = useState<number>(undefined);
  const [verificationCode, setVerificationCode] = useState<number>(undefined);
  const [weekSchedules, setWeekSchedules] = useState<types.WeekSchedules>(undefined);
  const [studentIdentity, setStudentIdentity] = useState<types.StudentIdentity>(undefined);
  const [loading, setLoading] = useState(true);

  const sendWeekSchedule = async (succeed, failed) => {
    const serverResponse = await apiSendWeekSchedule(studentIdentity, weekSchedules);

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
        setLoading(false);
      }
    })();
  }, [weekSchedules, studentIdentity]);

  const getVerificationCodeFor = (
    weekSchedules: types.WeekSchedules,
    studentIdentity: types.StudentIdentity,
  ) => {
    setWeekSchedules(weekSchedules);
    setStudentIdentity(studentIdentity);
  };

  return {
    getVerificationCodeFor,
    verificationCode,
    expire,
    loading,
  };
}

export default useVerificationCode;
