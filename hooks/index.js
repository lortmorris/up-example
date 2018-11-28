

const CreateFeedItem = up => async (user, type, data) => {
  const actionTypes = [type];

  const lastItem = await up.services.getLast('/feed', {});
  if (lastItem && lastItem.userId === user._id.toString()) {
    const updateObject = {
      actionTypes: lastItem.actionTypes.indexOf(type) === -1 ? [...lastItem.actionTypes, type] : lastItem.actionTypes,
    };
    if (data.comment) updateObject.comment = data.comment;
    if (data.rating) updateObject.rating = data.rating;
    if (data.photo) updateObject.photo = data.photo;
    return up.services.update('/feed', lastItem._id.toString(), updateObject);
  }

  return up.services.insert('/feed', {
    userId: user._id.toString(),
    user,
    comment: data.comment || undefined,
    photo: data.photo || undefined,
    rating: data.rating || undefined,
    actionTypes,
    cars: data.cars,
    carId: data.cars._id.toString(),
    totalComments: 0,
    totalLikes: 0,
  });
};

const hooks = (upInstance) => {
  const createFeedItem = CreateFeedItem(upInstance);

  upInstance.addHook('/comments', 'afterInsert', async (req, inserted) => {
    await createFeedItem(inserted.users, 'comment', { comment: inserted.comment, cars: inserted.cars });
    return Promise.resolve(inserted);
  });

  upInstance.addHook('/photos', 'afterInsert', async (req, inserted) => {
    await createFeedItem(inserted.users, 'photo', { photo: inserted.photo, cars: inserted.cars });
    return Promise.resolve(inserted);
  });

  upInstance.addHook('/ratings', 'afterInsert', async (req, inserted) => {
    await createFeedItem(inserted.users, 'rating', { rating: inserted.rating, cars: inserted.cars });
    return Promise.resolve(inserted);
  });
};

module.exports = hooks;
