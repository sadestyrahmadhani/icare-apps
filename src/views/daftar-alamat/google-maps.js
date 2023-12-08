import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo, useEffect, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox } from "@headlessui/react";
import { useNavigate, useLocation } from 'react-router-dom'

const libraries = ['places']

const Maps = () => {
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    
    const navigate = useNavigate()
    const location = useLocation()
    
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBy30ekCIw6QTflr_P-fV-wuzXPB_t9ezI',
        libraries
    })

    const handleMapsNavigation = (e) => {
        var state = {
            latitude: lat,
            longitude: lng,
            location: lat + ',' + lng,
            input:location.state?.input,
            isPin: true,
        }

        if(location.state?.id) {
            state.id = location.state.id
        }

        
        if (location.state.input.redirect === -1) {
            navigate('/tambah_alamat', { 
                state: {
                    latitude: lat,
                    longitude: lng,
                    location: lat + ',' + lng,
                    input:location.state?.input,
                    isPin: true,
                }
             })
        } else if (location.state.input.redirect === -2) {
            navigate('/tambah_eq', { 
                state: {
                    latitude: lat,
                    longitude: lng,
                    location: lat + ',' + lng,
                    input:location.state?.input,
                    isPin: true,
                    activeRadio: location.state?.currentNavigate
                }
             })
            // console.log(states)
        }

    }

    return (
        <>
            <GoogleMapComponent { ...{lat, lng, setLat, setLng, isLoaded } }/>
            <div className='px-4 py-4'>
                <p className='mb-4 mt-2'>Latitude: { lat }<br/> Longitude: { lng }</p>
                <button className='btn btn-login w-100 py-2 text-black' style={{backgroundColor: '#5da18d'}} onClick={ handleMapsNavigation }>Simpan Lokasi</button>
            </div>
        </>
    )
}

const GoogleMapComponent = ({ lat, lng, setLat, setLng, isLoaded }) => {
    const [center, setCenter] = useState({ lat, lng })
    const [zoom, setZoom] = useState(10)
    const [locationLoaded, setLocationLoaded] = useState(false)
    const markerLocation = useMemo(() => ({ lat, lng }), [lat, lng])

    const mapContainerStyle = {
        width: '100%',
        height: '78vh'
    }

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
                setZoom(15)
                setLat(position.coords.latitude)
                setLng(position.coords.longitude)
                setLocationLoaded(true)
            })
        }
    }, []);

    const setMapsMarker = (e) => {
        setLat(e.latLng.lat)
        setLng(e.latLng.lng)
    }

    if(!isLoaded && !locationLoaded) return <div style={{ ...mapContainerStyle, background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>

    return isLoaded && locationLoaded && (
        <>
            <PlacesAutoComplete { ...{ setLat, setLng, setCenter } } />
            <GoogleMap 
                { ...{ mapContainerStyle, center, zoom } }
                onClick={ setMapsMarker }
                options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false
                }}
            >
                <MarkerF position={ markerLocation } />
            </GoogleMap>
        </>
    )
}

const PlacesAutoComplete = ({ setLat, setLng, setCenter }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete()

    const handlePlaceSelected = (address) => {
        setValue(address)
        clearSuggestions()

        // get latitude & longitude
        getGeocode({ address })
            .then(results => {
                const { lat, lng } = getLatLng(results[0])
                setLat(lat)
                setLng(lng)
                setCenter({ lat, lng })
            })
    }

    return (
        <Combobox value={ value } onChange={ handlePlaceSelected }>
            <i className="fa fa-search text-primary" role="combobox-icon"></i>
            <Combobox.Input onChange={ (e) => setValue(e.target.value) } />
            <Combobox.Options>
                { 
                    status === 'OK' && (
                        data.map(({ place_id, description }) => (
                            <Combobox.Option key={ place_id } value={ description }>
                                <i className="fa fa-map-marker me-3"></i>
                                { description }
                            </Combobox.Option>
                        ))
                    )
                }
            </Combobox.Options>
        </Combobox>
    )
}

export default Maps

// import { useState, useEffect, useMemo } from 'react'
// import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
// import { useNavigate, useLocation } from 'react-router-dom'

// export const MyMapComponent = ({ isLoaded, setLat, setLng, lat, lng }) => {
//     const [center, setCenter] = useState({ lat: 0, lng: 0 })
//     const [zoom, setZoom] = useState(4)
//     const [isLocationLoaded, setIsLocationLoaded] = useState(false)

//     const containerStyle = {
//         width: '100%',
//         height: '450px'
//     }
    
//     const marker = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng])

//     useEffect(() => {
//         if(navigator.geolocation) {
//             navigator.geolocation.watchPosition((position) => {
//                 setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
//                 setLat(position.coords.latitude)
//                 setLng(position.coords.longitude)
//                 setZoom(10)
//                 setIsLocationLoaded(true)
//             })
//         }
//     })

//     const setMarker = (e) => {
//         setLat(e.latLng.lat)
//         setLng(e.latLng.lng)
//     }

//     return isLoaded && isLocationLoaded && (
//         <GoogleMap
//             mapContainerStyle={ containerStyle }
//             center={ center }
//             zoom={ zoom }
//             onClick={ setMarker }
//             options={{
//                 streetViewControl: false,
//                 mapTypeControl: false
//             }}
//         >
//             <MarkerF position={ marker } />
//         </GoogleMap>
//     )
// }

// export const MapsComponent = (props) => {
//     const navigate = useNavigate()
//     const location = useLocation()
//     const [lat, setLat] = useState(150.644)
//     const [lng, setLng] = useState(-34.397)

//     const { isLoaded } = useJsApiLoader({
//         id: 'AIzaSyBy30ekCIw6QTflr_P-fV-wuzXPB_t9ezI',
//         googleMapsApiKey: 'AIzaSyBy30ekCIw6QTflr_P-fV-wuzXPB_t9ezI'
//     })
    
//     const handleSaveLatLong = () => {
//         if(location.state?.id) {
//             navigate('/tambah_alamat/1', {
//                 state: {
//                     latitude: lat,
//                     longitude: lng,
//                     location: lat + ',' + lng,
//                     id: location.state?.id, 
//                     input:location.state?.input,
//                     isPin: true,
//                 }
//             })
//         } else {
//             navigate('/tambah_alamat/0', {
//                 state: {
//                     latitude: lat,
//                     longitude: lng,
//                     location: lat + ',' + lng,
//                     input:location.state?.input,
//                     isPin: true
//                 }
//             })
//         }
//         console.log(location.state);
//     }

//     return (
//         <>
//             <MyMapComponent isLoaded={ isLoaded } setLat={ setLat } setLng={ setLng } lat={ lat } lng={ lng }/>
//             <div className='px-4 py-5'>
//                 <p className='mb-4'>Latitude: { lat }<br/> Longitude: { lng }</p>
//                 <button className='btn btn-login w-100 py-2 text-black' style={{backgroundColor: '#5da18d'}} onClick={handleSaveLatLong}>Simpan Lokasi</button>
//             </div>
//         </>
//     )
// }

// export default MapsComponent