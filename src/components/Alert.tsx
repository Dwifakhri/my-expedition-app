"use client";

import Image from "next/image";
import { useStatus } from "@/contexts/status";

const Alert = ({ status }: any) => {
  const { setStatus } = useStatus();
  return (
    status?.current && (
      <div
        className={`flex items-center justify-between p-4 mb-4 text-sm border rounded-lg  ${
          status?.current === "success"
            ? "border-green-300 bg-green-50"
            : "border-red-300 bg-red-50"
        }`}
        role="alert">
        <div className="flex gap-x-2">
          {status?.current === "success" ? (
            <Image
              src="/assets/icons/check-circle.svg"
              alt="cross alt"
              width={16}
              height={16}
            />
          ) : (
            <Image
              src="/assets/icons/cross-circle.svg"
              alt="cross alt"
              width={16}
              height={16}
            />
          )}
          <span className="sr-only">Info</span>
          <div
            className={`${
              status?.current === "success" ? "text-green-500" : "text-red-500"
            }`}>
            <p className="font-bold ">
              {status?.current === "Success" ? "Success" : "Error"}!
            </p>
            <span>{status?.message}</span>
          </div>
        </div>
        <button onClick={() => setStatus({ current: "", message: "" })}>
          <Image
            src="/assets/icons/close.svg"
            alt="close alt"
            width={16}
            height={16}
          />
        </button>
      </div>
    )
  );
};

export default Alert;
