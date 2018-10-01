import { ListItem } from 'native-base'
import * as React from 'react'

export const Divider: React.SFC = ({ children }) => (
  <ListItem itemDivider>
    {children}
  </ListItem>
)
