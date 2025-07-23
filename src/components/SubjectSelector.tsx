import React from 'react';
import { Subject } from '../types';

interface SubjectSelectorProps {
  currentSubject: Subject;
  onSubjectChange: (subject: Subject) => void;
}

const subjects: { value: Subject; label: string; icon: string }[] = [
  { value: 'general', label: 'General', icon: '💬' },
  { value: 'math', label: 'Math', icon: '🔢' },
  { value: 'science', label: 'Science', icon: '🔬' },
  { value: 'reading', label: 'Reading', icon: '📚' },
  { value: 'history', label: 'History', icon: '🏛️' },
  { value: 'language', label: 'Language', icon: '🌍' },
];

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ 
  currentSubject, 
  onSubjectChange 
}) => {
  return (
    <div className="subject-selector">
      <div className="subject-tabs">
        {subjects.map((subject) => (
          <button
            key={subject.value}
            className={`subject-tab ${currentSubject === subject.value ? 'active' : ''}`}
            onClick={() => onSubjectChange(subject.value)}
          >
            <span className="subject-icon">{subject.icon}</span>
            <span className="subject-label">{subject.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;