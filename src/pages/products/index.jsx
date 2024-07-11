import { useAuth } from "@/context/AuthContext";
import { useDeleteProduct, useFetchProducts } from "@/features/product";
import DashboardLayout from "@/layouts/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const {
    data,
    isLoading: productsIsLoading,
    refetch: refetchProducts,
  } = useFetchProducts({
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: deleteProduct, isLoading: deleteIsLoading } =
    useDeleteProduct({
      onSuccess: () => {
        refetchProducts();
      },
    });

  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      deleteProduct(id);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="mb-10 text-3xl font-semibold">Product Management</h1>

      <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="simple-search"
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
                required=""
              />
            </div>
          </form>
        </div>
        <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
          <Link
            href="/products/create"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-500 focus:outline-none dark:focus:ring-primary-600"
          >
            Add product
          </Link>
        </div>
      </div>

      <div className="overflow-auto max-h-96">
        {data?.data.length > 0 && (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Product name
                </th>
                <th scope="col" className="px-4 py-3">
                  Price
                </th>
                <th scope="col" className="px-4 py-3">
                  Recipe
                </th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((product) => (
                <tr className="border-b dark:border-gray-700" key={product.id}>
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.name}
                  </th>
                  <td className="px-4 py-3">{product.price}</td>
                  <td className="max-w-xs px-4 py-3 truncate">
                    {product.recipe}
                  </td>
                  <td className="flex items-center justify-end px-4 py-3">
                    <Link
                      href={`/products/${product.id}/edit`}
                      className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-500 focus:outline-none dark:focus:ring-orange-600"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-500 focus:outline-none dark:focus:ring-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {productsIsLoading && "Loading..."}
              {deleteIsLoading && "Deleting..."}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
