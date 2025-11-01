import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SubmitButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
}

export default function SubmitButton({
  label,
  onPress,
  disabled = false,
}: SubmitButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          pressed && styles.buttonPressed,
          disabled && styles.buttonDisabled,
        ]}
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: "#0056CC",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonTextDisabled: {
    color: "#999",
  },
});

