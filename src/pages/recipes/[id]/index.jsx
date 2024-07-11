import Navbar from "@/components/Navbar";
import { useFindProduct } from "@/features/product";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function Index() {
  const router = useRouter();
  const { id } = router.query;

  const { data: product } = useFindProduct({
    id,
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <Navbar />

      <main className="pb-16 mt-24 antialiased bg-white lg:pb-24 dark:bg-gray-900">
        <div className="flex justify-between max-w-screen-xl px-4 mx-auto ">
          <article className="w-full max-w-2xl mx-auto format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <Image
                    width={100}
                    height={100}
                    className="w-16 h-16 mr-4 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      Jese Leos
                    </a>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      <time
                        pubdate
                        datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        Feb. 8, 2022
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {product?.data.name}
              </h1>
            </header>
            <p className="lead">{product?.data.recipe}</p>
          </article>
        </div>
      </main>
    </>
  );
}
