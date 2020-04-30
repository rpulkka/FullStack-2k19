import React from 'react';
import { CoursePart } from '../types';
import Part from './Part'
import { v4 as uuidv4 } from 'uuid';

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>
      {props.courseParts.map(coursePart => <Part key={uuidv4()} coursePart={coursePart} />)}
    </div>
  )
}

export default Content