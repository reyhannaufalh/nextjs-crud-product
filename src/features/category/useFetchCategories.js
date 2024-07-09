import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategories = ({ onError }) => {
  return useQuery({
    queryFn: async () => {
      const categoriesResponse = await axiosInstance.get("/categories");

      return categoriesResponse;
    },
    queryKey: ["fetch.categories"],
    onError,
  });
};
