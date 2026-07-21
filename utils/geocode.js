const geocode = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    const res = await fetch(url, {
        headers: { 'User-Agent': 'WeatherApp/1.0' },
    });
    if (!res.ok) throw new Error('Unable to connect to location services!');
    const body = await res.json();
    if (!body || body.length === 0) throw new Error('Unable to find location!');
    return {
        latitude: parseFloat(body[0].lat),
        longitude: parseFloat(body[0].lon),
        location: body[0].display_name,
    };
};

module.exports = geocode;
