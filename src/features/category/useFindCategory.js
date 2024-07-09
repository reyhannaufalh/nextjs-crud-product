import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFindCategory = ({ id, onError }) => {
  return useQuery({
    queryFn: async () => {
      const categoriesResponse = await axiosInstance.get(`/categories/${id}`);
      return categoriesResponse;
    },
    queryKey: ["find.categories"],
    onError,
  });
};
