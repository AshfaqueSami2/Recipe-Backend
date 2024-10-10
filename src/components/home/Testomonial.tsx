import React from 'react';

const Testomonial = () => {
  return (
    <div>
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
    </div>
  );
};

export default Testomonial;