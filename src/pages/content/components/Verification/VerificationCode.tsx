import {
  extractGeneralWeekSchedule,
  extractIdentity,
  constructWeekSchedule,
} from "@root/src/shared/golestan/payload-78";
import * as types from "@root/src/types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import CountDown from "./CountDown";

function getWeekSchedule() {
  try {
    const generalWeekSchedule = extractGeneralWeekSchedule();

    const evenWeekSchedule = constructWeekSchedule(generalWeekSchedule, "even") as types.WeekSchedule;

    const oddWeekSchedule = constructWeekSchedule(generalWeekSchedule, "odd") as types.WeekSchedule;

    return {
      evenWeekSchedule,
      oddWeekSchedule,
    };
  } catch (error) {
    return undefined;
  }
}

async function sendToBotServer(identity, weekSchedules) {
  const { evenWeekSchedule, oddWeekSchedule } = weekSchedules;

  console.group();
  console.log("send to bot server is called:", identity, weekSchedules);
  console.group();
  return;

  try {
    const response = await axios.post("https://calm-gold-angler-tutu.cyclic.app/setWeekSchedule", {
      identity,
      evenWeekSchedule,
      oddWeekSchedule,
    });

    return response.data as number;
  } catch (error) {
    return undefined;
  }
}

const StyledWeekScheduleCode = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
`;

function VerificationCode({ trigger }: { trigger: boolean }) {
  const [verificationCode, setVerificationCode] = useState<number | undefined>(undefined);

  useEffect(() => {
    const weekSchedules = getWeekSchedule();
    const identity = extractIdentity();

    if (!weekSchedules) {
      return;
    }

    (async () => {
      const serverResponse = await sendToBotServer(identity, weekSchedules);

      if (serverResponse !== undefined) {
        setVerificationCode(serverResponse);
      }

      // show on the screen
      // with a count down
      // when it expires, disappear
      //TODO render verification code component
    })();
  }, [trigger]);

  return <StyledWeekScheduleCode>{verificationCode && <CountDown time={60} />}</StyledWeekScheduleCode>;
}

export default VerificationCode;
