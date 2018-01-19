import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';
import { combineEpics } from 'redux-observable';
import { pingEpic } from './pingEpic';

export const rootEpic = combineEpics(
  pingEpic,
);
