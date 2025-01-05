import frontendConfig from './frontend/eslint.config.mjs';
import backendConfig from './backend/eslint.config.mjs';

export default {
  overrides: [
    {
      files: ['frontend/**/*.{js,ts,tsx}'],
      ...frontendConfig,
    },
    {
      files: ['backend/**/*.{js,ts}'],
      ...backendConfig,
    },
  ],
};
