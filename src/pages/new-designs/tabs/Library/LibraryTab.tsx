/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import LibraryDetails from './components/LibraryDetails';
import LibraryRecommended from './components/LibraryRecommended';
import LibrarySideBar from './components/LibrarySideBar';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
// import { getUserDetails } from "../../../../utils/orgName";
import { useEffect, useState } from 'react';
import { fetchAllArticlesUser } from '../../../../redux/slices/article/getAllArticleUserSlice';
import { API } from '../../../../api';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../../utils/orgName';

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

const LibraryTab = () => {
  const dispatch = useAppDispatch();
  const [articleDetails, setArticleDetails] = useState<IArticleData | undefined>();

  const allArticleData = useAppSelector((state) => state.allArticleUser?.data?.ArticleList) ?? [];

  const [selectedArticleId, setSelectedArticleId] = useState(allArticleData[0]?.articleId || '');
  const [likeStatus, setLikeStatus] = useState('');
  let [isvote, setIsvote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDown, setLoadingDown] = useState(false);

  const params = useParams();
  const grpId = params.id || '';
  const { orgId } = getUserDetails();

  useEffect(() => {
    dispatch(fetchAllArticlesUser({ orgId: orgId }));
  }, []);

  const handleArticle = async (ele: any) => {
    if (ele.articleId !== selectedArticleId) {
      setSelectedArticleId(ele.articleId);
      setLikeStatus('');
    }
  };

  useEffect(() => {
    setSelectedArticleId(allArticleData[0]?.articleId);
  }, []);

  // console.log(selectedArticleId, ' ==>');
  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await API.getAllArticleById({
          orgId: orgId,
          articleId: selectedArticleId,
          groupId: grpId
        });
        if (response && response?.status === 200) {
          setArticleDetails(response.data.article[0]);
          setIsvote(response.data.isVoted);
          setLikeStatus(response.data.isVoted ? 'upVoted' : response.data.isVoted === false ? 'downVoted' : '');
        }
      } catch (error) {
        // console.error(error);
      }
    }

    const handleView = async () => {
      const response = await API.articleAction({
        orgId: orgId,
        articleId: selectedArticleId,
        data: { action: 'viewed' }
      });

      if (response?.status === 200) {
        fetchArticle();
      } else {
        fetchArticle();
      }
    };
    if (selectedArticleId) {
      handleView();
    }
  }, [selectedArticleId, orgId]);

  const handleLikeUp = async () => {
    setLoading(true);
    if (likeStatus === 'upVoted') {
      const response = await API.articleAction({
        orgId: orgId,
        articleId: selectedArticleId,
        data: { action: 'upVoted' }
      });
      if (response?.status === 200) {
        setLikeStatus('');
        setArticleDetails(response.data.getArticle);
        setLoading(false);
      }
    } else {
      const response = await API.articleAction({
        orgId: orgId,
        articleId: selectedArticleId,
        data: { action: 'upVoted' }
      });

      if (response?.status === 200) {
        setArticleDetails(response.data.getArticle);
        setLikeStatus('upVoted');
        setLoading(false);
      }
    }
  };

  const handleLikeDown = async () => {
    setLoadingDown(true);
    if (likeStatus === 'downVoted') {
      const response = await API.articleAction({
        orgId: orgId,
        articleId: selectedArticleId,
        data: { action: 'downVoted' }
      });

      if (response?.status === 200) {
        setArticleDetails(response.data.getArticle);

        setLikeStatus('');
        setLoadingDown(false);
      }
    } else {
      const response = await API.articleAction({
        orgId: orgId,
        articleId: selectedArticleId,
        data: { action: 'downVoted' }
      });

      if (response?.status === 200) {
        setLikeStatus('downVoted');
        setArticleDetails(response.data.getArticle);
        setLoadingDown(false);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', background: '#E5E5E5' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <LibrarySideBar
            allArticleData={allArticleData ?? []}
            onClick={handleArticle}
            selectedArticleId={selectedArticleId}
          />
        </Grid>

        <Grid item xs={6}>
          <LibraryDetails
            articleDetails={articleDetails}
            selectedArticleId={selectedArticleId}
            handleLikeUp={handleLikeUp}
            handleLikeDown={handleLikeDown}
            likeStatus={likeStatus}
            isVoted={isvote}
            loading={loading}
            loadingDown={loadingDown}
          />
        </Grid>
        <Grid item xs={3}>
          <LibraryRecommended />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LibraryTab;
