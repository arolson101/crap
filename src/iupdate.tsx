import * as update from 'immutability-helper';

export namespace iupdate {
  export type Query<T> = update.Query<T>;
}

export const iupdate = (update as any).newContext();

iupdate.extend('$exclude', (param: string[], old: string[]): any => {
  return old.filter(x => !param.includes(x));
});
