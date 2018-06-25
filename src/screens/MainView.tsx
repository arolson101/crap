import * as React from 'react'
import { Route, Switch, withRouter /*Redirect*/ } from 'react-router'
import { Container, Text } from '../components/layout'
import { paths } from '../nav'
import { HomeScreen } from './HomeScreen'
import { BudgetsScreen } from './BudgetsScreen'
import { AccountsScreen } from './AccountsScreen'

interface Props {
}

export const MainViewComponent: React.SFC<Props> = (props) => {
  return (
    <Container>
      <Switch>
        <Route path={paths.root.home} exact component={HomeScreen} />
        <Route path={paths.root.budgets} component={BudgetsScreen} />
        <Route path={paths.root.accounts} component={AccountsScreen} />
        <Route component={() => <Text>404</Text>}/>>
        {/* <Redirect to="/" /> */}
      </Switch>
    </Container>
  )
}

export const MainView = withRouter(MainViewComponent)
