import { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import Map from "./components/Map";
import { MagnifyingGlass } from "react-loader-spinner";

function App() {
  const [ipAddress, setIpAddress] = useState("");
  const [result, setResult] = useState(null);
  const [input, setInput] = useState("");
  const apiKey =
    "at_Udf8af3TfIQauqxQLPuFb4VjEpj3C";

  const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`;

  const validateIPv4 = (ip) => {
    if (!ip) {
      return false;
    }
    const regex =
      /^([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    return regex.test(ip);
  };

  const getIpData = async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIpData();
  }, []);

  useEffect(() => {
    if (validateIPv4(input)) {
      setIpAddress(input);
    } else {
      setIpAddress("");
    }
  }, [input]);
  return (
    <>
      <div className="app w-[100vw] h-[100vh]">
        <div className="top ">
          <h1 className="text-4xl font-bold text-white text-center pt-6">
            IP Address Tracker
          </h1>
          <div className="input rounded-lg  flex justify-center mt-6">
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              max={14}
              min={7}
              value={input}
              type="tel"
              className="bg-white p-2.5 w-[450px] rounded-tl-lg rounded-bl-lg"
            />
            <button
              onClick={() => {
                getIpData();
              }}
              className="bg-[#2b2b2b] text-white px-4 rounded-tr-lg rounded-br-lg"
            >
              <FontAwesomeIcon
                icon={faGreaterThan}
              />
            </button>
          </div>
          <div
            className="info rounded-lg bg-white w-[80%] py-14 h-[50px] p-3 
          m-auto mt-11 flex justify-around items-center "
          >
            <div>
              <h2>IP Address</h2>
              <h1>{result ? result.ip : " "}</h1>
            </div>
            <hr />
            <div>
              <h2>Location</h2>
              <h1>
                {result && result.location
                  ? result.location.region
                  : " "}
              </h1>
            </div>
            <hr />
            <div>
              <h2>Timezone</h2>
              <h1>
                {result && result.location
                  ? "UTC " +
                    result.location.timezone
                  : " "}
              </h1>
            </div>
            <hr />
            <div>
              <h2>ISP</h2>
              <h1>{result ? result.isp : ""}</h1>
            </div>
          </div>
        </div>
        <div className="bottom">
          {!result ? (
            <div className="map flex justify-center bg-sky-100 items-center h-[50vh]">
              
              <MagnifyingGlass
                color="#00BFFF"
                height={100}
                width={100}
              />
            </div>
          ) : result.location ? (
            <Map
              lat={result.location.lat}
              lng={result.location.lng}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default App;
