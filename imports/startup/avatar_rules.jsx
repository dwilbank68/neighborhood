Slingshot.fileRestrictions("UsersAvatar", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
    maxSize: 2 * 500 * 500 // 2 MB (use null for unlimited)
});


Slingshot.createDirective("UsersAvatar", Slingshot.S3Storage, {
    bucket: "neighborhood90250",
    acl: "public-read",

    authorize: function (file, metaContext) {
        if (!this.userId) {
            var message = "Please login before posting files";
            throw new Meteor.Error("Login Required", message);
        }
        return true;
    },

    key: function (file, metaContext) {
        // User's image url with ._id attached:
        return metaContext.avatarId + "/" + Date.now() + "-" + file.name;
    }
});