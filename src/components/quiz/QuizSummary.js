import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';

class QuizSummary extends Component {
    constructor(props){
        super(props);
        this.state = {
            score:0,
            numberOfQuestion:0,
            numberOfAnsweredQuestion:0,
            correctAnswer:0,
            wrongAnswer:0,
            hintsUsed:0,
            fiftyFiftyUsed:0
        }
    }

    componentDidMount(){
        const {state} = this.props.location;
        this.setState({
            score:(state.score  /state.numberOfQuestion) * 100,
            numberOfQuestion:state.numberOfQuestion,
            numberOfAnsweredQuestion:state.numberOfAnsweredQuestion,
            correctAnswer:state.correctAnswer,
            wrongAnswer:state.wrongAnswer,
            hintsUsed:state.hintsUsed,
            fiftyFiftyUsed:state.fiftyFiftyUsed
        });
    }
    render(){
        const {state  } = this.props.location;
        const userScore = this.state.score
        let stats , remark;
        if(userScore <= 30){
            remark = 'You need more practice! ';
        } else if(userScore > 30 && userScore <=50){
            remark = 'Better luck next time! ';
        } else if(userScore <=70 && userScore >50){
            remark = 'Try more to better! ';
        } else if(userScore >=71 &&userScore <=83){
            remark = 'Try did great! ';
        }
        else{
            remark = 'Very Good Genius !';
        }


        if(state !== undefined)
        {
            stats = (
                <Fragment>
                    <div style={{ textAlign: 'center' }}>
                        <span className="mdi mdi-check-circle-outline success-icon"></span>
                    </div>
                    <h1>Quiz has ended</h1>
                    <div className="container stats">
                        <h4>{remark}</h4>
                        <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                        <span className="stat left">Total number of question: </span>
                        <span className="right">{this.state.numberOfQuestion}</span><br/>

                        <span className="stat left">Number of  attempted question: </span>
                        <span className="right">{this.state.numberOfAnsweredQuestion}</span><br/>

                        <span className="stat left">Number of Correct Answers: </span>
                        <span className="right">{this.state.correctAnswer}</span><br/>

                        <span className="stat left">Number of Wrong Answer: </span>
                        <span className="right">{this.state.wrongAnswer}</span><br/>

                        <span className="stat left">Hints Used: </span>
                        <span className="right">{this.state.hintsUsed}</span><br/>

                        <span className="stat left">50-50 Used: </span>
                        <span className="right">{this.state.fiftyFiftyUsed}</span>
                    </div>
                    <section>
                        <ul>
                            <li>
                                <Link to ="/">Back to Home</Link>
                            </li>
                            <li>
                                <Link to ="/play/quiz">Play Again</Link>
                            </li>
                        </ul>
                    </section>
                </Fragment>            
            );
        }else{
            stats = (
                <section>
                    <h1 className="no-stats">No Statistics Available</h1>
                    <ul>
                        <li>
                            <Link to ="/">Back to Home</Link>
                        </li>
                        <li>
                            <Link to ="/play/quiz">Take a Quiz</Link>
                        </li>
                    </ul>
                </section>            
            );
        }
        return (
            <Fragment>
                <Helmet><title>Quiz App -Summary</title></Helmet>
                <div className="quiz-summary">
                    {stats}
                </div>
            </Fragment>
        );
    }
}

export default QuizSummary