import { useEffect } from "react";
import { useState } from "react";
import './RoommateView.scss';

export const RoommateView = (props) => {
  var [profileData, setProfileData] = useState(null);
  var username = props.username;

  useEffect(() => {
    setProfileData(props.data);
  }, [props.data])
  return (
    <>
      {
        profileData ? (
          <>
            <div className="roommate-edit-form">
              <div className="roommate-edit-form-item">
                <label className="label-roommate">Profile Picture</label>
                <div id="profile-picture-container">
                  <img id="profile-picture" src={profileData.picture} alt="Profile picture" />
                </div>
              </div>
              <div></div>
              <div className="roommate-edit-form-item">
                <label className="label-roommate">Full Name</label>
                <span className="span-roomate-view">{profileData.name}</span>
              </div>
              <div className="roommate-edit-form-item">
                <label className="label-roommate">Age</label>
                <span className="span-roomate-view">{profileData.age}</span>
              </div>
              <div className="roommate-edit-form-item">
                <label className="label-roommate">Likes</label>
                <ul>
                  {profileData.likes.map(like => (
                    <li>{like}</li>
                  ))}
                </ul>
              </div>
              <div className="roommate-edit-form-item">
                <label className="label-roommate">Dislikes</label>
                <ul>
                  {profileData.dislikes.map(dislike => (
                    <li>{dislike}</li>
                  ))}
                </ul>
              </div>
              <div className="roommate-edit-form-item-2">
                <label className="label-roommate"> Living Preferences</label>
                <div className="roommate-edit-form">
                  <div className="roommate-edit-form-item">
                    <label className="label-roommate">Number of Flatmates</label>
                    <span className="span-roomate-view">{profileData.livingPreferences.numberOfPeople}</span>
                  </div>

                  <div className="roommate-edit-form-item">
                    <label className="label-roommate">Eating Preferences</label>
                    <span className="span-roomate-view">{profileData.livingPreferences.eatingPreferences}</span>
                  </div>

                  <div className="roommate-edit-form-item">
                    <label className="label-roommate">Do you smoke?</label>
                    <span className="span-roomate-view">{profileData.livingPreferences.smoking ? "Yes" : "No"}</span>
                  </div>

                  <div className="roommate-edit-form-item">
                    <label className="label-roommate">Do you drink?</label>
                    <span className="span-roomate-view">{profileData.livingPreferences.drinking ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>Nothing to display</>
        )
      }
    </>
  );
}