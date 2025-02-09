import Layout from "@/components/Layout";
import Image from "next/image";
import Car from "../../public/assets/images/car.png";
import PriceCheck from "@/components/PriceCheck";

async function getRequest(url: string) {
  const base: string = process.env.NEXT_BASE_API_URL || "";
  const response = await fetch(`${base}${url}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      key: process.env.NEXT_API_KEY || "",
    },
  });
  if (!response.ok) {
    console.error(`Error ${response.statusText} ${response.status}`);
    throw new Error(`Failed to fetch data`);
  }

  const data = await response.json();
  return data.rajaongkir.results;
}

export default async function Home() {
  const [province = [], city = []] = await Promise.all([
    getRequest("starter/province"),
    getRequest("starter/city"),
  ]);

  return (
    <Layout>
      <main className="main-site">
        <section className="text-center">
          <h1 className="mb-8 mt-10 text-4xl font-bold">
            Delivering Your Journey <br /> with My Expedition
          </h1>
          <PriceCheck province={province} city={city} />
          <Image
            className="mx-auto"
            src={Car}
            alt="card alt"
            style={{ width: "100%", maxWidth: "30rem", height: "auto" }}
            priority
          />
        </section>
      </main>
    </Layout>
  );
}
