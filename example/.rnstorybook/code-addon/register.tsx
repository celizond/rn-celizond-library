import { addons, types } from 'storybook/manager-api';

import { CodePanel } from './CodePanel';

const ADDON_ID = 'react-native-ui-library/code';
const PANEL_ID = `${ADDON_ID}/panel`;

export function register() {
  addons.register(ADDON_ID, (api) => {
    addons.add(PANEL_ID, {
      type: types.PANEL,
      title: 'Code',
      render: ({ active }) => <CodePanel active={active} api={api} />,
      paramKey: 'code',
    });
  });
}

register();
