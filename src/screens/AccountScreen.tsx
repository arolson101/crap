import cuid from 'cuid'
import { DateTime } from 'luxon'
import { Body, ListItem } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'
import * as React from 'react'
import { ListRenderItem, SectionBase, SectionList } from 'react-native'
import { compose } from 'recompose'
import { Text } from '../components/layout'
import { InjectedNavProps, withNav } from '../components/NavContext'
import { withMutation, withQuery } from '../db'
import { Mutations, Queries } from '../db/index'
import { Account } from '../db/queries/queries-types'
import { AddButtonProps, makeScreen } from './Screen'

interface Params {
  accountId: string
  accountName: string
}

interface Props extends Params, AddButtonProps, InjectedNavProps {
  query: Queries.Account
  downloadTransactions: Mutations.DownloadTransactions
  cancel: Mutations.Cancel
}

type ItemType = Account.Transactions

interface Section extends SectionBase<ItemType> {
  month: string
}

interface State {
  refreshing: boolean
}

class AccountScreenComponent extends React.PureComponent<Props, State> {
  state: State = {
    refreshing: false
  }

  componentDidMount() {
    const { setAdd } = this.props
    setAdd(this.onAdd)
  }

  render() {
    const { account } = this.props.query
    const groups = account.transactions.length === 0
      ? { foo: [{ id: '0', name: 'empty', serverid: '', memo: '', amount: 0, time: 0 } as Account.Transactions] }
      : account.transactions.reduce((sections, item) => {
        const month = this.getSection(item)
        sections[month] = [...(sections[month] || []), item]
        return sections
      }, {} as { [key: string]: ItemType[] })
    const sections = Object.keys(groups)
      .sort()
      .map((month): Section => {
        return { month, data: groups[month] }
      })

    return (
      <SectionList
        refreshing={this.state.refreshing}
        onRefresh={this.downloadTransactions}
        style={{ backgroundColor: platform.cardDefaultBg }}
        sections={sections}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
      />
    )
  }

  onAdd = () => {
    const { navTransactionCreate } = this.props
    const accountId = this.props.query.account.id
    navTransactionCreate(accountId)
  }

  downloadTransactions = () => {
    const { accountId, cancel, downloadTransactions } = this.props
    const bankId = this.props.query.account.bankId
    const cancelToken = cuid()
    const end = new Date()
    const start = DateTime.fromJSDate(end).minus({ months: 1 })
    this.setState({ refreshing: true })
    downloadTransactions(
      { accountId, bankId, start, end, cancelToken },
      {
        noSpinner: true,
        finally: () => this.setState({ refreshing: false }),
        cancel: () => cancel({ cancelToken }),
      })
  }

  getSection(item: ItemType) {
    return 'month'
    // return item.time ? new Date(item.time).getMonth
  }

  keyExtractor = (item: ItemType) => item.id.toString()

  renderItem: ListRenderItem<ItemType> = ({ item, index }) => {
    return (
      <ListItem>
        <Body>
          <Text>{item.name}</Text>
          <Text note>{item.memo}</Text>
          <Text note>{item.amount}</Text>
          <Text note>{item.balance}</Text>
          <Text note>{item.time}</Text>
        </Body>
      </ListItem>
    )
  }

  renderSectionHeader = (info: { section: Section }) => {
    return (
      <ListItem itemDivider>
        <Text>{info.section.month}</Text>
      </ListItem>
    )
  }
}

export const AccountScreen = compose(
  makeScreen({ title: (params: Params) => params.accountName, addButton: true }),
  withQuery({ query: Queries.Account }, (props: Props) => ({ accountId: props.accountId })),
  withMutation({ downloadTransactions: Mutations.DownloadTransactions }),
  withMutation({ cancel: Mutations.Cancel }),
  withNav,
)(AccountScreenComponent)
AccountScreen.displayName = 'AccountScreen'
