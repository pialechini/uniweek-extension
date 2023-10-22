import {
  constructWeekSchedule,
  extractGeneralWeekSchedule,
} from "@root/src/shared/golestan/payload-78";
import * as types from "@src/types/types";
import { useEffect, useState } from "react";

function getWeekSchedulesFromThePage() {
  try {
    const generalWeekSchedule = extractGeneralWeekSchedule();
    const evenWeekSchedule = constructWeekSchedule(
      generalWeekSchedule,
      "even",
    ) as types.WeekSchedule;
    const oddWeekSchedule = constructWeekSchedule(generalWeekSchedule, "odd") as types.WeekSchedule;

    return {
      evenWeekSchedule,
      oddWeekSchedule,
    } as types.WeekSchedules;
  } catch (error) {
    return undefined;
  }
}

function useWeekSchedules() {
  const [weekSchedules, setWeekSchedules] = useState<types.WeekSchedules>(undefined);

  useEffect(() => {
    setWeekSchedules(getWeekSchedulesFromThePage);
  }, []);

  return weekSchedules;
}

export default useWeekSchedules;
