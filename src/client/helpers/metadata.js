import omit from 'lodash/omit';
import DPayID from '../dPayIdAPI';

const getMetadata = () => DPayID.me().then(resp => resp.user_metadata);

export const saveSettingsMetadata = settings =>
  getMetadata()
    .then(metadata =>
      DPayID.updateUserMetadata({
        ...metadata,
        settings: {
          ...metadata.settings,
          ...settings,
        },
      }),
    )
    .then(resp => resp.user_metadata.settings);

export const setLocaleMetadata = locale =>
  getMetadata()
    .then(metadata =>
      DPayID.updateUserMetadata({
        ...metadata,
        locale,
      }),
    )
    .then(resp => resp.user_metadata.locale);

export const addDraftMetadata = draft =>
  getMetadata()
    .then(metadata =>
      DPayID.updateUserMetadata({
        ...metadata,
        drafts: {
          ...metadata.drafts,
          [draft.id]: draft.postData,
        },
      }),
    )
    .then(resp => resp.user_metadata.drafts[draft.id]);

export const deleteDraftMetadata = draftIds =>
  getMetadata()
    .then(metadata =>
      DPayID.updateUserMetadata({
        ...metadata,
        drafts: omit(metadata.drafts, draftIds),
      }),
    )
    .then(resp => resp.user_metadata.drafts);

export const toggleBookmarkMetadata = (id, author, permlink) =>
  getMetadata()
    .then(metadata =>
      DPayID.updateUserMetadata({
        ...metadata,
        bookmarks:
          metadata.bookmarks && metadata.bookmarks[id]
            ? omit(metadata.bookmarks, id)
            : { ...metadata.bookmarks, [id]: { id, author, permlink } },
      }),
    )
    .then(resp => resp.user_metadata.bookmarks);

export const saveNotificationsLastTimestamp = lastTimestamp =>
  getMetadata()
    .then(metadata =>
      DPayID.updateUserMetadata({
        ...metadata,
        notifications_last_timestamp: lastTimestamp,
      }),
    )
    .then(resp => resp.user_metadata.notifications_last_timestamp);

export default getMetadata;
