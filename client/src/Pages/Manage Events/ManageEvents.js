/**
 * Title : ManageEvents.js
 * Description : Class to handle CRUD operations on Events
 * @author : Romil Tiwari
 */

import React, { useEffect, useState } from 'react';
import './DeleteEvents.scss';
import './PostEvents.scss';
import '../Events/Events.scss';
import * as moment from 'moment';
import Footer from '../../Components/Footer/Footer.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

/**
 * Description : Class to handle CRUD operations on Events
 * @returns ManageEvents
 */
export const ManageEvents = () => {

    //Variable Declaration
    const [name, setEvent] = useState([]);
    var [showDeleteDiv, setDeleteDiv] = useState(false);
    var [showCreateDiv, setCreateDiv] = useState(false);
    var [eventName, setName] = useState();
    var [description, setDescription] = useState();
    var [eventDate, setDate] = useState();
    var [time, setTime] = useState();
    var [eventLocation, setLocation] = useState();

    const nameUpdate = (event) => {
        setName(event.target.value)
    }
    const descriptionUpdate = (event) => {
        setDescription(event.target.value)
    }
    const dateUpdate = (event) => {
        setDate(event.target.value)
    }
    const timeUpdate = (event) => {
        setTime(event.target.value)
    }
    const locationUpdate = (event) => {
        setLocation(event.target.value)
    }

    const deleteDivUpdate = (event) => {
        setDeleteDiv(true)
        setCreateDiv(false)
    }

    const createDivUpdate = (event) => {
        setCreateDiv(true)
        setDeleteDiv(false)
    }

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
        const response = await fetch('http://localhost:3000/eventList', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });
        setEvent(await response.json())
    }


    /**
     * Description: Handle Submit action adn save events to Database
     */
    const handleSubmit = () => { 
        const postURL = "http://localhost:3000/eventList" 
        fetch(postURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                eventName: eventName,
                description: description,
                eventDate: eventDate,
                time: time,
                eventLocation: eventLocation
            })
        })
            .then(() => {
                alert('Event has been added to the system');
            })
    }


    /**
     * Description : Handle Delete of event
     * @param {*} event 
     */
    const handleDelete = (event) => {
        const id = event.nativeEvent.path[2].id;
        console.log(id)
        const deleteUrl = "http://localhost:3000/eventList/"
        fetch(deleteUrl + id, {
            method: 'DELETE'
        })
            .then(response => {
                //Fetch-Data Again
                UserData()
                alert('Event has been deleted from the system');
            })
            .catch(error => {
                alert(error)
            })
    }

    // HTML Render
    return (
        <div className="parent-container">
            <div className="deleteContainer">
                <div className="header">
                    <h1 className="events-title">Manage Events</h1>
                    <div className="event-image-container">
                        <img src="./images/daily-tasks.png" alt="Manage Events">
                        </img>
                    </div>
                    <div>
                        <button id="create-button" onClick={createDivUpdate} className="button button5">
                            Create Events
                        </button>
                    </div>

                    <div>
                        <button id="delete-button" onClick={deleteDivUpdate} className="button button5">
                            Delete Events
                        </button>
                        <p>{showDeleteDiv}</p>
                    </div>
                </div>
                {/* Displaying the Create Event Form */}
                {showCreateDiv ? <div className="eventOperationsContainer">
                    <form class="form-style-7" onSubmit={handleSubmit}>
                        <ul>
                            <li>
                                <label for="eventName">Event Name</label>
                                <input type="text" required onChange={nameUpdate} maxlength="100" />
                                <span>Enter event name here</span>
                            </li>

                            <li>
                                <label for="description">Event Description</label>
                                <textarea required onChange={descriptionUpdate} maxlength="100" />
                                <span>Enter event description here</span>
                            </li>

                            <li>
                                <label for="eventDate">Event Date</label>
                                <input type="date" required onChange={dateUpdate} maxlength="100" />
                                <span>Enter event date here</span>
                            </li>

                            <li>
                                <label for="time">Event Time</label>
                                <input type="time" required onChange={timeUpdate} maxlength="100" />
                                <span>Enter event time here</span>
                            </li>

                            <li>
                                <label for="eventLocation">Event Location</label>
                                <input type="text" required onChange={locationUpdate} maxlength="100" />
                                <span>Enter event location here</span>
                            </li>

                        </ul>
                        <button type="submit"> Submit</button>
                    </form>
                </div> : null}
                {/* Displaying the Event List */}
                {showDeleteDiv ? <div className="event-container">
                    <div className="delete-event-list-result">
                        {name.map((data) => {
                            return (
                                <div className='deleteItem'>
                                    <img src='./images/event-vector.png' className='searchedImage' />
                                    <div className='eventDescription'>
                                        <h1 className='eventTitle'>
                                            {data.eventName}
                                        </h1>
                                        <span className='event-data'>{data.description}</span>
                                        <span className='event-data'>{moment(data.eventDate.slice(0, 10)).format('DD/MM/YYYY')}</span>
                                        <span className='event-data'>{data.time}</span>
                                        <span className='event-data'>{data.eventLocation}</span>
                                    </div>
                                    {/* Delete Event */}
                                    <div className='delete-details'>
                                        <button id={data.id} value={data.id} className='delete' onClick={handleDelete}><FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div> : null}
            </div>
            <Footer/>
        </div>
    )
}

export default ManageEvents;