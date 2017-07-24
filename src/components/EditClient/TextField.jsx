import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'semantic-ui-react';

const TextField = ({ name, label, value, error, width, required, onChange, errorMessage }) => (
  <div className="line">
    <Form.Input
      name={name}
      label={label}
      value={value}
      error={error}
      width={width}
      required={required}
      onChange={onChange}
    />
    {error && <div className="error-message">{errorMessage}</div>}
  </div>
);

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.bool,
  width: PropTypes.number,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
};

TextField.defaultProps = {
  value: '',
  error: false,
  width: 100,
  required: false,
  onChange: () => {},
  errorMessage: '',
};

export default TextField;
