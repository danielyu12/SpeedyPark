import { Pressable, StyleSheet } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

const OpenGettingStarted = (props) => {
  return (
    <Pressable onPress={props.setShowStarted} style={styles.container}>
      <Octicons name="question" size={40} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '3%',
    right: '2%',
  },
});
export default OpenGettingStarted;
