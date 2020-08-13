import React, {Component,Fragment} from 'react';
import {Helmet} from 'react-helmet';
import M from 'materialize-css';
import {questions} from '../../question';
import isEmpty from '../../utils/is-empty';
import correctNotification from '../../assets/audio/correct-answer.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
import buttonSound from '../../assets/audio/button-sound.mp3';
import classnames from 'classnames';

class PlayUI2 extends Component{
    constructor (props){
         super(props);
         this.state ={ questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion:{},
            answer:'',
            newAnswer:'A',
            numberOfQuestion:0,
            numberOfAnsweredQuestion:0,
            currentQuestionIndex:0,
            score:0,
            correctAnswer:0,
            wrongAnswer:0,
            hints:5,
            fiftyFifty:1,
            usedFiftyFifty:false,
            nextButtonDisabled:false,
            previousButtonDisabled:true,
            previousRandomNumber:[],
            time: {}
        };
        this.interval = null;
    }

    componentDidMount(){
        const { questions,currentQuestion,nextQuestion,previousQuestion } =this.state;
        this.displayQuestion(questions,currentQuestion,nextQuestion,previousQuestion);
        this.startTimer();
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
   displayQuestion =(questions = this.state.questions,currentQuestion,nextQuestion,previousQuestion)=>{
        let {currentQuestionIndex}= this.state;
        if(!isEmpty(this.state.questions)){
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex -1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion: currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestion:questions.length,
                answer,
                previousRandomNumber:[]
            },() => {
                this.showOptions();
                this.handleDisableButton();
            });
        }
   };

   handdleOptionClick =(e) => {
       if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
           setTimeout(()=>{
                document.getElementById('correct-sound').play();
           },500);         
           this.correctAnswer();
       }else{
           setTimeout(()=>{
                document.getElementById('wrong-sound').play();
           });

           this.wrongAnswer();
       }
   }

   handdleNextButtonClick = () =>{
        this.playButtonSound();
        if(this.state.nextQuestion !== undefined){
            this.setState(prevState => ({
                currentQuestionIndex:prevState.currentQuestionIndex + 1
            }), () =>{
                this.displayQuestion(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            });
        }
   };
   handdlePreviousButtonClick = () =>{
        this.playButtonSound();
        if(this.state.previousQuestion !== undefined){
            this.setState(prevState => ({
                currentQuestionIndex:prevState.currentQuestionIndex - 1
            }), () =>{
                this.displayQuestion(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            });
        }
    };
   handdleQuitButtonClick = () =>{
        this.playButtonSound();
        if(window.confirm('Are you sure want to quit ?')){
            this.props.history.push('/');
        }
   };
   handdleButtonClick = (e) =>{
       switch(e.target.id){
           case'next-button':
                this.handdleNextButtonClick();
                break;
           case'previous-button':
                this.handdlePreviousButtonClick();
                break;
           case'quit-button':
                this.handdleQuitButtonClick();
                break;
           default:
               break;
       }
        this.playButtonSound();
   };
   playButtonSound=()=>{
        document.getElementById('button-sound').play();
   };
    correctAnswer = () =>{
        M.toast({
            html:'Correct Answer',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState(prevState =>({
            score: prevState.score +1,
            correctAnswer: prevState.correctAnswer + 1,
            currentQuestionIndex:prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion +1
        }),()=>{
            if(this.state.nextQuestion === undefined)
            {
                this.endGame();
            }else{
                this.displayQuestion(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            }           
        });
    }

    wrongAnswer = () =>{
        navigator.vibrate(1000);
        M.toast({
            html:'Wrong Answer',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState =>({
            wrongAnswer: prevState.wrongAnswer + 1,
            currentQuestionIndex:prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestion:prevState.numberOfAnsweredQuestion + 1
        }),()=>{
            if(this.state.nextQuestion === undefined){
                this.endGame();
            }else{
                this.displayQuestion(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            }          
        });
    }

    showOptions = () =>{
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option =>{
            option.style.visibility = 'visible';
        });

        this.setState({
        });
    }

    handleHints = () =>{
        if(this.state.hints > 0){
            const options = Array.from(document.querySelectorAll('.option'));
        let indexOfAnswer;
        options.forEach((option,index)=>{
            if(option.innerHTML.toLowerCase()===this.state.answer.toLowerCase()){
                indexOfAnswer = index;
            }
        });
        while(true){
            const randomNumber =Math.round(Math.random() * 3);
            if(randomNumber !== indexOfAnswer && !this.state.previousRandomNumber.includes(randomNumber)){
                    options.forEach((option,index) =>{
                        if(index === randomNumber){
                            option.style.visibility='hidden';
                            this.setState((prevState) => ({
                                hints:prevState.hints - 1,
                                previousRandomNumber:prevState.previousRandomNumber.concat(randomNumber)

                            }));
                        }                  
                    });
                    break;
                }
                if(this.state.previousRandomNumber.length >=3)break;
            }
        }    
    }

    handdleFiftyFifty =() =>{
        if(this.state.fiftyFifty >0 && this.state.usedFiftyFifty === false){
            const options = document.querySelectorAll('.option');
            const randomNumbers =[];
            let indexOfAnswer;

            options.forEach((option,index)=>{
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                    indexOfAnswer = index;
                }                
            });
            let count=0;
            do{
                const randomNumber = Math.round(Math.random() * 3);
                if(randomNumber !== indexOfAnswer){
                    if(randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer))
                    {
                        randomNumbers.push(randomNumber);
                        count++;
                    }else{
                        while(true){
                            const newRandomNumber = Math.round(Math.random() * 3);
                            if(!randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)){
                                randomNumbers.push(newRandomNumber);
                                count ++;
                                break;
                            }
                        }
                    }
                }
            }while(count < 2)
            options.forEach((option,index) => {
                if(randomNumbers.includes(index)){
                    option.style.visibility ='hidden';
                }
            });
            this.setState(prevState => ({
                fiftyFifty:prevState.fiftyFifty - 1,
                usedFiftyFifty: true
            }));
        }
    }

    startTimer =() =>{
        const countDownTime = Date.now() + 180000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000*60*60)) /(1000 *60));
            const seconds = Math.floor((distance % (1000*60)) /1000);

            if(distance < 0)
            {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes:0,
                        seconds:0
                    }
                },() =>{
                    this.endGame();
                });
            }else{
                this.setState({
                    time:{
                        minutes,
                        seconds
                    }
                })
            }
        },1000);
    }

    handleDisableButton = () =>{
        if(this.state.previousQuestion === undefined || this.state.currentQuestionIndex ===0){
            this.setState({
                previousButtonDisabled:true
            });
        }else{
            this.setState({
                previousButtonDisabled:false
            });
        }

        if(this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestion){
            this.setState({
                nextButtonDisabled:true
            });
        }else{
            this.setState({
                nextButtonDisabled:false
            });
        }
    }

    endGame = ()=> {
        alert('Quiz has eneded');
        const {state} =this;
        const playerStats = {
            score:state.score,
            numberOfQuestion:state.numberOfQuestion,
            numberOfAnsweredQuestion:state.correctAnswer + state.wrongAnswer,
            correctAnswer:state.correctAnswer,
            wrongAnswer:state.wrongAnswer,
            fiftyFiftyUsed:2 - state.fiftyFifty,
            hintsUsed:5 - state.hints
        };
        console.log(playerStats);
        setTimeout(() =>{
            this.props.history.push('/play/quizSummary',playerStats);
        },1000);
    }

    handdleOptionClick2 =(e) =>{
        if(this.state.newAnswer.toLowerCase() === this.state.answer.toLowerCase()){
            setTimeout(()=>{
                 document.getElementById('correct-sound').play();
            },500);         
            this.correctAnswer();
        }else{
            setTimeout(()=>{
                 document.getElementById('wrong-sound').play();
            });
 
            this.wrongAnswer();
        }
    }
    handdleInputChange = (e)=>{
        e.preventDefault();
        this.setState({
            newAnswer:e.target.value
        });
    }
    render(){
        const {currentQuestion, currentQuestionIndex,numberOfQuestion,time,}    = this.state;
        return(
            <Fragment>
                <Helmet><title>Quiz Page</title></Helmet>
                <Fragment>
                    <audio id="correct-sound" src={correctNotification}></audio>
                    <audio id="wrong-sound" src={wrongNotification}></audio>
                    <audio id="button-sound" src={buttonSound}></audio>
                </Fragment>
                <div className ="questions">
                    <h2>Quiz Mode</h2>
                    <div className="timer-container">
                        <p>
                            <span className="left" style={{ float:'left' }}>{currentQuestionIndex + 1} of {numberOfQuestion}</span>
                            <span className="right">{time.minutes}:{time.seconds}<span className="mdi mdi-clock-outline mdi-24px "></span></span>
                        </p>
                    </div>
                    <h5>{currentQuestion.question}</h5>
                    <div> 
                        <form>
                            <input type="text"  placeholder="Answer..." onChange={event=>this.handdleInputChange(event)}></input>
                            <p id="send" onClick ={this.handdleOptionClick2}  className="option">Send</p>
                        </form>
                    </div>

                    <div className="button-container">
                        <button
                            className= {classnames('',{'disable':this.state.previousButtonDisabled})} 
                            id="previous-button" 
                            onClick={this.handdleButtonClick}>
                            Previous
                        </button>
                        <button
                            className= {classnames('',{'disable':this.state.nextButtonDisabled})} 
                            id="next-button" 
                            onClick={this.handdleButtonClick}>
                            Next
                        </button>
                        <button id="quit-button" onClick={this.handdleButtonClick}>Quit</button>
                    </div>
                </div>
            </Fragment>       
        );
    }
}

export default PlayUI2;