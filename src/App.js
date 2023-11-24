import React, { useState, useEffect } from 'react';

const App = () => {
  const [products, setProducts] = useState([]);
  const [visibleCards, setVisibleCards] = useState(8); // Number of initially visible cards

  useEffect(() => {
    // Fetch data from the API
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const loadMore = () => {
    setVisibleCards(prevVisibleCards => prevVisibleCards + 8); // Load 6 more cards
  };

  return (
    <div className="container py-5">
    <h2 className='text-center'>All Product Avilable</h2>
      <div className="row py-5">
        {products.slice(0, visibleCards).map(product => (
          <div key={product.id} className="col-md-3 mb-3">
            <div className="card h-100 p-3">
              <img
                src={product.image}
                className="card-img-top img-fluid"
                alt={product.title}
                style={{ height: '200px'}}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleCards < products.length && ( // Show button if there are more cards to load
        <div className="text-center">
          <button className="btn btn-primary mt-3" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
