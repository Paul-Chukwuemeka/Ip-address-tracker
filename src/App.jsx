import { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const regex =
  /^([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])){3}$/;
let info = null;
function App() {
  const [ipAddress, setIpAddress] = useState("");
  const [result, setResult] = useState(null);
  const [input, setInput] = useState("");
  const apiKey =
    "at_Udf8af3TfIQauqxQLPuFb4VjEpj3C";

  const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`;

  let lat,lng
  const validateIPv4 = (ip) => {
    if (!ip) {
      // Check for empty string or null/undefined
      return false;
    }
    const regex =
      /^([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    return regex.test(input);
  };

  const getIpData = () => {
    // fetch(apiUrl)
    //   .then(async (res) => await res.json())
    //   .then(async (data) => {
    //     await setResult(data);
    //   })
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    getIpData();
  }, []);
  useEffect(() => {

  }, [result]);

  if(result){
    lat = result.location.lat
    lng = result.location.lng
  }
  else{
    lat = 51.05
    lng = -0.09
  }
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
              onClick={getIpData}
              className="bg-[#2b2b2b] text-white px-4 rounded-tr-lg rounded-br-lg"
            >
              <FontAwesomeIcon
                icon={faGreaterThan}
              />
            </button>
          </div>
          <div className="inf rounded-lg bg-white w-[80%] py-14 h-[50px] p-3 m-auto mt-11 flex justify-around items-center ">
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

        <MapContainer
          center={[lat, lng]}
          zoom={13}
          className="map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={result ?[lat, lng] :[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily
              customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}

export default App;
