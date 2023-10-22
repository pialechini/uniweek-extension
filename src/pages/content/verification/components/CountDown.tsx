import { themeColor } from "@pages/content/theme/Theme";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const StyledCountDown = styled.div`
  color: ${themeColor("gray")};
  font-size: 14px;
`;

function CountDown({ expire, onExpire }: CountDownProps) {
  const [countDown, setCountDown] = useState<number>(expire);

  useEffect(() => {
    countDown > 0 ? setTimeout(() => setCountDown((i) => i - 1), 1000) : onExpire();
  }, [countDown, onExpire]);

  return (
    <StyledCountDown>
      {countDown > 0 && (
        <p>
          انقضاء تا
          <span>{` ${countDown} `}</span>
          ثانیه دیگه
        </p>
      )}
    </StyledCountDown>
  );
}

export default CountDown;

interface CountDownProps {
  expire: number;
  onExpire: () => void;
}
