import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        <div>
          <img
            src={assets.logo}
            className="mb-5 w-32"
            alt=""
          />

          <p className="w-full md:w-2/3 text-gray-600">
            Discover premium fashion collections with quality,
            comfort, and style crafted for every occasion.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">
            COMPANY
          </p>

          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>Collection</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">
            GET IN TOUCH
          </p>

          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 9876543210</li>
            <li>support@foreverbuy.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />

        <p className="py-5 text-sm text-center">
          Copyright 2026 © ForeverBuy - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;