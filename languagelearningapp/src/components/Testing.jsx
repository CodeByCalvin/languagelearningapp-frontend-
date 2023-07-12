import React, { useEffect, useState } from "react";
import IOSSwitch from "./iosswitch";
import ReviewTimer from "./ReviewTimer";

export default function Testing(props) {
  const { setPage } = props;
  
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);


  useEffect(() => {
    console.log("checked: ", checked1, checked2, checked3);
  }, [checked1, checked2, checked3]);


  return (
    <div>
      <h1>Testing</h1>
      <br />
      <br />
      <div className="d-flex flex-column justify-content-center align-items-center gap-4">
        <div className="d-flex">
          <h2 className="m-4">Switch 1</h2>
          <IOSSwitch 
            checked={checked1}
            setChecked={setChecked1}    
          />
        </div>
        <div className="d-flex">
          <h2 className="m-4">Switch 2</h2>
          <IOSSwitch 
            checked={checked2}  
            setChecked={setChecked2}  
          />
        </div>
        <div className="d-flex">
          <h2 className="m-4">Switch 3</h2>
          <IOSSwitch 
            checked={checked3}  
            setChecked={setChecked3}  
          />
        </div>
        <div>
          <ReviewTimer />
        </div>
      </div>
    </div>
  );
}
