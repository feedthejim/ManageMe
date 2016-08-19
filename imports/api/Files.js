export const Files = new FS.Collection("files", {
  stores: [new FS.Store.GridFS("filesStore")]
});

Files.allow({
  download: function () {
    return true;
  },
  fetch: null
});


if (Meteor.isServer) {
	Meteor.publish('files', function filesPublication() {
		return Files.find();
	});
}
