import light from '../app/templates/light.json';
import dark from '../app/templates/dark.json';
import green from '../app/templates/green.json';
import glass from '../app/templates/glass.json';
import blue from '../app/templates/blue.json';

export const templates = {
  light,
  dark,
  green,
  glass,
  blue,
};

export type TemplateKey = keyof typeof templates;