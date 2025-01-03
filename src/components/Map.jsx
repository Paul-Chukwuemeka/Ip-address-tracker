import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const map = ({ lat, lng }) => {
  return (
    <div key={`${lat}-${lng}`}>

    <MapContainer
    center={[lat, lng]}
    zoom={13}
    scrollWheelZoom={true}
    className="map"
    zoomControl={false}
    
    >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[lat, lng]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily
        customizable.
      </Popup>
    </Marker>
    </MapContainer>
    </div>
  )
}

export default map