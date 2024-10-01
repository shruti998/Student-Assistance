import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUsername } from "../../../Store/Actions/rommateAction";
import './RoommateEdit.scss';

export const RoommateEdit = (props) => {
  const navigate = useNavigate();
  var [editData, setEditData] = useState(props.data ? props.data : {});
  var username = useSelector(state => state.Roommate.username);
  // setEditData(Object.assign({}, editData, {username: username}));

  var fullNameUpdate = (event) => {
    setEditData(Object.assign({}, editData, { name: event.target.value }));
  }

  var ageUpdate = (event) => {
    setEditData(Object.assign({}, editData, { age: event.target.value }));
  }

  var likesUpdate = (event) => {
    const likes = event.target.value.split(',').map(like => like.trim()).filter(like => like !== "");
    setEditData(Object.assign({}, editData, { likes: likes }));
  }

  var dislikesUpdate = (event) => {
    const dislikes = event.target.value.split(',').map(dislike => dislike.trim()).filter(dislike => dislike !== "");
    setEditData(Object.assign({}, editData, { dislikes: dislikes }));
  }

  var numberFlatmatesUpdate = (event) => {
    const livingPreferences = Object.assign({}, editData.livingPreferences, { numberOfPeople: event.target.value });
    setEditData(Object.assign({}, editData, { livingPreferences: livingPreferences }));
  }

  var eatingPreferencesUpdate = (event) => {
    const livingPreferences = Object.assign({}, editData.livingPreferences, { eatingPreferences: event.target.value });
    setEditData(Object.assign({}, editData, { livingPreferences: livingPreferences }));
  }

  var smokingUpdate = (event) => {
    const livingPreferences = Object.assign({}, editData.livingPreferences, { smoking: event.target.value === "Yes" });
    setEditData(Object.assign({}, editData, { livingPreferences: livingPreferences }));
  }

  var drinkingUpdate = (event) => {
    const livingPreferences = Object.assign({}, editData.livingPreferences, { drinking: event.target.value === "Yes" });
    setEditData(Object.assign({}, editData, { livingPreferences: livingPreferences }));
  }

  var imageUploadChange = (event) => {
    const img = document.getElementById('profile-picture');
    const file = event.target.files[0];
    if (file == undefined) return;

    // Create a new FileReader object
    const reader = new FileReader();

    // Add an event listener to the FileReader's `onload` event
    reader.addEventListener('load', () => {
      // Get the selected image's URL
      const src = reader.result;

      setEditData(Object.assign({}, editData, { picture: src }));

      // Set the `src` attribute of the `img` element to the selected image's URL
      img.setAttribute('src', src);
    });

    // Start reading the selected image file
    reader.readAsDataURL(file);
  }

  var handleSubmit = (event) => {
    const body = editData._id ? Object.assign({}, editData, { username: username }) : [Object.assign({}, editData, { username: username })];
    const endpoint = editData._id ? 'http://localhost:3000/roommate/id/' + editData._id : 'http://localhost:3000/roommate';
    const method = editData._id ? 'PUT' : 'POST';
    fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        window.location.reload();
      })
      .catch(error => console.error(error));
  }

  return (
    <form className="roommate-edit-form" onSubmit={handleSubmit}>
      <div className="roommate-edit-form-item">
        <div id="profile-picture-container">
          <img id="profile-picture" src="https://via.placeholder.com/150" alt="Profile picture" />
          <input type="file" accept="image/*" onChange={imageUploadChange} />
        </div>
      </div>
      <div></div>
      <div className="roommate-edit-form-item">
        <label className="label-roomate-edit">Full Name</label>
        <input
          type="text"
          required
          onChange={fullNameUpdate}
        />
        <span className="span-roomate-edit">Enter full name here</span>
      </div>
      <div className="roommate-edit-form-item">
        <label className="label-roomate-edit">Age</label>
        <input
          type="number"
          required
          onChange={ageUpdate}
        />
        <span className="span-roomate-edit">Enter age here</span>
      </div>
      <div className="roommate-edit-form-item">
        <label className="label-roomate-edit">Likes</label>
        <input
          type="text"
          required
          onChange={likesUpdate}
        />
        <span className="span-roomate-edit">Enter comma separated list of likes here</span>
      </div>
      <div className="roommate-edit-form-item">
        <label className="label-roomate-edit">Dislikes</label>
        <input
          type="text"
          required
          onChange={dislikesUpdate}
        />
        <span className="span-roomate-edit">Enter comma separated list of dislikes here</span>
      </div>
      <div className="roommate-edit-form-item-2">
        <label className="label-roomate-edit"> Living Preferences</label>
        <div className="roommate-edit-form">
          <div className="roommate-edit-form-item">
            <label className="label-roomate-edit">Number of Flatmates</label>
            <input
              type="number"
              required
              onChange={numberFlatmatesUpdate}
            />
            <span className="span-roomate-edit">Enter preference for number of flatmates here</span>
          </div>

          <div className="roommate-edit-form-item">
            <label className="label-roomate-edit">Eating Preferences</label>
            <input
              type="text"
              required
              onChange={eatingPreferencesUpdate}
            />
            <span className="span-roomate-edit">Enter eating preferences here (comma separated)</span>
          </div>

          <div className="roommate-edit-form-item">
            <label className="label-roomate-edit">Do you smoke?</label>
            <select required onChange={smokingUpdate} defaultValue={""}>
              <option value="" disabled>Select a choice</option>
              <option>Yes</option>
              <option>No</option>
            </select>
            <span className="span-roomate-edit">Enter your smoking preference here</span>
          </div>

          <div className="roommate-edit-form-item">
            <label className="label-roomate-edit">Do you drink?</label>
            <select required onChange={drinkingUpdate} defaultValue={""}>
              <option value="" disabled>Select a choice</option>
              <option>Yes</option>
              <option>No</option>
            </select>
            <span className="span-roomate-edit">Enter your drinking preference here</span>
          </div>
        </div>
      </div>
      <div className="roommate-edit-form-item-2">
        <input type="submit" value={"Submit"} />
      </div>
    </form>
  );
}