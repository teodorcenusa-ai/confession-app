// services/notifications.ts
import { Alert } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';

const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let Notifications: typeof import('expo-notifications') | null = null;

if (!isExpoGo) {
  try {
    Notifications = require('expo-notifications');
    Notifications?.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  } catch (error) {
    console.warn('Nu s-a putut încărca expo-notifications:', error);
  }
}

/**
 * Programează o notificare zilnică la ora specificată, cu textul canonului
 */
export async function scheduleCanonReminder(hour: number, minute: number, canonText?: string) {
  if (isExpoGo || !Notifications) {
    Alert.alert(
      'Notificări în Expo Go',
      'Începând cu SDK 53, notificările native nu funcționează în aplicația Expo Go. Pentru a testa notificările reale, creează un Development Build (`npx expo run:android`).'
    );
    return true;
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert(
        'Permisiune necesară',
        'Trebuie să permiți notificările din setările telefonului pentru a primi remindere zilnice.'
      );
      return false;
    }

    // Anulăm notificările setate anterior
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Formulăm mesajul în funcție de canonul salvat
    const notificationBody = canonText && canonText.trim() !== '' 
      ? `Canonul tău: ${canonText}`
      : 'Nu uita de canonul și rugăciunea de seară!';

    // Programăm notificarea zilnică
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Îndreptar Spovedanie ☦️',
        body: notificationBody,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: hour,
        minute: minute,
      },
    });

    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    Alert.alert('Reminder activat!', `Vei primi un mesaj de aducere aminte zilnic la ora ${formattedTime}.`);
    return true;

  } catch (error) {
    console.error('Eroare la setarea notificării:', error);
    Alert.alert('Eroare', 'Nu am putut programa notificarea.');
    return false;
  }
}

export async function cancelCanonReminder() {
  if (isExpoGo || !Notifications) {
    Alert.alert('Dezactivat', 'Reminder-ul a fost oprit (Mod simulare Expo Go).');
    return;
  }

  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    Alert.alert('Dezactivat', 'Reminder-ul zilnic a fost oprit.');
  } catch (error) {
    console.error('Eroare la anularea notificării:', error);
  }
}