import styled, { css } from 'styled-components/native';

export const FieldWrapper = styled.View`
  flex-direction: row;
  margin: 5px;
  align-items: center;
`;

export const FieldLabel = styled.Text`
  flex: 2;
  margin-left: 10px;
  text-align: right;
  color: gray;
`;

const fieldControlStyle = css`
  flex: 5;
  height: 35px;
  margin-left: 10px;
  border-color: lightgray;
  border-width: 1px;
  padding: 5px;
`;

export const TextControl = styled.TextInput`
  ${fieldControlStyle}
`;

export const PickerControl = styled.Picker`
  ${fieldControlStyle}
`;
