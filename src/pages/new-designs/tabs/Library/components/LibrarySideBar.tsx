/* eslint-disable no-duplicate-imports */
import { Box, Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';
import { IArticleData } from '../LibraryTab';
import Filter from './../../../../../assets/images/Filter.svg';
import React from 'react';

interface articleId {
  articleId: string;
}
interface Props {
  onClick: (data: articleId) => void;
  allArticleData: IArticleData[];
  selectedArticleId: string;
}

const LibrarySideBar: FC<Props> = ({ onClick, allArticleData, selectedArticleId }: Props) => {
  const useStyles = makeStyles({
    memberCommonText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    LibraryOverviewText: {
      fontFamily: 'Open Sans',
      fontSize: '16px',
      fontWeight: '600',
      color: '#000000',
      paddingLeft: '10px'
    },
    LibrarySecondText: {
      fontFamily: 'Open Sans',
      fontSize: '14px',
      fontWeight: '400',
      color: '#68717A',
      paddingLeft: '10px'
    }
  });

  const classes = useStyles();
  return (
    <div>
      <Box
        sx={{
          background: '#fff',
          borderRight: '1px solid #EFF0F4',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 100px)!important',
          overflow: 'auto',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
        }}
      >
        <Box sx={{ padding: '13px' }} className={classes.memberCommonText}>
          <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px' }}>
            <b> Library</b>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>All ({allArticleData?.length})</Typography>
            <img
              src={Filter}
              alt="filtericon"
              style={{
                padding: 0,
                margin: 0,
                width: '34px',
                height: '34px',

                cursor: 'pointer',
                marginLeft: '10px'
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            cursor: 'pointer'
          }}
        >
          {allArticleData
            ? allArticleData.map((ele) => (
                <React.Fragment key={ele.articleId}>
                  <Box
                    sx={{ display: 'flex', padding: '13px' }}
                    onClick={() => onClick(ele)}
                    className={ele.articleId === selectedArticleId ? 'activeArticle activeArticlecolour' : ''}
                  >
                    <img
                      src={ele?.coverImageUrl}
                      alt="resumeimg"
                      style={{
                        padding: 0,
                        margin: 0,
                        width: '100px',
                        height: '79px',
                        objectFit: 'cover',
                        marginRight: '10px',
                        borderRadius: '5px'
                      }}
                    />

                    <Box>
                      <Typography className={classes.LibraryOverviewText}>
                        <span className={ele.articleId === selectedArticleId ? ' activeArticlecolour' : ''}>
                          {ele?.articleName.length > 35 ? ele.articleName.slice(0, 35) + '...' : ele.articleName}{' '}
                        </span>
                      </Typography>
                      <Typography className={classes.LibrarySecondText}>
                        <span className={ele.articleId === selectedArticleId ? ' activeArticlecolour' : ''}>
                          {ele?.createdAt && (
                            <span>
                              {new Date(ele.createdAt * 1000).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          )}
                          {/* {ele?.readTime} min red */}
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                </React.Fragment>
              ))
            : ''}
        </Box>
      </Box>
    </div>
  );
};

export default LibrarySideBar;
