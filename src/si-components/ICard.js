import iCardImage from "./iCardImage.png"
import "./icard.css"

function ICard (props) {
    return (<>
        <button className="ic-container">
            <p>{props.name}</p>
            <img src={iCardImage}/>
            <button>Edit</button>
        </button> 
        
    </>)
}

export default ICard;