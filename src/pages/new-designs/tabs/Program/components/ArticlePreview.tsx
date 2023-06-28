import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { AppLoader } from '../../../../../components/AppLoader';

interface Props {
  openPreview: boolean;
  setOpenPreview: any;
  articleSingleList: any;
}

const ArticlePreview = ({ openPreview, setOpenPreview, articleSingleList }: Props) => {
  return (
    <div>
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        {articleSingleList ? (
          <>
            <DialogTitle
              id="alert-dialog-title"
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: '22px',
                fontWeight: '600',
                color: '#152536'
              }}
            >
              Article
              <IconButton onClick={() => setOpenPreview(false)} sx={{ float: 'right' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent>
              <Box>
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontFamily: 'Open Sans',
                    fontWeight: '700',
                    color: '#152536',
                    textAlign: 'left'
                  }}
                  component="div"
                >
                  <h2>{articleSingleList ? articleSingleList.articleName : ''}</h2>
                </Typography>
                <Button
                  style={{
                    height: '20px',
                    border: '1px solid #E99940',
                    borderRadius: '5px',
                    color: '#E99940',
                    fontFamily: 'Open Sans',
                    margin: '10px 0',
                    fontSize: '12px',
                    textTransform: 'capitalize',
                    fontWeight: '600'
                  }}
                >
                  Visual indicator Text
                </Button>

                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: 'Open Sans',
                    color: '#68717A'
                  }}
                >
                  {articleSingleList?.createdAt && (
                    <span>
                      {new Date(articleSingleList.createdAt * 1000).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  )}
                  <span> • </span> {articleSingleList?.readTime} read
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '10px 0'
                  }}
                >
                  {articleSingleList ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {articleSingleList.tags.map((ele: any, index: number) => (
                        <React.Fragment key={ele}>
                          <Button
                            // key={ele}
                            style={{
                              height: '26px',
                              background: ' #EFF0F4',
                              borderRadius: '29px',
                              color: '#68717A',
                              fontFamily: 'Open Sans',
                              marginRight: '10px',
                              margin: '1px',
                              fontSize: '14px',
                              textTransform: 'capitalize',
                              fontWeight: '400',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {ele}
                          </Button>
                          {(index + 1) % 5 === 0 && <br />} {/* Add line break after every 5th value */}
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '20px 0'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: 'Open Sans',
                      color: '#152536'
                    }}
                  >
                    {articleSingleList?.authorName}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ margin: '20px 0' }}>
                  {articleSingleList?.type === 'Text' && (
                    <img
                      src={articleSingleList?.coverImageUrl}
                      alt="resumeimg"
                      style={{
                        padding: 0,
                        margin: 0,
                        width: '100%',
                        // height: "310px",
                        // objectFit: "cover",
                        height: 'auto',
                        objectFit: 'contain',
                        // border-radius: 8px 8px 0px 0px;
                        borderRadius: '8px 8px 8px 8px',
                        paddingBottom: '5px'
                      }}
                    />
                  )}

                  {articleSingleList?.type === 'Video' && (
                    <div style={{ width: '100%', height: '100vh' }}>
                      <video style={{ width: '100%', height: '100%' }} controls>
                        <source
                          src={articleSingleList?.fileUrl} // url for the video file
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}

                  {articleSingleList?.type === 'Audio' && (
                    <div className="w-100">
                      <audio controls>
                        <source src={articleSingleList?.fileUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}

                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: 'Open Sans',
                      color: '#6C757D',
                      marginBottom: '15px'
                    }}
                    component="div"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: articleSingleList ? articleSingleList.articleDescription : ''
                      }}
                    />
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
          </>
        ) : (
          <AppLoader />
        )}
      </Dialog>
    </div>
  );
};

export default ArticlePreview;
