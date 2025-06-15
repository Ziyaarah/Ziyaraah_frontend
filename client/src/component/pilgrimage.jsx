import React from "react";
import Hajj from '../assets/images/Hajj.jpg';
import Umrah from '../assets/images/Umrah.jpg';
import Mecca from '../assets/images/Mecca.jpeg';

const PilgrimageOptions = () => {
    return (
        <>
        <div className="bg-gradient-to-b from-green-700 to-green-400  p-10 text-white">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Choose Your Sacred Journey</h1>
                <p className="text-gray-200">
                    Tailored planning for both Hajji and Umrah pilgrimages
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

                <div className="relative rounded-xl overflow-hidden shadow-lg group">
                    <img
                        src={Hajj}
                        alt="Hajj Pilgrimage"
                        className="w-full h-64 object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 p-5 flex flex-col justify-end bg-cover bg-center"
                        style={{ backgroundImage: `url(${Hajj})` }}>
                        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 text-white max-w-lg w-full shadow-lg">
                            <h2 className="text-xl font-bold">Hajj Pilgrimage</h2>
                            <p className="text-sm">The greater pilgrimage - a once-in-a-lifetime spiritual journey</p>
                            <p className="text-sm mt-2">🕒 5-7 days comprehensive planning</p>
                        </div>
                    </div>
                </div>


                <div className="relative rounded-xl overflow-hidden shadow-lg group">
                    <img
                        src={Umrah}
                        alt="Umrah Pilgrimage"
                        className="w-full h-64 object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 p-5 flex flex-col justify-end bg-cover bg-center"
                        style={{ backgroundImage: `url(${Umrah})` }}>
                        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 text-white max-w-lg w-full shadow-lg">

                            <h2 className="text-xl font-bold">Umrah Pilgrimage</h2>
                            <p className="text-sm">The lesser pilgrimage - can be performed any time of year</p>
                            <p className="text-sm mt-2">🕒 2-3 days flexible planning</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-700 bg-cover bg-center">
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

             <div className="text-white mb-10">
                <h1 className="text-3xl font-bold mb-2">Ready to Begin your Spiritual Journey?</h1>
                <p className="text-white-200">
                    Join thousan of muslims who have prepared for their scared journey with Ziyarah. Start planning your Hajj or Umrah today
                    with our comprehensive tools and guidance.
                </p>
                <button className=" m-4 px-8 py-4 bg-green-900 text-white font-bold rounded-lg hover:bg-blue-800 transition-all hover:-translate-y-1">
            Create Your Account →
          </button>
            </div>
            <img
                        src={Mecca}
                        alt="Mecca"
                        className="w-full h-64 rounded-xl object-cover transition-transform group-hover:scale-105 duration-300"
                    />
            </div>

        </div>
        </>
    );
};

export default PilgrimageOptions;