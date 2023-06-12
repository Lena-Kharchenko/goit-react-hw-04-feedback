import { useState } from 'react';

import Section from './section/section';
import FeedbackOptions from './feedbackOptions/feedbackOptions';
import Statistics from './statistics/statistics';
import Notification from './notification/notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addFeedbackPoint = ({ target }) => {
    switch (target.name) {
      case 'good':
        setGood(state => state + 1);
        break;
      case 'neutral':
        setNeutral(state => state + 1);
        break;
      case 'bad':
        setBad(state => state + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return countTotalFeedback()
      ? Number(((good * 100) / countTotalFeedback()).toFixed())
      : 0;
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={{ good, neutral, bad }}
          onLeaveFeedback={addFeedbackPoint}
        />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message={'There is no feedback'} />
        )}
      </Section>
    </>
  );
}

// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   addFedbackPoint = ({ target }) => {
//     this.setState(state => ({
//       [target.name]: state[target.name] + 1,
//     }));
//   };

//   countTotalFeedback() {
//     return this.state.good + this.state.bad + this.state.neutral;
//   }

//   countPositiveFeedbackPercentage() {
//     return this.countTotalFeedback()
//       ? Number(((this.state.good * 100) / this.countTotalFeedback()).toFixed())
//       : 0;
//   }

//   render() {
//     const { good, neutral, bad } = this.state;
//     return (
//       <>
//         <Section title="Please leave feedback">
//           <FeedbackOptions
//             options={this.state}
//             onLeaveFeedback={this.addFedbackPoint}
//           />
//         </Section>

//         <Section title="Statistics">
//           {this.countTotalFeedback() ? (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={this.countTotalFeedback()}
//               positivePercentage={this.countPositiveFeedbackPercentage()}
//             />
//           ) : (
//             <Notification message={'There is no feedback'} />
//           )}
//         </Section>
//       </>
//     );
//   }
// }
