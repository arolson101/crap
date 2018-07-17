import * as React from 'react'
import { defineMessages } from 'react-intl'
import { compose } from 'redux'
import { makeScreen } from '../screens/Screen'
import { NavPickerParams } from '../redux/actions/navActions';
import { List, Header, Body, ListItem, Text, Right, Icon, Left } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation'

type Props = NavPickerParams

const PickerForm: React.SFC<Props & NavigationInjectedProps> = (props) => {
  console.log('PickerForm', props)
  const { items } = props
  return (
    <>
      <List>
        {items.map(item => (
          <ListItem
            key={item.value}
            button
            onPress={() => {
              props.onValueChange(item.value)
              props.navigation.pop()
            }}
            selected={item.value === props.selectedItem}
            icon
          >
            <Left>
              <Text>{item.label}</Text>
            </Left>
            <Right>
              {item.value === props.selectedItem &&
                <Icon name='checkmark'/>
              }
            </Right>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export const PickerModal = compose(
  makeScreen<Props>({
    title: (props) => props.title,
    cancelButton: true,
  }),
)(PickerForm)
PickerModal.displayName = 'PickerModal'
