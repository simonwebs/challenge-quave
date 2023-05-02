/* eslint-disable import/no-unresolved */
// This is the code for the home page
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { usePeopleData } from '../hooks/usePeopleData';
import { useCommunitiesData } from '../hooks/useCommunitiesData';
import { EventSelector } from './selector/EventSelector';
import { Texts } from '../../infra/constants';
// This is the code for the date format
const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};
export const Home = () => {
  // This is the code for the event selector
 const [selectedEvent, setSelectedEvent] = useState('');
 // This is the code for the list of events
  const communities = useCommunitiesData();
  const people = usePeopleData();
// This is the code for the list of people registered in the selected event
  const filteredPeople = selectedEvent
    ? people.filter((person) => person.communityId === selectedEvent)
    : [];
    // This is the code for the check-in button
  const handleCheckIn = (person) => {
    Meteor.call('people.checkIn', person._id);
  };
// This is the code for the check-out button
  const handleCheckOut = (person) => {
    Meteor.call('people.checkOut', person._id);
  };
 const peopleInEventNow = filteredPeople.filter(person => person.checkInDate && !person.checkOutDate).length;
// This is the code for the people by company in the event now
  const peopleByCompanyInEventNow = filteredPeople.reduce((acc, person) => {
    if (person.checkInDate && !person.checkOutDate) {
      acc[person.company] = (acc[person.company] || 0) + 1;
    }
    return acc;
  }, {});
// This is the code for the people not checked-in
  const peopleNotCheckedIn = filteredPeople.filter(person => !person.checkInDate).length;
// This is the code for the summary of the event
  const companyStats = Object.entries(peopleByCompanyInEventNow)
    .map(([company, count]) => `${company} (${count})`)
    .join(', ');

  return (
    <div>
      {/* This is the code for the event selector */}
      <div className="EventSelector">
   <h1>{Texts.HOME_TITLE}</h1>
      <EventSelector events={communities} onChange={(e) => setSelectedEvent(e.target.value)} />
      </div>
      {/*  This is the code for the summary of the event */}
 <div className="summary">
<h3>Summary</h3>
      <p>People in the event right now: {peopleInEventNow}</p>
      <p>People by company in the event right now: {companyStats}</p>
      <p>People not checked-in: {peopleNotCheckedIn}</p>
 </div>
 {/*  This is the code for the list of people registered in the selected event */}
    <div className="container">
      <h2>People Registered in the Selected Event</h2>
      <ul className="ul">
        {filteredPeople.map((person) => (
          <li className="li" key={person._id}>
            {person.firstName} {person.lastName}, {person.companyName}, {person.title}
          </li>
        ))}
      </ul>
    </div>
    {/* This is the code for the check-in and check-out buttons */}
 <div className="container">
      <h2>Registered People</h2>
      <ul className="ul">
        {filteredPeople.map((person) => {
          const fullName = `${person.firstName} ${person.lastName}`;
          const checkedIn = person.checkInDate && Date.now() - new Date(person.checkInDate) > 5000;

          return (
            <li className="li" key={person._id}>
              <div>
                {fullName}, {person.companyName}, {person.title}
              </div>
              <div>
                Check-in: {formatDate(person.checkInDate)}
              </div>
              <div>
                Check-out: {formatDate(person.checkOutDate)}
              </div>
              {checkedIn ? (
                <button className="button" onClick={() => handleCheckOut(person)}>
                  Check-out {fullName}
                </button>
              ) : (
                <button className="button" onClick={() => handleCheckIn(person)}>
                  Check-in {fullName}
                </button>
              )}
            </li>
          );
        })}
      </ul>
 </div>
    </div>
  );
};
