import { Meteor } from 'meteor/meteor';
import { Communities } from '../communities/communities.js';

if (Meteor.isServer) {
 Meteor.publish('communities', function() {
  return Communities.find();
});
}
