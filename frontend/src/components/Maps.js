import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import { Icon } from 'leaflet'
import L from 'leaflet'

const position = [36.80025, 10.1862]

function ResetCenterView(props) {
  const { selectPosition } = props
  const map = useMap()

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true,
        }
      )
    }
  }, [selectPosition])

  return null
}

const Maps = (props) => {
  const { selectPosition } = props
  const locationSelection = [selectPosition?.lat, selectPosition?.lon]
  console.log(props)
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=fYXlS23mEdxoeVU5MIj5'
      />
      {selectPosition && (
        <Marker
          position={locationSelection}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  )
}

export default Maps
