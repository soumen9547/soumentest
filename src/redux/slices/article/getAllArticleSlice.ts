/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../api';
import { error } from 'node:console';

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

export const fetchAllArticles = createAsyncThunk(
  'getAllArticles',
  ({ orgId, groupId }: { orgId: string; groupId: string }) => {
    return API.getAllArticle({ orgId, groupId })
      .then((response) => response.data)
      .catch(error);
  }
);

const getAllArticleSlice = createSlice({
  name: 'get all articles',
  initialState,
  reducers: {
    addArticle: (state: IInitialState, action) => {
      const ArticleList = state.data?.ArticleList || [];
      const total = state.data?.total || 0;
      return {
        ...state,
        data: {
          ArticleList: [...ArticleList, action.payload],
          total: total + 1
        }
      };
    },
    deleteArticle: (state: IInitialState, action) => {
      const filteredArticles = state.data?.ArticleList.filter((each) => each.articleId !== action.payload) || [];
      const total = state.data?.total || 0;
      return {
        ...state,
        data: {
          ArticleList: filteredArticles,
          total: total - 1
        }
      };
    },
    updateArticle: (state: IInitialState, action) => {
      if (state.data) {
        const articleList = state.data.ArticleList.map((article) => {
          if (article.articleId === action.payload.updateResponse.articleId) {
            return action.payload.updateResponse;
          }
          return article;
        });

        return {
          ...state,
          data: {
            ...state.data,
            ArticleList: articleList
          }
        };
      }
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticles.pending, (state: IInitialState) => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
        state.data = undefined;
      })
      .addCase(fetchAllArticles.fulfilled, (state: IInitialState, action) => {
        state.loading = false;
        state.error = false;
        state.errorText = '';
        state.data = action.payload as IArticle;
      })
      .addCase(fetchAllArticles.rejected, (state: IInitialState, action) => {
        state.loading = false;
        state.error = true;
        // console.error(action.error);
        state.errorText = action.error.message || 'Something went wrong';
        state.data = undefined;
      });
  }
});

export const articleActions = getAllArticleSlice.actions;

export default getAllArticleSlice.reducer;
