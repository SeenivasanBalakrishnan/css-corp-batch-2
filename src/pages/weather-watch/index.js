import React, { PureComponent } from 'react';

class WeatherWatch extends PureComponent {
    render() {
        return (
            <div className="w-full min-h-[100vh] bg-slate-100 flex flex-col items-center justify-start">
                <div className="w-[90vw] mt-4 flex flex-col sm:max-w-[70%] uppercase">
                    <h3 className="mb-3 text-lg font-semibold border-b-2 border-red-600">WeatherWatch</h3>
                    <div className="w-full flex justify-around">
                        <div className="grow mr-1 bg-white px-5 py-3 rounded-md shadow">
                            <h3 className="text-md font-semibold">Location</h3>
                            <div>
                                <input type="text" required className="w-full text-sm rounded-none pt-1 placeholder-text-sm placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                    placeholder="Enter the location" />
                            </div>
                        </div>
                        <div className="w-32 bg-white px-5 py-3 rounded-md shadow">
                            <h3 className="text-md font-semibold">Units</h3>
                            <div>
                                <select className="w-full focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 p-0 border-transparent bg-transparent text-sm text-gray-500 rounded-md">
                                    <option>Celcuis</option>
                                    <option>Farenheit</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white mt-2 p-5 rounded-md relative shadow">
                        <h3 className="text-3xl font-semibold capitalize">Bengaluru</h3>
                        <span className="absolute -top-4 -right-4 rounded-full">
                            <img className="w-[128px]" src="/images/weather_icon_full_sun.svg" />
                        </span>
                        <div className="text-xs text-slate-500 font-semibold">
                            Scattered Clouds | Feels Like 30&#8451;
                        </div>

                        <div className="mt-12">
                            <div className="flex justify-around">
                                <div className="flex-1 p-2 rounded-md text-center bg-gradient-to-b from-fuchsia-600 to-orange-500 text-white">
                                    <div className="text-xs tracking-wider">Current temperature</div>
                                    <div className="text-xl">29&#8451;</div>
                                </div>
                                <div className="flex-1 p-2 rounded-md ml-1 text-center bg-gradient-to-b from-fuchsia-600 to-orange-500 text-white">
                                    <div className="text-xs tracking-wider">Maximum temperature</div>
                                    <div className="text-xl">29&#8451;</div>
                                </div>
                                <div className="flex-1 p-2 rounded-md ml-1 text-center bg-gradient-to-b from-fuchsia-600 to-orange-500 text-white">
                                    <div className="text-xs tracking-wider">Minimum temperature</div>
                                    <div className="text-xl">29&#8451;</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2">
                            <div className="flex justify-around">
                                <div className="flex-1 p-2 rounded-md text-center bg-gradient-to-r from-fuchsia-800 to-pink-500 text-white">
                                    <div className="mb-3 text-xs tracking-wider">Wind Speed</div>
                                    <div className="text-xl lowercase">3.1 meter/sec</div>
                                </div>
                                <div className="flex-1 p-2 ml-1 rounded-md text-center bg-gradient-to-r from-fuchsia-800 to-pink-500 text-white">
                                    <div className="mb-3 text-xs tracking-wider">Wind Direction</div>
                                    <div className="text-xl lowercase">220 degrees</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2">
                            <div className="flex justify-around">
                                <div className="flex-1 p-2 rounded-md text-center bg-gradient-to-r from-cyan-500 to-indigo-600 text-white">
                                    <div className="mb-3 text-xs tracking-wider">Wind Speed</div>
                                    <div className="text-xl lowercase">3.1 meter/sec</div>
                                </div>
                                <div className="flex-1 p-2 ml-1 rounded-md text-center bg-gradient-to-r from-cyan-500 to-indigo-600 text-white">
                                    <div className="mb-3 text-xs tracking-wider">Humidity</div>
                                    <div className="text-xl lowercase">54 %</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherWatch;