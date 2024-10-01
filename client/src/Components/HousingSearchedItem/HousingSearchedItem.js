/**
 * Title : HousingSearchedItem.js
 * Description : Class to display Housing Searched cards  option 
 * @author : Shruti Srivastava
 */
import './HousingSearchedItem.scss';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSave } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../Components/Footer/Footer.js';


export default function HousingSearchedItem(props) {

    const [clicked, setClicked] = useState(false)
    const handleLike = (event) => {
        setClicked(true)
        console.log(clicked)
        const id = event.nativeEvent.path[2];
        const postURL = "http://localhost:3000/saveHousing" 
        fetch(postURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                houseName: props.houseName,
                utilityIncluded: props.houseAddress,
                availability: props.availability,
                email: props.email,
                room: props.room,
                member: props.member,
                zip : props.zip,
                price : props.price
            })
        })
            .then(() => {
                alert('Event has been archived');
            })
    }

    
    return (
        <>
            <div className='searchedItem'>
                <img src='./images/list.png'
                    className='searchedImage' />
                <div className='searchedDescription'>
                    <h1 className='title-housing'>
                        {props.houseName}
                    </h1>
                    <span className='searchedAddress'><b>Address: </b>{props.houseAddress}</span>
                    <span className='features'><b>Utility Included: </b>{props.utilityIncluded}</span>
                    <span className='availability'><b>Availability: </b>{props.availability}</span>
                    <span className='availability'><b>Contact:</b>{props.email}</span>
                    <span className='availability'><b>Number of Rooms :</b>{props.room}</span>
                    <span className='availability'><b>Number of People :</b>{props.member}</span>
                    <span className='availability'><b>Area Zip Code : </b>{props.zip}</span>
                </div>

                <div className='searchedDetails'>

                    <button className='hType'>{props.accomodationType}</button>
                    <button id="like" className='like' onClick={handleLike}><FontAwesomeIcon icon={faHeart} /></button>

                    <div className='searchedDetailsText'>
                        <span className='searchedPrice'>${props.price}</span>

                    </div>
                </div>

            </div>

        </>
    )
}
