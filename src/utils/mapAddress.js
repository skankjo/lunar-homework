import { __, complement, evolve, filter, fromPairs, head, isNil, map, pipe, prop } from 'ramda';

const addressComponentMapper = {
  locality: 'city',
  route: 'street',
  street_number: 'housenumber',
  postal_code: 'zip',
};

const mapComponentType = prop(__, addressComponentMapper);
const isNotNil = complement(isNil);
const mapTypes = pipe(map(mapComponentType), filter(isNotNil), head);

const transformations = {
  types: mapTypes,
};
const applyTypeTransformations = evolve(transformations);

const isTypeMapped = pipe(prop('types'), isNotNil);
const convertComponent = component => [component.types, component.short_name];

export default pipe(
  map(applyTypeTransformations),
  filter(isTypeMapped),
  map(convertComponent),
  fromPairs,
);
