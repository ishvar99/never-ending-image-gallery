import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import Spinner from './components/Spinner/Spinner';
import Loader from './components/Loader/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
function App() {
  const [images, setimages] = useState([]);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(28);
  const [loading, setLoading] = useState(false);
  const fetchData = () => {};
  useEffect(async () => {
    setLoading(true);
    const response = await Axios.get(`/api/photos?start=${start}&end=${end}`);
    setimages(response.data);
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
