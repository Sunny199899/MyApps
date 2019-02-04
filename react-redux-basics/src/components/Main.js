import React from 'react'

const Main = (props) => {
    return (
        <div className="Main">
            <h4>Main Page</h4>
            <button onClick={()=>{props.changeName()}}>Click to change name</button>
        </div>
    )
}

export default Main;