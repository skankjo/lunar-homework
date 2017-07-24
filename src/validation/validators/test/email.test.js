import test from 'ava';
import email from '../email';

test('should pass email validation', (t) => {
  const isEmail = email();
  t.is(isEmail('aaa@aaa.lt'), null);
});

test('should not pass email validation', (t) => {
  const isEmail = email();
  t.is(isEmail('aaa'), 'The field should contain valid email address');
});
