/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import _ from 'lodash';

interface IChannelUser {
  displayNames: string[];
  id: string;
  lastMessageReceivedOn: string;
  topic: string;
}

export const getCurrentChannelName = (channels: any, threadId: string) => {
  if (channels && threadId) {
    const findInPersonalChats = _.size(_.get(channels, 'personalThreadsArr'))
      ? channels.personalThreadsArr.find((each: any) => each.id === threadId)
      : null;
    const findInGroupChats = _.size(_.get(channels, 'groupThreads'))
      ? channels.groupThreads.find((each: any) => each.id === threadId)
      : null;
    if (findInPersonalChats) {
      return findInPersonalChats.displayNames[0];
    } else if (findInGroupChats) {
      return findInGroupChats.topic;
    } else {
      return '';
    }
  }
};

export const getGroupChannelImage = (channels: any, threadId: string) => {
  if (channels && threadId) {
    const findInGroupChats = _.size(_.get(channels, 'groupThreads'))
      ? channels.groupThreads.find((each: any) => each.id === threadId)
      : null;
    return _.get(findInGroupChats, 'image', '');
  }
};
export const getCurrentChannelInfo = (channels: any, threadId: string) => {
  if (channels && threadId) {
    const findInPersonalChats = _.size(_.get(channels, 'personalThreadsArr'))
      ? channels.personalThreadsArr.find((each: any) => each.id === threadId)
      : null;
    const findInGroupChats = _.size(_.get(channels, 'groupThreads'))
      ? channels.groupThreads.find((each: any) => each.id === threadId)
      : null;
    if (findInPersonalChats) {
      return { name: findInPersonalChats.displayNames[0] };
    } else if (findInGroupChats) {
      return findInGroupChats.image;
    } else {
      return { name: '' };
    }
  }
};

export const filterAcsUsersWithExistingUsers = (acsUsers: any, availableUsers: any) => {
  const existingUserCommunicationIds = _.map(availableUsers, (each) => _.get(each, 'id.communicationUserId', ''));
  let usersWithExistingUsers = _.filter(
    acsUsers,
    (eachUser) => !existingUserCommunicationIds.includes(_.get(eachUser, 'id.communicationUserId', ''))
  );
  return usersWithExistingUsers;
};

export const filterTheAcsUsersWithPersonalThreads = (acsUsers: any, directThreads: any) => {
  const directThreadNames = _.map(directThreads, (each) => _.head(_.get(each, 'displayNames')));
  let usersWithPersonalThreads = _.filter(
    acsUsers,
    (eachAcsUser) => !directThreadNames.includes(_.get(eachAcsUser, 'displayName', ''))
  );

  return usersWithPersonalThreads;
};

export const filterTheAcsUsersWithPersonalThreadsWithCommId = (acsUsers: any, directThreads: any) => {
  const directThreadNames = _.map(directThreads, (each) => _.head(_.get(each, 'displayNames')));
  let userWithPersonalThreadsWithCommId = _.filter(
    acsUsers,
    (eachAcsUser) => !directThreadNames.includes(_.get(eachAcsUser, 'id.communicationUserId', ''))
  );

  return userWithPersonalThreadsWithCommId;
};

export const getAcsUserByCommunicationId = (acsUsers: any, communicationId: string) => {
  let filteredUser = _.find(
    acsUsers,
    (eachAcsUser) => _.get(eachAcsUser, 'id.communicationUserId') === communicationId
  );
  return filteredUser;
};

export const formatAcsUserWithCommunicationId = (x: any) => {
  let y: any = {};
  for (let j = 0; j < x.length; j++) {
    if (x[j] && x[j]['id'] && x[j]['id']['communicationUserId']) {
      y[x[j]['id']['communicationUserId']] = x[j];
    }
  }
  return y;
};
export const checkImage = (src: string, good: () => {}, bad: () => {}) => {
  let img = new Image();
  img.onload = good;
  img.onerror = bad;
  img.src = src;
};

export const filterAcsUsersWithChannels = (channels: IChannelUser[], acsUsers: any) => {
  const userChannels = channels.map((each) => _.head(each.displayNames));
  let filteredUsers = acsUsers.filter((each: any) => !userChannels.includes(_.get(each, 'id.communicationUserId')));
  return filteredUsers;
};
