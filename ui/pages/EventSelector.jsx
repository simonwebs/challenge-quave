// Desc: Selector for events
import React from 'react';

export const EventSelector = ({ events, onChange }) => (
  // Desc: Selector for events
  <div>
    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="event-select">
      Select an event:
    </label>
    <select className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6" id="event-select" name="event" onChange={onChange}>
      <option className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" value="">
        Select an event
      </option>
      {events.map(event => (
        <option key={event._id} className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" value={event._id}>
          {event.name}
        </option>
      ))}
    </select>
  </div>
);
