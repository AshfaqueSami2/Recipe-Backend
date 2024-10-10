

const AboutUs = () => {
  return (
    <div>
      {/* About Us Section */}
      <section className="py-14 lg:py-24 relative z-0 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl md:leading-normal">
            Elevate Your Cooking with Our Unique{" "}
            <span style={{ color: "#D54215" }}>Sam Recipes</span>
          </h1>
          <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
            Discover exciting, creative recipes that make cooking easy and
            fun. Explore the world of culinary arts with Sam Recipe.
          </p>
        </div>
      </section>

      {/* About Us Content Section */}
      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
            <div className="img-box">
              <img
                src="https://pagedone.io/asset/uploads/1702034769.png"
                alt="About Sam Recipe"
                className="max-lg:mx-auto"
              />
            </div>
            <div className="lg:pl-[100px] flex items-center">
              <div className="data w-full">
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
                  About Sam Recipe
                </h2>
                <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  At <span style={{ color: "#D54215", fontWeight: "bold" }}>Sam Recipe</span>, were committed to bringing world-class culinary experiences right to your kitchen. Our expertly curated recipes are designed for everyone, from beginners to seasoned chefs. Whether youre creating a quick meal or hosting a grand feast, Sam Recipe ensures that every dish is delicious, nutritious, and easy to prepare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-12">
            What our users say about <span style={{ color: "#D54215" }}>Sam Recipe</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 border border-transparent hover:border-[#D54215]">
              <p className="text-gray-700 mb-6">
                Sam Recipe made cooking fun for me again. The instructions are so clear, and the ingredients are easy to find. Ive become a much better cook!
              </p>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://randomuser.me/api/portraits/women/1.jpg"
                  alt="Emily Johnson"
                />
                <div className="ml-4">
                  <h5 className="font-bold text-gray-900">Emily Johnson</h5>
                  <p className="text-sm text-gray-500">Home Cook</p>
                </div>
                <div className="ml-auto flex items-center">
                  <span className="font-semibold" style={{ color: "#D54215" }}>5.0</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5.74l.515 1.637a1 1 0 00.948.707h1.737l-1.307.946a1 1 0 00-.36 1.118l.514 1.636L12 10.828l-1.515 1.116-.513-1.637a1 1 0 00-.36-1.118l-1.307-.946h1.737a1 1 0 00.947-.707L12 5.74z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 border border-transparent hover:border-[#D54215]">
              <p className="text-gray-700 mb-6">
                I love trying new dishes with Sam Recipe. The variety is amazing, and I always find something new to try, no matter the occasion.
              </p>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://randomuser.me/api/portraits/women/2.jpg"
                  alt="Olivia Carter"
                />
                <div className="ml-4">
                  <h5 className="font-bold text-gray-900">Olivia Carter</h5>
                  <p className="text-sm text-gray-500">Culinary Enthusiast</p>
                </div>
                <div className="ml-auto flex items-center">
                  <span className="font-semibold" style={{ color: "#D54215" }}>4.9</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5.74l.515 1.637a1 1 0 00.948.707h1.737l-1.307.946a1 1 0 00-.36 1.118l.514 1.636L12 10.828l-1.515 1.116-.513-1.637a1 1 0 00-.36-1.118l-1.307-.946h1.737a1 1 0 00.947-.707L12 5.74z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 border border-transparent hover:border-[#D54215]">
              <p className="text-gray-700 mb-6">
                I love trying new dishes with Sam Recipe. The variety is amazing, and I always find something new to try, no matter the occasion.
              </p>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://t4.ftcdn.net/jpg/03/25/73/59/360_F_325735908_TkxHU7okor9CTWHBhkGfdRumONWfIDEb.jpg"
                  alt="alex nata"
                />
                <div className="ml-4">
                  <h5 className="font-bold text-gray-900">Alex Nata</h5>
                  <p className="text-sm text-gray-500">Web developer</p>
                </div>
                <div className="ml-auto flex items-center">
                  <span className="font-semibold" style={{ color: "#D54215" }}>4.9</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5.74l.515 1.637a1 1 0 00.948.707h1.737l-1.307.946a1 1 0 00-.36 1.118l.514 1.636L12 10.828l-1.515 1.116-.513-1.637a1 1 0 00-.36-1.118l-1.307-.946h1.737a1 1 0 00.947-.707L12 5.74z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Additional testimonials */}
          </div>
        </div>
      </section>

      {/* Creative Team Section */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9">
            <div className="lg:pr-24 flex items-center">
              <div className="data w-full">
                <img
                  src="https://pagedone.io/asset/uploads/1702034785.png"
                  alt="Sam Recipe Team"
                  className="block lg:hidden mb-9 mx-auto"
                />
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center">
                  Meet Our Culinary Team
                </h2>
                <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  The dedicated team behind <span style={{ color: "#D54215", fontWeight: "bold" }}>Sam Recipe</span> is passionate about delivering the best recipes and culinary content. Each member brings a unique flavor, ensuring every dish you try will be a hit!
                </p>
              </div>
            </div>
            <div className="img-box">
              <img
                src="https://pagedone.io/asset/uploads/1702034785.png"
                alt="Sam Recipe Team"
                className="hidden lg:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl text-center text-gray-900 font-bold mb-14">
            Our Results in Numbers
          </h2>
          <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
              <div className="flex gap-5">
                <div className="font-manrope text-2xl font-bold" style={{ color: "#D54215" }}>
                  500+
                </div>
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 font-semibold mb-2">
                    Recipes Available
                  </h4>
                  <p className="text-xs text-gray-500 leading-5">
                    Weve curated over 500 recipes to ensure you always find something new and exciting to cook.
                  </p>
                </div>
              </div>
            </div>
            {/* More results */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="md:flex gap-x-24 clear-left md:mb-16 mb-10">
            <div className="md:mb-0 mb-4">
              <h2 className="text-black font-manrope text-4xl font-semibold leading-10 mb-5 md:text-left text-center">
                Get In Touch with Sam Recipe
              </h2>
              <p className="text-gray-600 text-lg font-normal leading-7 mb-7 md:text-left text-center">
                Have any questions or feedback? Were here to help you make the most out of every recipe.
              </p>
              <div className="flex md:items-center md:justify-start justify-center">
                <button className="w-36 h-12 rounded-full" style={{ backgroundColor: "#D54215" }}>
                  Contact Us
                </button>
              </div>
            </div>
            <div className="border-l-2 md:border-[#D54215] border-white px-10 py-6">
              <div className="mb-8">
                <h6 className="text-gray-500 text-sm font-medium leading-5 pb-3 md:text-start text-center">Email Address</h6>
                <h3 className="text-black text-xl font-semibold leading-8 md:text-start text-center">samrecipe@gmail.com</h3>
              </div>
              <div>
                <h6 className="text-gray-500 text-sm font-medium leading-5 pb-3 md:text-start text-center">Phone Number</h6>
                <h3 className="text-black text-xl font-semibold leading-8 md:text-start text-center">123-456-7890</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
