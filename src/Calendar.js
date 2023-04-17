import React, { useState } from 'react';
import './Calendar.css';
import { FiPlusCircle } from 'react-icons/fi';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './App.css';

function Calendar() {
  const [showEventDetailsPopup, setShowEventDetailsPopup] = useState(false);
  const [showAddEventPopup, setShowAddEventPopup] = useState(false);
  const [editEventPopup, setEditEventPopup] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventColor, setEventColor] = useState('#4285F4');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [editEventIndex, setEditEventIndex] = useState(null);
  const [events, setEvents] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (eventTitle.trim() && startDate && endDate) {
      const newEvent = {
        title: eventTitle,
        location: eventLocation,
        description: eventDescription,
        color: eventColor,
        start: startDate,
        end: endDate,
      };
      setEvents([...events, newEvent]);
      setEventTitle('');
      setEventLocation('');
      setEventDescription('');
      setEventColor('#000000');
      setStartDate(null);
      setEndDate(null);
      setShowAddEventPopup(false);
    }
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    if (eventTitle.trim() && startDate && endDate) {
      const updatedEvent = {
        title: eventTitle,
        location: eventLocation,
        description: eventDescription,
        color: eventColor,
        start: startDate,
        end: endDate,
      };
      const updatedEvents = [...events];
      updatedEvents[editEventIndex] = updatedEvent;
      setEvents(updatedEvents);
      setEventTitle('');
      setEventLocation('');
      setEventDescription('');
      setEventColor('#000000');
      setStartDate(null);
      setEndDate(null);
      setEditEventIndex(null);
      setEditEventPopup(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleEventClick = (event, index) => {
    setEditEventIndex(index);
    setEventTitle(event.title);
    setEventLocation(event.location);
    setEventDescription(event.description);
    setEventColor(event.color);
    setStartDate(event.start);
    setEndDate(event.end);
    setShowEventDetailsPopup(true);
  };
  
  const handleDeleteEvent = () => {
    const updatedEvents = [...events];
    updatedEvents.splice(editEventIndex, 1);
    setEvents(updatedEvents);
    setEditEventIndex(null);
    setShowEventDetailsPopup(false);
  };
  

  return (
    <div className={`calendar ${isMinimized ? 'minimized' : ''}`}>
      <button className="minimize" onClick={toggleMinimize}>
        {isMinimized ? 'Calendar' : '-'}
      </button>
      {!isMinimized && (
        <div className="calendar-container">
          <p className="calendar-heading">Calendar</p>
          <div className="event-list">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div
                  key={index}
                  className="event"
                  style={{ backgroundColor: event.color }}
                  onClick={() => handleEventClick(event, index)}
                >
                  <p className="event-title">{event.title}</p>
                </div>
              ))
            ) : (
              <p className="no-events">No events yet.</p>
            )}
          </div>
          <button
            className="add-event-button"
            onClick={() => setShowAddEventPopup(true)}
          >
            <FiPlusCircle />
          </button>
        </div>
      )}
  
      {showAddEventPopup || editEventPopup ? (
        <div className="add-event-popup">
          <button
            className="close-icon"
            onClick={() => {
              setShowAddEventPopup(false);
              setEditEventPopup(false);
              setEditEventIndex(null);
            }}
          >
            &times;
          </button>
        <form onSubmit={editEventPopup ? handleEditEvent : handleAddEvent}>
          <label htmlFor="event-title">Event title:</label>
          <input
            type="text"
            id="event-title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />
          <label htmlFor="event-location">Location:</label>
          <input
            type="text"
            id="event-location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
          <label htmlFor="event-description">Description:</label>
          <input
            type="text"
            id="event-description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <label htmlFor="event-color">Color:</label>
          <input
            type="color"
            id="event-color"
            value={eventColor}
            onChange={(e) => setEventColor(e.target.value)}
          />
          <label htmlFor="date-time-range">Date and time range:</label>
          <DateRangePicker
            startDate={startDate}
            startDateId="start-date"
            endDate={endDate}
            endDateId="end-date"
            onDatesChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }}
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            required
            displayFormat="MMM D, YYYY h:mm A"
            minimumNights={0}
            timePicker24Hour
            timeIntervals={15}
            showTimeSelect
            timeFormat="h:mm A"
          />
          <div>
        <label htmlFor="start_time">Start Time: </label>
        <input
          type="time"
          id="start_time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="end_time">End Time: </label>
        <input
          type="time"
          id="end_time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
          <button type="submit" className="event-submit">
            {editEventPopup ? 'Save' : 'Add'}
          </button>
        </form>
      </div>
    ) : null} {showEventDetailsPopup ? (
      <div className="event-details-popup">
        <button className="close-icon" onClick={() => setShowEventDetailsPopup(false)}>&times;</button>
        <h3>{eventTitle}</h3>
        <p>{eventLocation}</p>
        <p>{eventDescription}</p>
        <button className="delete-button" onClick={handleDeleteEvent}>Delete</button>
        <button className="edit-button" onClick={() => { setShowEventDetailsPopup(false); setEditEventPopup(true); }}>Edit</button>
      </div>
    ) : null}
  </div>
);}

export default Calendar;