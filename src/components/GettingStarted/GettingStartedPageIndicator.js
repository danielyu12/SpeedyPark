import { View, StyleSheet } from 'react-native';

const GettingStartedPageIndicator = ({ currentPage }) => {
  const changeBackgroundColor = (dot) => {
    if (currentPage === dot) {
      return { backgroundColor: 'white' };
    }
  };
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={[styles.dot, changeBackgroundColor(0)]} />
        <View style={[styles.dot, changeBackgroundColor(1)]} />
        <View style={[styles.dot, changeBackgroundColor(2)]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#A3B3C1',
  },
});

export default GettingStartedPageIndicator;
