import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-300 rounded-lg overflow-hidden mt-4">

      {/* Left Content */}
      <div className="w-full sm:w-1/2 flex items-center justify-center px-8 py-16 sm:py-0">

        <div className="text-[#414141] max-w-md">

          <div className="flex items-center gap-3 mb-4">
            <p className="w-10 md:w-12 h-[2px] bg-[#414141]"></p>

            <p className="font-medium text-sm md:text-base tracking-wide">
              OUR BESTSELLERS
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
            Latest Arrivals
          </h1>

          <div className="flex items-center gap-3 cursor-pointer group">

            <p className="font-semibold text-sm md:text-base tracking-wide">
              SHOP NOW
            </p>

            <p className="w-10 md:w-12 h-[1px] bg-[#414141] transition-all duration-300 group-hover:w-16"></p>

          </div>

        </div>

      </div>

      {/* Right Image */}
      <div className="w-full sm:w-1/2">
        <img
          className="w-full h-[350px] sm:h-[450px] lg:h-[520px] object-cover"
          src={assets.hero_img}
          alt="Hero"
        />
      </div>

    </div>
  );
};

export default Hero;