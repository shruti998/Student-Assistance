/**
 * Title : ArchiveEvents.js
 * Description : Class to view Events Archived by user.
 * @author : Romil Tiwari
 */

import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import './../Manage Events/DeleteEvents.scss';
import './../Manage Events/PostEvents.scss';
import '../Events/Events.scss';
import './ArchiveEvents.scss';

export const ArchiveEvents = () => {

    //Variable Declaration
    const [name, setEvent] = useState([]);

    /**
    * Description : Handle Event Data changes and render the component again
    */
    useEffect(() => {
        UserData()
    }, [])

    /**
     * Description : Handle Archive Event Fetch Data
     */
    const UserData = async () => {
        const response = await fetch('http://localhost:3000/savedEventList', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });
        setEvent(await response.json())
    }

    //Render HTML
    return (
        <div className="parent-container">
            <div className="deleteContainer">
                <div className="saved-header">
                    <h1 className="events-title">Saved Events</h1>
                    <div className="savedevent-image-container">
                        <img src="./images/save-file.png" alt="Manage Events">
                        </img>
                    </div>
                </div>
                <div className="event-container">
                    <div className="delete-event-list-result">
                        {name.map((data) => {
                            return (
                                <div className='deleteItem'>
                                    <img src='./images/save.gif' className='searchedImage' />
                                    <div className='eventDescription'>
                                        <h1 className='eventTitle'>
                                            {data.eventName}
                                        </h1>
                                        <span className='event-data'>{data.description}</span>
                                        <span className='event-data'>{moment(data.eventDate.slice(0, 10)).format('DD/MM/YYYY')}</span>
                                        <span className='event-data'>{data.time}</span>
                                        <span className='event-data'>{data.eventLocation}</span>
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

export default ArchiveEvents;