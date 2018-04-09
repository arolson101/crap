import * as React from 'react';

interface Props {
  title: string;
}

export const ListItem: React.SFC<Props> = (props) => (
  <span>
    {props.title}
  </span>
);
