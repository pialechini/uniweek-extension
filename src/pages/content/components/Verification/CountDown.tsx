import styled from "styled-components";
import { themeColor } from "@pages/content/theme/Theme";
import { useEffect, useState } from "react";

const StyledCountDown = styled.h1`
  color: ${themeColor("primary")};
`;

function CountDown({ time }: { time: number }) {
  const [countDown, setCountDown] = useState<number | undefined>(time);

  useEffect(() => {
    const id = setInterval(() => setCountDown(i => (i === 0 ? undefined : i - 1)), 1000);

    return () => clearInterval(id);
  }, []);

  return <StyledCountDown>{countDown}</StyledCountDown>;
}

export default CountDown;
