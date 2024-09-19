import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PackageDetailPage = () => {
  const { packageName } = useParams();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      const response = await axios.get(`https://registry.npmjs.org/${packageName}`);
      setPackageData(response.data);
      console.log(packageData)
    };

    fetchPackageData();
  }, [packageName]);

  

  

  if (!packageData) return <div>Loading...</div>;
  console.log(packageData)

  return (
    <div>
      <div className="head-det">
        <div style={{width:"67rem"}}>
      <h1>{packageData?.name}</h1>
      <p>{packageData?.description}</p>
      </div>
     
      
     
      </div>
     
      <div className="main-dash">
        <div className="left-details">
          <h2>Versions:</h2>
    <div className="list-version">
        {Object.keys(packageData?.versions)?.map((version) => (
          <Link style={{textDecoration:"none" , color:"black"}} to={`/package/${packageName}/${version}`}>
          <p key={version}>
            {version}
          </p>
          </Link>
        ))}
      
      </div>
        </div>
        <div className="right-details">
          <div className="install">
            <p style={{color:"#7c7b7b" , fontWeight:"500"}}>Install</p>
            <div style={{display:"flex"}}>
            <p className='install-det'>&#11166; npm i {packageData?.name}</p>
            <p className='btn-copytext' onClick={() => {
              const textToCopy = `npm i ${packageData?.name}`
                navigator.clipboard.writeText(textToCopy)
                  .then(() => {
                    alert('Text copied to clipboard!');
                  })
                  .catch((err) => {
                    alert('Failed to copy text');
                    // console.error('Error copying text: ', err);
                  });
             
            }}>Copy Text </p>
            </div>
            
          </div>
          

          <div className="install">
            <p style={{color:"#7c7b7b" , fontWeight:"500"}}>Repository</p>
            <p className='repo-det'>{packageData?.repository?.url.substring(4)}</p>
            <hr />
          </div>
          
          <div className="install">
            <p style={{color:"#7c7b7b" , fontWeight:"500"}}>Homepage</p>
            <p className='repo-det'>{packageData?.homepage}</p>
            <hr />
          </div>
          
          <div className="install">
            <p style={{color:"#7c7b7b" , fontWeight:"500"}}>Author</p>
            <p className='repo-det'>{packageData?.author?.name}</p>
            <hr />
          </div>

          <div className='dash-flex'>
            <div className="install">
            <p style={{color:"#7c7b7b" , fontWeight:"500"}}>License</p>
            <p className='repo-det'>{packageData?.license}</p>
            
          </div>
            <div className="install">
            <p style={{color:"#7c7b7b" , fontWeight:"500"}}>Latest Version</p>
            <p className='repo-det'>{packageData['dist-tags']?.latest}</p>
            
          </div>
          
          </div>
          

        </div>
      </div>

    </div>
  );
};

export default PackageDetailPage;
