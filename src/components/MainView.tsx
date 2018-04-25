import * as React from 'react'
import { View, Text } from 'react-native'
import { Route, Switch, withRouter /*Redirect*/ } from 'react-router'
import { paths } from '../nav'
import * as Pages from './pages'

interface Props {
}

export const MainViewComponent: React.SFC<Props> = (props) => {
  return (
    <View>
      <Switch>
        <Route path={paths.root.home} exact component={Pages.HomePage} />
        <Route path={paths.root.budgets} component={Pages.BudgetsPage} />
        <Route path={paths.root.accounts} component={Pages.AccountsPage} />
        <Route component={() => <Text>404</Text>}/>>
        {/* <Redirect to="/" /> */}
      </Switch>
    </View>
  )
}

export const MainView = withRouter(MainViewComponent)
