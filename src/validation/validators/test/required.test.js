import test from 'ava';
import required from '../required';

test('should pass validation', (t) => {
  t.is(required()('aaa'), null);
});

test('should not pass validation', (t) => {
  const isRequired = required();
  t.is(isRequired(''), 'The field is required');
  t.is(isRequired(null), 'The field is required');
  t.is(isRequired(undefined), 'The field is required');
});
