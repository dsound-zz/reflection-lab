import { useState } from "react";
import { View } from "react-native";
import SliderInput from "./ui/SliderInput";
import SubmitButton from "./ui/SubmitButton";
import TextInputField from "./ui/TextInputField";

interface ModuleRendererProps {
  schema: any;
  onSubmit?: (answers: any) => void;
}

export default function ModuleRenderer({
  schema,
  onSubmit,
}: ModuleRendererProps) {
  const [answers, setAnswers] = useState<any>({});

  const setAnswer = (key: string, val: any) =>
    setAnswers((prev: any) => ({ ...prev, [key]: val }));

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(answers);
    }
  };

  return (
    <View>
      {schema.elements.map((el: any, i: number) => {
        if (el.type === "textInput")
          return (
            <TextInputField
              key={i}
              label={el.label}
              placeholder={el.placeholder || ""}
              value={answers[el.label] || ""}
              onChangeText={(val: string) => setAnswer(el.label, val)}
            />
          );
        if (el.type === "slider")
          return (
            <SliderInput
              key={i}
              label={el.label}
              min={el.min}
              max={el.max}
              value={answers[el.label]}
              onChangeValue={(val: number) => setAnswer(el.label, val)}
            />
          );
        if (el.type === "button")
          return (
            <SubmitButton key={i} label={el.label} onPress={handleSubmit} />
          );
      })}
    </View>
  );
}
