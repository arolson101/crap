import * as React from 'react'
import { View, Text } from 'react-native'
import { Route, Switch, withRouter /*Redirect*/ } from 'react-router'
import { paths } from '../nav'
import { HomePage } from './HomePage'
import { BudgetsPage } from './BudgetsPage'
import { AccountsPage } from './AccountsPage'

interface Props {
}

export const MainViewComponent: React.SFC<Props> = (props) => {
  return (
    <View>
      <Switch>
        <Route path={paths.root.home} exact component={HomePage} />
        <Route path={paths.root.budgets} component={BudgetsPage} />
        <Route path={paths.root.accounts} component={AccountsPage} />
        <Route component={() => <Text>404</Text>}/>>
        {/* <Redirect to="/" /> */}
      </Switch>
    </View>
  )
}

export const MainView = withRouter(MainViewComponent)
