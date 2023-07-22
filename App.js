import react, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, AsyncStorage } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocushHistory';
import { Timer } from './src/features/Timer/Timer';
import { color } from './src/utils/color';
import { spacing } from './src/utils/Size';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setfocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setfocusHistory([...focusHistory, { subject, status }]);
  };

  const onClear = () => {
    setfocusHistory ([]);
  };

  const saveFoucusHistory = async () => {
    try{
    await AsyncStorage.setItem ("focusHistory",JSON.stringify(focusHistory));
    }catch (e) {
      console.log(e);
    }
  };

  const loadFoucusHistory = async () => {
    try{
       const history = await AsyncStorage.getItem('focusHistory');

       if (history && JSON.parse(history).length){
         setfocusHistory(JSON.parse(history));
       }
    }catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFoucusHistory();
  },[])

  useEffect (() => {
    saveFoucusHistory();
  },[focusHistory]); 


  //useEffect(() => {
  //if(focusSubject) {
  //setfocusHistory([...focusHistory,focusSubject])
  //}
  //}, [focusSubject]);
  //console.log(focusHistory);


  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSuject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? spacing.xxl : spacing.lg,
    backgroundColor: color.darkBlue,
  },
});
