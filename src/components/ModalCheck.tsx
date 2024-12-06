"use client";
import React, { useState, useMemo } from "react";
import Close from "../../public/assets/icons/close.svg";
import Arrow from "../../public/assets/icons/arrow-right.svg";
import Image from "next/image";
import InputDropdown from "./InputDropdown";
InputDropdown;
interface ModalCheckProps {
  province: Array<{}>;
  city: Array<{}>;
}

const ModalCheck: React.FC<ModalCheckProps> = ({ province, city }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

  const originCityOptions = useMemo(() => {
    if (!Object.keys(originProvince).length) {
      return [];
    }
    return city.filter((item: any) => item.province_id === originProvince.id);
  }, [originProvince, city]);

  const destinationCityOptions = useMemo(() => {
    if (!Object.keys(destinationProvince).length) {
      return [];
    }
    return city.filter(
      (item: any) => item.province_id === destinationProvince.id
    );
  }, [destinationProvince, city]);

  const courierOptions = ["jne", "tiki", "pos"];

  const disabledBtn =
    !originProvince ||
    !originCity ||
    !destinationProvince ||
    !destinationCity ||
    !weight ||
    !courier;

  const checkPrice = async (e: any) => {
    e.preventDefault();
    const form: any = {
      origin: +originCity.id,
      destination: +destinationCity.id,
      weight: +weight,
      courier: courier,
    };

    const response = await fetch(`https://api.rajaongkir.com/starter/cost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        key: process.env.NEXT_API_KEY || "",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: any = await response.json();
    console.log(data);
  };

  return (
    <>
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
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 text-left"
          role="dialog"
          aria-modal="true">
          <div className="relative bg-white rounded-lg shadow w-full max-w-md">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Check the price
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center ">
                <Image
                  src={Close}
                  alt="arrow alt"
                  style={{ width: "auto", height: "auto" }}
                  width={15}
                  height={15}
                />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form
                onSubmit={(e: any) => checkPrice(e)}
                className="max-w-md mx-auto">
                <p className="mb-3 font-semibold">Origin</p>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <InputDropdown
                    label="province"
                    value={originProvince}
                    options={province}
                    setValue={(val: any) => setOriginProvince(val)}
                  />
                  <InputDropdown
                    label="city"
                    value={originCity}
                    options={originCityOptions}
                    setValue={(val: any) => setOriginCity(val)}
                  />
                </div>
                <p className="mb-3 font-semibold">Destination</p>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <InputDropdown
                    label="province"
                    value={destinationProvince}
                    options={province}
                    setValue={(val: any) => setDestinationProvince(val)}
                  />
                  <InputDropdown
                    label="city"
                    value={destinationCity}
                    options={destinationCityOptions}
                    setValue={(val: any) => setDestinationCity(val)}
                  />
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
                      required
                    />
                    <label
                      htmlFor="floating_weight"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Weight (kg)
                    </label>
                  </div>
                  <InputDropdown
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCheck;
