"use client"; // Error boundaries must be Client Components
import Logo from "../../public/assets/icons/logo.svg";
import Image from "next/image";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <nav className=" w-full bg-white drop-shadow-md drop-shadow">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center py-5">
            <div className="flex justify-between items-center w-full md:w-auto">
              <Image src={Logo} alt="logo" priority />
            </div>
          </div>
        </div>
      </nav>
      <div className="container tex-sm text-center mt-10">
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </div>
    </div>
  );
}
