import { StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';
export default function Tailors() {
  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
    <Text>
      Profile
      </Text>
      </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
