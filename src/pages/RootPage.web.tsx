import * as React from 'react'
import SplitPane from 'react-split-pane'
import { MainView } from './MainView'
import { Sidebar } from './Sidebar'
import './RootPage.web.css'

// https://github.com/tomkp/react-split-pane/issues/252
require('react-split-pane').default = require('react-split-pane')

export const RootPage: React.SFC = (props) => {
  return (
    <SplitPane
      split='vertical'
      minSize={50}
      maxSize={300}
      defaultSize={150}
    >
      <Sidebar />
      <MainView />
    </SplitPane>
  )
}
