import react from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 120,
  ...props
}) => {
  return (
    <TouchableOpacity style ={[abc(size).button, style]} onPress={props.onPress}>
      <Text style ={[abc().text, textStyle]}>{props.title} </Text>
    </TouchableOpacity>
  );
};

const abc = (size) => StyleSheet.create({
    button: { 
      height: size,
      width: size,
      borderRadius: size / 2,
      borderColor: 'white',
      borderWidth: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: { 
      color: 'white',
      fontSize: size / 3
       },
  });
