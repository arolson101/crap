import * as PropTypes from 'prop-types';
import { InjectedIntlProps } from 'react-intl';
import { RouterChildContext } from 'react-router';

export namespace ctx {
  export const router = {
    router: PropTypes.object,
  };
  export const intl = {
    intl: PropTypes.object,
  };

  export type Intl = InjectedIntlProps;
  export type Router<T = any> = RouterChildContext<T>;
}
