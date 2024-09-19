import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [packages, setPackages] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${query}`);
    setPackages(response.data.objects);
  };

  return (
    <div>
      <h1>Search NPM Package</h1>
      <div className="search-head">
      <input
      className='search-head-input'
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="&#128269; Search Packages..."
      />
      <button className='search-head-btn' onClick={handleSearch}>Search</button>
      
      </div>
      <ul style={{marginLeft:"7.5rem"}}>
        
        {packages.map((pkg) => (
          <div className='search-res' key={pkg.package.name}>
            <Link style={{textDecoration:"none" , color:"black"}} to={`/package/${pkg.package.name}`}>
            <p style={{fontWeight:"bold"}}>{pkg.package.name}</p>
            <p style={{marginTop:"-0.1rem"}}>{pkg.package.description}</p>
            
            <hr style={{marginLeft:"-0.5rem"}} />
            </Link>
          </div>
          
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
