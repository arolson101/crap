import * as React from 'react'
import { ListItem, Separator } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform';

export const Divider: React.SFC = ({ children }) => (
  <Separator bordered style={{ backgroundColor: platform.brandLight }}>
    {children}
  </Separator>
)
