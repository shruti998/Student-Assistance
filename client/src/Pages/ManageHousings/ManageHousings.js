/**
 * Title : ManageHousing.js
 * Description : Class to handle CRUD operations on Housings
 * @author : Shruti Srivastava
 */
 import React, { useEffect, useState } from 'react';
 import './ManageHousings.scss';
 import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
 import { faTrash} from '@fortawesome/free-solid-svg-icons'
 import '../Events/Events.scss';

 export const ManageHousings = () => {
 
     var [showDeleteDiv, setDeleteDiv] = useState(false);
     var [showCreateDiv, setCreateDiv] = useState(false);
 
     var [houseName, setHouseName] = useState();
     var [houseAddress, setHouseAddress] = useState();
     var [price, setPrice] = useState();
     const [name, setEvent] = useState([]);
     const[zip, setZip]=useState("")
     const[gender, setGender]=useState("")
     const[type, setType]=useState([])
     const [room, setRoom] = useState(undefined);
     const [member, setMember] = useState(undefined);
     const [bath, setBath] = useState(undefined);
   
     const[State, setState]=useState("")
     const[country, setCountry]=useState("")
     const[city, setCity]=useState("")
     const[email,setEmail]=useState("")
     const[availability,setAvailable]=useState("")
     const[utilityIncluded,setUtility]=useState("")
 
   
 // setting the sate of the variable
     const nameUpdate = (event) => {
         setHouseName(event.target.value)
     }
     const houseAddressUpdate = (event) => {
         setHouseAddress(event.target.value)
     }
  
   
     const priceUpdate = (event) => {
         setPrice(event.target.value)
     }
 
     const deleteDivUpdate = (event) => {
         setDeleteDiv(true)
         setCreateDiv(false)
     }
 
     const createDivUpdate = (event) => {
         setCreateDiv(true)
         setDeleteDiv(false)
     }

    
 //fetching the initial housing data
     useEffect(() => {
         UserData()
     }, [])
 
     const handleSubmit = () => { // Once the form has been submitted, this function will post to the backend
         const postURL = "http://localhost:3000/housings" //Our previously set up route in the backend
         fetch(postURL, {
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ // We should keep the fields consistent for managing this data later
                 houseName: houseName,
                 houseAddress: houseAddress,
                 price: price,
                 country:country,
                 State:State,
                 zip:zip,
                 email:email,
                 member:member,
                 bath:bath,
                 room:room,
                 accomodationType:type,
                 availability:availability,
                 utilityIncluded:utilityIncluded
             })
            
         })
             .then(() => {
                 // Once posted, the user will be notified 
                 alert('You have been added to the system!');
             })
          
     }
 
     const UserData = async () => {
         console.log("inside UserData")
         const response = await fetch('http://localhost:3000/housings', {
             method: 'GET',
             headers: {
                 "Content-Type": "application/json"
             },
         });
 
         setEvent(await response.json())
     }
 //handling the delete
      const handleDelete = (event) => { // Once the form has been submitted, this function will post to the backend
         console.log("delete function")
         console.log(event.nativeEvent.path[2].id)
         const id=event.nativeEvent.path[2].id;
          const deleteUrl = "http://localhost:3000/housings/" //Our previously set up route in the backend
         fetch(deleteUrl + id, {
            method: 'DELETE'
          })
          .then(response => {
                 console.log(response)
                 UserData()
             })
              .catch(error => {
                  alert(error)
             })
             console.log("end")
                 
     }
     return (
 
         <div className="parent-container">
             <div className="deleteContainer">
                 <div className="header">
                     <h1 className="events-title">ManageHousings</h1>
                     <div className="landing-image-container">
                         <img src='./images/house.jpeg' alt="Upcoming Events">
                         </img>
                     </div>
                     <div>
                         <button id="create-button" onClick={createDivUpdate} className="button button5">
                             Create Housing 
                         </button>
                     </div>
 
                     <div>
                         <button id="delete-button" onClick={deleteDivUpdate} className="button button5">
                             Delete Housings
                         </button>
                         <p>{showDeleteDiv}</p>
                     </div>
                 </div>
 
                 {showCreateDiv ? <div className="eventOperationsContainer">
                     <form class="form-style-7" onSubmit={handleSubmit}>
                         <ul>
                             <li>
                                 <label for="houseName">House Name</label>
                                 <input type="text" required onChange={nameUpdate} maxlength="100" />
                                 <span>Enter house name here</span>
                               
                             </li>
 
                             <li>
                                 <label for="houseAddress">House Address</label>
                                 <input type="text" onChange={houseAddressUpdate} maxlength="100" />
                                 <span>Enter house addresss here</span>
                             
                             </li>  
 
                             <li>
                                 <label for="price">Rent</label>
                                 <input type="text"  onChange={priceUpdate} maxlength="100" />
                                 <span>Enter rent here</span>
                               
                             </li>
                             <li>
                                 <label for="price">Utility Included</label>
                                 <input type="text"  onChange={(e) => setUtility(e.target.value)}   maxlength="100" />
                                 <span>Enter utility includede here</span>
                               
                             </li>
                             <li>
                                 <label for="price">Availability</label>
                                 <input type="date"  onChange={(e) => setAvailable(e.target.value)}  maxlength="100" />
                                 <span>Enter availability here</span>
                               
                             </li>
                             <li>
                                 <label for="houseAddress">Country</label>
                                 <input type="text"  onChange={(e) => setCountry(e.target.value)} maxlength="100" />
                                 <span>Enter country here</span>
                             
                             </li>  
                             <li>
                                 <label for="houseAddress">State</label>
                                 <input type="text"  onChange={(e) => setState(e.target.value)} maxlength="100" />
                                 <span>Enter state here</span>
                                
                             </li>  
                             <li>
                                 <label for="houseAddress">City</label>
                                 <input type="text"  onChange={(e) => setCity(e.target.value)} maxlength="100" />
                                 <span>Enter city here</span>
                               
                             </li> 
                             <li>
                                 <label for="houseAddress">Zip</label>
                                 <input type="text"  onChange={(e) => setZip(e.target.value)} maxlength="100" />
                                 <span>Enter zip here</span>
                             
                             </li>   
                             <li>
                                 <label for="houseAddress">Type</label>
                                 <input type="text"  onChange={(e) => setType(e.target.value)} maxlength="100" />
                                 <span>Enter accomodation type here</span>
                             </li>  
                           
                               
                             <li>
                                 <label for="houseAddress">Room</label>
                                 <input type="number"  onChange={(e) => setRoom(e.target.value)} maxlength="100" />
                                 <span>Enter number of room here</span>
                               
                             </li>  
                             <li>
                                 <label for="houseAddress">Member</label>
                                 <input type="number"  onChange={(e) => setMember(e.target.value)} maxlength="100" />
                                 <span>Enter number of member here</span>
                                
                             </li>  
                             <li>
                                 <label for="houseAddress">Bath</label>
                                 <input type="number" onChange={(e) => setBath(e.target.value)} maxlength="100" />
                                 <span>Enter number of bath here</span>
                            
                             </li>  
                             <li>
                                 <label for="houseAddress">Contact</label>
                                 <input type="text" onChange={(e) => setEmail(e.target.value)} maxlength="100" />
                                 <span>Enter contact email here</span>
                            
                             </li> 
 
 
                         </ul>
                         <button type="submit"> Submit</button>
                     </form>
                 </div> : null}
 
                 {showDeleteDiv ? <div className="event-container">
                     <div className="delete-event-list-result">
                         {name.map((data) => {
                             return (
                                // <DeleteHousingItem  title={data.houseName}  name={data.houseName} address={data.houseAddress}
                                 //   price={data.price} />
                                 <div className='searchedItem'>
                                 <img src='./images/house.jpeg'
                                 
                                 className='searchedImage'/>
                         
                             
                              <div className='searchedDescription'>
                                 <h1 className='title'>
                                 {data.houseName}
                                 </h1>
                                 <span className='searchedAddress'><b>Address:&nbsp;</b>{data.houseAddress}</span>
                                 <span className='features'><b>Utility Included:&nbsp;</b>{data.utilityIncluded}</span>
                                 <span className='availability'><b><span>Availability: &nbsp; </span></b>{data.availability}</span>
                                 <span className='availability'><b>Conatct:&nbsp;</b>{data.email}</span>
                                 <span className='availability'><b>Type:&nbsp;</b>{data.accomodationType}</span>
                              
                         
                              </div>
                              <div className='searchedDetails'>
                           
                              <button className='hType'>{data.type}</button>
                                     <button id={data.id} value={data.id} className='like'  onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
                              
                                 <div className='searchedDetailsText'>
                                     <span className='searchedPrice'>${data.price}</span>
                                    
                                 </div>
                              </div>
                               </div>
                              
                             )
                         })}
                     </div>
                 </div> : null}
             </div>
         </div>
 
     )
 }
 
 export default ManageHousings;