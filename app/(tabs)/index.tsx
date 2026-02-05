import { PRE_CONFESSION_PRAYERS } from '@/constants/prayers';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PrayersScreen() {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.prayerText}>{PRE_CONFESSION_PRAYERS}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F3',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  prayerText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#2C2415',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
});
