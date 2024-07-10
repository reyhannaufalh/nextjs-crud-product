import { useEditProduct, useFindProduct } from "@/features/product";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useFindProduct({
    id,
    onError: (error) => {
      console.log(error);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      recipe: "",
      image: "",
    },
    onSubmit: async () => {
      const { name, price, recipe, image } = formik.values;

      console.log(formik.values);

      editProduct({
        name,
        price: parseInt(price),
        recipe,
        image,
      });

      formik.setFieldValue("name", "");
      formik.setFieldValue("price", 0);
      formik.setFieldValue("recipe", "");
      formik.setFieldValue("image", "");

      router.push("/products");
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        name: data?.data.name,
        price: data?.data.price,
        recipe: data?.data.recipe,
        image: data?.data.image,
      });
    }
  }, [data, formik]);

  const { mutate: editProduct, isLoading: editProductsIsLoading } =
    useEditProduct({
      id,
      onSuccess: () => {
        refetchProducts();
      },
    });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <DashboardLayout>
      <h1 className="mb-10 text-3xl font-semibold">Edit Product</h1>

      <form className="max-w-lg" onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            onChange={handleFormInput}
            value={formik.values.name}
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Product name"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="text"
            onChange={handleFormInput}
            value={formik.values.price}
            id="price"
            name="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Product price"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="recipe"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Recipe
          </label>

          <textarea
            type="text"
            onChange={handleFormInput}
            value={formik.values.recipe}
            id="recipe"
            name="recipe"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            required
          ></textarea>
        </div>

        <div className="mb-5">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image
          </label>
          <input
            type="text"
            onChange={handleFormInput}
            value={formik.values.image}
            id="image"
            name="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Product image URL"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {editProductsIsLoading ? "Loading..." : "Save Changes"}
        </button>
      </form>
    </DashboardLayout>
  );
}
