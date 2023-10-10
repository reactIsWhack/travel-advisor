import React, {useRef, useEffect} from "react";
import ReactDOMServer from "react-dom/server";
import { convertRatingToStars } from "../utils/star";
import renderUnshadedStars from "../utils/unshaded-stars";

export default function Map({userLocation, setUserLocation, information}) {
  let zIndex = 0;
  const mapImg = useRef();
  const informationLocations = information.map(info => (
    [<div className="card">
      <div className="card-title">{info.name}</div>
      <div className="card-img-container">
        <img className="card-image" src={info.photo.images.original.url} alt="card-image" />
      </div> 
      <div className="card-stars">{info.rating ? convertRatingToStars(info.rating) : 'No rating'}{renderUnshadedStars(info.rating)}</div>     
    </div>, Number(info.latitude), Number(info.longitude)]
  ))

  async function initMap() {
    let map;
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(mapImg.current, {
      center: { lat: userLocation.lat, lng: userLocation.long },
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    let marker, i;
    let locationMarker = new google.maps.Marker({
      position: { lat: userLocation.lat, lng: userLocation.long },
      map: map
    })

    locationMarker.addListener('click', () => {
      alert('Your Location')
    })
    
    for (i = 0; i < informationLocations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(informationLocations[i][1], informationLocations[i][2]),
        map: map,
        visible: false
      });
      let infowindow = new google.maps.InfoWindow({
        content: ReactDOMServer.renderToString(informationLocations[i][0])
      })
      function addInfoWindow() {
        infowindow.open(map, marker)
      }
      addInfoWindow()
    }
    
    google.maps.event.addListener(map, 'dragend', function() {
      const lat = map.getCenter().lat()
      const lng = map.getCenter().lng();
      setUserLocation(() => (
        {
          lat: lat,
          long: lng
        }
      ))
    })
  }

  initMap();

  return (
    <div className="map" ref={mapImg}></div>
  )
}