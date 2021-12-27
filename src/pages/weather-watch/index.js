import React, { createRef, PureComponent } from 'react';
import { _debounce, } from 'lodash';
import cn from 'classnames';

class WeatherWatch extends PureComponent {

    state = {
        cities: [],
        invalidCity: null,
        currentCity: null,
        currentUnit: 'C',
    }
    baseURL = 'http://localhost:3000/weather-reports';
    inputText = createRef();

    getCitiesByKeyword = async (keyword) => {
        if (!keyword.length) {
            this.setState({ cities: [], invalidCity: null })
            return
        };

        try {
            const res = await fetch(this.baseURL + `?name_like=${keyword}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            });

            const json = await res.json();

            let cities = json;

            this.setState({ cities, invalidCity: !cities.length ? keyword : null });

        } catch (error) {

        }
    }

    setUnits = (unit) => {
        const { currentCity } = this.state;
        let { temp, temp_max, temp_min } = currentCity;
        if (unit === 'F') {
            temp = Math.round((temp * 9 / 5) + 32);
            temp_max = Math.round((temp_max * 9 / 5) + 32);
            temp_min = Math.round((temp_min * 9 / 5) + 32);
        } else {
            temp = Math.round((temp - 32) * 5 / 9);
            temp_max = Math.round((temp_max - 32) * 5 / 9);
            temp_min = Math.round((temp_min - 32) * 5 / 9);
        }
        this.setState({ currentCity: { ...currentCity, temp, temp_max, temp_min }, currentUnit: unit });
    }

    searchCities = _.debounce(() => {
        this.getCitiesByKeyword(this.inputText.current.value);
    }, 500);

    setCurrentCity = async (cityId) => {
        try {
            const res = await fetch(this.baseURL + `/${cityId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            });

            const json = await res.json();

            this.setState({
                currentCity: json,
                cities: [],
                invalidCity: null
            }, () => {
                this.inputText.current.value = '';
                const { currentUnit } = this.state;
                if (currentUnit === 'F') {
                    debugger;
                    this.setUnits('F');
                }
            });
        } catch (error) {

        }
    }

    componentDidMount() {
        // setting Bangalore as default city
        this.setCurrentCity(4);
    }

    render() {
        const { cities, invalidCity, currentCity, currentUnit } = this.state;
        const unit = currentUnit === 'C' ? <span>&#8451;</span> : <span>&#8457;</span>;
        return (
            <div className="w-full min-h-[100vh] bg-slate-100 flex flex-col items-center justify-start">
                <div className="w-[90vw] mt-4 flex flex-col sm:max-w-[90%] uppercase">
                    <h3 className="mb-3 text-lg font-semibold border-b-2 border-red-600">WeatherWatch</h3>
                    <div className="w-full flex justify-around relative">
                        <div className="grow mr-1 bg-white px-5 py-3 rounded-md shadow">
                            <h3 className="text-md font-semibold">Location</h3>
                            <div>
                                <input type="text" ref={this.inputText} onChange={this.searchCities} required className="w-full text-md font-semibold rounded-none pt-1 placeholder:text-sm placeholder:font-normal placeholder:normal-case placeholder-gray-500 capitalize rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                    placeholder="Enter the location" />
                            </div>
                        </div>
                        <div className="w-32 bg-white px-5 py-3 rounded-md shadow">
                            <h3 className="text-md font-semibold">Units</h3>
                            <div>
                                <select onChange={(e) => this.setUnits(e.target.value)} className="w-full focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 p-0 border-transparent bg-transparent text-sm font-semibold text-black rounded-md">
                                    <option value="C">Celcuis</option>
                                    <option value="F">Farenheit</option>
                                </select>
                            </div>
                        </div>

                        <div className={cn("absolute w-full top-full flex mt-1 mr-1 bg-white p-8 rounded-md shadow-xl z-10 capitalize", {
                            "hidden": (!invalidCity && !cities.length)
                        })}>
                            {invalidCity
                                ? <h3 className="normal-case">
                                    <span className="font-semibold underline decoration-pink-500 decoration-2">{invalidCity}</span> is not exists in the record
                                </h3>
                                : cities?.map(city => {
                                    return (
                                        <button key={city.id} type="button" onClick={() => this.setCurrentCity(city.id)} className="px-5 py-1 mr-2 text-sm font-semibold tracking-wider bg-gradient-to-r from-rose-500 to-fuchsia-800 text-white rounded-full">
                                            {city.name}
                                        </button>
                                    )
                                })}
                        </div>
                    </div>

                    {currentCity &&
                        <div className="w-full bg-white mt-2 p-5 rounded-md relative shadow">
                            <h3 className="mb-1 text-3xl font-semibold capitalize">{currentCity.location}</h3>
                            <span className="absolute -top-3 -right-3 rounded-full">
                                <img className="w-[128px]" src={currentCity.icon} />
                            </span>
                            <div className="text-xs text-slate-500 font-semibold">
                                {currentCity.conditions} | Feels Like {currentCity.feels_like}&#8451;
                            </div>

                            <div className="mt-12">
                                <div className="flex justify-around">
                                    <div className="flex-1 p-2 rounded-md text-center bg-gradient-to-b from-fuchsia-600 to-orange-500 text-white">
                                        <div className="text-xs tracking-wider">Current temperature</div>
                                        <div className="text-xl">{currentCity.temp}{unit}</div>
                                    </div>
                                    <div className="flex-1 p-2 rounded-md ml-1 text-center bg-gradient-to-b from-fuchsia-600 to-orange-500 text-white">
                                        <div className="text-xs tracking-wider">Maximum temperature</div>
                                        <div className="text-xl">{currentCity.temp_max}{unit}</div>
                                    </div>
                                    <div className="flex-1 p-2 rounded-md ml-1 text-center bg-gradient-to-b from-fuchsia-600 to-orange-500 text-white">
                                        <div className="text-xs tracking-wider">Minimum temperature</div>
                                        <div className="text-xl">{currentCity.temp_min}{unit}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2">
                                <div className="flex justify-around">
                                    <div className="flex-1 p-2 rounded-md text-center bg-gradient-to-r from-fuchsia-800 to-pink-500 text-white">
                                        <div className="mb-3 text-xs tracking-wider">Wind Speed</div>
                                        <div className="text-xl lowercase">{currentCity.wind_speed} meter/sec</div>
                                    </div>
                                    <div className="flex-1 p-2 ml-1 rounded-md text-center bg-gradient-to-r from-fuchsia-800 to-pink-500 text-white">
                                        <div className="mb-3 text-xs tracking-wider">Wind Direction</div>
                                        <div className="text-xl lowercase">{currentCity.wind_direction} degrees</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2">
                                <div className="flex justify-around">
                                    <div className="flex-1 p-2 rounded-md text-center bg-gradient-to-r from-cyan-500 to-indigo-600 text-white">
                                        <div className="mb-3 text-xs tracking-wider">Pressure</div>
                                        <div className="text-xl lowercase">{currentCity.pressure} meter/sec</div>
                                    </div>
                                    <div className="flex-1 p-2 ml-1 rounded-md text-center bg-gradient-to-r from-cyan-500 to-indigo-600 text-white">
                                        <div className="mb-3 text-xs tracking-wider">Humidity</div>
                                        <div className="text-xl lowercase">{currentCity.humidity} %</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default WeatherWatch;