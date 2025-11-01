import * as Notifications from "expo-notifications";

export async function scheduleReflectionReminder() {
  await Notifications.requestPermissionsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Reflection",
      body: "Take a minute to jot down how you're feeling today.",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 30 * 60, // 30 minutes in seconds (1800 seconds)
      repeats: true,
    },
  });
}
