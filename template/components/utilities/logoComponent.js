import React from 'react';

class RepMeLogo extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 64 56" 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        xmlSpace="preserve" 
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          strokeLinejoin: 'round',
          strokeMiterlimit: '1.41421',
        }}>
        <g transform="matrix(0.5,0,0,0.5,0,0)">
          <g transform="matrix(1,0,0,1,-0.920354,0.778761)">
            <path 
              d="M104.071,18.832L104.354,25.133L59.186,97.628L59.965,83.752L104.071,18.832Z" 
              style={{fill:'rgb(211,52,61)'}}
            />
            <path 
              d="M49.172,80.425L48.425,80.425C31.74,80.425 18.195,66.879 18.195,50.195C18.195,33.51 31.74,19.965 48.425,19.965L81.416,19.965C84.995,20.106 87.929,20.851 90.096,21.495L62.23,52.956L54.088,40.85L34.053,40.142L58.103,80.425L58.085,80.425L60.035,83.681L59.398,97.628L49.172,80.425ZM81.416,80.425L77.182,80.425L104.518,30.705C108.964,35.969 111.646,42.771 111.646,50.195C111.646,66.879 98.1,80.425 81.416,80.425Z" 
              style={{fill:'rgb(6,87,145)'}} 
            />
          </g>
        </g>
      </svg>
    )
  }
}

export default RepMeLogo;