import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
function App() {
  const [images, setimages] = useState([]);
  useEffect(() => {
    Axios.get('/api/photos').then((response) => {
      console.log(response.data);
      setimages(response.data);
    });
  }, []);
  return (
    <div className='App'>
      <h1>IMAGE GALLERY</h1>
      <div className='image-grid'>
        {images.map((image) => {
          return (
            <div className='image'>
              <img key={image.id} src={image.urls.thumb} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
