import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditProduct = ({ id, onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const productsResponse = await axiosInstance.put(`/products/${id}`, body);

      return productsResponse;
    },
    onSuccess,
  });
};
