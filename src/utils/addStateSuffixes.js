import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import { ap, concat, flatten, identity, pipe, zipObj } from 'ramda';

const suffixes = [PENDING, FULFILLED, REJECTED];
const underscoredSuffixes = ap([concat('_')], suffixes);
const appendSuffixes = appendants => action => ap([concat(action)], appendants);
const appendActionState = appendSuffixes(underscoredSuffixes);
const appendActionStateToActions = ap([identity, appendActionState]);
const listToObj = keys => zipObj(keys, keys);
const buildActions = pipe(appendActionStateToActions, flatten, listToObj);
export default actions => buildActions(actions);
