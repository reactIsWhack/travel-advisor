import React, {useState, useEffect, useRef} from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Information from "./components/Information";
import Map from "./components/Map";
import {key} from "../config.js"

export default function App() {
  const [userLocation, setUserLocation] = useState({});
  const [information, setInformation] = useState([]);
  const [formData, setFormData] = useState({
    info: 'restaurants',
    rating: '',
  });
  const [userInputLocation, setUserInputLocation] = useState('');
  const informationAllRatings = useRef([]);
  const success = (position) => {
    console.log(position)
    console.log('ran2')
    setUserLocation(() => (
      {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
    ))
  }

  const error = () => {
    alert('Unable to retrieve your location')
  }

  console.log(userLocation)

    //get users location
    navigator.geolocation.getCurrentPosition(success, error);
  

  useEffect(() => {

    console.log('ran');
    //using users location find 20 restaurants around them
    let url = '';
    // Sets url based off what the user inputs (restaurant, hotel, or attraction)
    if (formData.info === 'restaurants') {
      url =`https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${userLocation.lat}&longitude=${userLocation.long}&limit=26&currency=USD&lunit=km&lang=en_US`;
    } else if (formData.info === 'hotels') {
      url = `https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng?latitude=${userLocation.lat}&longitude=${userLocation.long}&lang=en_US&limit=30`
    } else {
      url = `https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng?longitude=${userLocation.long}&latitude=${userLocation.lat}&lunit=km&currency=USD&lang=en_US`
    }
    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    };
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const filteredData = data.data.filter(info => !info.ad_position);
        const correctedData = filteredData.filter(info => info.name !== 'duplicate');
        // Adds a placeholder image to restaurants without photos
        const restaurantsWithoutPhotos = correctedData.filter(information => !information.photo);
        const restaurantsWithPhotos = correctedData.filter(information => information.photo);
        restaurantsWithoutPhotos.forEach(restaurant => {
          restaurant.photo = {images: {original: {url: 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}}}
        })
        informationAllRatings.current = [...restaurantsWithPhotos, ...restaurantsWithoutPhotos]
        setInformation([...restaurantsWithPhotos, ...restaurantsWithoutPhotos]);
      })

      console.log(informationAllRatings.current)

      if (userInputLocation) {
      console.log('ran2')
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${userInputLocation}&key=AIzaSyCXBnhFwhjuCI_1ORkaM6uDx9awEpxfUoI`;
      fetch(url)
        .then(res => res.json())
        .then(data => setUserLocation(() => ({
          lat: data.results[0].geometry.location.lat,
          long: data.results[0].geometry.location.lng
        })))
        .catch(error => alert(error))
    }
   
  }, [userLocation.lat, userLocation.long, formData.info, userInputLocation]);

  console.log(informationAllRatings, 'ref');
  useEffect(() => {
    if (Number(formData.rating) === 4.5) {
      setInformation(prevInformation => {
        return prevInformation.filter(info => Number(info.rating) === 5)
      })
    } else if (Number(formData.rating) === 4) {
      setInformation(prevInformation => {
        return prevInformation.filter(info => Number(info.rating) >= 4)
      }) 
    } else if (Number(formData.rating) === 3) {
      setInformation(prevInformation => {
        return prevInformation.filter(info => Number(info.rating) >= 3) 
      })
    } else {
      setInformation(informationAllRatings.current)
    }
  }, [formData.rating])
  
  const renderedData = information.map(information => {
    const photo = information.photo.images.original.url;
    return <Information 
      name={information.name}
      rating={information.rating}
      price={information.price_level}
      ranking={information.ranking}
      awards={information.awards}
      address={information.address}
      phoneNumber={information.phone}
      cuisines={information.cuisine}
      tripAdvisorLink={information.web_url}
      website={information.website}
      img={photo}
      reviews={information.num_reviews}
    />
  })

  console.log(userLocation)

  return (
    <>
      <Navbar setUserInputLocation={setUserInputLocation} setInformation={setInformation} />
      <div className="app">
        <div className="sidebar">
          <Sidebar formData={formData} setFormData={setFormData} information={information} />
          <div className="sidebar-container">
            {renderedData}
          </div>
        </div>
        <main className="map-container">
          <Map userLocation={userLocation} setUserLocation={setUserLocation} information={information}/>
        </main>
      </div>
      
    </>
  )
}