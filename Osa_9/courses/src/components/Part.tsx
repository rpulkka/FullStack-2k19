import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = (props) => {
  switch(props.coursePart.name) {
    case "Fundamentals":
      return(<p>{props.coursePart.name} {props.coursePart.exerciseCount} {props.coursePart.description}</p>);
    case "Using props to pass data":
      return(<p>{props.coursePart.name} {props.coursePart.exerciseCount} {props.coursePart.groupProjectCount}</p>);
    case "Deeper type usage":
      return(<p>{props.coursePart.name} {props.coursePart.exerciseCount} {props.coursePart.description} {props.coursePart.exerciseSubmissionLink}</p>);
    case "Just another course part":
      return(<p>{props.coursePart.name} {props.coursePart.exerciseCount} {props.coursePart.description} {props.coursePart.greeting}</p>);
    default:
      return assertNever(props.coursePart);
  }
}

export default Part