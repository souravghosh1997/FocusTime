import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { color } from '../utils/color';
import { fontSize, spacing } from '../utils/Size';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const Countdown = ({ minutes = 0.2, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const [millis, setmillis] = useState(minutesToMillis(minutes));
  const countDown = () => {
    setmillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMillis(minutes));
      // report the progress
      return timeLeft;
    });
  };
    
    useEffect (() => {
     setmillis(minutesToMillis(minutes))
    },[minutes])

  useEffect(() => {
    console.log(millis)
  }, [millis])

  useEffect(() => {
    if (isPaused) {
     if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
      //return () => console.log("Anku ")
    return () => clearInterval(interval.current);
  }, [isPaused]);

 
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {' '}
      {formatTime(minute)}:{formatTime(seconds)}{' '}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    color: color.white,
    padding: spacing.lg,
    backgroundColor: 'red',
  },
});
