import React from 'react'

const CardInfo = (props) => {
    return (
        <div>
            <img src={props.item.image} alt={props.item.name}/>
            <h1>{props.item.name}</h1>
            <p>{props.item.category}</p>
            <p>{props.item.description}</p>
            <p>{props.item.address}</p>
       
        </div>
    )
}

export default CardInfo
