import _ from 'lodash';
import { Coffee, RandomApiCoffee } from './coffee.types';

export function toCoffee(randomApiCoffee: RandomApiCoffee): Coffee {
  return {
    ..._.omit(randomApiCoffee, 'blend_name'),
    blendName: randomApiCoffee.blend_name,
    notes: _.chain(randomApiCoffee.notes)
      .split(',')
      .map((note) => _.trim(note))
      .value(),
  };
}
