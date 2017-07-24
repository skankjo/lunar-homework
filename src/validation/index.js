import { ap, complement, filter, isEmpty, isNil, mapObjIndexed, of, pipe, prop, propOr, __ } from 'ramda';
import { required, email } from './validators';

const forms = {
  client: {
    fullname: [required()],
    email: [required(), email()],
    city: [required()],
    street: [required()],
    housenumber: [required()],
  },
};

const isNotNil = complement(isNil);
const isNotEmpty = complement(isEmpty);

const getValidationsByFormName = propOr({}, __, forms);
const validateValue = validations => (value, key) => {
  const validators = propOr([], key, validations);
  const errors = pipe(prop('value'), of, ap(validators), filter(isNotNil))(value);
  return {
    value: value.value,
    errors,
  };
};

export default (formName, fields) => {
  const validate = pipe(getValidationsByFormName, validateValue);
  return pipe(mapObjIndexed(validate(formName)), filter(isNotEmpty))(fields);
};
