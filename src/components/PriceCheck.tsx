"use client";
import React, { useState, useMemo, useEffect, ReactHTMLElement } from "react";
import Close from "../../public/assets/icons/close.svg";
import Arrow from "../../public/assets/icons/arrow-right.svg";
import Image from "next/image";
import InputDropdown from "./InputDropdown";
import { useStatus } from "@/contexts/status";
interface PriceCheckProps {
  province: Array<{}>;
  city: Array<{}>;
}

const PriceCheck: React.FC<PriceCheckProps> = ({ province, city }) => {
  const { setStatus } = useStatus();
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [originProvince, setOriginProvince] = useState<any>({
    id: "",
    name: "",
  });
  const [originCity, setOriginCity] = useState<any>({ id: "", name: "" });
  const [destinationProvince, setDestinationProvince] = useState<any>({
    id: "",
    name: "",
  });
  const [destinationCity, setDestinationCity] = useState<any>({
    id: "",
    name: "",
  });
  const [weight, setWeight] = useState<string>("");
  const [courier, setCourier] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const originCityOptions = useMemo(() => {
    if (!Object.keys(originProvince).length) {
      return [];
    }
    setOriginCity({
      id: "",
      name: "",
    });
    return city.filter((item: any) => item.province_id === originProvince.id);
  }, [originProvince, city]);

  const destinationCityOptions = useMemo(() => {
    if (!Object.keys(destinationProvince).length) {
      return [];
    }
    setDestinationCity({
      id: "",
      name: "",
    });
    return city.filter(
      (item: any) => item.province_id === destinationProvince.id
    );
  }, [destinationProvince, city]);

  const courierOptions = ["jne", "tiki", "pos"];

  const disabledBtn =
    !originProvince.id ||
    !originCity.id ||
    !destinationProvince.id ||
    !destinationCity.id ||
    !weight ||
    !courier ||
    loading;

  const checkPrice = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const form: any = {
      origin: +originCity.id,
      destination: +destinationCity.id,
      weight: +weight,
      courier: courier,
    };

    const response = await fetch(`/api/cost`, {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data: any = await response.json();
    if (!response.ok) {
      setStatus({
        current: "error",
        message: data.rajaongkir.status.description,
      });
      setLoading(false);
      return;
    }
    setResults(data.rajaongkir.results[0]);
    setLoading(false);
    const result = document.getElementById("result") as HTMLElement | null;
    if (result) {
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const convertIdr = (val: number) => {
    const numb = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
    return numb.replace("Rp", "IDR ");
  };

  return (
    <>
      {!formOpen ? (
        <div className="flex gap-x-5 justify-center">
          <div className="flex items-center gap-x-2">
            <p>Check your price journey</p>
            <Image
              src={Arrow}
              alt="arrow alt"
              style={{ width: "auto", height: "auto" }}
              width={15}
              height={10}
            />
          </div>
          <button
            className="bg-secondary text-white px-7 py-3 font-medium text-xs"
            onClick={() => setFormOpen(true)}>
            Check
          </button>
        </div>
      ) : (
        <div className="text-left">
          <div className="relative">
            <button
              className="ml-auto right-0 absolute"
              onClick={() => setFormOpen(false)}>
              <Image
                src={Close}
                alt="close alt"
                style={{ width: "auto", height: "auto" }}
                width={15}
                height={15}
              />
            </button>
            <form onSubmit={(e: any) => checkPrice(e)}>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <p className="mb-3 font-semibold">Origin</p>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <InputDropdown
                      id="originProvince"
                      label="province"
                      value={originProvince}
                      options={province}
                      setValue={(val: any) => setOriginProvince(val)}
                    />
                    <InputDropdown
                      id="originCity"
                      label="city"
                      value={originCity}
                      options={originCityOptions}
                      setValue={(val: any) => setOriginCity(val)}
                    />
                  </div>
                </div>
                <div>
                  <p className="mb-3 font-semibold">Destination</p>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <InputDropdown
                      id="destinationProvince"
                      label="province"
                      value={destinationProvince}
                      options={province}
                      setValue={(val: any) => setDestinationProvince(val)}
                    />
                    <InputDropdown
                      id="destinationCity"
                      label="city"
                      value={destinationCity}
                      options={destinationCityOptions}
                      setValue={(val: any) => setDestinationCity(val)}
                    />
                  </div>
                </div>
              </div>
              <p className="mb-3 font-semibold">Others</p>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-10 w-full mb-5 group">
                  <input
                    type="number"
                    name="floating_weight"
                    value={weight}
                    onInput={(e: any) => setWeight(e.target.value)}
                    id="floating_weight"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    min={0}
                    required
                  />
                  <label
                    htmlFor="floating_weight"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Weight (kg)
                  </label>
                </div>
                <InputDropdown
                  id="courier"
                  label="courier"
                  value={courier}
                  options={courierOptions}
                  setValue={(val: any) => setCourier(val)}
                />
              </div>
              <button
                type="submit"
                disabled={disabledBtn}
                className="mt-5 text-white bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
                Check
              </button>
            </form>
            {results && (
              <div id="result" className="pt-10 mb-10">
                <p className="mb-2 font-semibold text-[16px]">Result</p>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right  ">
                    <thead className="text-xs">
                      <tr>
                        <th scope="col" className="pe-6 py-3 text-primary">
                          Agent
                        </th>
                        <th scope="col" className="pe-6 py-3 text-primary">
                          Service
                        </th>
                        <th scope="col" className="pe-6 py-3 text-primary">
                          Description
                        </th>
                        <th scope="col" className="pe-6 py-3 text-primary">
                          Estimate
                        </th>
                        <th scope="col" className="pe-6 py-3 text-primary">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-500 text-xs">
                      {results?.name ? (
                        results?.costs?.map((item: any, i: number) => (
                          <tr key={i} className="bg-white border-b">
                            <td className="pe-6 py-4">{results.name}</td>
                            <td className="pe-6 py-4">{item.service}</td>
                            <td className="pe-6 py-4">{item.description}</td>
                            <td className="pe-6 py-4">
                              {item.cost[0]?.etd || "-"}
                            </td>
                            <td className="pe-6 py-4 text-black font-medium">
                              {convertIdr(item.cost[0]?.value)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>No data found</tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PriceCheck;
