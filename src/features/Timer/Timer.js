import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { color } from '../../utils/color';
import { spacing } from '../../utils/Size';
import { Countdown } from '../../Compo/countdown';
import { RoundedButton } from '../../Compo/Vuttom';
import { ProgressBar } from 'react-native-paper';
import {Timing} from './Timming';
import {useKeepAwake} from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject}) => {
  useKeepAwake();
  const[minutes,setminutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'android') {
      const interval = setInterval(() => Vibration.vibrate(),1000);
       setTimeout(() => clearInterval(interval),10000); 
    } else {
      Vibration.vibrate ()
    }
  }

  const onEnd = () => {
    vibrate();
    setminutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }
  
  const changeTime = (min) => {
    setminutes(min);
    setProgress(1);
    setIsStarted(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown minutes = {minutes} isPaused={!isStarted} onProgress={onProgress} onEnd ={onEnd} />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}> Focusing on : </Text>
        <Text style={styles.task}> {focusSubject} </Text>
      </View>
      
      <View style={{ paddingTop: spacing.md }}>
        <ProgressBar progress={progress} color="red" style={{ height: 15 }} />
      </View>

      <View style = {styles.buttonWrapper}>
      <Timing onChangeTime={changeTime} />
      </View>
      
      <View style = {styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style = {styles.clearSubject}>
       <RoundedButton title="clear" size = {100} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: color.white,
    textAlign: 'center',
  },

  task: {
    color: color.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',  
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25
  }
});
