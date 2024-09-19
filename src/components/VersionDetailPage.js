import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams , Link } from 'react-router-dom';

const VersionDetailPage = () => {
  const { packageName, version } = useParams();
  const [versionData, setVersionData] = useState(null);

  useEffect(() => {
    const fetchVersionData = async () => {
      const response = await axios.get(`https://registry.npmjs.org/${packageName}/${version}`);
      setVersionData(response.data);
    };

    fetchVersionData();
  }, [packageName, version]);
  console.log(versionData)

  if (!versionData) return <div>Loading...</div>;

  return (
    <div>
      <div className="head-det">
        <div style={{width:"67rem"}}>
      <h1>{versionData.name} - {versionData.version}</h1>
      <p>{versionData?.description}</p>
      </div>
      <div>
      <Link style={{textDecoration:"none" , color:"black"}} to={`/`}>
        <p className='cont-btn'>Continue Searching</p>
        </Link>
      </div>
      </div>
      
      <div className="main-dash">
        <div className="left-details">
          <h2>Version Page of {versionData.name} - {versionData.version}</h2>
        </div>
        <div className="right-details">
          <div className="install">
            <p style={{color:"#7c7b7b" , fontWeight:"500"}}>Install</p>
            <div style={{display:"flex"}}>
            <p className='install-det'>&#11166; npm i {versionData?.name}</p>
            <p className='btn-copytext' onClick={() => {
              const textToCopy = `npm i ${versionData?.name}`
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
            <p className='repo-det'>{versionData?.repository?.url.substring(4)}</p>
            <hr />
          </div>
          
          <div className="install">
            <p style={{color:"#7c7b7b" , fontWeight:"500"}}>Homepage</p>
            <p className='repo-det'>{versionData?.homepage}</p>
            <hr />
          </div>
          
          <div className="install">
            <p style={{color:"#7c7b7b" , fontWeight:"500"}}>Author</p>
            <p className='repo-det'>{versionData?.author?.name}</p>
            <hr />
          </div>

          <div className='dash-flex'>
            <div className="install">
            <p style={{color:"#7c7b7b" , fontWeight:"500"}}>License</p>
            <p className='repo-det'>{versionData?.license}</p>
            
          </div>
            <div className="install">
            <p style={{color:"#7c7b7b" , fontWeight:"500"}}>Deprecated</p>
            <p className='repo-det'>{versionData?.deprecated}</p>
            
          </div>
          
          </div>
          

        </div>
      </div>


    </div>
  );
};

export default VersionDetailPage;
