import React, { Component } from 'react';
import { ProgressBar } from '../../styles/progressbar.css';

class ProgressForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: null,
      steps: [
        { label: "one" },
        { label: "two" },
        { label: "three" },
        { label: "complete" }
      ]
    };
  }

  nextStep(next = true) {
    const { steps, currentStep } = this.state;
    const currentIndex = steps.indexOf(currentStep);

    if (!next) {
      if (currentStep && currentStep.label === 'complete') {
        this.setState({ currentStep: steps[steps.length - 1] });
        return;
      }

      if (steps[currentIndex - 1]) {
        this.setState({ currentStep: steps[currentIndex - 1] });
        return;
      }

      this.setState({ currentStep: { label: "start" } });
      return;
    }

    if (currentStep && currentStep.label === 'complete') {
      this.setState({ currentStep: { label: "start" } });
      return;
    }

    if (steps[currentIndex + 1]) {
      this.setState({ currentStep: steps[currentIndex + 1] });
    } else {
      this.setState({ currentStep: { label: "complete" } });
    }
  }

  stepClasses(index) {
    const { currentStep, steps } = this.state;
    let result = `progress__step progress__step--${index + 1} `;
    if (
      currentStep &&
      currentStep.label === 'complete' ||
      index < steps.indexOf(currentStep)
    ) {
      return (result += 'progress__step--complete');
    }
    if (index === steps.indexOf(currentStep)) {
      return (result += 'progress__step--active');
    }
    return result;
  }

  progressClasses() {
    const { currentStep, steps } = this.state;
    let result = 'progress ';
    if (currentStep && currentStep.label === 'complete') {
      return (result += 'progress--complete');
    }
    return (result += `progress--${steps.indexOf(currentStep) + 1}`);
  }

  render() {
    return (
      <div id="app">
        {/* JSX로 프로그레스 바 및 버튼을 만듭니다 */}
        <div className={this.progressClasses()}>
          {this.state.steps.map((step, index) => (
            <div
              key={index}
              className={this.stepClasses(index)}
              onClick={() => this.nextStep(index === this.state.steps.indexOf(this.state.currentStep) + 1)}
            >
              {step.label}
            </div>
          ))}
        </div>
        <button onClick={() => this.nextStep()}>Next</button>
      </div>
    );
  }
}

export default ProgressForm;
