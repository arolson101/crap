import { NavigationContainerComponent, NavigationActions, StackActions } from 'react-navigation'
import { paths } from '../nav'
import * as React from 'react'
import { NavApi, NavContext, NavPickerParams } from './NavContext'

interface State {
  navigator: NavigationContainerComponent
}

export class NavProvider extends React.Component {
  state: State = { navigator: null as any }

  api: NavApi = {
    setTopNavigator: (navigator: NavigationContainerComponent) => {
      this.setState({ navigator })
    },

    navBack: () => this.state.navigator.dispatch(NavigationActions.back()),

    navPopToTop: () => this.state.navigator.dispatch(StackActions.popToTop({})),

    login: () => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.app,
    })),

    logout: () => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.login,
    })),

    navHome: () => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.root.home,
    })),
    navAccounts: () => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.root.accounts,
    })),
    navBudgets: () => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.root.budgets,
    })),

    navBank: (bankId: string) => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.bank,
      params: { bankId }
    })),

    navBankCreate: () => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.bankCreate,
      params: {}
    })),

    navBankEdit: (bankId: string) => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.bankEdit,
      params: { bankId }
    })),

    navAccount: (accountId: string, accountName: string) => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.root.accounts,
      action: NavigationActions.navigate({
        routeName: paths.account,
        params: { accountId, accountName }
      })
    })),

    navAccountEdit: (accountId: string) => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.accountEdit,
      params: { accountId }
    })),

    navAccountCreate: (bankId: string) => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.accountCreate,
      params: { bankId }
    })),

    navTransactionEdit: (transactionId: string) => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.transactionEdit,
      params: { transactionId }
    })),

    navTransactionCreate: (accountId: string) => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.transactionCreate,
      params: { accountId }
    })),

    navPicker: (params: NavPickerParams) => this.state.navigator.dispatch(NavigationActions.navigate({
      routeName: paths.picker,
      params
    })),
  }

  render() {
    return (
        <NavContext.Provider value={this.api}>
          {this.props.children}
        </NavContext.Provider>
    )
  }
}
