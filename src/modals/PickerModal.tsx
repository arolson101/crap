import { Body, Header, Icon, Input, Item, List, ListItem, Text } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { compose } from 'redux'
import { NavPickerParams, SelectFieldItem } from '../redux/actions/navActions'
import { makeScreen } from '../screens/Screen'

type Props = NavPickerParams

interface State {
  searchTerm: string
  filteredItems?: SelectFieldItem[]
}

class PickerForm extends React.Component<Props & NavigationInjectedProps, State> {
  state: State = {
    searchTerm: '',
  }

  render () {
    const { searchTerm } = this.state
    const items = this.state.filteredItems || this.props.items
    return (
      <>
        <Header searchBar rounded style={styles.searchBarHeader}>
          <Item>
            <Icon name='search' />
            <Input
              placeholder='Search'
              onChangeText={this.onChangeText}
              value={searchTerm}
            />
            {searchTerm
              ? <Icon name='ios-close-circle' onPress={this.onClear} />
              : <Text/>
            }
          </Item>
        </Header>
        <List
          style={{ backgroundColor: platform.cardDefaultBg }}
          dataArray={items}
          renderRow={this.renderRow}
        />
      </>
    )
  }

  renderRow = (item: SelectFieldItem) => {
    const { items, onValueChange, navigation, selectedItem } = this.props

    return (
      <ListItem
        button
        onPress={() => {
          onValueChange(item.value)
          navigation.pop()
        }}
        selected={item.value === selectedItem}
        first={item.value === items[0].value}
        last={item.value === items[items.length - 1].value}
      >
        <Body>
          <Text>{item.label}</Text>
        </Body>
      </ListItem>
    )
  }

  onChangeText = (searchTerm: string) => {
    console.log('onChangeText')
    const { items } = this.props
    const terms = searchTerm.split('\\s+')
    const filteredItems = items.filter(item =>
      terms
        .filter(term =>
          item.label.toLowerCase().includes(term.toLowerCase())
        )
        .length > 0
    )
    this.setState({ searchTerm, filteredItems })
  }

  onClear = () => {
    this.setState({ searchTerm: '', filteredItems: undefined })
  }
}

export const PickerModal = compose(
  makeScreen<Props>({
    title: (props) => props.title,
    cancelButton: true,
  }),
)(PickerForm)
PickerModal.displayName = 'PickerModal'

const styles = StyleSheet.create({
  searchBarHeader: {
    paddingTop: 0,
    height: platform.searchBarHeight + platform.listItemPadding
  }
})
