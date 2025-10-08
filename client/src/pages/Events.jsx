import { useState, useEffect } from "react";
import EventAPI from "../services/EventsAPI";
import LocationsAPI from "../services/LocationsAPI";
import '../css/Event.css'

const Events = () => {
    const [events, setEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsData = await EventAPI.getEvents();
                const locationsData = await LocationsAPI.getLocations();
                
                setAllEvents(eventsData || []);
                setEvents(eventsData || []);
                setLocations(locationsData || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);

    const handleLocationChange = async (e) => {
        const locationName = e.target.value;
        setSelectedLocation(locationName);
        
        if (locationName === "") {
            setEvents(allEvents);
        } else {
            try {
                const locationEvents = await LocationsAPI.getEventsByLocation(locationName);
                setEvents(locationEvents || []);
            } catch (error) {
                console.error('Error fetching events by location:', error);
            }
        }
    };

    const handleAllEvents = () => {
        setSelectedLocation("");
        setEvents(allEvents);
    };
    
    return (
        <div className="">
            <div className="options">
                <select 
                    name="locations" 
                    value={selectedLocation} 
                    onChange={handleLocationChange}
                >
                    <option disabled value="">
                        Select a location
                    </option>
                    {locations.map(location => (
                        <option key={location.id} value={location.location}>
                            {location.location}
                        </option>
                    ))}
                </select>
                <button onClick={handleAllEvents}>All Events</button>
            </div>
            <div className="all-events">
                {events && events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id} className="event-information">
                            {event.image && <img src={event.image} alt={event.name}  />}
                            <div className="event-information-overlay">
                                <div className="text">
                                    <h3>{event.name}</h3>
                                    <p>Date: {event.date}</p>
                                    <p>Time: {event.time}</p>
                                    <p>Location: {event.location}</p> 
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No events available.</p>
                )}
            </div>
        </div>
    );
};

export default Events;