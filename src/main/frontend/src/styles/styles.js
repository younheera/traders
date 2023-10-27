/**
 * @author heera youn
 * @create date 2023-10-21 23:00:23
 * @modify date 2023-10-27 15:13:01
 */

import { TextField } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';

const ComponentStyles = makeStyles((theme) => ({
  customh1: {
    color: "black",
    textAlign: "center",
    fontSize: '30px',
    fontWeight: 'bold',
  },
}));

const options = {
  shouldForwardProp: (prop) => prop !== 'bordercolor',
};

const OutlinedSelectors = [
  '& .MuiOutlinedInput-notchedOutline',
  '&:hover .MuiOutlinedInput-notchedOutline',
  '& .Mui-focused .MuiOutlinedInput-notchedOutline',
];

const CustomTextField = styled(TextField, options)(({ bordercolor }) => ({
  '& label.Mui-focused': {
      color: bordercolor,
  },
  [OutlinedSelectors.join(',')]: {
      borderWidth: 2,
      borderColor: bordercolor,
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, 10px) scale(0.75)', // 원하는 위치와 크기로 조절
  },
}));

const customStylesLabelled = {
  customLegendLabel: {
    width: 'auto',
    display: 'block',
    height: '5px',
    padding: 0,
    fontSize: '2.75em',
    maxWidth: '0.01px',
    textAlign: 'left',
    visibility: 'hidden',
    height: '11px',
    transition: 'maxWidth 50ms cubic-bezier(1, 1, 0.5, 1) 0ms',
  },
};

export { CustomTextField, customStylesLabelled, ComponentStyles };
