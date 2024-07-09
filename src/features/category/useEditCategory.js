import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditCategory = ({ id, onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const categoryResponse = await axiosInstance.put(
        `/categories/${id}`,
        body
      );

      return categoryResponse;
    },
    onSuccess,
  });
};
