import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//mapbox gl CSS
import 'mapbox-gl/dist/mapbox-gl.css';
//mapbox gl directions CSS
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
//mapbox gl geocoder CSS
import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './index.css';
import 'react-slideshow-image/dist/styles.css'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);