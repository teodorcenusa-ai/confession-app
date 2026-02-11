import { Redirect } from 'expo-router';

export default function Index() {
  // Aceasta linie trimite utilizatorul direct la tab-ul de rugăciuni
  return <Redirect href="/prayers" />;
}