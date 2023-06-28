import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import acsChannelParticipants from './slices/acs-channel-participants/acsChannelParticipants';
import acsChannels from './slices/acs-channels/acsChannels';
import acsChatActivities from './slices/acs-chat-activities/acsChatActivities';
import acsHoldMessages from './slices/acs-messages/acsHoldMessages';
import acsOrgMembers from './slices/acs-org-members/acsOrgMembers';
import acsCommunityMembers from './slices/acs-community-members/acsCommunityMembers';
import acsTokenReducer from './slices/acs-token/acsTokenSlice';
import chatEditorSlice from './slices/chat-editor/chatEditorSlice';
import chatProfileSlice from './slices/chat-profile/chatProfileSlice';
import dialogSlice from './slices/dialog-slice/dialogSlice';
import ftueReducer from './slices/ftue/ftueSlice';
import memberReducer from './slices/memberRole/memberSlice';
import organizationMemberSlice from './slices/org-memebers/orgMemebersSlice';
import organizationReducer from './slices/organization/organizationSlice';
import orgIdReducer from './slices/orgId/orgIdSlice';
import orgNameReducer from './slices/orgDetails/orgDetailsSlice';
import alltagslistSlice from './slices/tags/alltagslistSlice';
import tagsReducer from './slices/tags/tagsSlice';
import userEducationSlice from './slices/user-education/userEducationSlice';
import userProfileReducer from './slices/user-profile/userProfieSlice';
import userWorkHistorySlice from './slices/user-work/userWorkHistorySlice';
import userHeadshot from './slices/userHeadshot/userHeadshot';
import userReducer from './slices/users/userSlice';
import acsMessage from './slices/acs-message/acsMessage';
import orgGroupSlice from './slices/org-level-group/orgLevelGroupSlice';
import getAllGroupSlice from './slices/getAllGroups/getAllGroupsSlice';
import groupDetailsSlice from './slices/group-details/groupDetails';
import groupUsersSlice from './slices/group-users/groupUsersSlice';
import allArticleReducer from './slices/article/getAllArticleSlice';
import breadCrumbsReducer from './slices/breadcrumbs/breadcrumbsSlice';
import getAllArticleUserSlice from './slices/article/getAllArticleUserSlice';
import getAllMatchesSlice from './slices/getAllMatches/getAllMatchesSlice';
import disabilityPopupSlice from './slices/disability/disabilityPopupSlice';
import communityMembersSlice from './slices/communityMembers/communityMembersSlice';
import fetchACSCreateChannelSlice from './slices/acs-create-channel/acsCreateChannel';
// import messageReducer from './messageSlice';
import messageReducer from './slices/AutoMatchMessage';
import acsMessageNotificationsSlice from './slices/acs-message-notifications/acsMessageNotificationsSlice';
import goalsTemplatesSlice from './slices/goals-templates/goalsTemplatesSlice';
import goalLevelsSlice from './slices/goal-levels/goalLevelsSlice';
import getTasksSlice from './slices/goals-tasks/getTasksSlice';
import customProgramSlice from './slices/custom-program/customProgramSlice';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  organizations: organizationReducer,
  user: userReducer,
  memberRole: memberReducer,
  ftue: ftueReducer,
  orgIdReducer,
  acsToken: acsTokenReducer,
  organizationMembers: organizationMemberSlice,
  orgDetails: orgNameReducer,
  acsChannelParticipants: acsChannelParticipants,
  acsChatActivities: acsChatActivities,
  dialogActions: dialogSlice,
  acsOrgUsers: acsOrgMembers,
  acsCommunityUsers: acsCommunityMembers,
  acsHoldMessages: acsHoldMessages,
  chatEditorState: chatEditorSlice,
  acsChannels: acsChannels,
  userProfile: userProfileReducer,
  tags: tagsReducer,
  userHeadshot,
  chatProfile: chatProfileSlice,
  userEducation: userEducationSlice,
  userWorkHistory: userWorkHistorySlice,
  alltags: alltagslistSlice,
  messages: acsMessage,
  orgLevelGroup: orgGroupSlice,
  allGroups: getAllGroupSlice,
  groupDetails: groupDetailsSlice,
  groupUsers: groupUsersSlice,
  allArticle: allArticleReducer,
  breadCrumbs: breadCrumbsReducer,
  allArticleUser: getAllArticleUserSlice,
  // updateWorkHistory: updateWorkHistorySlice,
  getAllMatchesList: getAllMatchesSlice,
  disabilityPopup: disabilityPopupSlice,
  getCommunityMembers: communityMembersSlice,
  acsCreateChannel: fetchACSCreateChannelSlice,
  message: messageReducer,
  messageNotifications: acsMessageNotificationsSlice,
  goalsTemplates: goalsTemplatesSlice,
  goalLevels: goalLevelsSlice,
  goalTasks: getTasksSlice,

  customProgarm: customProgramSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
