export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDescribed extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends CoursePartDescribed {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartDescribed {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartDescribed {
  name: "Just another course part";
  greeting: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;