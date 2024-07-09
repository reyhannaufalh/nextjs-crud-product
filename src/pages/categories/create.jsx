import { useCreateCategory } from "@/features/category";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useFormik } from "formik";
import { useRouter } from "next/router";

export default function Create() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async () => {
      const { name } = formik.values;

      createCategory({
        name,
      });

      formik.setFieldValue("name", "");

      router.push("/categories");
    },
  });

  const { mutate: createCategory, isLoading: createCategoryIsLoading } =
    useCreateCategory({
      onSuccess: () => {
        refetchCategories();
      },
    });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <DashboardLayout>
      <h1 className="mb-10 text-3xl font-semibold">Add New Category</h1>

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
            placeholder="name@flowbite.com"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {createCategoryIsLoading ? "Loading..." : "Add Category"}
        </button>
      </form>
    </DashboardLayout>
  );
}
