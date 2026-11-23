import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Default Configure.mdx uses heavy JSX; Vite import-analysis fails on it — drop MDX glob.
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  "addons": [
    "@chromatic-com/storybook",
  ],
  // public/ (e.g. the plant images under /media, which are not versioned)
  staticDirs: ["../public"],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  viteFinal: (config) => ({
    ...config,
    optimizeDeps: {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include ?? []),
        "@mui/icons-material/UploadFile",
        "@mui/icons-material/DeleteOutline",
        "@mui/icons-material/CheckCircle",
        "@mui/icons-material/RadioButtonUnchecked",
      ],
    },
  }),
};
export default config;