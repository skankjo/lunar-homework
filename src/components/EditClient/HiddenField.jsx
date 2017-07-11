import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-form';

const HiddenField = ({ name }) => (
  <Text field={name} type="hidden" />
);

HiddenField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HiddenField;
