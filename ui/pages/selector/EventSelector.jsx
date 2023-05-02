// Desc: Selector for events
import React from 'react';

export const EventSelector = ({ events, onChange }) => (
  // Desc: Selector for events
  <div className="event-selector">
    <label className="event-selector__label" htmlFor="event-select">
      Select an event:
    </label>
    <select className="event-selector__select" id="event-select" name="event" onChange={onChange}>
      <option className="event-selector__option" value="">
        Select an event
      </option>
      {events.map(event => (
        <option key={event._id} className="event-selector__option" value={event._id}>
          {event.name}
        </option>
      ))}
    </select>
  </div>
);
