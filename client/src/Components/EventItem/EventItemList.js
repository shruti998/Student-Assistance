/**
 * Title : EventItemList.js
 * Description : Class to generate Event Item Card
 * @author : Romil Tiwari
 */

import './EventItemList.scss';
import React, { useState } from 'react';
import './../../Pages/Events/Events.scss';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ArchiveIcon from '@mui/icons-material/Archive';
import * as moment from 'moment';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

/**
 * Description : Function to created styled badge for events
 */
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


/**
 * Description : Function to create styled badge for event text.
 */
const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));

/**
 * Description: Class to create event list card.
 * @param {*} props 
 * @returns EventItemList
 */
export default function EventItemList(props) {

    //Variable Declaration
    const formatDate = moment(props.eventDate.slice(0, 10)).format('DD/MM/YYYY');
    const [clicked, setClicked] = useState(false)

    /**
     * Definition : Function to handle archive event on click.
     * @param {*} onClick 
     */
    const archiveEvent = (event) => {
        setClicked(true)
            const id = event.nativeEvent.path[2];
            const postURL = "http://localhost:3000/savedEventList" 
            fetch(postURL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    eventName: props.eventName,
                    description: props.description,
                    eventDate: props.eventDate,
                    time: props.time,
                    eventLocation: props.eventLocation
                })
            })
                .then(() => {
                    alert('Event has been archived');
                    setClicked(false)
                })
    }

    //HTML Render
    return (
        <div className="event-card-container">
            <Card sx={{ width: 600, boxShadow: 3, borderColor: 'primary.main', borderRadius: 2, align: "center" }}
            >
                <CardHeader
                    avatar={
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar sx={{ width: 60, height: 60, bgcolor: red[500] }} aria-label="recipe"
                                alt="Event">Event
                            </Avatar>
                        </StyledBadge>
                    }
                    title={props.eventName}
                    subheader={formatDate}

                />
                <CardMedia
                    component="img"
                    height="100"
                    image="./images/free_event.png"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography align="left" variant="body1" color="text.secondary">Event Description :  {props.description}
                    </Typography>
                    <Typography align="left" variant="body1" color="text.secondary">Event Location :  {props.eventLocation}
                    </Typography>
                    <Typography align="left" variant="body1" color="text.secondary">Event Time :   {props.time}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={archiveEvent}>
                        {clicked ? <ArchiveIcon style={{ color: "red" }} /> : <ArchiveIcon/>}
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}