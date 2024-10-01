/**
 * Title : Events.js
 * Description : Class to display Upcoming Events
 * @author : Romil Tiwari
 */

import React, { useEffect, useState } from 'react';
import './Events.scss';
import EventItemList from '../../Components/EventItem/EventItemList.js';


function Events() {
    const [name, setEvent] = useState([]);


    /**
     * Description : React 'useEffect' to render changes everytime.
     */
    useEffect(() => {
        names()
    }, [])


    /**
     * Description : Function to fetch events from Database.
     */
    const names = async () => {
        const response = await fetch('http://localhost:3000/eventList', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });
        setEvent(await response.json())
    }

    /**
     * Render the HTML component on screen
     */
    return (
        <div className="parent-container">
            <div className="eventContainer">
                <div className="main-events-header">
                    <h1 className="eventsTitle">Upcoming Events</h1>
                    <div className="landing-image-container-main">
                        <img src="./images/event-1.png" alt="Upcoming Events">
                        </img>
                    </div>
                    <div className='heading-top'>
                        <a href= "/ArchiveEvents">
                        <label>
                                   View Your Saved events
                                </label>
                                <button id="signup-button" className="button1 button6">
                                    Archive
                                </button>
                                </a>
                                </div>
                </div>
                {/* Populate Event Card */}
                <div className="event-list-result">
                    {name.map((data) => {
                        return (
                            <EventItemList eventName={data.eventName} description={data.description}
                                eventDate={data.eventDate} time={data.time} eventLocation={data.eventLocation} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
export default Events;
