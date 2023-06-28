/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import { Box, Button, Divider, Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
// import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { makeStyles } from "@mui/styles";
import { IArticleData } from "../LibraryTab";
import iconview from "./../../../../../assets/images/iconview.svg";
// import thumbsupimg from "./../../../../../assets/images/thumbsupimg.svg";
// import thumbsdowmwhite from "./../../../../../assets/images/thumbsdowmwhite.svg";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import React from "react";
import thumbsupgreyimg from "./../../../../../assets/images/thumbsupgreyimg.svg";
import { Spinner } from "react-bootstrap";

interface LibraryDetailsProps {
  articleDetails: IArticleData | undefined;
  selectedArticleId: string;
  handleLikeUp: () => Promise<void>;
  handleLikeDown: () => Promise<void>;
  likeStatus: string;
  isVoted: any;
  loading: boolean;
  loadingDown: boolean;
}

const useStyles = makeStyles({
  icon: {
    fontSize: "30px",
    marginRight: "8px",
    cursor: "pointer",
    color: "blue",
  },
});

const LibraryDetails = ({
  articleDetails,
  // selectedArticleId,
  handleLikeUp,
  handleLikeDown,
  likeStatus,
  isVoted,
  loading,
  loadingDown,
}: LibraryDetailsProps) => {
  const classes = useStyles();

  // const [isClicked, setIsClicked] = useState(false);

  // const handleClick = () => {
  //   setIsClicked(true);
  // };

  // console.log(articleDetails, "articleDetails");
  return (
    <div>
      {articleDetails ? (
        <Box
          sx={{
            background: "#FFFFFF",
            border: "1px solid #EFF0F4",
            borderRadius: "8px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            marginTop: "20px",
            padding: "16px",
            height: "calc(100vh - 110px)!important",
            overflow: "auto",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontFamily: "Open Sans",
              fontWeight: "700",
              color: "#152536",
            }}
          >
            {articleDetails?.articleName}
          </Typography>
          {articleDetails.accessFor !== "Public" && (
            <Button
              sx={{
                height: "20px",
                border: "1px solid #E99940",
                borderRadius: "5px",
                color: "#E99940",
                fontFamily: "Open Sans",
                margin: "10px 0",
                fontSize: "12px",
                textTransform: "capitalize",
                fontWeight: "600",
              }}
            >
              Community Exclusive Content
            </Button>
          )}

          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              fontFamily: "Open Sans",
              color: "#68717A",
            }}
          >
            {articleDetails?.createdAt && (
              <span>
                {new Date(articleDetails.createdAt * 1000).toLocaleDateString()}
              </span>
            )}
            • {articleDetails?.readTime} read
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
            {articleDetails ? (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {articleDetails.tags.map((ele: any, index: number) => (
                  <React.Fragment key={ele}>
                    <Button
                      sx={{
                        height: "26px",
                        background: " #EFF0F4",
                        borderRadius: "29px",
                        color: "#68717A",
                        fontFamily: "Open Sans",
                        marginRight: "10px",
                        margin: "1px",
                        fontSize: "14px",
                        textTransform: "capitalize",
                        fontWeight: "400",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {ele}
                    </Button>
                    {(index + 1) % 5 === 0 && <br />}{" "}
                    {/* Add line break after every 5th value */}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              ""
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "10px 0",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50px",
                    height: "50px",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50px",
                      height: "50px",
                      background: "#fff",
                      borderRadius: "50%",
                    }}
                  >
                    <img
                      src={articleDetails?.coverImageUrl}
                      alt="womencircle"
                      style={{
                        padding: 0,
                        margin: 0,
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#152536",
                }}
              >
                {articleDetails?.authorName}
              </Typography>
            </Box>
          </Box>

          <Divider />
          <Box sx={{ margin: "15px 0" }}>
            {articleDetails?.type === "Text" && (
              <img
                src={articleDetails?.coverImageUrl}
                alt="resumeimg"
                style={{
                  padding: 0,
                  margin: 0,
                  width: "100%",
                  // height: "310px",
                  height: "auto",
                  objectFit: "contain",
                  // objectFit: "cover",
                }}
              />
            )}

            {articleDetails?.type === "Video" && (
              <div style={{ width: "100%", height: "100vh" }}>
                <video style={{ width: "100%", height: "100%" }} controls>
                  <source src={articleDetails?.fileUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {articleDetails?.type === "Audio" && (
              <div className="w-100">
                <audio controls preload="auto">
                  <source src={articleDetails?.fileUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                fontFamily: "Open Sans",
                color: "#68717A",
                marginTop: "15px",
              }}
              component="div"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: articleDetails
                    ? articleDetails.articleDescription
                    : "",
                }}
              ></div>
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", columnGap: "10px", marginBottom: "10px" }}
          >
            <Button
              sx={{
                border: "1px solid #CED4DA",
                borderRadius: "29px",
                height: "29px",
                color: "#68717A",
              }}
              // onClick={handleClick}
            >
              <img
                src={thumbsupgreyimg}
                alt="thumbsupgreyimg"
                style={{
                  padding: 0,
                  margin: 0,
                  width: "12px",
                  height: "15px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              />
              {articleDetails?.upVotes}
            </Button>
            <Button
              sx={{
                border: "1px solid #CED4DA",
                borderRadius: "29px",
                height: "29px",
                color: "#68717A",
              }}
            >
              <img
                src={thumbsupgreyimg}
                alt="filtericon"
                style={{
                  padding: 0,
                  margin: 0,
                  width: "12px",
                  height: "15px",
                  cursor: "pointer",
                  marginRight: "10px",
                  transform: "rotate(180deg)",
                }}
              />
              {articleDetails?.downVotes}
            </Button>
            <Button
              sx={{
                border: "1px solid #CED4DA",
                borderRadius: "29px",
                height: "29px",
                color: "#68717A",
              }}
            >
              <img
                src={iconview}
                alt="filtericon"
                style={{
                  padding: 0,
                  margin: 0,
                  width: "12px",
                  height: "15px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              />
              {articleDetails?.views}
            </Button>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: "18px", fontWeight: "400", color: "#152536" }}
            >
              Was this content helpful?
            </Typography>
            <Box sx={{ display: "flex", columnGap: "15px" }}>
              {/* {likeStatus === "upVoted" ? (
                <img
                  className={classes.icon}
                  onClick={handleLikeUp}
                  src={thumbsdowmwhite}
                  alt="filtericon"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "20px",
                    height: "24px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                />
              ) : (
                // <ThumbUpIcon className={classes.icon} onClick={handleLikeUp} />
                <img
                  className={classes.icon}
                  onClick={handleLikeUp}
                  src={thumbsdowmwhite}
                  alt="thumbsdowmwhite"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "20px",
                    height: "24px",
                    cursor: "pointer",
                  }}
                />

                // <ThumbUpOffAltIcon
                //   className={classes.icon}
                //   onClick={handleLikeUp}
                // />
              )}

              {likeStatus === "downVoted" ? (
                // <ThumbDownAltIcon
                //   className={classes.icon}
                //   onClick={handleLikeDown}
                // />

                <img
                  className={classes.icon}
                  onClick={handleLikeDown}
                  src={thumbsupimg}
                  alt="thumbsdowmwhite"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "20px",
                    height: "24px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                // <ThumbDownOffAltIcon
                //   className={classes.icon}
                //   onClick={handleLikeDown}
                // />
                <img
                  className={classes.icon}
                  onClick={handleLikeDown}
                  src={thumbsupimg}
                  alt="filtericon"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "20px",
                    height: "24px",
                    cursor: "pointer",
                  }}
                />
              )} */}

              {loading ? (
                <Spinner
                  animation="border"
                  size="sm"
                  style={{ marginRight: "8px", fontSize: "10px" }}
                />
              ) : likeStatus === "upVoted" ? (
                <ThumbUpIcon className={classes.icon} onClick={handleLikeUp} />
              ) : (
                <ThumbUpOffAltIcon
                  className={classes.icon}
                  onClick={handleLikeUp}
                />
              )}

              {loadingDown ? (
                <Spinner
                  animation="border"
                  size="sm"
                  style={{ marginRight: "8px", fontSize: "10px" }}
                />
              ) : likeStatus === "downVoted" ? (
                <ThumbDownAltIcon
                  className={classes.icon}
                  onClick={handleLikeDown}
                />
              ) : (
                <ThumbDownOffAltIcon
                  className={classes.icon}
                  onClick={handleLikeDown}
                />
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        // <AppLoader height="50vh" />
        ""
      )}
    </div>
  );
};

export default LibraryDetails;
