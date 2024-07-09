import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCategory = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (id) => {
      const categoryResponse = await axiosInstance.delete(`/categories/${id}`);
      return categoryResponse;
    },
    onSuccess,
  });
};
