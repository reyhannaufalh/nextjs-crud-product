import { useAuth } from "@/context/AuthContext";
import { useFetchCategories } from "@/features/category";
import { useCreateProduct } from "@/features/product";
import { useFormik } from "formik";

export default function CreateRecipeModal({ setCreateModal, refetchProducts }) {
  const { user } = useAuth();

  const { data: categoriesData } = useFetchCategories({
    onError: (error) => {
      console.log(error);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      recipe: "",
      image: "",
      categoryId: 1,
    },
    onSubmit: async () => {
      const { name, recipe, image, categoryId } = formik.values;

      createProduct({
        name,
        recipe,
        image,
        categoryId: parseInt(categoryId),
        userId: user.id,
      });

      console.log();

      formik.setFieldValue("name", "");
      formik.setFieldValue("recipe", "");
      formik.setFieldValue("image", "");
      formik.setFieldValue("categoryId", 1);

      setCreateModal(false);
    },
  });

  const { mutate: createProduct, isLoading: createProductsIsLoading } =
    useCreateProduct({
      onSuccess: () => {
        refetchProducts();
      },
    });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <>
      <div
        id="defaultModal"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="relative w-full h-full max-w-2xl p-4 md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Product
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setCreateModal(false)}
              >
                <p>X</p>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={formik.handleSubmit}>
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
                  placeholder="Enter product name"
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
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  required
                ></textarea>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  onChange={handleFormInput}
                  value={formik.values.image}
                  id="image"
                  name="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter image URL"
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>

                <select
                  id="countries"
                  onChange={handleFormInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {categoriesData?.data.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {createProductsIsLoading ? "Loading..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
