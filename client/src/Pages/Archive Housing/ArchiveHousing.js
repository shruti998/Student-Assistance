/**
 * Title : ArchiveHousing.js
 * Description : Class to view Housing Properties Archived by user.
 */

import React, { useEffect, useState } from 'react';
import '../Manage Events/DeleteEvents.scss';
import '../Manage Events/PostEvents.scss';
import '../Events/Events.scss';


export const ArchiveHousing = () => {

    const [name, setEvent] = useState([]);
    /**
     * Description : Handle Event Data changes and render the component again
     */
    useEffect(() => {
        UserData()
    }, [])


    /**
     * Description : Handle Event Fetch Data
     */
    const UserData = async () => {
        const response = await fetch('http://localhost:3000/saveHousing', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });
        setEvent(await response.json())
    }

    //HTML Render
    return (
        <div className="parent-container">
            <div className="deleteContainer">
                <div className="archive-header ">
                    <h1 className="events-title">Saved Housing Results</h1>
                    <div className="landing-archive-housing-container">
                        <img src='./images/bookmark.png' alt="Upcoming Events">
                        </img>
                    </div>
                </div>
                <div className="event-container">
                    <div className="delete-event-list-result">
                        {name.map((data) => {
                            return (
                                <div className='searchedItem'>
                                    <img src='./images/home.gif'
                                        className='searchedImage' />
                                    <div className='searchedDescription'>
                                        <h1 className='title-housing'>
                                            {data.houseName}
                                        </h1>
                                        <span className='searchedAddress'><b>Address:&nbsp;</b>{data.houseAddress}</span>
                                        <span className='features'><b>Utility Included:&nbsp;</b>{data.utilityIncluded}</span>
                                        <span className='availability'><b><span>Availability: &nbsp; </span></b>{data.availability}</span>
                                        <span className='availability'><b>Conatct:&nbsp;</b>{data.email}</span>
                                        <span className='availability'><b>Number of Rooms :</b>{data.room}</span>
                                        <span className='availability'><b>Number of People :</b>{data.member}</span>
                                        <span className='availability'><b>Area Zip Code : </b>{data.zip}</span>
                                    </div>
                                    <div className='searchedDetails'>
                                       <div> </div>
                                        <div className='searchedDetailsText'>
                                            <span className='searchedPrice'>${data.price}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArchiveHousing;