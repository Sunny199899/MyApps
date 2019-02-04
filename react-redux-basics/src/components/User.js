import React from 'react'

const User = (props) =>
{
    return (
        <div className="User">
            <h4>User Page</h4>
            <p>My name is {props.username}</p>
        </div>
    )
}

export default User;