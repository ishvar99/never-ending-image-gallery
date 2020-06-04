import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import Spinner from './components/Spinner/Spinner';
import Loader from './components/Loader/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
function App() {
  const [images, setImages] = useState([]);
  const [start, setStart] = useState(1);
  const [count, setCount] = useState(28);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setStart(start + count);
    const response = await Axios.get(
      `/api/photos?start=${start}&count=${count}`
    );
    setImages(images.concat(response.data));
  };
  useEffect(async () => {
    setLoading(true);
    const response = await Axios.get(
      `/api/photos?start=${start}&count=${count}`
    );
    setImages(response.data);
    setLoading(false);
  }, []);
  return (
    <div className='App'>
      <h1>IMAGE GALLERY</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className='image-grid'>
          <InfiniteScroll
            style={{ overflow: 'hidden', textAlign: 'center' }}
            dataLength={images.length}
            next={fetchData}
            hasMore={true}
            loader={<Spinner />}
          >
            {images.map((image) => {
              return <img key={image.id} src={image.urls.thumb} />;
            })}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}

export default App;
