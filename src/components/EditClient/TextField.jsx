import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-form';

const TextField = ({ name, title }) => (
  <div className="form-line">
    <label htmlFor={name}>{title}</label>
    <Text field={name} />
  </div>
);

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default TextField;
