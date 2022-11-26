import { startCase } from 'lodash';

export const weekendLabel = (label) => {
  let text;
  const split = label.split('_');
  text = startCase(split.reverse().join(' '));
  return text;
};
