import light from '../app/templates/light.json';
import dark from '../app/templates/dark.json';

export const templates = {
  light,
  dark,
};

export type TemplateKey = keyof typeof templates;