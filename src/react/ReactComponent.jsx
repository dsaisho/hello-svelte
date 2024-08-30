import React, {useEffect, useState} from 'react';
import './react.css'

const MyReactComponent = ({prop1,prop2,cb}) => {
    const [loaded, setLoaded] = useState('')
    const [counter, setCounter] = useState(0)
    
    useEffect(()=>{
        console.log("use effect fired")
        setLoaded('use effect initializer fired')
    },[])

    useEffect(()=>{
        console.log('counter',counter)
        if(counter > 4)
            cb(counter)
    },[counter])

    const clicked = () => {
        console.log("clicked")
        setCounter((curval)=> curval +1)
    }

  return (
    <div className='react-component'>
        <h1>Hello from a React .jsx component!</h1>
        <div>{counter} clicks</div>
        <div onClick={clicked}><b>clickme</b></div>
        <p>*{loaded}</p>
        <p>{prop1}</p>
    </div>

)
  
};

export default MyReactComponent;