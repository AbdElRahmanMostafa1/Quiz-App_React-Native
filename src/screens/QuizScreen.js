import {
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import GlobalStyles from '../constants/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {getQuiz, incrementScore, resetPrevScore} from '../store/quizSlice';
import RenderHtml from 'react-native-render-html';
import LoadingSpinner from '../components/LoadingSpinner';
import shuffleArray from '../utils/shuffleArray';

const QuizScreen = ({navigation}) => {
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  const {isQuestionsLoading, questions, isError, score} = useSelector(
    state => state.quizConfig,
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [multipleChoiceAns, setMultipleChoiceAns] = useState([]);
  const trueAnsTextRef = useRef('True');
  const falseAnsTextRef = useRef('False');

  useEffect(() => {
    if (questions?.length > 0) {
      const backAction = () => {
        Alert.alert(
          'Do you want do Exit?',
          'All your answers will not be saved!',
          [
            {
              text: 'No',
              onPress: () => {},
              style: 'cancel',
            },
            {text: 'YES', onPress: () => navigation.navigate('QuizConfig')},
          ],
        );
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, []);

  useEffect(() => {
    dispatch(getQuiz());
    if (score > 0) {
      dispatch(resetPrevScore());
    }
  }, [dispatch]);

  useEffect(() => {
    if (questions?.length > 0) {
      setMultipleChoiceAns(
        shuffleArray([
          ...questions[questionIndex]?.incorrect_answers,
          questions[questionIndex]?.correct_answer,
        ]),
      );
    }
  }, [questions, questionIndex]);

  const checkQuestionAnswer = answer => {
    if (questions[questionIndex]?.correct_answer === answer) {
      dispatch(incrementScore());
    }
    if (questionIndex + 1 >= questions.length) {
      navigation.navigate('ScoreScreen');
    } else {
      setQuestionIndex(prevValue => (prevValue += 1));
    }
  };

  if (!questions || isQuestionsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.quizContainer}>
      {questions.length > 0 && questions !== [] ? (
        <>
          <View style={{flex: 0.75}}>
            <Text style={styles.questionNumber}>
              Question {questionIndex + 1}
            </Text>
            <RenderHtml
              contentWidth={width}
              source={{html: `${questions[questionIndex]?.question}`}}
              baseStyle={styles.question}
            />
            {questions[questionIndex]?.type === 'multiple' ? (
              <>
                {multipleChoiceAns?.map(ans => (
                  <TouchableOpacity
                    onPress={() => checkQuestionAnswer(ans)}
                    key={ans}
                    style={styles.ansBtn}>
                    <RenderHtml
                      contentWidth={width}
                      source={{
                        html: `${ans}`,
                      }}
                      baseStyle={styles.ansBtnText}
                    />
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <>
                {[trueAnsTextRef, falseAnsTextRef].map(ans => (
                  <TouchableOpacity
                    key={ans.current}
                    style={styles.ansBtn}
                    onPress={() => checkQuestionAnswer(ans.current)}>
                    <Text style={styles.ansBtnText}>{ans.current}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
          <View>
            <Text style={styles.scoreText}> Score: {score} </Text>
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'green', fontSize: 18, textAlign: 'center'}}>
            Oops! There is no questions by this requirements yet!{' '}
          </Text>
          <Text
            onPress={() => navigation.navigate('QuizConfig')}
            style={{
              color: 'black',
              textDecorationColor: 'black',
              textDecorationStyle: 'solid',
              textDecorationLine: 'underline',
            }}>
            Go to quiz configurations
          </Text>
        </View>
      )}
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  quizContainer: {
    ...GlobalStyles.screenStyles,
  },
  questionNumber: {
    ...GlobalStyles.textStyles.textHeader,
    color: '#0F3D3E',
    marginBottom: '10%',
  },
  question: {
    color: '#D61C4E',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: '30%',
  },
  ansBtn: {
    backgroundColor: '#0D6EFD',
    padding: 10,
    marginBottom: 6,
    borderRadius: 5,
  },
  ansBtnText: {
    color: 'white',
    textAlign: 'center',
  },
  scoreText: {
    textAlign: 'center',
    color: GlobalStyles.textStyles.color,
  },
});
