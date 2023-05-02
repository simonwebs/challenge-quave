import { Meteor } from 'meteor/meteor';
import { Communities } from '../communities/communities.js';

if (Meteor.isServer) {
  Meteor.methods({
    'communities.insert'(communityData) {
      // Insert a new document into the communities collection
      Communities.insert(communityData);
    },
    'communities.update'(communityId, communityData) {
      // Update a document in the communities collection with the specified _id
      Communities.update({ _id: communityId }, { $set: communityData });
    },
    'communities.remove'(communityId) {
      // Remove a document from the communities collection with the specified _id
      Communities.remove({ _id: communityId });
    },
  });
}
