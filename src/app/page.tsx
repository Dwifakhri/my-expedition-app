"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import Arrow from "../../public/assets/icons/arrow-right.svg";
import Car from "../../public/assets/images/car.png";
import ModalCheck from "@/components/ModalCheck";
import customFetch from "@/utils/useFetch";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [province, setProvince] = useState<Array<{}>>([]);

  useEffect(() => {
    const getProvince = async () => {
      const result = await customFetch("/province", {});
      console.log(result);
      setProvince(result.data);
    };
    getProvince();
  }, province);

  return (
    <Layout>
      <main className="main-site">
        <section className="text-center">
          <h1 className="mb-8 mt-10 text-4xl font-bold">
            Delivering Your Journey <br /> with My Expedition
          </h1>
          <div className="flex justify-center items-center gap-x-6 mb-5">
            <div className="flex gap-x-2">
              <p>Check your price journey</p>
              <Image
                src={Arrow}
                alt="arrow alt"
                style={{ width: "auto" }}
                width={15}
                height={10}
              />
            </div>
            <button
              className="bg-secondary text-white px-7 py-3 font-medium text-xs"
              onClick={() => setIsModalOpen(true)}>
              Check
            </button>
          </div>
          <Image
            className="mx-auto"
            src={Car}
            alt="card alt"
            style={{ maxWidth: "30rem", height: "auto" }}
            priority
          />
          <ModalCheck
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </section>
      </main>
    </Layout>
  );
}
