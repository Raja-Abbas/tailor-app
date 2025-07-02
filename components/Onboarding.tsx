import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    image: require('../assets/images/Layer 1.png'),
    title: 'Tailored to perfection',
    subtitle: 'Get your clothes with perfect fit and on time',
  },
  {
    key: '2',
    image: require('../assets/images/layer 2.png'),
    title: 'The future of tailoring is here',
    subtitle: 'Can access your tailor on your phone',
  },
  {
    key: '3',
    image: require('../assets/images/Layer 3.png'),
    title: 'Your one-stop shop for tailoring needs',
    subtitle: 'Get your fabrics and materials in stichmate',
  },
];

export default function Onboarding({ onSkip }: { onSkip: () => void }) {
  const [current, setCurrent] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (current < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: current + 1 });
    } else {
      onSkip();
    }
  };

  const handleViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrent(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={onSkip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <View style={styles.dots}>
          {slides.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, current === idx && styles.activeDot]}
            />
          ))}
        </View>
        <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
          <Text style={styles.nextText}>{current === slides.length - 1 ? '→' : '→'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 80,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  skipBtn: {},
  skipText: {
    color: '#3B3B8F',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#3B3B8F',
    width: 16,
  },
  nextBtn: {},
  nextText: {
    fontSize: 22,
    color: '#3B3B8F',
  },
}); 