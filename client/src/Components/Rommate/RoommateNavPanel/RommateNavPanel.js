import { Link } from 'react-router-dom';
import './RoommateNavPanel.scss';

export const RoommateNavPanel = () => {
  return (
    <div className='nav-panel-container'>
      <Link className='nav-panel-item' to="/roommate">
        Profile
      </Link>
      <Link className='nav-panel-item' to="/roommateGroup">
        Roommate Group
      </Link>
      <Link className='nav-panel-item' to="/roommateFind">
        Search for Roommates
      </Link>
      <Link className='nav-panel-item' to="/roommateRequests">
        Requests
      </Link>
    </div>
  );
};

export default RoommateNavPanel;