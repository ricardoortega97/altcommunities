import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationEvents.css'

const LocationEvents = ({ index }) => {
    const [location, setLocation] = useState({})
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchLocationAndEvents = async () => {
            try {
                const locations = await LocationsAPI.getLocations();
                if (locations && locations.length > 0) {
                    // Use the index prop to get the correct location (index is 1-based, array is 0-based)
                    const selectedLocation = locations[index - 1] || locations[0];
                    setLocation(selectedLocation);
                    
                    // Fetch events for this specific location
                    const events = await LocationsAPI.getEventsByLocation(selectedLocation.location);
                    setEvents(events || []);
                }
            } catch (error) {
                console.error('Error fetching location and events:', error);
            }
        };
        
        fetchLocationAndEvents();
    }, [index]);

    return (
        <div className='location-events'>
            <header>
                {/* <div className='location-image'>
                    <img src={location.image} />
                </div> */}

                <div className='location-info'>
                    <h2>{location.location}</h2>
                    {/* <p>{location.location}, {location} {location.zip}</p> */}
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.name}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
};

export default LocationEvents;