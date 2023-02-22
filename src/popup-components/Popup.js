import React from 'react';
import "./popup.css";

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
            <button className='popup-cancel' 
              onClick={() => props.setTrigger(false)}>Cancel</button>
            {props.children}
        </div>
    </div>    
  ) : "";
}

export default Popup