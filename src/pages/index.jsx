import Navbar from "@/components/Navbar";
import { useFetchProducts } from "@/features/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import placeholder from "../../public/images/placeholder.svg";

export default function Home() {
  const { data } = useFetchProducts({
    onError: (error) => {
      console.log(error);
    },
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProducts = data?.data.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  const imageLoader = ({ src }) => {
    return src || placeholder;
  };

  return (
    <>
      <Navbar />

      <main className="container mx-auto lg:mt-24">
        {/* Header */}
        <header className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-bold">Find your best recipe!</h1>

          <form
            className="flex items-center max-w-sm mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative w-full">
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search recipe by name..."
                value={searchTerm}
                onChange={handleSearch}
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </header>
        {/* Header */}

        {filteredProducts?.length > 0 ? (
          <section className="grid grid-cols-12 gap-4 mt-8">
            {filteredProducts?.map((product) => (
              <div
                key={product.id}
                className="col-span-12 bg-white border border-gray-200 rounded-lg shadow md:col-span-6 lg:col-span-4 dark:bg-gray-800 dark:border-gray-700"
              >
                <Link href={`recipes/${product.id}`}>
                  <Image
                    width={1000}
                    height={200}
                    className="object-cover h-64 overflow-hidden rounded-t-lg"
                    src={product.image}
                    alt="Product Image"
                    loader={imageLoader}
                  />
                </Link>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {product.name}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 truncate dark:text-gray-400">
                    {product.recipe}
                  </p>
                  <Link
                    href={`recipes/${product.id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    See recipe
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <div className="flex items-center justify-center h-96">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              No recipes found!
            </p>
          </div>
        )}
      </main>
    </>
  );
}
