const getLocations = async () => {
    try {
        const response = await fetch('/api/locations');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

const getEventsByLocation = async (location_id) => {
    try {
        const response = await fetch(`/api/locations/${location_id}/events`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching events for location ${location_id}:`, error);
        throw error;
    }
};

export default { getLocations, getEventsByLocation };