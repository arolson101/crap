import * as React from 'react';
import SplitPane from 'react-split-pane';
import './AppContainer.web.css';

// https://github.com/tomkp/react-split-pane/issues/252
require('react-split-pane').default = require('react-split-pane');

interface Props {
  sidebar: React.ReactElement<any>;
  main: React.ReactElement<any>;
}

export const AppContainer: React.SFC<Props> = (props) => {
  return (
    <SplitPane
      split="vertical"
      minSize={50}
      maxSize={300}
      defaultSize={150}
    >
      {props.sidebar}
      {props.main}
    </SplitPane>
  );
};
