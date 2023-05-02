 // useTracker is a hook that allows us to subscribe to a Meteor subscription and fetch data from a collection.
// useCommunitiesData hook
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from '../../api/communities/communities';

export const useCommunitiesData = () => useTracker(() => {
    Meteor.subscribe('communities');
    return Communities.find({}).fetch();
  });
