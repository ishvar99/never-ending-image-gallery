import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import Spinner from './components/Spinner/Spinner';
import Loader from './components/Loader/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
function App() {
  const [images, setImages] = useState([]);
  const [start, setStart] = useState(1);
  const [count, setCount] = useState(27);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setStart(start + count);
    const response = await Axios.get(
      `/api/photos?start=${start + count}&count=${count}`
    );
    if (response.data.length > 0) setImages(images.concat(response.data));
  };
  useEffect(async () => {
    setLoading(true);
    while (true) {
      const response = await Axios.get(
        `/api/photos?start=${start}&count=${count}`
      );
      if (response.data.length > 0) {
        setImages(response.data);
        setLoading(false);
        setError('');
        break;
      } else {
        setTimeout(() => setError('Something is unusual!'), 100);
      }
    }
  }, []);
  return (
    <div className='App'>
      <h1>IMAGE GALLERY</h1>
      {loading ? (
        <>
          <Loader />
          <span style={{ fontSize: '18px', color: 'red' }}>{error}</span>
        </>
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
