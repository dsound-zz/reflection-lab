import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveReflection(text: string) {
  const existing = JSON.parse(
    (await AsyncStorage.getItem("reflections")) || "[]"
  );
  existing.push({ text, date: new Date().toISOString() });
  await AsyncStorage.setItem("reflections", JSON.stringify(existing));
}

export async function getReflections() {
  return JSON.parse((await AsyncStorage.getItem("reflections")) || "[]");
}
