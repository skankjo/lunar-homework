import test from 'ava';
import validate from '../../validation';

test('should pass validation', (t) => {
  const fields = {
    fullname: {
      value: 'aaa',
      errors: [],
    },
    email: {
      value: 'aaa@aaa.lt',
      errors: [],
    },
    city: {
      value: 'Vilnius',
      errors: [],
    },
    street: {
      value: 'Gedimino pr.',
      errors: [],
    },
    housenumber: {
      value: '1',
      errors: [],
    },
  };
  t.deepEqual(validate('client', fields), fields);
});

test('should not pass validation', (t) => {
  const fields = {
    fullname: {
      value: '',
      errors: [],
    },
    email: {
      value: 'aaa',
      errors: [],
    },
    city: {
      value: 'Vilnius',
      errors: [],
    },
    street: {
      value: 'Gedimino pr.',
      errors: [],
    },
    housenumber: {
      value: '1',
      errors: [],
    },
  };
  const expectedResult = {
    fullname: {
      value: '',
      errors: ['The field is required'],
    },
    email: {
      value: 'aaa',
      errors: ['The field should contain valid email address'],
    },
    city: {
      value: 'Vilnius',
      errors: [],
    },
    street: {
      value: 'Gedimino pr.',
      errors: [],
    },
    housenumber: {
      value: '1',
      errors: [],
    },
  };
  t.deepEqual(validate('client', fields), expectedResult);
});
