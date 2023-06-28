type chatKindEnum = 'Channels' | 'Direct_Messages';

interface IMessage {
  content: { message: string };
  createdOn: string;
  id: string;
  metadata: {
    Reactions: string;
    hasReactions: string;
  };
  sender: {
    communicationUserId: string;
    kind: string;
  };
  senderDisplayName: string;
  sequenceId: string;
  type: string;
  version: string;
}

interface IThread {
  displayNames: string[];
  id: string;
  lastMessageReceivedOn: string;
  topic: string;
}

interface IChatThread {
  id: string;
  lastMessageReceivedOn: string;
  topic: string;
}

interface IChatUser {
  displayName: string;
  id: { communicationUserId: string };
}

interface IChatProfileState {
  chatProfileDetails: any;
}

// chat acs groups type

interface Id {
  category: string;
  coId: string;
  communicationId: string;
  country: string;
  disability: string[];
  dob: string;
  email: string;
  ethnicity: string[];
  firstGenStudent: string;
  firstName: string;
  ftue: boolean;
  gender: string;
  headshot: string;
  hobbies: string[];
  lastName: string;
  name: string;
  phoneNumber: string;
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
    linkedIn: string;
  };
  timezone: string;
  communicationUserId: string;
}

interface Communication {
  id: Id;
  displayName: string;
  userId: string;
}

interface Data {
  [key: string]: Communication;
}

interface IFormattedAcsOrgUser {
  [key: string]: Data;
}

interface IGroupMessage {
  id: string;
  topic: string;
  lastMessageReceivedOn: string;
  image: string;
}

interface IAcsUsers {
  displayName: string;
  shareHistoryTime: string;
  id: {
    kind: string;
    communicationUserId: string;
  };
}

interface IChatMessage {
  id: string;
  type: string;
  sequenceId: string;
  version: string;
  senderDisplayName: string;
  createdOn: string;
  metadata: {
    hasReactions: string;
    Reactions: string;
  };
  content: {
    message: string;
  };
  sender: {
    kind: string;
    communicationUserId: string;
  };
  senderCommunicationIdentifier: {
    rawId: string;
  };
  status: string;
  contentId: number;
}
