import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

// import answer from '../../assets/img/answer.png';
// import fiftyfifty from '../../assets/img/fiftyfifty.png';
// import hints from '../../assets/img/hints.png';
// import options from '../../assets/img/options.png';

const QuizInstruction =() =>(
    <Fragment>
        <Helmet><title>Quiz Instruction - Quiz App</title></Helmet>
        <div className="instructions container">
            <h1>How to Play the Game</h1>
            <p>Ensure you read this guide from start to finish</p>
            <ul className= "browser-dafault" id="main-list">
                <li>The game has a duration of 15 minutes and ends as soon as your time elapse</li>
                <li>Every question contains 4 options</li>
            </ul>
            <div>
                <span className="left"><Link to="/">Take back home</Link></span>
                <li><span className="right"><Link to="/play/quiz">Let's Play With UI 1</Link></span></li><br /> 
                <li><span className="right"><Link to="/play/quizUI2">Let's Play With UI 2</Link></span></li><br/>
                <li><span className="right"><Link to="/play/quizUI3">Let's Play With UI 3</Link></span></li>
            </div>
        </div>
    </Fragment>
);
export default QuizInstruction;