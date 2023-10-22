import * as types from "@src/types/types";
import axios from "axios";

async function sendWeekSchedules(
  identity: types.StudentIdentity,
  weekSchedules: types.WeekSchedules,
) {
  const { evenWeekSchedule, oddWeekSchedule } = weekSchedules;

  try {
    const response = await axios.post("https://calm-gold-angler-tutu.cyclic.app/setWeekSchedule", {
      // TODO remove the line below
      // const response = await axios.post("http://localhost:4000", {
      identity,
      evenWeekSchedule,
      oddWeekSchedule,
    });

    return response.data as types.ServerResponseForSendWeekSchedules;
  } catch (error) {
    return undefined;
  }
}

export default sendWeekSchedules;
