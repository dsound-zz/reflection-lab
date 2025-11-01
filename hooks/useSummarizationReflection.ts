import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useSummarizationReflection() {
  return useMutation({
    mutationFn: async (reflection: string) => {
      const res = await axios.put("http://localhost:3001/summarize", {
        reflection,
      });
      return res.data.summary;
    },
  });
}
