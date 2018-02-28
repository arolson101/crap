import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Bank, selectors, paths, RootState } from '../../state';
import { BankForm } from '../forms/BankForm';
import { ctx } from '../ctx';

interface Props {
  banks: Bank.View[];
}

interface Tab {
  path: string;
  title: string;
  exact?: boolean;
  disabled?: boolean;
}

interface TabProps {
  tabs: Tab[];
}

export const Tabs: React.SFC<TabProps> = ({ children, tabs }, { router }: ctx.Router) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {tabs.map(tab =>
        <Route
          key={tab.path}
          exact={tab.exact}
          path={tab.path}
          children={({ match }) => <Button
            disabled={!!match || tab.disabled}
            onPress={() => router.history.replace(tab.path)}
            title={tab.title}
          />}
        />
      )}
    </View>
  );
};
Tabs.contextTypes = ctx.router;

export const AccountsCreatePageComponent: React.SFC<Props> = (props) => (
  <View>
    <Tabs
      tabs={[
        {
          exact: true,
          path: paths.accounts.create,
          title: 'bank',
        },
        {
          exact: true,
          path: paths.accounts.createAccount,
          title: 'account',
          disabled: (props.banks.length === 0),
        },
      ]}
    />
    <Route path={paths.accounts.create} exact component={CreateBankPage}/>
    <Route path={paths.accounts.createAccount} exact children={() => <CreateAccountPage {...props}/>}/>
  </View>
);

export const AccountsCreatePage = connect(
  (state: RootState) => ({
    banks: selectors.getBanks(state),
  })
)(AccountsCreatePageComponent);

const CreateBankPage: React.SFC = () => <BankForm/>;

const CreateAccountPage: React.SFC<Props> = (props) => {
  return (
    <View>
      {props.banks.map(bank =>
        <Text key={bank.bank.id}>{bank.bank.name}</Text>
      )}
    </View>
  );
};
