import React from 'react';
import { Check } from 'lucide-react';

export const Stepper = ({ steps, currentStep, onStepClick }: { steps: string[], currentStep: number, onStepClick?: (i: number) => void }) => {
  return (
    <div className="stepper">
      {steps.map((step, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        return (
          <React.Fragment key={step}>
            <div 
              className={`stepper-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => onStepClick && onStepClick(i)}
              style={{ cursor: onStepClick ? 'pointer' : 'default' }}
            >
              <div className="stepper-number">
                {isCompleted ? <Check size={16} /> : (i + 1)}
              </div>
              <div className="stepper-label">{step}</div>
            </div>
            {i < steps.length - 1 && (
              <div className={`stepper-line ${isCompleted ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
