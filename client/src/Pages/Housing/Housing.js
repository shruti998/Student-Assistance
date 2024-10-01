/**
 * Title : Housing.js
 * Description : Class to display Housing option 
 * @author : Shruti Srivastava
 */
import './Housing.scss'
import { addMany } from '../../Store/Actions/housingAction.js'
import HousingSearchedItem from '../../Components/HousingSearchedItem/HousingSearchedItem.js'

import React, { useEffect, useState } from 'react';


function Housing() {

  const [userData, setUserData] = useState([]);
  const [houseAddress, setHouseAddress] = useState("");
  const [showSaved, setShowSaved] = useState(false)
  const [showHousing, setShowHousing] = useState(true)
  const [newData, setNewData] = useState([])
  const [savedData, setSavedData] = useState([])
  const [minVal, setMin] = useState(undefined);
  const [maxVal, setMax] = useState(undefined);
  const [State, setState] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")

  const [type, setType] = useState([])
  const [room, setRoom] = useState(undefined);
  const [member, setMember] = useState(undefined);
  const [bath, setBath] = useState(undefined);
  const [post, setPost] = useState({})

  //Fetching the initial data from the database
  useEffect(() => {
    userDatas()
    allsavedHousing()

  }, [])

 //Setting the type of accomodation
  const getType = (e) => {
    const { value, checked } = e.target;
    console.log("type", value)
    if (checked) {
      setType(value)
    }
    else {
      setType(value)
    }
  }
  //Fetching all the housing data 
  const userDatas = async () => {
    const response = await fetch('http://localhost:3000/housings', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    });

    setUserData(await response.json())
    setNewData(await response.json());
  }
  //saved data
  const houseDataFetch = async (id) => {
    var url = "http://localhost:3000/housings/"
    const response = await fetch(url + id, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    });
    setPost(response.json())
    console.log("post ", post)

  }
  const allsavedHousing = async () => {
    var userid = "63900057e51f6090844ad9aa"
    var url = "http://localhost:3000/saved/"


    var savedUrl = url + userid

    const response = await fetch(savedUrl)
    const result = response.json().then((res) => {
      console.log("res    " + res)
      setSavedData(res)
    }

    )
    //console.log("result", result)

    // setSavedData(await result.json)
    console.log("saved data   hello", savedData)

  }
  //filter
  const handleSearch = () => {

    const newSearchData = userData
      .filter(x => x.price > (minVal == undefined ? 0 : minVal) && x.price < (maxVal == undefined ? 2000 : maxVal))
      .filter(y => y.country == (country == "" ? y.country : country))
      .filter(y => y.State == (State == "" ? y.State : State))
      .filter(y => y.zip == (zip == "" ? y.zip : zip))
      .filter(y => y.accomodationType == (type == "" ? y.accomodationType : type))
      .filter(x => x.room > (room == undefined ? 0 : room))

 
    setUserData(newSearchData);
    setNewData(newSearchData);
  }


  const handleReset = () => {
    setBath(undefined);
    setCity("");
    setCountry("");
 
    setMax(undefined)
    setMember(undefined)
    setRoom(undefined)
    setState("")

    setZip("")
    setType([])
    const c = document.getElementById("country")
  }

// Save
  const handleSave = () => {
    console.log("in the saved function ")
    setShowSaved(true)
    setShowHousing(false);
    const btn = document.getElementById("savedbtn")
    btn.addEventListener("dblclick", (event) => {
      console.log("in the dblclick ")
      setShowSaved(false)
      setShowHousing(true);
      userDatas();
    })
  }


  return (
    <>
      <div className="parent-container">
        <div className="houseContainer">
          <div className="main-housing-header">
            <h1 className="eventsTitle">Housing</h1>
            <div className='heading-top'>
              <a href="/ArchiveHousing">
                <label>
                  View Your Saved Housing
                </label>
                <button id="signup-button" className="button1 button6">
                  Archive
                </button>
              </a>
            </div>

            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Country</label>
                <input placeholder="Enter Country" type="text" id="country" onChange={(e) => setCountry(e.target.value)} />
              </div>
              <div className="lsItem">
                <label>State</label>
                <input placeholder="Enter State" type="text" onChange={(e) => setState(e.target.value)} />
              </div>
              <div className="lsItem">
                <label>City</label>
                <input placeholder="Enter City" type="text" onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="lsItem">
                <label>Zip</label>
                <input placeholder="" type="text" onChange={(e) => setZip(e.target.value)} />
              </div>
              <div className="lsItem">

              </div>
              <div className="lsItem">
                <label>Housing Type</label>
              </div>
              <div className='lsI'>
                <div className='radiop' >
                  <label for="permanent">Permanent</label>
                  <input type="checkbox" id="permanent" value="Permanent" onChange={(e) => getType(e)} />
                </div>
                <div className='radiop' >
                  <label for="temp">Temporary</label>
                  <input type="checkbox" id="temp" value="Temporary" onChange={(e) => getType(e)} />
                </div>
              </div>
              <div className="lsItem">
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min Budget
                    </span>
                    <input type="number" className="lsOptionInput" onChange={(e) => setMin(e.target.value)} />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max Budget
                    </span>
                    <input type="number" className="lsOptionInput" onChange={(e) => setMax(e.target.value)} />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      onChange={(e) => setRoom(e.target.value)}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Bath</span>
                    <input
                      type="number"
                      min={0}
                      className="lsOptionInput"
                      onChange={(e) => setBath(e.target.value)}

                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Members</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      onChange={(e) => setMember(e.target.value)}

                    />
                  </div>


                </div>
              </div>
              <button onClick={() => handleSearch()}>Search</button>
            </div>
          </div>
          <div className="event-list-result">
                <div>
                  <ol>{userData.map((data) => {
                    return (
                      <HousingSearchedItem houseName={data.houseName} houseAddress={data.houseAddress} price={data.price} availability={data.availability} accomodationType={data.accomodationType} utilityIncluded={data.utilityIncluded}
                        email={data.email} room={data.room} member={data.member} zip={data.zip} />
                    )
                  })
                  } </ol>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default Housing;
