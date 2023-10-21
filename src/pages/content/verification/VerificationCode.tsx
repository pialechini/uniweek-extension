import {
  extractGeneralWeekSchedule,
  extractIdentity,
  constructWeekSchedule,
} from "@root/src/shared/golestan/payload-78";
import * as types from "@root/src/types/types";
import { CSSProperties, useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import CountDown from "./CountDown";
import GlobalStyle from "@root/src/pages/content/verification/GlobalStyle";

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

const StyledVerificationCode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000b0f;
  width: 100vw;
  height: 100vh;
`;

const Title = styled.h1`
  margin-top: 48px;
  font-size: 20px;
`;

const DigitsContainer = styled.div`
  margin-top: 16px;
  direction: ltr;
  display: flex;
  gap: 8px;
`;

const AnimatedGradientText = styled.span`
  background: linear-gradient(90deg, #2986a3, #1bd495);
  background-size: 400% 400%;
  animation: GradientBackground 3s ease infinite;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @keyframes GradientBackground {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
`;

const Digit = styled(AnimatedGradientText)`
  font-size: 40px;
  user-select: text;
  padding: 8px 8px 4px 8px;
  border-radius: 6px;
  border: 1px solid #171b1d;
`;

const CountDownWrapper = styled.div`
  margin-top: 24px;
`;

const CloseButton = styled.button`
  width: 130px;
  padding: 8px 0;
  font-size: 14px;
  position: fixed;
  bottom: 55px;
  border-radius: 4px;
  background-color: #2986a3;
  transition: all 0.2s ease;

  &:hover {
    background-color: #25dfd4;
  }
`;

const ExpiredTextContainer = styled.div`
  margin: 48px 36px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const ExpiredAnimatedText = styled(AnimatedGradientText)`
  font-size: 18px;
  text-align: center;
`;

const ExpiredText = styled.p`
  font-size: 14px;
  text-align: center;
`;

function VerificationCode({ code }: VerificationCodeProps) {
  const [verificationCode, setVerificationCode] = useState<number | undefined>(undefined);
  const [hidden, setHidden] = useState(false);
  const [expired, setExpired] = useState(false);

  // useEffect(() => {
  //   const weekSchedules = getWeekSchedule();
  //   const identity = extractIdentity();

  //   if (!weekSchedules) {
  //     return;
  //   }

  //   (async () => {
  //     const serverResponse = await sendToBotServer(identity, weekSchedules);

  //     if (serverResponse !== undefined) {
  //       setVerificationCode(serverResponse);
  //     }

  //     // show on the screen
  //     // with a count down
  //     // when it expires, disappear
  //     //TODO render verification code component
  //   })();
  // }, [trigger]);

  if (hidden) {
    return undefined;
  }

  return (
    <StyledVerificationCode>
      {!expired ? (
        <>
          <Title>برنامه هفتگی شما</Title>

          <DigitsContainer>
            {code.split("").map((digit, i) => (
              <Digit key={i}>{digit}</Digit>
            ))}
          </DigitsContainer>

          <CountDownWrapper>
            <CountDown expire={60} onExpire={() => setExpired(true)} />
          </CountDownWrapper>
        </>
      ) : (
        <ExpiredTextContainer>
          <ExpiredAnimatedText as="p">برنامه منقضی شد</ExpiredAnimatedText>
          <ExpiredText>لطفا پنجره را رو ببندین و دوباره تلاش کنین</ExpiredText>
        </ExpiredTextContainer>
      )}

      <CloseButton onClick={() => window.parent.postMessage({ action: "close" }, "*")}>بستن صفحه</CloseButton>
    </StyledVerificationCode>
  );
}

export default VerificationCode;

interface VerificationCodeProps {
  code: string;
}
