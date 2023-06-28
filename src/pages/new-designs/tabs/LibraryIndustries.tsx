import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Filter from "../../../assets/images/Filter.svg";
import { makeStyles } from "@mui/styles";
import resumeimg from "../../../assets/images/resumeimg.svg";
import industriesimg from "../../../assets/images/industriesimg.svg";
import womenimg from "../../../assets/images/womenimg.svg";
import thumbsupimg from "../../../assets/images/thumbsupimg.svg";
import { useNavigate } from "react-router-dom";

const LibraryIndustries = () => {
  const useStyles = makeStyles({
    memberCommonText: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    LibraryOverviewText: {
      fontFamily: "Open Sans !important",
      fontSize: "15px !important",
      fontWeight: "600 !important",
      color: "#000000 !important",
    },
    LibrarySecondText: {
      fontFamily: "Open Sans !important",
      fontSize: "14px !important",
      fontWeight: "400 !important",
      color: "#68717A !important",
    },
  });
  const navigate = useNavigate();

  const classes = useStyles();
  return (
    <Box sx={{ display: "flex", background: "#E5E5E5" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box
            sx={{
              background: "#fff",
              borderRight: "1px solid #EFF0F4",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <Box sx={{ padding: "13px" }} className={classes.memberCommonText}>
              <Typography>Community</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>All (918)</Typography>
                <img
                  src={Filter}
                  alt="filtericon"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "34px",
                    height: "34px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                />
              </Box>
            </Box>
            <Box sx={{}}>
              <Box sx={{ display: "flex", padding: "13px" }}>
                <img
                  src={resumeimg}
                  alt="resumeimg"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100px",
                    height: "79px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <Box>
                  <Typography className={classes.LibraryOverviewText}>
                    Overview of Top US Industries in 2022
                  </Typography>
                  <Typography className={classes.LibrarySecondText}>
                    4:06
                  </Typography>
                </Box>
              </Box>
              <Divider />

              <Box
                sx={{ display: "flex", padding: "13px", background: "#0082B6" }}
              >
                <img
                  src={industriesimg}
                  alt="resumeimg"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100px",
                    height: "79px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <Box>
                  <Typography
                    onClick={() => navigate("/app/libraryindustries")}
                    className={classes.LibraryOverviewText}
                    sx={{ color: "#fff !important" }}
                  >
                    Identifying industries you could work in
                  </Typography>
                  <Typography
                    sx={{ color: "#fff !important" }}
                    className={classes.LibrarySecondText}
                  >
                    4:06
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", padding: "13px" }}>
                <img
                  src={resumeimg}
                  alt="resumeimg"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100px",
                    height: "79px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <Box>
                  <Typography className={classes.LibraryOverviewText}>
                    Resume writing for graduating seniors
                  </Typography>
                  <Typography className={classes.LibrarySecondText}>
                    3 min read | by Ronan Wall
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", padding: "13px" }}>
                <img
                  src={industriesimg}
                  alt="resumeimg"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100px",
                    height: "79px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <Box>
                  <Typography className={classes.LibraryOverviewText}>
                    Overview of Top US Industries in 2022
                  </Typography>
                  <Typography className={classes.LibrarySecondText}>
                    4:06
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", padding: "13px" }}>
                <img
                  src={resumeimg}
                  alt="resumeimg"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100px",
                    height: "79px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <Box>
                  <Typography className={classes.LibraryOverviewText}>
                    Overview of Top US Industries in 2022
                  </Typography>
                  <Typography className={classes.LibrarySecondText}>
                    4:06
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box
            sx={{
              background: "#FFFFFF",
              border: "1px solid #EFF0F4",
              borderRadius: "8px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              marginTop: "15px",
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
              Identifying industries you could work in
            </Typography>
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
              Visual indicator Text
            </Button>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                fontFamily: "Open Sans",
                color: "#68717A",
              }}
            >
              August 10, 2022 • 28 min read
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", margin: "10px 0" }}
            >
              <Button
                sx={{
                  height: "26px",
                  background: " #EFF0F4",
                  marginRight: "10px",
                  borderRadius: "29px",
                  color: "#68717A",
                  fontFamily: "Open Sans",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  fontWeight: "400",
                }}
              >
                Job search
              </Button>
              <Button
                sx={{
                  height: "26px",
                  background: " #EFF0F4",
                  borderRadius: "29px",
                  color: "#68717A",
                  fontFamily: "Open Sans",
                  marginRight: "10px",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  fontWeight: "400",
                }}
              >
                Industries
              </Button>
              <Button
                sx={{
                  height: "26px",
                  background: " #EFF0F4",
                  borderRadius: "29px",
                  color: "#68717A",
                  fontFamily: "Open Sans",
                  marginRight: "10px",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  fontWeight: "400",
                }}
              >
                Workplace readiness
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "20px 0",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ marginRight: "6px" }}>
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
                        src={womenimg}
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
                  Amy Rodriguez
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  columnGap: "10px",
                  marginBottom: "10px",
                }}
              >
                <Button
                  sx={{
                    border: "1px solid #CED4DA",
                    borderRadius: "29px",
                    height: "29px",
                    color: "#68717A",
                  }}
                >
                  <img
                    src={thumbsupimg}
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
                  6.2k
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
                    src={thumbsupimg}
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
                  29K
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
                    src={thumbsupimg}
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
                  Share
                </Button>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ margin: "20px 0" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#6C757D",
                  marginBottom: "15px",
                }}
              >
                Industry research, industry intelligence, industry information,
                industry analysis, market research, business intelligence …
                there are lots of terms that get lumped together.
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#6C757D",
                  marginBottom: "15px",
                }}
              >
                While they may not all mean exactly the same thing, industry
                research is generally a collection of information detailing
                economic, market and (sometimes) political factors that
                influence industries, which in turn affect sectors and
                economies.
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#6C757D",
                }}
              >
                Ok, great. But, let’s back up a second … what is an industry?
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <span
                style={{
                  fontSize: "35px",
                  fontWeight: "700",
                  marginRight: "10px",
                  color: "#ABB5BE",
                }}
              >
                |
              </span>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Open Sans",
                  color: "#54595E",
                }}
              >
                An industry is a group of enterprises primarily engaged in the
                same kind of economic activity regardless of their types of
                ownership.
              </Typography>
            </Box>

            <Box sx={{ margin: "20px 0" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#6C757D",
                  marginBottom: "15px",
                }}
              >
                So, companies and enterprises roll up into industries and
                industries roll up into sectors, which are larger parts of the
                economy.
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#6C757D",
                  marginBottom: "15px",
                }}
              >
                Let’s look at an example for a breakdown in the United States
                Manufacturing sector.
              </Typography>
            </Box>

            <Box>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", height: "25px" }}
              >
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: "600",
                    marginRight: "10px",
                    color: "#6C757D",
                  }}
                >
                  .
                </span>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    fontFamily: "Open Sans",
                    color: "#6C757D",
                  }}
                >
                  Sector (2 digit): Manufacturing
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", height: "25px" }}
              >
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: "600",
                    marginRight: "10px",
                    color: "#6C757D",
                  }}
                >
                  .
                </span>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    fontFamily: "Open Sans",
                    color: "#6C757D",
                  }}
                >
                  Subsector (3 digit): Food Manufacturing
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", height: "25px" }}
              >
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: "600",
                    marginRight: "10px",
                    color: "#6C757D",
                  }}
                >
                  .
                </span>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    fontFamily: "Open Sans",
                    color: "#6C757D",
                  }}
                >
                  Industry Group (4 digit): Animal Food Manufacturing
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", height: "25px" }}
              >
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: "600",
                    marginRight: "10px",
                    color: "#6C757D",
                  }}
                >
                  .
                </span>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    fontFamily: "Open Sans",
                    color: "#6C757D",
                  }}
                >
                  Industry (5 digit): Animal Food Production
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", height: "25px" }}
              >
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: "600",
                    marginRight: "10px",
                    color: "#6C757D",
                  }}
                >
                  .
                </span>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    fontFamily: "Open Sans",
                    color: "#6C757D",
                  }}
                >
                  Industry (6 digit): Dog and Cat Food Manufacturing
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", height: "25px" }}
              >
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: "600",
                    marginRight: "10px",
                    color: "#6C757D",
                  }}
                >
                  .
                </span>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    fontFamily: "Open Sans",
                    color: "#6C757D",
                  }}
                >
                  Industry (6 digit): Other Animal Food Manufacturing
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                fontFamily: "Open Sans",
                color: "#6C757D",
                margin: "20px 0",
              }}
            >
              Individual companies are classified into an industry based on
              their largest source of revenue. For example, while a brewery
              might operate a small restaurant that contributes a small
              percentage to their overall revenues, the company would be
              classified in the brewery industry by most classification
              systems.We’ll get into more detail about industry classification
              systems a little further down.
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Open Sans",
                  color: "#54595E",
                }}
              >
                Back to industry research…
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#6C757D",
                  margin: "15px 0",
                }}
              >
                When someone is seeking industry research, they are likely
                looking for information about a particular industry (or set of
                industries) in order to:
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    height: "25px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: "600",
                      marginRight: "10px",
                      color: "#6C757D",
                    }}
                  >
                    .
                  </span>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      fontFamily: "Open Sans",
                      color: "#6C757D",
                    }}
                  >
                    Create a business plan, a strategic plan or a sales and
                    marketing plan
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    height: "25px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: "600",
                      marginRight: "10px",
                      color: "#6C757D",
                    }}
                  >
                    .
                  </span>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      fontFamily: "Open Sans",
                      color: "#6C757D",
                    }}
                  >
                    Decide on a new market to enter
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    height: "25px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: "600",
                      marginRight: "10px",
                      color: "#6C757D",
                    }}
                  >
                    .
                  </span>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      fontFamily: "Open Sans",
                      color: "#6C757D",
                    }}
                  >
                    Understand a client’s industry’s operating environment
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    height: "25px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: "600",
                      marginRight: "10px",
                      color: "#6C757D",
                    }}
                  >
                    .
                  </span>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      fontFamily: "Open Sans",
                      color: "#6C757D",
                    }}
                  >
                    Understand the industry growth prospects of investment
                    opportunities
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    height: "25px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: "600",
                      marginRight: "10px",
                      color: "#6C757D",
                    }}
                  >
                    .
                  </span>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      fontFamily: "Open Sans",
                      color: "#6C757D",
                    }}
                  >
                    Assess the industry risk of lending prospect
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Open Sans",
                  color: "#54595E",
                  margin: "15px 0",
                }}
              >
                Where can you find industry information?
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#6C757D",
                  margin: "15px 0",
                }}
              >
                A lot of information can be found online about an industry –
                there are industry associations and trade groups, industry
                consultants, lobbyists, company websites that may contain
                industry information, news articles, hird-party companies that
                perform industry research and more.
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#6C757D",
                }}
              >
                However, it’s hard to know what is accurate, unbiased, and
                up-to-date when searching through online search results.
              </Typography>
            </Box>
            <Box sx={{ margin: "15px 0" }}>
              <img
                src={womenimg}
                alt="articalimg"
                style={{
                  padding: 0,
                  margin: 0,
                  width: "465px",
                  height: "228px",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Open Sans",
                  color: "#54595E",
                }}
              >
                Industry Research vs. Market Research
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#6C757D",
                  margin: "15px 0",
                }}
              >
                While many of the terms mentioned at the beginning of this
                article could be used interchangeably, one to keep separate is
                market research.
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#6C757D",
                  margin: "15px 0",
                }}
              >
                For some, market research conjures up images of panels of people
                taste-testing the newest noodle bowl or smelling a new
                fragrance. And while this is one area of market research, in the
                context of industry research, market research is a study of
                groups of potential customers broken down by geography,
                demographics, psychographics (attitudes, interests, etc.), or
                any combination of those.
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#6C757D",
                  margin: "15px 0",
                }}
              >
                While conducting market research analysis can go hand-in-hand
                with industry research, market research usually looks at:
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    height: "25px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: "600",
                      marginRight: "10px",
                      color: "#6C757D",
                    }}
                  >
                    .
                  </span>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      fontFamily: "Open Sans",
                      color: "#6C757D",
                    }}
                  >
                    Size of market (like total addressable market and market
                    share)
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    height: "25px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: "600",
                      marginRight: "10px",
                      color: "#6C757D",
                    }}
                  >
                    .
                  </span>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      fontFamily: "Open Sans",
                      color: "#6C757D",
                    }}
                  >
                    Customer behaviour
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    height: "25px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: "600",
                      marginRight: "10px",
                      color: "#6C757D",
                    }}
                  >
                    .
                  </span>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      fontFamily: "Open Sans",
                      color: "#6C757D",
                    }}
                  >
                    Market trends
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    height: "25px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: "600",
                      marginRight: "10px",
                      color: "#6C757D",
                    }}
                  >
                    .
                  </span>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      fontFamily: "Open Sans",
                      color: "#6C757D",
                    }}
                  >
                    The aforementioned demographics, geography and
                    psychographics
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Open Sans",
                  color: "#6C757D",
                  margin: "10px 0 0",
                }}
              >
                If you’re looking for industry research, be sure that’s what you
                actually find, and don’t get it confused with market
                information.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{
              background: "#FFFFFF",
              border: "1px solid #EFF0F4",
              borderRadius: "8px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              marginTop: "20px",
              marginRight: "15px",
              height: "100%",
              overflow: "auto",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "Open Sans",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#152536",
                  padding: "13px",
                }}
              >
                Recommended Content
              </Typography>

              <Divider />

              <Box sx={{ display: "flex", padding: "13px" }}>
                <img
                  src={resumeimg}
                  alt="resumeimg"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100px",
                    height: "79px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <Box>
                  <Typography className={classes.LibraryOverviewText}>
                    Overview of Top US Industries in 2022
                  </Typography>
                  <Typography className={classes.LibrarySecondText}>
                    4:06
                  </Typography>
                </Box>
              </Box>
              <Divider />

              <Box sx={{ display: "flex", padding: "13px" }}>
                <img
                  src={industriesimg}
                  alt="resumeimg"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100px",
                    height: "79px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <Box>
                  <Typography className={classes.LibraryOverviewText}>
                    Overview of Top US Industries in 2022
                  </Typography>
                  <Typography className={classes.LibrarySecondText}>
                    4:06
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", padding: "13px" }}>
                <img
                  src={resumeimg}
                  alt="resumeimg"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100px",
                    height: "79px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <Box>
                  <Typography className={classes.LibraryOverviewText}>
                    Overview of Top US Industries in 2022
                  </Typography>
                  <Typography className={classes.LibrarySecondText}>
                    4:06
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LibraryIndustries;
