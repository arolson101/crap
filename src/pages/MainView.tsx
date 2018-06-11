import * as React from 'react'
import { Route, Switch, withRouter /*Redirect*/ } from 'react-router'
import { Container, Text } from '../components/layout'
import { paths } from '../nav'
import { HomePage } from './HomePage'
import { BudgetsPage } from './BudgetsPage'
import { AccountsPage } from './AccountsPage'

interface Props {
}

export const MainViewComponent: React.SFC<Props> = (props) => {
  return (
    <Container>
      <Switch>
        <Route path={paths.root.home} exact component={HomePage} />
        <Route path={paths.root.budgets} component={BudgetsPage} />
        <Route path={paths.root.accounts} component={AccountsPage} />
        <Route component={() => <Text>404</Text>}/>>
        {/* <Redirect to="/" /> */}
      </Switch>
    </Container>
  )
}

export const MainView = withRouter(MainViewComponent)
