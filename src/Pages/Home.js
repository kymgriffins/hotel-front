import React,{useEffect, useState} from 'react'
import axios from 'axios'
import baseUrl from '../Constants/Constants'

const Home = () => {
    const [home, setHome] = useState('')
    useEffect(() => {
        axios.get(baseUrl).then((response) => {
          setHome(response.data);
        });
      }, []);
      console.log("home", home)
  return (
    <div>
         <h1>{home}</h1>
    </div>
  )
}

export default Home