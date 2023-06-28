/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable no-duplicate-imports */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField
} from '@material-ui/core';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, FormHelperText, IconButton, Popover, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import previewicon from '../../../../../../assets/images/previewicon.svg';
import pencil from '../../../../../../assets/images/pencil.svg';
import delecticon from '../../../../../../assets/images/delecticon.svg';
import { ContentState, EditorState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import _ from 'lodash';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { API } from '../../../../../../api/index';
import Filter from '../../../../../../assets/images/Filter.svg';
import cemeraimg from '../../../../../../assets/images/cemeraimg.svg';
import pluscircle from '../../../../../../assets/images/pluscircle.svg';
import thumbsdownimg from '../../../../../../assets/images/thumbsdownimg.svg';
import thumbsupimg from '../../../../../../assets/images/thumbsupimg.svg';
import upload from '../../../../../../assets/images/upload.svg';
import { appColors } from '../../../../../../utils/theme';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { articleActions, fetchAllArticles } from '../../../../../../redux/slices/article/getAllArticleSlice';
import { AppLoader } from '../../../../../../components/AppLoader';
import ArticleDeletDialog from '../ArticleDeletDialog';
import ArticlePreview from '../ArticlePreview';

interface Props {}

interface Article {
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
  __v: number;
  createdAt: number;
}

const useStyles = makeStyles({
  tableHeadContent: {
    color: '#68717A !important',
    fontSize: '11px !important',
    fontFamily: 'Open Sans !important',
    fontWeight: '600!important'
  },
  overviewText: {
    color: ' #0071A9',
    fontSize: '15px !important',
    fontFamily: 'Open Sans !important',
    fontWeigth: '400 !important',
    width: '150px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  tagText: {
    color: '#68717A',
    fontSize: '14px !important',
    fontFamily: 'Open Sans !important',
    fontWeigth: '400 !important',
    border: '1px solid #CED4DA',
    borderRadius: '29px',
    // width: "55px",
    height: '26px',
    textAlign: 'center',
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  communityExclusiveText: {
    color: '#E99940',
    fontSize: '12px !important',
    fontFamily: 'Open Sans !important',
    fontWeigth: '600!important',
    border: '1px solid #E99940',
    borderRadius: '5px',
    height: '20px',
    width: '142px',
    textAlign: 'center',
    marginTop: '5px !important'
  },
  textAreaContent: {
    color: '#152536',
    fontSize: '14px !important',
    fontFamily: 'Open Sans !important',
    fontWeigth: '400 !important',
    marginBottom: '15px !important'
  },
  uiStyles: {
    listStyle: 'none'
  },
  listStyle: {
    fontSize: '14px !important',
    fontWeight: '400 !important',
    color: '#152536 !important',
    fontFamily: 'Open Sans !important',
    '&:hover': {
      backgroundColor: appColors.gray2,
      cursor: 'pointer'
    }
  }
});

const toolBarStyle = {
  border: 'none',
  backgroundColor: 'rgb(247, 244, 244)',
  padding: '10px 0',
  marginBottom: 0,
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px'
};

const schema = yup.object().shape({
  articleName: yup.string().required('Article name is required'),
  type: yup.string().required('Article type is required'),
  readTime: yup.string().required('Read time is required'),
  authorName: yup.string().required('Author Name is required'),
  accessFor: yup.string().required('Who Can View is required'),
  tags: yup.array().min(1, 'Select at least one tag').required('Select at least one tag'),
  articleDescription: yup.string().required('Article Description is required'),
  coverImg: yup.mixed().required('Cover image is required')
});
const ContentSettings = (props: Props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const params = useParams();
  const grpId = params.id || '';
  const orgId = params.orgId || '';
  const [openPreview, setOpenPreview] = useState(false);
  const [articleSingleList, setArticleSingleList] = useState<Article>();
  const [openDelete, setDelete] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [articleId, setArticleId] = useState<string>('');
  const [openForm, setOpenForm] = useState(false);
  const [action, setAction] = useState('Add');
  const [isPublished, setIsPublished] = useState(false);
  const [editCoverImg, setEditCoverImg] = useState<string>();
  const [type, setType] = useState('');
  const [readTimeValue, setReadTimeValue] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState<File | null>(null);
  const [viewFor, setViewFor] = useState('');
  const [addArticlesLoader, setAddArticlesLoaer] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [editVideoUrl, setEditVideoUrl] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [editAudioUrl, setEditAudioUrl] = useState<File | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [error, setError] = useState('');

  const [articleData, setArticleData] = useState<{ articleList: Article[] }>({
    articleList: []
  });

  const allArticleData = useAppSelector((state) => state.allArticle.data);

  useEffect(() => {
    if (allArticleData && allArticleData.ArticleList) {
      setArticleData((prevArticleData) => ({
        ...prevArticleData,
        articleList: allArticleData.ArticleList
      }));
    }
  }, [allArticleData]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  useEffect(() => {
    setType('');
    setReadTimeValue('');
    setViewFor('');
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(schema)
  });

  const watchArticleType = watch('type');

  const TagList = ['company', 'industry', 'department', 'degree', 'Minor', 'role'];

  const checkError = (fieldName: string) => Boolean(errors[fieldName]);
  const getError = (fieldName: string) => errors[fieldName]?.message;

  const [urlName, setUrlName] = useState('');

  let filename = urlName.substring(urlName.lastIndexOf('/') + 1);
  filename = filename.split('.')[0];
  filename = filename.replace(/^\d+_/, '');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 100000000) {
        setVideoError('File size is too large. Maximum allowed size is 100MB.');
      } else {
        setVideoFile(file);
        setVideoError(null);
      }
    } else {
      setVideoFile(null);
      setVideoError('Video file is required for Video type.');
    }
  };
  const handleAudioFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 100000000) {
        setAudioError('File size is too large. Maximum allowed size is 100MB.');
      } else {
        setAudioFile(file);
        setAudioError(null);
      }
    } else {
      setAudioFile(null);
      setAudioError('Audio file is required for Audio type.');
    }
  };
  const handelDeleteArticle = async () => {
    setDeleteLoader(true);
    setAnchorEl(null);
    try {
      const response = await API.DeleteArticle({
        orgId: orgId,
        articleId: articleId,
        groupId: grpId
      });

      if (response.status === 200) {
        toast.success('Article deleted Successfully');
        setDeleteLoader(false);
        setDelete(false);
        dispatch(articleActions.deleteArticle(articleId));
      } else {
        toast.error('Something went wrong');
        setDeleteLoader(false);
      }
    } catch (error) {
      // console.error('Failed to delete article', error);
      toast.error('Something went wrong');
    }
  };

  const handelOnClickPreviewArticleName = async (articleId: string) => {
    setArticleId(articleId);
    try {
      const response = await API.getAllArticleById({
        orgId: orgId,
        articleId: articleId,
        groupId: grpId
      });

      if (response && response.status === 200) {
        setArticleSingleList(response.data.article[0]);
        setOpenPreview(true);
      }
    } catch (error) {
      // console.error(error);
    }
    setAnchorEl(null);
  };

  const handleOpendelete = () => {
    setAnchorEl(null);
    setDelete(true);
  };

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>, articleId: string) => {
    setArticleId(articleId);
    setAnchorEl(event.currentTarget);
  };

  const handelOnClickPreview = async () => {
    try {
      const response = await API.getAllArticleById({
        orgId: orgId,
        articleId: articleId,
        groupId: grpId
      });

      if (response && response.status === 200) {
        setArticleSingleList(response.data.article[0]);
      }
    } catch (error) {
      // console.error(error);
    }
    setAnchorEl(null);
    setOpenPreview(true);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setAction('Add');
    setOpenForm(true);
    setVideoFile(null);
    reset();
    setCoverImageUrl(null);
    setEditCoverImg('');
    setEditorState(EditorState.createWithContent(ContentState.createFromText('')));
    setEditVideoUrl(null);
    setAudioFile(null);
    setEditAudioUrl(null);
  };

  const handleSwitchSecondChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setIsPublished(checked);
  };

  const handleSwitchChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    articleId: string
  ) => {
    const updatedArticleList = articleData.articleList.map((article) => {
      if (article.articleId === articleId) {
        return {
          ...article,
          isPublished: checked
        };
      }
      return article;
    });

    setArticleData((prevArticleData) => ({
      ...prevArticleData,
      articleList: updatedArticleList
    }));

    const formData = new FormData();
    formData.append('isPublished', checked.toString());

    try {
      const response = await API.editArticle({
        articleId: articleId,
        data: formData,
        orgId: orgId,
        groupId: grpId
      });

      if (response.status === 200) {
        dispatch(articleActions.updateArticle(response.data));
        // Handle success
        toast.success('Article Publish Status Updated Successfully');
      } else {
        // Handle failure
        toast.error('Failed to update Article Publish Status');
      }
    } catch (error) {
      // Handle error
      toast.error('Something went wrong');
    }
  };

  const handleCloseArticleForm = () => {
    setOpenForm(false);
    reset();
    setCoverImageUrl(null);
    setVideoFile(null);
    setEditAudioUrl(null);
    setEditCoverImg('');
  };

  const handleEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const htmlContent = stateToHTML(editorState.getCurrentContent());
    setValue('articleDescription', htmlContent);
    clearErrors('articleDescription');
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const photo = event.target.files ? event.target.files[0] : null;
    setCoverImageUrl(photo);
    // console.log(photo, 'Added Image');
  };

  const handelEditArticle = async () => {
    setAction('Edit');
    setAnchorEl(null);
    try {
      const response = await API.getAllArticleById({
        orgId: orgId,
        articleId: articleId,
        groupId: grpId
      });

      if (response && response.status === 200) {
        let data = response?.data?.article[0];
        for (const field in data) {
          setValue(field, data[field]);
        }
        const { articleDescription, isPublished, coverImageUrl, fileUrl } = data;
        setUrlName(fileUrl);
        if (/\.(mp4|webm|ogg|ogv)$/i.test(fileUrl)) {
          setVideoFile(fileUrl);
          setEditVideoUrl(fileUrl);
        }
        if (/\.(mp3|wav|ogg)$/i.test(fileUrl)) {
          setAudioFile(fileUrl);
          setEditAudioUrl(fileUrl);
        }
        setValue('articleDescription', articleDescription);
        setValue('coverImg', coverImageUrl);
        setIsPublished(isPublished);
        setEditCoverImg(coverImageUrl);
        const { contentBlocks } = convertFromHTML(articleDescription);
        const editorState = EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks));
        setEditorState(editorState);
      }
    } catch (error) {
      // console.error(error);
    }
    setOpenForm(true);
  };

  const handleRemoveImageFile = () => {
    setCoverImageUrl(null);
    const inputElement = document.getElementById('coverImgInput') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
    setEditCoverImg('');
  };
  // console.log(editCoverImg, 'editCoverImg==>');
  const handleRemoveAudioFile = () => {
    setAudioFile(null);
    setEditAudioUrl(null);
  };
  const handleRemoveVideoFile = () => {
    setVideoFile(null);
    setEditVideoUrl(null);
  };

  const validExtensions = ['.jpeg', '.png', '.jpg', '.gif']; // for cover Image

  function getValidExtension(coverImageUrl: string) {
    const extension = validExtensions.find((extension) => coverImageUrl.endsWith(extension));
    return extension ? extension : '';
  }

  const onSubmit: SubmitHandler<FieldValues> = async (value) => {
    setAddArticlesLoaer(true);

    const formData = new FormData();
    formData.append('articleName', value.articleName);
    formData.append('type', value.type);
    formData.append('authorName', value.authorName);

    if (coverImageUrl) {
      formData.append('coverImage', coverImageUrl);
    }

    formData.append('readTime', value.readTime);
    formData.append('accessFor', value.accessFor);
    formData.append('tags', value.tags);
    formData.append('articleDescription', value.articleDescription);
    formData.append('isPublished', isPublished.toString());

    if (action === 'Add') {
      if (videoFile) {
        formData.append('file', videoFile);
      }

      if (audioFile) {
        formData.append('file', audioFile);
      }
    }

    if (action === 'Add') {
      try {
        const response = await API.createArticle({
          data: formData,
          orgId: orgId,
          groupId: grpId
        });

        if (response.status === 200 && response.data.message === 'Article Created Successfully') {
          setAddArticlesLoaer(false);
          dispatch(articleActions.addArticle(response.data.createArticleResponse));

          if (orgId && grpId) {
            dispatch(fetchAllArticles({ orgId: orgId, groupId: grpId }));
          }

          toast.success('Article Created Successfully');
          setOpenForm(false);
          setCoverImageUrl(null);
          reset();
        } else if (
          response.status === 200 &&
          response.data.message === "You don't have permission to access this API"
        ) {
          toast.error("You don't have permission to Add Article");
          reset();
          setOpenForm(false);
        } else {
          throw new Error('Failed to create article');
        }
      } catch (error) {
        setAddArticlesLoaer(false);
        toast.error('Something went wrong');
      }
    }

    if (action === 'Edit') {
      try {
        const response = await API.editArticle({
          data: formData,
          orgId: orgId,
          articleId: articleId,
          groupId: grpId
        });
        if (response.status === 200) {
          setAddArticlesLoaer(false);
          dispatch(articleActions.updateArticle(response.data));

          toast.success('Article Updated Successfully');
          setOpenForm(false);
          setCoverImageUrl(null);
          reset();
        }
      } catch (error) {
        setAddArticlesLoaer(false);
        toast.error('Something went wrong');
      }
    }

    reset();
  };

  useEffect(() => {
    if (orgId && grpId) {
      dispatch(fetchAllArticles({ orgId: orgId, groupId: grpId }));
    }
  }, [orgId, grpId, dispatch]);

  const displayArticles = () => {
    if (allArticleData && allArticleData.ArticleList) {
      return (
        <TableBody>
          {allArticleData?.ArticleList.length > 0 ? (
            allArticleData?.ArticleList?.map((article) => (
              <TableRow key={article.articleId}>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {/* <Switch
                      // checked={article.isPublished}
                      checked={isPublished}
                      onChange={(event) => handleSwitchChange(event, !isPublished, article.articleId)}
                      // disabled={!article.isPublished}
                    /> */}
                    <Switch
                      checked={article.isPublished}
                      onChange={(event) => handleSwitchChange(event, !article.isPublished, article.articleId)}
                      // Rest of the code...
                    />

                    <img
                      src={article.coverImageUrl}
                      alt="contentimg"
                      style={{
                        padding: 0,
                        margin: 0,
                        width: '70px',
                        height: '47px',
                        marginRight: '10px',
                        borderRadius: '5px'
                      }}
                    />
                    <Typography
                      className={classes.overviewText}
                      sx={{
                        cursor: 'pointer'
                      }}
                      // onClick={() =>
                      //   handelOnClickPreviewArticleName(
                      //     _.get(article, "articleId")
                      //   )
                      // }
                      onClick={() => handelOnClickPreviewArticleName(article.articleId)}
                    >
                      {article.articleName.split(' ').length > 3
                        ? article.articleName.split(' ').slice(0, 3).join(' ')
                        : article.articleName}{' '}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    component="span"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    border={`1px solid ${appColors.gray1}`}
                    borderRadius={2}
                    height="21px"
                    marginRight={1}
                    width="49px"
                  >
                    <img src={thumbsupimg} style={{ width: '11px', height: '13px' }} alt="logo" />
                    <Typography
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      {article?.upVotes}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    component="span"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    border={`1px solid ${appColors.gray1}`}
                    borderRadius={2}
                    height="21px"
                    marginRight={1}
                    width="49px"
                  >
                    <img src={thumbsdownimg} style={{ width: '11px', height: '13px' }} alt="logo" />
                    <Typography
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      {article?.downVotes}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{article.type}</TableCell>
                <TableCell>{article.readTime}</TableCell>
                <TableCell>
                  <span style={{ display: 'flex' }}>
                    {article?.tags?.length > 0 &&
                      article.tags.slice(0, 1).map((tag, index) => (
                        <Typography key={index} className={classes.tagText}>
                          {tag}
                        </Typography>
                      ))}
                    {article?.tags?.length > 1 && <span />}
                  </span>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton
                    onClick={(event) => {
                      handleClickPopover(event, _.get(article, 'articleId'));
                    }}
                  >
                    <MoreVertIcon className="cursor-pointer" sx={{ color: '#152536' }} />
                  </IconButton>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '8px',
                        py: 1,
                        px: 3
                      }}
                    >
                      <Typography className={classes.listStyle} onClick={handelOnClickPreview}>
                        <img
                          src={previewicon}
                          alt="previewicon"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '15px',
                            height: '15px',
                            cursor: 'pointer',
                            marginRight: '10px'
                          }}
                        />
                        Preview
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '8px',
                        py: 1,
                        px: 3
                      }}
                    >
                      <Typography className={classes.listStyle} onClick={handelEditArticle}>
                        <img
                          src={pencil}
                          alt="pencil"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '25px',
                            height: '15px',
                            cursor: 'pointer',
                            marginRight: '10px'
                          }}
                        />
                        Edit
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '8px',
                        py: 1,
                        px: 3
                      }}
                    >
                      <Typography
                        className={classes.listStyle}
                        // sx={{ py: 1, px: 4 }}
                        onClick={handleOpendelete}
                      >
                        <img
                          src={delecticon}
                          alt="delecticon"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '25px',
                            height: '15px',
                            cursor: 'pointer',
                            marginRight: '10px'
                          }}
                        />
                        Delete
                      </Typography>
                    </Box>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <Typography variant="body2" className="text-center" component="span">
              No articles found.
            </Typography>
          )}
        </TableBody>
      );
    } else if (allArticleData === undefined) {
      return (
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell>
              <AppLoader height="40vh" />
            </TableCell>
          </TableRow>
        </TableHead>
      );
    } else {
      return (
        // <Box className="text-center align-items-center">
        //   {" "}
        //   <label className="text-center align-items-center">
        //     No Articles{" "}
        //   </label>{" "}
        // </Box>
        <TableHead>
          <TableRow>
            <TableCell className="text-center align-items-center">No Articles </TableCell>
          </TableRow>
        </TableHead>
      );
    }
  };

  // console.log('Hello');

  return (
    <div>
      <Box
        sx={{
          background: '#fff',
          border: '1px solid #EFF0F4',
          borderRadius: '8px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px'
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Open Sans',
              fontSize: '16px',
              fontWeight: '600',
              color: '#152536'
            }}
          >
            Content
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <img
              src={Filter}
              alt="filtericon"
              style={{
                padding: 0,
                margin: 0,
                width: '32px',
                height: '32px',
                marginRight: '10px',
                cursor: 'pointer'
              }}
            />
            <img
              onClick={handleClickOpen}
              src={pluscircle}
              alt="pluscircle"
              style={{
                padding: 0,
                margin: 0,
                width: '34px',
                height: '34px',
                marginRight: '6px',
                cursor: 'pointer'
              }}
            />
          </Box>
        </Box>
        <Divider />
        <TableContainer>
          <Table sx={{ Width: '100%' }} aria-label="simple table" className="tableBody">
            <TableHead>
              <TableRow>
                <TableCell>
                  {' '}
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                    {' '}
                    <Typography className={classes.tableHeadContent}>CONTENT</Typography>{' '}
                    <ArrowDownwardIcon
                      style={{
                        width: '15px',
                        height: '14px',
                        color: '#68717A'
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  {' '}
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                    {' '}
                    <Typography className={classes.tableHeadContent}>UPVOTES</Typography>{' '}
                    <ArrowUpwardIcon
                      style={{
                        width: '15px',
                        height: '14px',
                        color: '#68717A'
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell className={classes.tableHeadContent}>DOWNVOTES</TableCell>
                <TableCell style={{ textAlign: 'center' }} className={classes.tableHeadContent}>
                  CONTENT TYPE
                </TableCell>
                <TableCell className={classes.tableHeadContent}>READ TIME</TableCell>
                <TableCell className={classes.tableHeadContent}>TAGS</TableCell>
                <TableCell className={classes.tableHeadContent}>ACTION</TableCell>
              </TableRow>
            </TableHead>
            {displayArticles()}
          </Table>
        </TableContainer>
      </Box>{' '}
      {/* Add Edit Article Form */}
      <Dialog
        fullWidth
        open={openForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEnforceFocus
      >
        <DialogTitle id="alert-dialog-title" className="informationtext">
          {action === 'Edit' ? 'Edit Content' : 'Add Content'}

          <IconButton sx={{ float: 'right' }} onClick={handleCloseArticleForm}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              marginLeft: '-8px'
            }}
          >
            <Switch checked={isPublished} onChange={handleSwitchSecondChange} />
            <Typography
              sx={{
                fontFamily: 'Open Sans',
                fontSize: '14px',
                fontWeight: '400px',
                color: '#152536'
              }}
            >
              Visible to others
            </Typography>
          </Box>
          <Grid container spacing={2} className="editprofile">
            <Grid item xs={12}>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  marginBottom: '10px',
                  fontFamily: 'Open Sans',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#68717A'
                }}
              >
                Article name *
              </InputLabel>

              <Controller
                name="articleName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    name="articleName"
                    value={value || ''}
                    type="text"
                    placeholder="Article Name"
                    variant="outlined"
                    style={{ width: '100%' }}
                    onChange={onChange}
                    error={checkError('articleName')}
                    helperText={getError('articleName')?.toString()}
                  />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  marginBottom: '10px',
                  fontFamily: 'Open Sans',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#68717A'
                }}
              >
                Article type *
              </InputLabel>
              <FormControl fullWidth variant="outlined">
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={type}
                  render={({ field }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className="selectdrop"
                      {...field}
                      displayEmpty
                      error={!!errors.type}
                      onChange={(event) => {
                        field.onChange(event);
                      }}
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span
                              style={{
                                fontFamily: 'Open Sans',
                                fontSize: '14px',
                                fontWeight: '400',
                                color: '#68717A'
                              }}
                            >
                              Article type
                            </span>
                          );
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Article type </em>
                      </MenuItem>
                      <MenuItem value="Text">Text</MenuItem>
                      <MenuItem value="Audio">Audio</MenuItem>
                      <MenuItem value="Video">Video</MenuItem>
                    </Select>
                  )}
                />

                <FormHelperText style={{ color: 'red' }}>{getError('type')?.toString()}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  marginBottom: '10px',
                  fontFamily: 'Open Sans',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#68717A'
                }}
              >
                Read Time *
              </InputLabel>
              <FormControl fullWidth variant="outlined">
                <Controller
                  name="readTime"
                  control={control}
                  defaultValue={readTimeValue}
                  render={({ field }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className="selectdrop"
                      {...field}
                      displayEmpty
                      error={!!errors.readTime}
                      renderValue={(selected) => {
                        if (!selected) {
                          // return <em>Read Time </em>;
                          return (
                            <span
                              style={{
                                fontFamily: 'Open Sans',
                                fontSize: '14px',
                                fontWeight: '400',
                                color: '#68717A'
                              }}
                            >
                              Read Time
                            </span>
                          );
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="1 min">1 min</MenuItem>
                      <MenuItem value="2 mins">2 mins</MenuItem>
                      <MenuItem value="3 mins">3 mins</MenuItem>
                      <MenuItem value="4 mins">4 mins</MenuItem>
                      <MenuItem value="5 mins">5 mins</MenuItem>
                      <MenuItem value="10 mins">10 mins</MenuItem>
                      <MenuItem value="15 mins">15 mins</MenuItem>
                      <MenuItem value="15+ mins">15+ mins</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText style={{ color: 'red' }}>{getError('readTime')?.toString()}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <Box
              sx={{
                width: '100px',
                height: '63px',
                background: '#EFF0F4',
                marginRight: '10px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Controller
                name="coverImg"
                control={control}
                render={({ field }) => (
                  <Button component="label" fullWidth>
                    <input
                      id="coverImgInput"
                      name={field.name}
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const file = e.target.files[0];
                          const fileSize = file.size / 1024; // in KB
                          if (fileSize <= 100) {
                            handlePhotoChange(e);
                            field.onChange(file);
                            setError(''); // Reset error
                          } else {
                            setError('File size exceeds 100 KB');
                          }
                        }
                      }}
                    />
                    <img
                      src={cemeraimg}
                      alt="coverimg"
                      style={{
                        padding: 0,
                        margin: 0,
                        width: '24px',
                        height: '21px',
                        marginRight: '10px'
                      }}
                    />
                  </Button>
                )}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Open Sans',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '5px'
                }}
              >
                Cover Image
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Open Sans',
                  fontSize: '10px',
                  fontWeight: '600',
                  color: '#999999'
                }}
              >
                * Only JPG, PNG (max. 100 Kb)
              </Typography>
            </Box>
            {coverImageUrl && (
              <Box
                sx={{
                  width: '100px',
                  height: '63px',
                  margin: '0 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  marginLeft: '60px'
                }}
              >
                <img
                  src={URL.createObjectURL(coverImageUrl)}
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%'
                  }}
                  loading="lazy"
                  alt=""
                />

                <span>
                  {coverImageUrl.name.length > 10 &&
                  validExtensions.some((extension) => coverImageUrl.name.endsWith(extension))
                    ? coverImageUrl.name.slice(0, 6) + getValidExtension(coverImageUrl.name)
                    : coverImageUrl.name}
                  <span
                    className="text-danger Removetext"
                    onClick={handleRemoveImageFile}
                    style={{ cursor: 'pointer' }}
                  >
                    Remove
                  </span>
                </span>
              </Box>
            )}
            {editCoverImg && (
              <Box
                sx={{
                  width: '100px',
                  height: '63px',
                  margin: '0 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none'
                }}
              >
                <img
                  src={editCoverImg}
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%'
                  }}
                  loading="lazy"
                  alt=""
                />
              </Box>
            )}
            {editCoverImg && (
              <div>
                {typeof editCoverImg === 'string' && <p>{editCoverImg.substring(editCoverImg.lastIndexOf('/') + 1)}</p>}
                <span className="text-danger Removetext" onClick={handleRemoveImageFile} style={{ cursor: 'pointer' }}>
                  {' '}
                  Remove
                </span>
              </div>
            )}
            {error && <FormHelperText style={{ color: 'red' }}>{error} </FormHelperText>} {/* Display error message */}
            {!error && <FormHelperText style={{ color: 'red' }}>{getError('coverImg')?.toString()}</FormHelperText>}
          </Box>

          {watchArticleType === 'Video' && (
            <div>
              <div>
                {!videoFile && !editVideoUrl && (
                  <div
                    style={{
                      background: '#FFFFFF',
                      border: '1px dashed #DEDFDF',
                      borderRadius: '8px',
                      padding: '5px 46px 15px',
                      margin: '15px 0',
                      textAlign: 'center'
                    }}
                  >
                    <input
                      type="file"
                      id="file"
                      accept="video/mp4"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <IconButton>
                      <label htmlFor="file">
                        <img
                          src={upload}
                          alt="upload"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '25px',
                            height: '25px'
                          }}
                        />
                      </label>
                    </IconButton>
                    <div
                      style={{
                        fontFamily: 'Open Sans',
                        fontWeight: '600',
                        fontSize: '12px',
                        color: '#999999'
                      }}
                    >
                      <label htmlFor="file">
                        <span style={{ color: '#3D8BFD', fontSize: '14px' }}>Click to upload</span>
                      </label>
                      {' or drag '}
                      <br />
                      Article Video File (max. 100 MB)
                    </div>
                  </div>
                )}
                <div style={{ display: 'flex' }}>
                  <div style={{ borderRadius: '8px 8px 8px 8px' }}>
                    {videoFile && videoFile.type && videoFile.type.startsWith('video/') && (
                      <video
                        style={{ borderRadius: '8px 8px 8px 8px' }}
                        src={URL.createObjectURL(videoFile)}
                        width="320"
                        height="240"
                        controls
                      />
                    )}

                    {editVideoUrl && (
                      <video
                        style={{ borderRadius: '8px 8px 8px 8px' }}
                        src={
                          editVideoUrl
                            ? typeof editVideoUrl === 'string'
                              ? editVideoUrl
                              : URL.createObjectURL(editVideoUrl)
                            : undefined
                        }
                        width="320"
                        height="240"
                        controls
                      />
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Open Sans',
                      fontWeight: '600',
                      fontSize: '14px',
                      color: '#333333',
                      marginTop: '10px',
                      margin: 'auto',
                      marginLeft: '1%'
                    }}
                  >
                    <span>
                      {videoFile && videoFile.name ? videoFile.name : filename}
                      {videoFile && (
                        <span
                          className="text-danger Removetext"
                          onClick={handleRemoveVideoFile}
                          style={{ cursor: 'pointer' }}
                        >
                          {' '}
                          Remove
                        </span>
                      )}
                      {editVideoUrl instanceof File && editVideoUrl.name && <span>{editVideoUrl.name}</span>}
                      {editVideoUrl instanceof File && !editVideoUrl.name && <span>No file name available</span>}
                    </span>
                  </div>
                </div>
                {videoError && <FormHelperText style={{ color: 'red' }}>{videoError}</FormHelperText>}
              </div>
            </div>
          )}
          {watchArticleType === 'Audio' && (
            <div>
              {!audioFile && !editAudioUrl && (
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px dashed #DEDFDF',
                    borderRadius: '8px',
                    padding: '5px 46px 15px',
                    margin: '15px 0',
                    textAlign: 'center'
                  }}
                >
                  <input
                    type="file"
                    id="audioFile"
                    accept="audio/mp3"
                    onChange={handleAudioFileChange}
                    style={{ display: 'none' }}
                  />
                  <IconButton>
                    <label htmlFor="audioFile">
                      <img
                        src={upload}
                        alt="upload"
                        style={{
                          padding: 0,
                          margin: 0,
                          width: '25px',
                          height: '25px'
                        }}
                      />
                    </label>
                  </IconButton>
                  <div
                    style={{
                      fontFamily: 'Open Sans',
                      fontWeight: '600',
                      fontSize: '12px',
                      color: '#999999'
                    }}
                  >
                    <label htmlFor="audioFile">
                      <span style={{ color: '#3D8BFD', fontSize: '14px' }}>Click to upload</span>
                    </label>
                    {' or drag '}
                    <br />
                    Article Audio File (max. 100 MB)
                  </div>
                </div>
              )}

              <div style={{ display: 'flex' }}>
                <div style={{ borderRadius: '8px' }}>
                  {audioFile?.type?.startsWith('audio/') && (
                    <audio style={{ borderRadius: '8px' }} src={audioFile && URL.createObjectURL(audioFile)} controls>
                      Your browser does not support the audio element.
                    </audio>
                  )}

                  {editAudioUrl && (
                    <>
                      <audio
                        style={{ borderRadius: '8px' }}
                        src={
                          editAudioUrl
                            ? typeof editAudioUrl === 'string'
                              ? editAudioUrl
                              : URL.createObjectURL(editAudioUrl)
                            : undefined
                        }
                        controls
                      />
                      <p>{editAudioUrl.name}</p>
                    </>
                  )}
                </div>
                {audioFile && (
                  <div
                    style={{
                      fontFamily: 'Open Sans',
                      fontWeight: '600',
                      fontSize: '14px',
                      color: '#333333',
                      marginTop: '10px',
                      margin: 'auto',
                      marginLeft: '1%'
                    }}
                  >
                    <span>{watchArticleType === 'Audio' ? (audioFile.name ? audioFile.name : filename) : ''}</span>
                    <span
                      className="text-danger Removetext"
                      onClick={handleRemoveAudioFile}
                      style={{ cursor: 'pointer' }}
                    >
                      {' '}
                      Remove
                    </span>
                  </div>
                )}
              </div>
              {audioError && <FormHelperText style={{ color: 'red' }}>{audioError}</FormHelperText>}
            </div>
          )}
          <Grid container spacing={2} className="editprofile">
            <Grid item md={6}>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  marginBottom: '10px',
                  fontFamily: 'Open Sans',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#68717A'
                }}
              >
                Author name *
              </InputLabel>
              <FormControl fullWidth>
                <Controller
                  name="authorName"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      required
                      name="authorName"
                      value={value || ''}
                      type="text"
                      placeholder="Author Name"
                      variant="outlined"
                      style={{ width: '100%' }}
                      onChange={onChange}
                      error={checkError('authorName')}
                    />
                  )}
                />
                <FormHelperText style={{ color: 'red' }}>{getError('authorName')?.toString()}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  marginBottom: '10px',
                  fontFamily: 'Open Sans',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#68717A'
                }}
              >
                Who can view *
              </InputLabel>

              <FormControl fullWidth variant="outlined">
                <Controller
                  name="accessFor"
                  control={control}
                  defaultValue={viewFor}
                  render={({ field }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      placeholder="Select"
                      className="selectdrop"
                      {...field}
                      error={!!errors.accessFor}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span
                              style={{
                                fontFamily: 'Open Sans',
                                fontSize: '14px',
                                fontWeight: '400',
                                color: '#68717A'
                              }}
                            >
                              Who can view
                            </span>
                          );
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="Public">Public</MenuItem>
                      <MenuItem value="Private">Private</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText style={{ color: 'red' }}>{getError('accessFor')?.toString()}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  marginBottom: '10px',
                  fontFamily: 'Open Sans',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#68717A'
                }}
              >
                Tags *
              </InputLabel>
              <FormControl fullWidth className="ethnicity-field">
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      id="size-small-standard-multi"
                      size="small"
                      multiple // Enable selecting multiple tags
                      value={field.value || []} // Update value prop to be an array
                      onChange={(event, newValue) => {
                        setValue('tags', newValue);
                      }}
                      filterOptions={(options, params) => {
                        if (!Array.isArray(options)) {
                          options = [];
                        }
                        const filtered = options.filter(
                          (option) =>
                            typeof option === 'string' &&
                            option.toLowerCase().indexOf(params.inputValue.toLowerCase()) !== -1
                        );

                        if (params.inputValue !== '') {
                          filtered.push(`${params.inputValue}`);
                        }

                        return filtered;
                      }}
                      options={TagList || []}
                      getOptionLabel={(option) => option}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      freeSolo
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Select"
                          className="ethnicity-field"
                          error={checkError('tags')}
                        />
                      )}
                    />
                  )}
                />
                <FormHelperText style={{ color: 'red' }}>{getError('tags')?.toString()}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  marginBottom: '10px',
                  fontFamily: 'Open Sans',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#68717A'
                }}
              >
                Article Description *
              </InputLabel>
              <Box
                style={{
                  width: '100%'
                }}
              >
                <Controller
                  name="articleDescription"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <Editor
                        editorStyle={{
                          margin: '0px',
                          paddingLeft: '3px',
                          fontFamily: 'Open Sans'
                        }}
                        wrapperStyle={{
                          padding: 0,
                          border: '1px solid black',
                          borderRadius: '5px'
                        }}
                        toolbarStyle={toolBarStyle}
                        // toolbar={reactDraftWysiwygToolbarOptionsarticle()}
                        editorClassName="editorClassName word-wrap"
                        editorState={editorState}
                        onEditorStateChange={handleEditorStateChange}
                        placeholder="Write Description about article"
                        toolbarClassName="toolbar-class custom-modal"
                        wrapperClassName="wrapperClassName wrapper-class custom-header-dropdown"
                        // error={getError("articleDescription") ? true : false}
                      />

                      <p style={{ color: 'red' }}> {getError('articleDescription')?.toString()}</p>
                    </>
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: '15px 0', justifyContent: 'center' }}>
          <LoadingButton
            style={
              addArticlesLoader
                ? {}
                : {
                    fontFamily: 'Open Sans',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#fff',
                    background: '#152536',
                    borderRadius: '8px',
                    width: '560px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }
            }
            loading={addArticlesLoader}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <ArticlePreview openPreview={openPreview} setOpenPreview={setOpenPreview} articleSingleList={articleSingleList} />
      <ArticleDeletDialog
        openDelete={openDelete}
        setDelete={setDelete}
        deleteLoader={deleteLoader}
        handleDelete={handelDeleteArticle}
      />
    </div>
  );
};

export default ContentSettings;
