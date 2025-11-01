import { useState } from "react";
import { Text, TextInput, View } from "react-native";

interface TextInputFieldProps {
  label: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
}

export default function TextInputField({
  label,
  placeholder,
  onChangeText,
  value,
}: TextInputFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ marginVertical: 10 }}>
      {label && (
        <Text style={{ fontWeight: "600", marginBottom: 4 }}>{label}</Text>
      )}
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: focused ? "#007AFF" : "#ccc",
          borderRadius: 8,
          padding: 10,
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}
