import { Body, Header, Icon, Input, Item, ListItem, Text } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { ListRenderItem, SectionBase, SectionList, StyleSheet } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { actions } from '../redux/actions/index'
import { NavPickerParams, SelectFieldItem } from '../redux/actions/navActions'
import { makeScreen } from '../screens/Screen'

interface Props extends NavPickerParams, NavigationInjectedProps {
  navBack: actions['navBack']
}

interface State {
  searchTerm: string
  filteredItems?: SelectFieldItem[]
}

interface Section extends SectionBase<SelectFieldItem> {
  letter: string
}

class PickerForm extends React.Component<Props, State> {
  state: State = {
    searchTerm: '',
  }

  getFirstLetter (str: string) {
    const letter = str[0] as string | undefined
    if (letter && letter.match(/[a-z]/i)) {
      return letter.toUpperCase()
    } else {
      return '#'
    }
  }

  render () {
    const { searchable } = this.props
    const { searchTerm } = this.state
    const items = this.state.filteredItems || this.props.items
    const groups = items.reduce((sections, item) => {
      let letter = this.getFirstLetter(item.label)
      sections[letter] = [...(sections[letter] || []), item]
      return sections
    }, {} as { [key: string]: SelectFieldItem[] })
    const sections = Object.keys(groups)
      .sort()
      .map((letter): Section => {
        return { letter, data: groups[letter].sort() }
      })
    return (
      <>
        {searchable &&
          <Header searchBar rounded style={styles.searchBarHeader}>
            <Item>
              <Icon name='search' />
              <Input
                placeholder='Search'
                onChangeText={this.onChangeText}
                value={searchTerm}
                autoCorrect={false}
                autoCapitalize='none'
              />
              {searchTerm
                ? <Icon name='ios-close-circle' onPress={this.onClear} />
                : <Text />
              }
            </Item>
          </Header>
        }
        <SectionList
          style={{ backgroundColor: platform.cardDefaultBg }}
          sections={sections}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
        />
      </>
    )
  }

  keyExtractor = (item: SelectFieldItem) => item.value.toString()

  renderItem: ListRenderItem<SelectFieldItem> = ({ item, index }) => {
    const { items, onValueChange, navBack, selectedItem } = this.props

    return (
      <ListItem
        button
        onPress={() => {
          onValueChange(item.value)
          navBack()
        }}
        selected={item.value === selectedItem}
        first={index === 0}
        last={index === items.length - 1}
      >
        <Body>
          <Text>{item.label}</Text>
        </Body>
      </ListItem>
    )
  }

  renderSectionHeader = (info: { section: Section }) => {
    if (!this.props.searchable) {
      return null
    }
    return (
      <ListItem itemDivider>
        <Text>{info.section.letter}</Text>
      </ListItem>
    )
  }

  onChangeText = (searchTerm: string) => {
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
  connect(null, { navBack: actions.navBack }),
)(PickerForm)
PickerModal.displayName = 'PickerModal'

const styles = StyleSheet.create({
  searchBarHeader: {
    paddingTop: 0,
    height: platform.searchBarHeight + platform.listItemPadding
  }
})
