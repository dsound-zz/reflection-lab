export const schema = {
  title: "Evening Reflection",
  elements: [
    { type: "textInput", label: "What went well today?" },
    { type: "slider", label: "Stress Level", min: 0, max: 10 },
    { type: "button", label: "Submit" },
  ],
} as const;
