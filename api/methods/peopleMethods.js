import { Meteor } from 'meteor/meteor';
import { People } from '../people/people';

Meteor.methods({
  'people.checkIn'(personId) {
    People.update(personId, {
      $set: {
        checkInDate: new Date(),
      },
    });
  },

  'people.checkOut'(personId) {
    People.update(personId, {
      $set: {
        checkOutDate: new Date(),
      },
    });
  },
});
