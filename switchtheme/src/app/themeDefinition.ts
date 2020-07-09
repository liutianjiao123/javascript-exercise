export class ThemeDefinition {
  name: string;
  description: string;
  thumbnail: string;
  preview: string;
  css: string;
  cssMin: string;
  cssCdn: string;
  scss: string;
  scssVariables: string;
}

export class Themes {
  version: string;
  themes: ThemeDefinition[];
}
