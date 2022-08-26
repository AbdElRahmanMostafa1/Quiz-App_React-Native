import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../constants/GlobalStyles';
import {useSelector} from 'react-redux';

const ScoreScreen = ({navigation}) => {
  const {score, numberOfQuestions, questions} = useSelector(
    state => state.quizConfig,
  );
  const [scorePercentage, setScorePercentage] = useState(0);

  console.log(questions);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Wow! It's so funny", 'Do you want to play again?', [
        {
          text: 'No',
          onPress: () => BackHandler.exitApp(),
          style: 'cancel',
        },
        {text: 'YES', onPress: () => navigation.navigate('QuizConfig')},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const percentage = (score / questions?.length).toFixed(2);
    setScorePercentage(percentage);
  }, [score, numberOfQuestions]);

  return (
    <View style={styles.scoreScreenContainer}>
      <Text style={styles.textHeader}>Your Score</Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
          marginBottom: 16,
          borderRadius: 5,
          padding: 12,
        }}>
        <Text style={{color: 'white', fontWeight: '800'}}>
          Your Score is: {score} / {questions?.length} = {scorePercentage * 100}
          %
        </Text>
      </View>
      <View style={{}}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 18,
            marginBottom: 8,
          }}>
          Our advice for you 😁
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
            marginBottom: 16,
            borderRadius: 5,
            padding: 8,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '800',
              textAlign: 'center',
              lineHeight: 25,
            }}>
            {scorePercentage < 0.25
              ? 'Please read at least 3 books per month 😐'
              : scorePercentage <= 0.5
              ? 'Not bad but Try to do more effort, read 2 books per month 🙂'
              : scorePercentage <= 0.75
              ? 'Wow! Good, read 1 book per month 😉'
              : 'You are amazing, keep on reading and increase your knowledge 😍'}
          </Text>
        </View>
        <View style={{}}>
          <Image
            source={{
              uri: 'https://media.wired.com/photos/59268083cefba457b079a332/master/w_2560%2Cc_limit/BookTA-200552869-001.jpg',
            }}
            style={{width: '100%', height: 175, borderRadius: 5}}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('QuizConfig')}
          style={{
            backgroundColor: '#411530',
            padding: GlobalStyles.spacing.padding + 5,
            borderRadius: 10,
            marginTop: '50%',
            opacity: 1,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Play Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScoreScreen;

const styles = StyleSheet.create({
  scoreScreenContainer: {
    ...GlobalStyles.screenStyles,
  },
  textHeader: {
    ...GlobalStyles.textStyles.textHeader,
    color: 'green',
  },
});
