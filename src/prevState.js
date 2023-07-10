import {useRef,useEffect} from "react";


const PreState=(CurenState)=>{
    const ref=useRef();
    const preveTerm =ref.current;
    useEffect(()=>{
      ref.current=CurenState;
    },[CurenState])
    return preveTerm;
}


export default PreState;