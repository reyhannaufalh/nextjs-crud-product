import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFindProduct = ({ id, onError }) => {
  return useQuery({
    queryFn: async () => {
      const productsResponse = await axiosInstance.get(`/products/${id}`);

      return productsResponse;
    },
    queryKey: ["find.products"],
    onError,
  });
};
