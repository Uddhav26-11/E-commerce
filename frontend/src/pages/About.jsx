import Title from "../components/Title";

const About = () => {
  return (
    <div className="border-t px-6 md:px-20 py-12">

      {/* TITLE */}
      <div className="text-center text-2xl mb-10">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* BRAND INTRO */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-xs tracking-[0.3em] text-gray-400 mb-3">
          OUR STORY
        </p>
        <h2 className="text-3xl font-bold tracking-wide mb-6">
          FOREVER, BUILT ON SIMPLICITY
        </h2>
        <div className="w-16 h-[2px] bg-black mx-auto mb-6"></div>
        <p className="text-gray-600 leading-7">
          ForeverBuy started with one simple idea: shopping for good
          clothes shouldn't be complicated. We bring together quality
          fabrics, honest pricing, and a smooth experience from browse
          to delivery, so you can spend less time worrying about your
          order and more time wearing it.
        </p>
      </div>

      {/* MISSION / VISION SPLIT */}
      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto mb-16">
        <div>
          <h3 className="text-lg font-semibold mb-3">Our Mission</h3>
          <p className="text-gray-600 leading-7">
            To make trend-forward fashion accessible to everyone, without
            compromising on comfort, fit, or fabric quality. Every piece
            we list is chosen with real people, not just trends, in mind.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Our Promise</h3>
          <p className="text-gray-600 leading-7">
            Fast, reliable delivery and a no-hassle return process. If
            something isn't right, we make it easy to fix, because trust
            is earned order by order, not just claimed on a page.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-center text-xl font-semibold mb-8">
          Why Shop With Us
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border rounded-lg p-8 text-center hover:shadow-md transition">
            <div className="text-3xl mb-3">✓</div>
            <h3 className="font-semibold text-lg mb-2">Quality First</h3>
            <p className="text-gray-500 leading-6">
              Every product passes a durability and fabric check before
              it reaches our store.
            </p>
          </div>

          <div className="border rounded-lg p-8 text-center hover:shadow-md transition">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-semibold text-lg mb-2">Built on Trust</h3>
            <p className="text-gray-500 leading-6">
              Transparent pricing, honest descriptions, and no surprise
              charges at checkout.
            </p>
          </div>

          <div className="border rounded-lg p-8 text-center hover:shadow-md transition">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-semibold text-lg mb-2">Real Support</h3>
            <p className="text-gray-500 leading-6">
              A support team that actually responds, Monday to Saturday,
              9 AM to 6 PM.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default About;
