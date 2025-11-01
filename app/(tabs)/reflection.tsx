import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ModuleRenderer from "@/components/ModuleRenderer";
import { useSummarizationReflection } from "@/hooks/useSummarizationReflection";
import { schema } from "@/services/exampleSchema";
import { saveReflection } from "@/services/storage";

export default function Reflection() {
  const { mutate, isPending } = useSummarizationReflection();

  const handleSubmit = (answers: any) => {
    // Combine all answers into a single reflection text
    const reflectionText = Object.entries(answers)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    mutate(reflectionText, {
      onSuccess: async (summary: string) => {
        await saveReflection(summary);
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 20 }}>
          {schema.title}
        </Text>
        <ModuleRenderer schema={schema} onSubmit={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}
