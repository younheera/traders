import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled components
const StyledFormErrorMessage = styled.div`
  position: absolute;
  padding-left: 5px;
  color: ${(props) => props.theme.color.main};
`;

// FormErrorMessage 컴포넌트 정의
function FormErrorMessage({ errorMessage }) {
  return <StyledFormErrorMessage>{errorMessage}</StyledFormErrorMessage>;
}

FormErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default FormErrorMessage;
