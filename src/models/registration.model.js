export const UserCredentialsInit = (mongoose) => {
    const schema = mongoose.Schema(
        {
            userName: String,
            email: String,
            password: String,
            browser: String,
            version: String,
            os: String,
            platform: String,
            isMobile: Boolean,
            userRole: String,
            refreshToken: String,
            accessToken: String
        },
        {
            timestamps: true
        }
    );

    schema.set('toJSON', {
        virtuals: true,
        versionKey:false,
        transform: function (doc, ret) { delete ret._id }
    });

    const UserCredentials = mongoose.model("users", schema);
    return UserCredentials;
};