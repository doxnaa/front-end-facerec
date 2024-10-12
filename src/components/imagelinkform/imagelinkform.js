import React from "react";
import './imagelinkform'

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return (
        <div>
            <div className="center">
                <p className="f3 white">
                {'this magic field will detect objects in your pictures, give it a try'}
            </p>
            </div>
            
            <div className="center">
                <div className="center pa4 br3 box3 shadow-5">
                    <input className="f4 pa2 inpt1 w-70 center" placeholder="Enter an URL please..." type="text" onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white btn1" onClick={onSubmit}>detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;