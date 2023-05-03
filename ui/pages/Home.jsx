import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { usePeopleData } from '../hooks/usePeopleData';
import { useCommunitiesData } from '../hooks/useCommunitiesData';
import { EventSelector } from './EventSelector';
import { Texts } from '../../infra/constants';

// Format the given date string
const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

// Utility function to join class names
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Home component
export const Home = () => {
  // State for the selected event
  const [selectedEvent, setSelectedEvent] = useState('');
  // Fetch communities data
  const communities = useCommunitiesData();
  // Fetch people data
  const people = usePeopleData();

  // Filter people based on the selected event
  const filteredPeople = selectedEvent
    ? people.filter((person) => person.communityId === selectedEvent)
    : [];

  // Function to handle check-in
  const handleCheckIn = (person) => {
    Meteor.call('people.checkIn', person._id);
  };

  // Function to handle check-out
  const handleCheckOut = (person) => {
    Meteor.call('people.checkOut', person._id);
  };

  // Calculate the number of people in the event right now
  const peopleInEventNow = filteredPeople.filter(person => person.checkInDate && !person.checkOutDate).length;

  // Calculate the number of people by company in the event right now
  const peopleByCompanyInEventNow = filteredPeople.reduce((acc, person) => {
    if (person.checkInDate && !person.checkOutDate) {
      acc[person.companyName] = (acc[person.companyName] || 0) + 1;
    }
    return acc;
  }, {});

  // Calculate the number of people not checked-in
  const peopleNotCheckedIn = filteredPeople.filter(person => !person.checkInDate).length;

  // Generate company stats string
  const companyStats = Object.entries(peopleByCompanyInEventNow)
    .map(([company, count]) => `${company} (${count})`)
    .join(', ');

  // Render the Home component
  return (
    // Rest of the JSX code
  <>
    <div className="relative isolate overflow-hidden bg-gray-100 py-12 sm:py-24">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-500 sm:text-4xl mb-4">{Texts.HOME_TITLE}</h2>
          <EventSelector events={communities} onChange={(e) => setSelectedEvent(e.target.value)} />
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="border border-gray-300 p-4">
            <h3 className="text-xl text-gray-600 font-bold">Summary</h3>
            <p className="mt-6 text-lg leading-8 text-gray-500">People in the event right now: <span className='text-lg p-2 text-indigo-600'>{peopleInEventNow}</span></p>
            <p className="mt-6 text-lg leading-8 text-gray-600">People by company in the event right now:<span className='text-lg p-2 text-indigo-600'>{companyStats}</span></p>
            <p className="mt-6 text-lg leading-8 text-gray-700">People not checked-in: <span className='text-lg p-2 text-indigo-600'>{peopleNotCheckedIn}</span></p>
          </section>
          <section className="col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">People Registered in the Selected Event</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPeople.map((person) => {
                const fullName = `${person.firstName} ${person.lastName}`;
                const checkedIn = person.checkInDate && Date.now() - new Date(person.checkInDate) > 5000;

                return (
                  <li className="border border-gray-300 p-4" key={person._id}>
                    <div>
                      {fullName}, {person.companyName}, {person.title}
                    </div>
                    <div>
                      <span>Check-in:</span>{formatDate(person.checkInDate)}
                    </div>
                    <div>
                      <span>Check-out:</span> {formatDate(person.checkOutDate)}
                    </div>
                    <button
                      className={`mt-2 rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${checkedIn ? 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'}`}
                      onClick={() => (checkedIn ? handleCheckOut(person) : handleCheckIn(person))}
                    >
                      <span>{checkedIn ? 'Check-out:' : 'Check-in:'}</span> {fullName}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </main>
      </div>
    </div>
  </>
);
            }