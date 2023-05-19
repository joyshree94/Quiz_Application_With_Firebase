import {useParams,useHistory} from 'react-router-dom';
import Answer from '../Answer';
import Progresbar from '../Progresbar';
import Miniplayer from '../Miniplayer';
import { useEffect, useReducer,useState } from 'react';
import useQuestion from "../../hooks/useQuestion";
import _ from "lodash";
import { useAuth } from "../../contexts/AuthContext";
import { getDatabase, ref, set } from "firebase/database";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const {id} =useParams();
  const {loading, error,questions,}=useQuestion(id);
  const [currentQuestion,setCurrentQuestion]=useState(0);
  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const history = useHistory();
  const { location } = history;
  const { state } = location;
  const { videoTitle } = state;
  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  // handle when user clicks the next button to get the next question
  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  }

    // handle when user clicks the prev button to get back to the previous question
    function prevQuestion() {
      if (currentQuestion >= 1 && currentQuestion <= questions.length) {
        setCurrentQuestion((prevCurrent) => prevCurrent - 1);
      }
    }
  // submit quiz
  async function submit() {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });

    history.push({
      pathname: `/result/${id}`,
      state: {
        qna,
      },
    });
  }

      // calculate percentage of progress
  const percentage =
  questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
    return (
      <>
      {loading && <div>Loading ...</div>}
        {error && <div>There was an error!</div>}
        {!loading && !error && qna && qna.length > 0 && (
            <>
                <h1>{qna[currentQuestion].title}</h1>
                <h4>Question can have multiple answers</h4>
                <Answer
                    input={true}
                    options={qna[currentQuestion].options}
                    handleChange={handleAnswerChange}
                  />

                <Progresbar
                  next={nextQuestion}
                  prev={prevQuestion}
                  submit={submit}
                  progress={percentage}
                />
                <Miniplayer id={id} title={videoTitle}/>
            </>
           )}
      </>

    );

}