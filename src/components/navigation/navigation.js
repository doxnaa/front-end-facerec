import React from "react";

const Navigation = ({onroutechange, issignedin}) => {
    if (issignedin) {
        return (
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <button onClick={() => onroutechange('signout')} className="f3 butn2 dim pa3 pointer">sign out</button>
            </nav> 
        );
    }  
};

export default Navigation;