
const getEvents = async () => {
    try {
        const response = await fetch('/api/events');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

export default { getEvents };
