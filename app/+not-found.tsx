import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Pagină inexistentă" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Această pagină nu există.</Text>

        <Link href="/prayers" style={styles.link}>
          <Text style={styles.linkText}>Înapoi la rugăciuni</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    padding: 20,
    backgroundColor: "#FAF8F3",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold" as const,
    color: "#2C2415",
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#8B4513",
    fontWeight: "600" as const,
  },
});
