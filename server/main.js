// Import server startup through a single index entry point
import { Meteor } from 'meteor/meteor';
import { People } from '../api/people/people';
import '../api/methods/peopleMethods';
import { Communities } from '../api/communities/communities';
import { loadInitialData } from '../infra/initial-data';

Meteor.startup(() => {
   // DON'T CHANGE THE NEXT LINE.
  loadInitialData();
  // Meteor.publish() defines a reactive publication to the client.
  Meteor.publish('people', function () {
    return People.find();
  });

  Meteor.publish('communities', function () {
    return Communities.find();
  });
});
