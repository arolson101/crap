import * as React from 'react';

interface Props {}

export const List: React.SFC<Props> = (props) => (
  <div>
    {props.children}
  </div>
);
