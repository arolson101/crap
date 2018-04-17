/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface AccountsQuery {
  banks:  Array< {
    id: string,
    name: string,
    accounts:  Array< {
      id: string,
      name: string,
    } >,
  } >,
};

export interface AllCoursesQuery {
  allCourses:  Array< {
    title: string,
  } | null >,
};

export interface CourseQueryVariables {
  id: number,
};

export interface CourseQuery {
  course:  {
    id: number,
    title: string,
    author: string,
    description: string,
    topic: string,
    url: string,
  } | null,
};

export interface DbsQuery {
  dbs: Array< string >,
};
