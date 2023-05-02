import { Meteor } from 'meteor/meteor';
import { People } from '../people/people.js';

if (Meteor.isServer) {
 Meteor.publish('people', function() {
  return People.find();
});
}
