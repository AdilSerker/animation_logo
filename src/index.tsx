import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Logo from './Logo';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Logo />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
