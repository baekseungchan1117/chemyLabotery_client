import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function MovePage(props) {
  const [data, setData] = useState([]);
  // const [getData, setGetData] = useState(false);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(res => {
        setData(res.loading); 
      })
      .catch(error => console.error('Error:', error));
  }, []);


  return (
    <>
    { data.length === 3 && <div className='mainview' style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}> 
    <div >
      <h1 className='title'> {data[props.index].title} </h1>
      <p className='subtitle' > {data[props.index].exp} </p>
      </div>
      <Link to={props.link}><img alt="image" src={data[props.index].src} style={{
        // top: '400px',
        width: 'auto',
        height: '300px',
        marginTop: '-30px'
      }}/></Link>

   </div> }
   </>
    
  );

}

export default MovePage;
