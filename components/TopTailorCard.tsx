import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TopTailorCardProps {
  image: any;
  name: string;
  rating: number;
  description: string;
  shop: string;
  onMapPress?: () => void;
  location: string;
  distance: string;
  time: string;
}

export default function TopTailorCard({
  image,
  name,
  rating,
  description,
  shop,
  onMapPress,
  location,
  distance,
  time,
}: TopTailorCardProps) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.photo} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ {rating}</Text>
          </View>
          <View style={styles.iconRow}>
            <TouchableOpacity>
              <Image source={require('../assets/images/reply.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/images/heart.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.row}>
          <Text style={styles.shop}>{shop} </Text>
          <TouchableOpacity onPress={onMapPress}>
            <Text style={styles.mapLink}>view on map</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.location}>{location}</Text>
        </View>
        <View style={styles.footerRow}>
          <Text style={styles.distance}>{distance}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#3B82F6',
    padding: 8,
    marginVertical: 6,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'flex-start',
    minHeight: 110,
  },
  photo: {
    width: 80,
    height: 100,
    borderRadius: 14,
    marginRight: 10,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  ratingBadge: {
    backgroundColor: '#22C55E',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    width: 18,
    height: 18,
    marginLeft: 6,
    tintColor: '#888',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 2,
    marginBottom: 1,
    color: '#222',
  },
  description: {
    fontSize: 12,
    color: '#444',
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  shop: {
    fontSize: 12,
    color: '#222',
  },
  mapLink: {
    fontSize: 12,
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
  location: {
    fontSize: 12,
    color: '#222',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  distance: {
    fontSize: 11,
    color: '#888',
  },
  time: {
    fontSize: 11,
    color: '#888',
  },
}); 