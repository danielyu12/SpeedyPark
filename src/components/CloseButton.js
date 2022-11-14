import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BUTTON_SIZE = 40;

function CloseButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.button,
        { backgroundColor: 'white', borderColor: props.color },
        props.style,
      ]}
    >
      <Icon name={'close'} color={props.color} size={BUTTON_SIZE} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
});
export default CloseButton;
