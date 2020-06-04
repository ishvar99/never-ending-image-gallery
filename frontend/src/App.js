import React, { useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  useEffect(() => {
    Axios.get('/api/photos').then((response) => {
      console.log(response.data);
    });
  }, []);
  return (
    <div className='App'>
      <h1>IMAGE GALLERY</h1>
      <div className='image-grid'>
        <div className='image'>
          <img src='' />
        </div>
      </div>
    </div>
  );
}

export default App;
