import * as React from 'react';
import { View, Text } from 'react-native';
import { CourseQuery, Course } from '../../db/queries';

export const HomePage: React.SFC = (props) => {
  return (
    <View>
      <CourseQuery query={Course}>
        {({ loading, error, data }) => {
          if (loading) { return <p>Loading...</p>; }
          if (error || !data) { return <p>Error :(</p>; }
          return <p>{data.course ? data.course.title : 'no result'}</p>;
        }}
      </CourseQuery>

      <Text>home page</Text>
    </View>
  );
};
