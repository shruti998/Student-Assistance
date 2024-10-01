/**
 * Title : User.js
 * Description : Class to handle CRUD operations on User by Admin
 * @author : Romil Tiwari
 */

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './User.scss'

export const User = () => {

    //Variable Declaration
    const [name, setEvent] = useState([]);

    /**
    * Description : Handle User Data changes and render the component again
    */
    useEffect(() => {
        UserData()
    }, [])

    /**
     * Description : Handle User Fetch Data from Database
     */
    const UserData = async () => {
        const response = await fetch('http://localhost:3000/users', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });
        setEvent(await response.json())
    }

    /**
     * Description : Handle Delete of User in Database
     * @param {onClick} event 
     */
    const handleDelete = (event) => {
        const id = event.nativeEvent.path[2].id;
        console.log(id)
        const deleteUrl = "http://localhost:3000/users/"
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

    // Render HTML
    return (
        <div className="parent-container">
            <div className="deleteContainer">
                <div className="user-header">
                    <h1 className="events-title">Manage Users</h1>
                    <div className="user-image-container">
                        <img src="./images/team-management.png" alt="Manage Events">
                        </img>
                    </div>
                </div>

                {/* Displaying the User List */}
                <div className="event-container">
                    <div className="delete-event-list-result">
                        {name.map((data) => {
                            return (
                                <div className='deleteItem'>
                                    <img src='./images/face-scan.gif' className='searchedImage' />
                                    <div className='eventDescription'>
                                        <h1 className='eventTitle'>
                                            {data.fullName}
                                        </h1>
                                        <span className='event-data'>{data.userName}</span>
                                        <span className='event-data'>{data.email}</span>
                                    </div>
                                    {/* Delete User */}
                                    <div className='delete-details'>
                                        <button id={data.id} value={data.id} className='delete' onClick={handleDelete}><FontAwesomeIcon icon={faTrash} />
                                        </button>
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

export default User;