import axios from "axios";
import * as BackgroundFetch from "expo-background-fetch";
import { BackgroundFetchResult } from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { getReflections } from "./storage";

const TASK_NAME = "BACKGROUND_SUMMARIZE";

TaskManager.defineTask(TASK_NAME, async () => {
  try {
    const reflections = await getReflections();
    const joined = reflections.map((r: any) => r.text).join("\n");
    if (!joined) return BackgroundFetchResult.NoData;

    await axios.post("http://localhost:3001/summarize", { reflection: joined });
    return BackgroundFetchResult.NewData;
  } catch (err) {
    return BackgroundFetchResult.Failed;
  }
});

export async function registerBackgroundTask() {
  await BackgroundFetch.registerTaskAsync(TASK_NAME, {
    minimumInterval: 60 * 60 * 24, // once a day
    stopOnTerminate: false,
    startOnBoot: true,
  });
}
