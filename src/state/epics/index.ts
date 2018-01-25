import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { combineEpics } from 'redux-observable';
import bankEpics from './dbEpics';
import dbEpics from './dbEpics';
import { pingEpic } from './pingEpic';

export interface EpicDependencies {
  getTime: () => number;
}

export const rootEpic = combineEpics(
  pingEpic,
  ...bankEpics,
  ...dbEpics,
);
