import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// @ts-ignore - Community slider types may need to be installed separately
import Slider from "@react-native-community/slider";

interface SliderInputProps {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChangeValue?: (value: number) => void;
}

export default function SliderInput({
  label,
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  onChangeValue,
}: SliderInputProps) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? min);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newValue: number) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChangeValue?.(newValue);
  };

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value.toFixed(step < 1 ? 1 : 0)}</Text>
        </View>
      )}
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={handleValueChange}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#007AFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  slider: {
    width: "100%",
    height: 40,
  },
});
