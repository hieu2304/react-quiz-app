import React from 'react';
import {BrowserRouter as Router ,Route} from 'react-router-dom';

import Home from './components/Home';
import QuizInstructions from './components/quiz/Quizinstructions';
import Play from './components/quiz/Play';
import QuizSummary from './components/quiz/QuizSummary';
import PlayUI2 from './components/quiz/PlayUI2';
import PlayUI3 from './components/quiz/PlayUI3';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/play/instructions" exact component={QuizInstructions} />
      <Route path="/play/quiz" exact component={Play} />
      <Route path="/play/quizUI2" exact component={PlayUI2} />
      <Route path="/play/quizUI3" exact component={PlayUI3}/>
      <Route path="/play/quizSummary" exact component={QuizSummary} />
    </Router>
  );
}

export default App;
