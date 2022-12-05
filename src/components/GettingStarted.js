import { SafeAreaView, View, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import GettingStartedLogo from './GettingStarted/GettingStartedLogo';
import GettingStartedPage1 from './GettingStarted/GettingStartedPage1';
import GettingStartedPage2 from './GettingStarted/GettingStartedPage2';
import GettingStartedPage3 from './GettingStarted/GettingStartedPage3';
import GettingStartedPageIndicator from './GettingStarted/GettingStartedPageIndicator';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-detect';

const GettingStarted = ({ getStarted }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleLeftSwipe = () => {
    if (currentPage != 2) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRightSwipe = () => {
    if (currentPage != 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeLeft={handleLeftSwipe}
        onSwipeRight={handleRightSwipe}
        config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
      >
        <View style={styles.logoContainer}>
          <GettingStartedLogo />
        </View>
        {currentPage === 0 && <GettingStartedPage1 />}
        {currentPage === 1 && <GettingStartedPage2 />}
        {currentPage === 2 && (
          <GettingStartedPage3
            getStarted={() => {
              getStarted();
            }}
          />
        )}
        <GettingStartedPageIndicator currentPage={currentPage} />
      </GestureRecognizer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A6EAF',
  },
  logoContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default GettingStarted;
