import * as React from 'react'
import { ListItem } from 'native-base'

export const Divider: React.SFC = ({ children }) => (
  <ListItem itemDivider>
    {children}
  </ListItem>
)
