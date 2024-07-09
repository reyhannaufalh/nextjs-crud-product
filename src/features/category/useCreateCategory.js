import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateCategory = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const categoriesResponse = await axiosInstance.post("/categories", body);
      return categoriesResponse;
    },
    onSuccess,
  });
};
