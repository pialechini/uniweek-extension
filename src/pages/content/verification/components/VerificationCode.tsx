import CloseAppButton from "@pages/content/verification/components/CloseAppButton";
import CountDown from "@pages/content/verification/components/CountDown";
import useVerificationCode from "@pages/content/verification/hooks/useVerificationCode";
import * as types from "@src/types/types";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

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

function VerificationCode({ weekSchedules, studentIdentity }: VerificationCodeProps) {
  const [expired, setExpired] = useState(false);
  const { getVerificationCodeFor, expire, verificationCode, loading } = useVerificationCode();

  useEffect(() => {
    getVerificationCodeFor(weekSchedules, studentIdentity);
  }, []);

  if (loading) {
    return <StyledVerificationCode>Loading</StyledVerificationCode>;
  }

  return (
    <StyledVerificationCode>
      {!expired && verificationCode ? (
        <>
          <Title>برنامه هفتگی شما</Title>

          <DigitsContainer>
            {verificationCode
              .toString()
              .split("")
              .map((digit, i) => (
                <Digit key={i}>{digit}</Digit>
              ))}
          </DigitsContainer>

          <CountDownWrapper>
            <CountDown expire={expire} onExpire={() => setExpired(true)} />
          </CountDownWrapper>
        </>
      ) : (
        <ExpiredTextContainer>
          <ExpiredAnimatedText as="p">برنامه منقضی شد</ExpiredAnimatedText>
          <ExpiredText>لطفا پنجره رو ببندین و دوباره تلاش کنین</ExpiredText>
        </ExpiredTextContainer>
      )}

      <CloseAppButton />
    </StyledVerificationCode>
  );
}

export default VerificationCode;

interface VerificationCodeProps {
  weekSchedules: types.WeekSchedules;
  studentIdentity: types.StudentIdentity;
}
