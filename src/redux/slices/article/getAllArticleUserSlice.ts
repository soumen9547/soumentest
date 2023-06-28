/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';

export interface IArticleData {
  articleId: string;
  orgId: string;
  groups: string[];
  articleName: string;
  type: string;
  coverImageUrl: string;
  fileUrl: string;
  authorName: string;
  authorId: string;
  createdBy?: string;
  readTime: string;
  accessFor: string;
  tags: string[];
  articleDescription: string;
  approved: boolean;
  upVotes: number;
  downVotes: number;
  views: number;
  isPublished: boolean;
  createdAt: number;
  __v: number;
  isVoted: boolean;
  isViewed: boolean;
}

export interface IArticle {
  ArticleList: IArticleData[];
  total: number;
}

interface IInitialState {
  loading: boolean;
  data: IArticle | undefined;
  error: boolean;
  errorText: string;
}

const initialState: IInitialState = {
  loading: false,
  data: undefined,
  error: false,
  errorText: ''
};
export const fetchAllArticlesUser = createAsyncThunk('getAllArticleUser', async ({ orgId }: { orgId: string }) => {
  try {
    const response = await API.getAllArticleUser({ orgId });
    // console.log(response, ' ==>');
    return response;
  } catch (error) {
    throw error;
  }
});

const getAllArticleUserSlice = createSlice({
  name: 'get all articles user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticlesUser.pending, (state: IInitialState) => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
        state.data = undefined;
      })
      .addCase(fetchAllArticlesUser.fulfilled, (state: IInitialState, action) => {
        state.loading = false;
        state.error = false;
        state.errorText = '';
        state.data = action.payload.data as IArticle;
      })
      .addCase(fetchAllArticlesUser.rejected, (state: IInitialState, action) => {
        state.loading = false;
        state.error = true;
        // console.error(action.error);
        state.errorText = action.error.message || 'Something went wrong';
        state.data = undefined;
      });
  }
});

export const articleActions = getAllArticleUserSlice.actions;

export default getAllArticleUserSlice.reducer;
