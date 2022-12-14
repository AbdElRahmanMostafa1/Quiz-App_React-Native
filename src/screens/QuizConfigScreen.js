import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../constants/GlobalStyles';
import TextField from '../components/TextField';
import SelectField from '../components/SelectField';
import {useDispatch, useSelector} from 'react-redux';
import {getQuestionsCategory} from '../store/questionsCategorySlice';
import {
  changeNumberOfQuestions,
  changeCategory,
  changeDifficulty,
  changeType,
} from '../store/quizSlice';
import {questionTypesData, difficultyData} from '../utils/questionsData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const QuizConfigScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {allCategories, isLoading} = useSelector(
    state => state.questionsCategory,
  );
  const {numberOfQuestions} = useSelector(state => state.quizConfig);
  const [amountError, setAmountError] = useState(null);

  useEffect(() => {
    dispatch(getQuestionsCategory());
  }, [dispatch]);

  const SelectCatHandler = selectedCat => {
    dispatch(changeCategory(selectedCat));
  };

  const selectDifficultyHandler = selectedDifficulty => {
    dispatch(changeDifficulty(selectedDifficulty));
  };

  const selectQuestionTypeHandler = selectedType => {
    dispatch(changeType(selectedType));
  };

  const changeNumberOfQuestionsHandler = value => {
    dispatch(changeNumberOfQuestions(value));
    setAmountError(null);
  };

  const goToQuizHandler = () => {
    if (numberOfQuestions.length === 0 || !numberOfQuestions) {
      setAmountError('Oops! Please Enter amount of questions between 1 to 15');
    } else if (
      numberOfQuestions <= 0 ||
      isNaN(numberOfQuestions) ||
      numberOfQuestions > 15
    ) {
      setAmountError(
        'Oops! Please Enter amount of questions correctly between 1 to 15',
      );
    } else {
      navigation.navigate('QuizScreen');
    }
  };

  return (
    <View style={styles.quizConfigContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.textHeader}>Quiz Configurations</Text>
        <View style={{justifyContent: 'center', flex: 1}}>
          <SelectField
            label={'Select Category'}
            data={allCategories?.trivia_categories?.map(cat => cat)}
            onSelect={item => SelectCatHandler(item.id)}
          />
          <SelectField
            label={'Select Difficulty'}
            data={difficultyData?.map(cat => cat)}
            onSelect={item => selectDifficultyHandler(item.id)}
          />
          <SelectField
            label={'Select Questions Type'}
            data={questionTypesData.map(cat => cat)}
            onSelect={item => selectQuestionTypeHandler(item.id)}
          />
          <TextField
            label={'No. of Questions'}
            onChangeText={changeNumberOfQuestionsHandler}
            value={numberOfQuestions}
            textError={amountError}
          />
          <TouchableOpacity
            onPress={goToQuizHandler}
            disabled={amountError || isLoading}
            style={
              amountError || isLoading
                ? styles.goToQuizBtnDisabled
                : styles.goToQuizBtn
            }>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Go to Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default QuizConfigScreen;

const styles = StyleSheet.create({
  quizConfigContainer: {
    ...GlobalStyles.screenStyles,
  },
  textHeader: {
    ...GlobalStyles.textStyles,
    ...GlobalStyles.textStyles.textHeader,
    marginBottom: GlobalStyles.spacing.margin,
  },
  goToQuizBtn: {
    backgroundColor: '#411530',
    padding: GlobalStyles.spacing.padding + 5,
    borderRadius: 10,
    marginTop: '50%',
    opacity: 1,
  },
  goToQuizBtnDisabled: {
    backgroundColor: '#411530',
    padding: GlobalStyles.spacing.padding + 5,
    borderRadius: 10,
    marginTop: '50%',
    opacity: 0.6,
  },
});
