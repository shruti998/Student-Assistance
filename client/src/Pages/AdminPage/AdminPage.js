/**
 * Title : AdminPage.js
 * Description : Class to handle admin operations of the web applciation.
 * @author : Romil Tiwari
 */

import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';


import './AdminPage.scss';

export const AdminPage = () => {
  return (

    <div className="admin-card">
      <div className="admin-card-1">
        <h1 className="events-title">Admin Landing Page</h1>
        <div className="header-admin">
          {/* Manage Events */}
          <a href="/ManageEvents">
            <div className="events-card">
              <Card sx={{ width: 350, height: 450 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500], width: 100, height: 100 }} aria-label="recipe">
                      Event
                    </Avatar>
                  }
                  title="Event Handling"
                />
                <CardMedia sx={{ width: 200, height: 200 }}
                  component="img"
                  image="./images/daily-tasks.png"
                  alt="image-placeholder-event"
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    Manage Events
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Perform Create, View, Update and Delete operations on Events.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </a>

          {/* ManageHousings */}
          <a href="/ManageHousings">
            <div className="events-card">
              <Card sx={{ width: 350, height: 450 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500], width: 100, height: 100 }} aria-label="recipe">
                      Housing
                    </Avatar>
                  }
                  title="Housing Handling"
                />
                <CardMedia sx={{ width: 200, height: 200 }}
                  component="img"
                  image="./images/seller.png"
                  alt="image-placeholder-event"
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    Manage Housing
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Perform Create, View, Update and Delete operations on Housing.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </a>

          {/* Manage Users*/}
          <a href="/User">
            <div className="events-card">
              <Card sx={{ width: 350, height: 450 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500], width: 100, height: 100 }} aria-label="recipe">
                      User
                    </Avatar>
                  }
                  title="User Handling"
                />
                <CardMedia sx={{ width: 200, height: 200 }}
                  component="img"
                  image="./images/administrator.png"
                  alt="image-placeholder-event"
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    Manage User Database
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Perform Create, View, Update and Delete operations on User Database.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;