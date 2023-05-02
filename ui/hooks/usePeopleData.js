      // useTracker is a hook that allows us to subscribe to a Meteor subscription and fetch data from a collection.
      // usePeopleData hook
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../api/people/people';

export const usePeopleData = () => useTracker(() => {
    Meteor.subscribe('people');
    return People.find({}).fetch();
  });
