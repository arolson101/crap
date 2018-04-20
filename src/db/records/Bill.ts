import { iupdate } from '../../iupdate';
import { Record } from '../Record';

export interface Bill extends Bill.Props, Record<Bill.Props> {}

export namespace Bill {
  export interface Props {
    readonly name: string;
    readonly group: string;
    readonly web: string;
    readonly favicon?: string;
    readonly notes: string;
    readonly amount: number;
    readonly account?: string;
    readonly category: string;
    readonly rruleString: string;
    readonly showAdvanced?: boolean;
  }

  export type Query = iupdate.Query<Props>;
  export const table = 'bills';
  export const schema = Record.genSchema('account', 'category');
}
