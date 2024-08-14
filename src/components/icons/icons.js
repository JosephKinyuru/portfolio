import React from 'react';
import {
  IconAppStore,
  IconExternal,
  IconFolder,
  IconGitHub,
  IconLoader,
  IconLogo,
  IconPlayStore,
} from './index';

const Icon = ({ name }) => {
  switch (name) {
    case 'AppStore':
      return <IconAppStore />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Loader':
      return <IconLoader />;
    case 'Logo':
      return <IconLogo />;
    case 'PlayStore':
      return <IconPlayStore />;
    default:
      return <IconExternal />;
  }
};

export default Icon;
