import { action } from '@storybook/addon-actions';
import { Middleware } from 'redux';
import { ThunkDependencies } from '../src/state';

export const dependencies: ThunkDependencies = {
  getTime: Date.now,
  genId: () => Date.now().toString()
};

const logDispatch = action('dispatch');

const dispatchActionLogger: Middleware = st => next => (act: any) => {
  logDispatch(JSON.stringify(act));
  return next(act);
};

export const middlewares = [dispatchActionLogger];
