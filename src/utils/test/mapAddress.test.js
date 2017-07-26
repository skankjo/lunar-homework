import test from 'ava';
import mapAddress from '../mapAddress';

test('should convert address to an object', (t) => {
  const address = {
    address_components: [
      {
        long_name: '23',
        short_name: '23',
        types: ['street_number'],
      },
      {
        long_name: 'S. Dariaus ir S. Girėno gatvė',
        short_name: 'S. Dariaus ir S. Girėno g.',
        types: ['route'],
      },
      {
        long_name: 'Utena',
        short_name: 'Utena',
        types: ['locality', 'political'],
      },
      {
        long_name: 'Utenos rajono savivaldybė',
        short_name: 'Utenos r. sav.',
        types: ['administrative_area_level_2', 'political'],
      },
      {
        long_name: 'Utenos apskritis',
        short_name: 'Utenos apskr.',
        types: ['administrative_area_level_1', 'political'],
      },
      {
        long_name: 'Lietuva',
        short_name: 'LT',
        types: ['country', 'political'],
      },
      {
        long_name: '28239',
        short_name: '28239',
        types: ['postal_code'],
      },
    ],
  };

  const mappedAddress = mapAddress(address.address_components);

  t.deepEqual(mappedAddress, { city: 'Utena', housenumber: '23', street: 'S. Dariaus ir S. Girėno g.', zip: '28239' });
});
