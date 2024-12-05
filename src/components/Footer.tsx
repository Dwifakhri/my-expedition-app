import Image from "next/image";
import fb from "../../public/assets/icons/fb.svg";
import ig from "../../public/assets/icons/ig.svg";
import twitter from "../../public/assets/icons/twitter.svg";

const Footer = () => {
  return (
    <footer className="container py-[5rem] bg-tersiery">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2">
          <h1 className="text-xl font-medium mb-4">My Expedition</h1>
          <p className="leading-[1.5rem]">
            Our Mission is Make Your Journey Seamless with Our Shipping
            Expertise.
          </p>
        </div>
        <div>
          <h1 className="text-xl font-medium mb-4">Helpful Links</h1>
          <ul className="leading-[2rem] text-sm">
            <li>Prices</li>
            <li>Tracking</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl font-medium mb-4">Contact Us</h1>
          <ul className="leading-[2rem] text-sm">
            <li>
              <ul className="flex gap-2">
                <li className="flex items-center justify-center bg-[#DFE4F5] rounded-full p-2 w-[30px] h-[30px]">
                  <Image src={twitter} alt="twitter" />
                </li>
                <li className="flex items-center justify-center bg-[#DFE4F5] rounded-full p-2 w-[30px] h-[30px]">
                  <Image src={ig} alt="ig" />
                </li>
                <li className="flex items-center justify-center bg-[#DFE4F5] rounded-full p-2 w-[30px] h-[30px]">
                  <Image src={fb} alt="fb" />
                </li>
              </ul>
            </li>
            <li className="break-all">myexpedition.dummy@gmail.com</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
