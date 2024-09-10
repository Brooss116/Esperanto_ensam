import {
    HealthActor,
    Industrial,
    Need,
    Researcher,
    User,
    Resource,
    Tag,
} from '@models/index';

export const associations = (): void => {
    HealthActor.hasOne(User)
    User.belongsTo(HealthActor, { onDelete: 'CASCADE' });

    Industrial.hasOne(User)
    User.belongsTo(Industrial, { onDelete: 'CASCADE' })

    Researcher.hasOne(User)
    User.belongsTo(Researcher, { onDelete: 'CASCADE' })

    Need.belongsTo(User)
    User.hasMany(Need, {onDelete: 'CASCADE'})

    Resource.belongsTo(User)
    User.hasMany(Resource, {onDelete: 'CASCADE'})

    Tag.belongsToMany(Need, { through: 'Tag_Need' });
    Need.belongsToMany(Tag, { through: 'Tag_Need' });

    Tag.belongsToMany(User, { through: 'Tag_User' });
    User.belongsToMany(Tag, { through: 'Tag_User' });

    User.belongsToMany(User, { as: 'Following', through: 'follower', foreignKey: 'userId', otherKey: 'followerId' });
    User.belongsToMany(User, { as: 'Followers', through: 'follower', foreignKey: 'followerId', otherKey: 'userId' });
};