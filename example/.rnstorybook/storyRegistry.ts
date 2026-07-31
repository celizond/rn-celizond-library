/// <reference types="@storybook/react-native/metro-env" />

import { start } from '@storybook/react-native';

import '@storybook/addon-ondevice-controls/register';
import '@storybook/addon-ondevice-actions/register';

import * as buttonStories from './stories/Button.stories';

const buttonStoryId = './Button.stories.tsx';

const buttonStoryLoader = Object.assign(
  (id: string) => {
    if (id === buttonStoryId) {
      return buttonStories;
    }

    throw new Error(`Unknown Storybook story: ${id}`);
  },
  {
    keys: () => [buttonStoryId],
  }
);

const storyEntries = [
  {
    titlePrefix: '',
    directory: './.rnstorybook/stories',
    files: 'Button.stories.tsx',
    importPathMatcher: /^\.\/Button\.stories\.tsx$/,
    req: buttonStoryLoader,
  },
];

export const view = start({
  annotations: [
    require('./preview'),
    require('@storybook/react-native/preview'),
  ],
  storyEntries,
});
