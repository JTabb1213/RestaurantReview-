import React, { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const LoginPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const NeedToLoginBox = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const GoBackButton = styled.button`
  background-color: #4285f4;
  color: #fff;
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #3367d6;
  }
`;

const LoginButtonStyled = styled.button`
  background-color: #0f9d58;
  color: #fff;
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0a8041;
  }
`;

function BadLoginPage() {
  //const location = useLocation();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url');
  const questionMarkIndex = redirectUrl.indexOf('=');//Could not find id query param for some reason, so I just split the string where the '=' was
  const id = questionMarkIndex !== -1 ? redirectUrl.substring(questionMarkIndex + 1) : null;

  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmountedffff");
    };
  }, []);

  const handleGoBack = () => {
    navigate(redirectUrl || '/');
  }

  const handleLogin = () => {
    navigate({
      pathname: '/loginpage',
      search: `redirect_url=/reviewpage?id=${id}`,
    })
  }

  return (
    <LoginPrompt>
      <NeedToLoginBox>
        Need to login to add review
        <GoBackButton onClick={handleGoBack}>Go back</GoBackButton>
        <LoginButtonStyled onClick={handleLogin}>Login</LoginButtonStyled>
      </NeedToLoginBox>
    </LoginPrompt>
  );
}

export default BadLoginPage;
