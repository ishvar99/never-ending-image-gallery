import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
function App() {
  const [images, setimages] = useState([]);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(28);
  useEffect(() => {
    Axios.get(`/api/photos?start=${start}&end=${end}`).then((response) => {
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
