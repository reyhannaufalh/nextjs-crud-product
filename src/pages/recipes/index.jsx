import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useFetchProducts } from "@/features/product";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Index() {
  const { user } = useAuth();
  const [toggle, setToggle] = useState("products");
  const router = useRouter();

  const { data: products, refetch: refetchProducts } = useFetchProducts({
    onError: (error) => {
      console.log(error);
    },
  });

  const filteredProductsByUser = products?.data.filter(
    (product) => product.userId === user?.id
  );

  const imageLoader = ({ src }) => {
    return src || "images/placeholder.svg";
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center max-w-full gap-12 px-8 py-6 pb-8 mt-24">
        <div className="flex items-center max-w-3xl gap-12 ">
          <div className="flex overflow-hidden border rounded-full bg-neutral-100 aspect-square place-content-center border-neutral-800">
            <Image
              width={150}
              height={150}
              src={"images/placeholder.svg"}
              alt="Profile"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <h1 className="mr-4 text-xl font-semibold">{user?.name}</h1>
              <a
                href=""
                className="px-4 py-1 font-semibold text-white rounded-lg bg-primary-500"
              >
                Edit profile
              </a>
              <a
                href=""
                className="px-4 py-1 font-semibold text-white rounded-lg bg-primary-500"
              >
                Archive
              </a>
              <a
                href=""
                className="px-4 py-1 font-semibold text-white rounded-lg bg-primary-500"
              >
                Settings
              </a>
            </div>

            <div className="flex gap-4">
              <div>
                <p className="font-bold">
                  0 <span className="font-normal text-neutral-500">resep</span>
                </p>
              </div>
              <div>
                <p className="font-bold">
                  0{" "}
                  <span className="font-normal text-neutral-500">
                    followers
                  </span>
                </p>
              </div>
              <div>
                <p className="font-bold">
                  0{" "}
                  <span className="font-normal text-neutral-500">
                    following
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/4 ">
          <div className="flex justify-center w-full gap-8 border-t border-primary-50">
            <button
              onClick={() => setToggle("products")}
              className={
                toggle == "products"
                  ? "px-4 py-3 border-t-2 border-primary-500"
                  : "px-4 py-2 rounded-md"
              }
            >
              POSTINGAN
            </button>
            <button
              onClick={() => setToggle("archive")}
              className={
                toggle == "archive"
                  ? "px-4 py-3 border-t-2 border-primary-500"
                  : "px-4 py-2 rounded-md"
              }
            >
              TERSIMPAN
            </button>
          </div>

          {filteredProductsByUser?.length > 0 ? (
            <section className="grid grid-cols-12 gap-4 mt-8">
              {filteredProductsByUser?.map((product) => (
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
                      alt={product.name}
                      loader={imageLoader}
                      unoptimized
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
        </div>
      </div>
    </>
  );
}
