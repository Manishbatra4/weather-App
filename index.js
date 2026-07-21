const path = require('path');
require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 4000;

const partials = path.join(__dirname, '/resources/partials');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/resources/views'));
app.use(express.static(path.join(__dirname, '/public')));
hbs.registerPartials(partials);

app.get('', (request, response) => {
    response.render('index', {
        title: 'Welcome To The Tech Fossil Weather App',
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About The Tech Fossil Weather',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in facilisis elit, sed congue mi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque blanditiis, commodi dolor doloremque ea exercitationem facilis id impedit inventore ipsam iste, iusto, nihil obcaecati quam quidem quos sunt temporibus. Ut.',
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'FAQ Weather App',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque blanditiis, commodi dolor doloremque ea exercitationem facilis id impedit inventore ipsam iste, iusto, nihil obcaecati quam quidem quos sunt temporibus. Ut.',
    });
});

app.get('/weather', async (request, response) => {
    const address = request.query.address;

    if (!address) {
        return response.send({ error: 'Please provide a location.' });
    }

    try {
        const { latitude, longitude, location } = await geocode(address);
        const forecastData = await forecast(latitude, longitude);
        response.send({
            forecast: forecastData,
            location,
            address,
        });
    } catch (error) {
        response.send({ error: error.message });
    }
});

app.get('*', (request, response) => {
    response.render('404', {
        title: '404 Page Not Found',
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
