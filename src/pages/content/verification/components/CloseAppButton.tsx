import { styled } from "styled-components";

const StyledCloseAppButton = styled.button`
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

function CloseAppButton() {
  return (
    <StyledCloseAppButton onClick={() => window.parent.postMessage({ action: "close" }, "*")}>
      بستن صفحه
    </StyledCloseAppButton>
  );
}

export default CloseAppButton;
