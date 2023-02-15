import React from "react";
import { makeStyles } from "@mui/styles";
import { TopNavBar } from "../../components";
import { useParams } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  circularProgressClasses,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { useLazyPerformanceTestReportQuery } from "../../redux/services";
import { AccordionCmp } from "./accordionCmp";

// import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
// import CircleIcon from '@mui/icons-material/Circle';
// import SquareIcon from '@mui/icons-material/Square';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "70px",
    // backgroundColor: "#f9f9f9",
    // backgroundImage: "url('/images/jpg/signInSignUpBg.png')",
    // backgroundRepeat: "repeat-y",
    // backgroundSize: 'cover'
  },
  ParentDiv: {
    display: "flex",
    flexDirection: "column",
    // alignItems: 'center',
    // height: '90vh',
    width: "100%",
    // backgroundColor: "#f9f9f9",
    // backgroundImage: "url('/images/jpg/signInSignUpBg.png')",
    // backgroundRepeat: "repeat-y",
    // backgroundSize: 'auto'
  },
  paperErr: {
    width: "90%",
    backgroundColor: "#ffffff",
    height: "90vh",
    overflow: "auto",
  },
  errLoading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
  notAvailable: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
  bddAcord: {
    padding: "14px",
  },
  heading: {
    // background: "#f1f1f1",
    "&:hover": { "-webkit-transform": "scale(1.2)", color: "#2fe678" },
  },
  applicationSx: {
    fontSize: "16px",
    fontweight: "500",
    color: "#000",
    paddingTop: "12px",
    paddingLeft: "32px",
  },
}));

export const PerformanceReport = () => {
  const classes = useStyles();

  let { application_id } = useParams();
  console.log(application_id, "application_id");
  const [PerformanceTestReport, ...PerformanceTestReportParams] =
    useLazyPerformanceTestReportQuery();

  const [performaceReportData, setPerformaceReportData] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(true);
  const [isError, setisError] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState("Performance");

  const CircularProgressWithLabel = (props) => {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          className={props?.className}
          variant={props.variant ?? "determinate"}
          size={props?.size}
          value={props?.value}
          thickness={props.thickness}
          sx={{
            color: props?.color,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="textPrimary"
            sx={{ fontSize: "20px", lineHeight: "12px" }}
          >
            {props?.value}
          </Typography>
        </Box>
      </Box>
    );
  };

  const giveMeTopNavbarPrimaryText = () => {
    return "Performance Test Report";
  };

  const getPerformanceData = async () => {
    let performanceData = await PerformanceTestReport({
      application_id: application_id,
    });

    setPerformaceReportData(performanceData?.data);
    setisError(PerformanceTestReportParams[0]?.isError);
    setisLoading(PerformanceTestReportParams[0]?.isLoading);
  };

  React.useEffect(() => {
    getPerformanceData();
    // eslint-disable-next-line
  }, [application_id]);

  const TabChange = (e) => {
    if (e.target.id === "Performance") {
      setCurrentTab("Performance");
    }
    if (e.target.id === "accessibility") {
      setCurrentTab("accessibility");
    }
    if (e.target.id === "best_practices") {
      setCurrentTab("best_practices");
    }
    if (e.target.id === "seo") {
      setCurrentTab("seo");
    }
  };

  // item?.hasOwnProperty('cumulative-layout-shift');
  const checkOpportunities = (value) => {
    const opportunitiesKeys = [
      "unused-javascript",
      "server-response-time",
      "render-blocking-resources",
    ];
    return opportunitiesKeys.includes(value);
  };
  const checkPerformanceDiagnostics = (value) => {
    const performanceDiagnostics = [
      "uses-optimized-images",
      "modern-image-formats",
      "uses-long-cache-ttl",
      "font-display",
      "first-contentful-paint",
      "mainthread-work-breakdown",
      "bootup-time",
      "total-byte-weight",
      "critical-request-chains",
      "resource-summary",
      "largest-contentful-paint-element",
      "layout-shift-elements",
      "long-tasks",
      "non-composited-animations",
    ];
    return performanceDiagnostics.includes(value);
  };
  const checkPerformancePassedAudits = (value) => {
    const performancePassedAudits = [
      "uses-responsive-images",
      "offscreen-images",
      "unminified-css",
      "unminified-javascript",
      "unused-css-rules",
      "uses-text-compression",
      "uses-rel-preconnect",
      "redirects",
      "uses-rel-preload",
      "efficient-animated-content",
      "duplicated-javascript",
      "legacy-javascript",
      "preload-lcp-image",
      "dom-size",
      "user-timings",
      "third-party-summary",
      "third-party-facades",
      "lcp-lazy-loaded",
      "uses-passive-event-listeners",
      "no-document-write",
      "unsized-images",
      "viewport",
      "no-unload-listeners",
    ];
    return performancePassedAudits.includes(value);
  };
  const checkAccessbilityContrast = (value) => {
    const AccessbilityContrast = ["color-contrast"];
    return AccessbilityContrast.includes(value);
  };
  const checkAccessbilityadditionalItemManualCheck = (value) => {
    const AccessbilityadditionalItemManualCheck = [
      "logical-tab-order",
      "focusable-controls",
      "interactive-element-affordance",
      "managed-focus",
      "focus-traps",
      "custom-controls-labels",
      "custom-controls-roles",
      "visual-order-follows-dom",
      "offscreen-content-hidden",
      "use-landmarks",
    ];
    return AccessbilityadditionalItemManualCheck.includes(value);
  };
  const checkAccessbilityPassedAudit = (value) => {
    const AccessbilityPassedAudit = [
      "aria-allowed-attr",
      "aria-hidden-body",
      "aria-valid-attr",
      "aria-valid-attr-value",
      "button-name",
      "label",
      "meta-viewport",
      "aria-hidden-focus",
      "bypass",
      "document-title",
      "duplicate-id-active",
      "html-has-lang",
      "html-lang-valid",
      "link-name",
      "tabindex",
      "heading-order",
    ];
    return AccessbilityPassedAudit.includes(value);
  };
  const checkAccessbilityNotApplicable = (value) => {
    const AccessbilityNotApplicable = [
      "aria-command-name",
      "aria-meter-name",
      "aria-treeitem-name",
      "aria-input-field-name",
      "aria-progressbar-name",
      "aria-required-attr",
      "aria-required-children",
      "aria-required-parent",
      "aria-roles",
      "aria-toggle-field-name",
      "aria-tooltip-name",
      "aria-tooltip-name",
      "definition-list",
      "dlitem",
      "duplicate-id-aria",
      "form-field-multiple-labels",
      "frame-title",
      "image-alt",
      "input-image-alt",
      "list",
      "listitem",
      "meta-refresh",
      "object-alt",
      "td-headers-attr",
      "th-has-data-cells",
      "valid-lang",
      "video-caption",
    ];
    return AccessbilityNotApplicable.includes(value);
  };
  const checkBSBrowserCompatibility = (value) => {
    const AccessbilityNotApplicable = ["charset"];
    return AccessbilityNotApplicable.includes(value);
  };
  const checkBSTrustAndSafety = (value) => {
    const BSTrustAndSafety = ["csp-xss"];
    return BSTrustAndSafety.includes(value);
  };
  const checkBSGeneral = (value) => {
    const BSGeneral = ["js-libraries", "valid-source-maps"];
    return BSGeneral.includes(value);
  };
  const checkBSPassedAudit = (value) => {
    const BSPassedAudit = [
      "is-on-https",
      "geolocation-on-start",
      "notification-on-start",
      "no-vulnerable-libraries",
      "password-inputs-can-be-pasted-into",
      "image-aspect-ratio",
      "image-size-responsive",
      "doctype",
      "deprecations",
      "errors-in-console",
      "inspector-issues",
    ];
    return BSPassedAudit.includes(value);
  };
  const checkBSNotApplicable = (value) => {
    const BSNotApplicable = ["preload-fonts"];
    return BSNotApplicable.includes(value);
  };
  const checkSEOCrawlingIndex = (value) => {
    const SEOCrawlingIndex = ["robots-txt"];
    return SEOCrawlingIndex.includes(value);
  };
  const checkSEOAdditionalItemToManualCheck = (value) => {
    const SEOAdditionalItemToManualCheck = ["structured-data"];
    return SEOAdditionalItemToManualCheck.includes(value);
  };
  const checkSEOPassAudit = (value) => {
    const SEOPassAudit = [
      "viewport",
      "document-title",
      "meta-description",
      "http-status-code",
      "link-text",
      "crawlable-anchors",
      "is-crawlable",
      "hreflang",
      "font-size",
      "plugins",
      "tap-targets",
    ];
    return SEOPassAudit.includes(value);
  };
  const checkSEONotApplicable = (value) => {
    const SEONotApplicable = ["image-alt", "canonical"];
    return SEONotApplicable.includes(value);
  };

  return (
    <>
      <TopNavBar
        isDownloadRefreshRequired
        showActionBtn={false}
        showTopLeftNav={true}
        primaryText={giveMeTopNavbarPrimaryText()}
        secondaryText={"Applications"}
      />
      <div className={classes.root}>
        {isError === false &&
          isLoading === false &&
          performaceReportData !== (null || undefined) && (
            <div className={classes.ParentDiv}>
              <Typography className={classes.applicationSx}>
                Applicatican Name V2
              </Typography>

              <div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-evenly",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <CircularProgressWithLabel
                        value={
                          performaceReportData?.data?.categories?.performance
                            ?.score * 100
                        }
                        className={classes.bar}
                        color={"#2fe678"}
                        size={60}
                        variant={"determinate"}
                        thickness={3}
                      />
                    </div>
                    <div>
                      <Typography
                        style={{
                          color: currentTab === "Performance" ? "#2fe678" : "",
                        }}
                        className={classes.heading}
                        variant="subtitle2"
                        id="Performance"
                        onClick={(e) => {
                          TabChange(e);
                        }}
                      >
                        Performance
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <CircularProgressWithLabel
                        value={
                          performaceReportData?.data?.categories?.accessibility
                            ?.score * 100
                        }
                        className={classes.bar}
                        color={"#2fe678"}
                        size={60}
                        variant={"determinate"}
                        thickness={3}
                      />
                    </div>
                    <div>
                      <Typography
                        style={{
                          color:
                            currentTab === "accessibility" ? "#2fe678" : "",
                        }}
                        className={classes.heading}
                        variant="subtitle2"
                        id="accessibility"
                        onClick={(e) => {
                          TabChange(e);
                        }}
                      >
                        Accessibility
                      </Typography>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <CircularProgressWithLabel
                        value={
                          performaceReportData?.data?.categories[
                            "best-practices"
                          ].score * 100
                        }
                        className={classes.bar}
                        color={"#2fe678"}
                        size={60}
                        variant={"determinate"}
                        thickness={3}
                      />
                    </div>
                    <div>
                      <Typography
                        style={{
                          color:
                            currentTab === "best_practices" ? "#2fe678" : "",
                        }}
                        className={classes.heading}
                        variant="subtitle2"
                        id="best_practices"
                        onClick={(e) => {
                          TabChange(e);
                        }}
                      >
                        Best Practices
                      </Typography>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <CircularProgressWithLabel
                        value={
                          performaceReportData.data.categories.seo.score * 100
                        }
                        className={classes.bar}
                        color={"#2fe678"}
                        size={60}
                        variant={"determinate"}
                        thickness={3}
                      />
                    </div>
                    <div>
                      <Typography
                        style={{ color: currentTab === "seo" ? "#2fe678" : "" }}
                        className={classes.heading}
                        variant="subtitle2"
                        id="seo"
                        onClick={(e) => {
                          TabChange(e);
                        }}
                      >
                        SEO
                      </Typography>
                    </div>
                  </div>
                </div>

                <Divider style={{ marginTop: "25px" }} />

                {/* performance part start */}
                {currentTab === "Performance" && (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          textAlign: "center",
                          marginTop: "100px",
                        }}
                      >
                        <div>
                          <CircularProgressWithLabel
                            value={
                              performaceReportData.data.categories.performance
                                .score * 100
                            }
                            className={classes.bar}
                            color={"#2fe678"}
                            size={110}
                            variant={"determinate"}
                            thickness={5}
                          />
                        </div>

                        <div>
                          <Typography variant="subtitle2">
                            Performance
                          </Typography>
                        </div>
                      </div>
                      <div>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontSize: "10px",
                            paddingLeft: "10%",
                            paddingRight: "10%",
                            marginTop: "12px",
                            textAlign: "center",
                          }}
                        >
                          {
                            performaceReportData.data.i18n
                              .rendererFormattedStrings.varianceDisclaimer
                          }
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginTop: "15px",
                        }}
                      >
                        <div>0–49</div>
                        <div>50–89</div>
                        <div>90–100</div>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: "50px",
                      }}
                    >
                      <div>
                        <img
                          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAHyARgDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAIDAQQFBgcI/8QARhAAAQMCAwQGBwYDBgUFAAAAAQACAwQRBRIhBhMUMSIzQVFxkgcXU1RVYaEycoGRk9FCc8IVFiNSYrEkNDezwSUmgqLw/8QAGwEBAQADAQEBAAAAAAAAAAAAAAECAwQGBQf/xAAyEQEAAQIFAgQEBAcBAAAAAAAAAQIDBBEVIVISoRYiU7EFEzFRBkFh8BQzNHFygdHB/9oADAMBAAIRAxEAPwD9UoiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIMSC7CFpLeWpMzK/wCRRGxC7NGEVED8rrHkURW0tDH8TiwbBK7EqkgRUsL5nX/0i9lvrzu3ezTtrMFZhT659JSPqI5KoMZd00bXZjGDcZbkDpa8uSsfXdJec2M2zxeXZzH5tqaSBmMYTDxbqeC7GvidDvGc766OaT3grsxbYiTCtkK0UJH94XxsDN71GeB0vO3Stlt2c7rSpvR3TUmOT1lPidfJSVdDJQVtPVzPqHTMP2SJHuu3Ld3YftHktPCfR5iNHUbOsqdppKrDsCn3lJTOo2tOQRuYGveHakB2jrDQHTW4ynpY7qdlPSBij9mMWxva3CIqGgoZJ2ieCoEhkcyYxiIMtfNezc17E66XW7T7f1UFQabaHZ6owiompZquia+pZKKkRszuYS37D7a2N+1WQ7AF2EY3glfinEYFiEks0dO2nDJaeR8u9Lt5mOaztQMoUBsHW1tSKnaLH3YlUU9LNS0RbSNhbBvWFjnuAcc7sunMD5J5TzOXSelLEJKPB6uo2Or4qXGGtbh72VUbzNMW5gwjTIDYkOPYL2C32+kyKmw7FzjGD1VFjGGzQ078NZI2Z0r5uqDHiwObXwsV0mbF5cD2Ow7j7/3emhl3m5/5jdwujtbN0b5r9trW+a08a9HMOLYvtDXzYjLFJibqOWAxRgOpJacHK8Ekh1yb2sE8p5mudvcYbXVGF1uy0tBigw2oxCJslWySN+7yhrQ5otqXa3ta3bdciHbbais2X2LxGooocPnxPEqaF27lZI2rifBI86FpMYLmt01I716Ki2JxJ+0LMXx3aF2IytoJqDdspGwMDZCw5m2cbHo63ve45W1oodga2LCNncNq8cZUQYHXw1VKRR5HGKONzBG7p6npXzfLknlPM2cM2+biGDYHUxYc9tfiVcaF1E6XpU7mF29LjbXIGk8hfQaXXt18w2KwOKp9J+0+NRPc7DqOd0FNGfstqZGM4h48rR4ly+nqVZR9Fpz/ADERFiyEREBERAREQEREBERAREQEREBERAREQFGVmdtu3sUkQaJBBseaLaliD9R9pERYiIiiIl0BLrCIM3WLpdYugzdLrF0ugyl1i6XQZul1i6XQZul1i6XQZul1i6XQZul1i6XQZul1i6XQZul1i6XQZul1i6XQZul1i6XQSul1i6IMosLN0BERAREQEuhWEBFi6IF0WLrBKCSwokrF0E7hLhQusXQWXS6rul0E7pdQul0E7pdQul0E7pdQul0E7pdQul0E7pdQul0E7rN1XdLoLLpcKu6XQWXCKF0ugsRQBWQUErrKjdZQZWbqN1lBlECIMLBWSsICwShKgSgySokqTWZtTyU923uQU3WLq/dt7ljdt7vqgoul1fumd31TdM7vqgoul1fumd31TdM7vqgoul1fumd31TdM7vqgoul1fumd31TdM7vqgoul1fumd31TdM7vqgoul1fumd31TdM7vqgoul1fumd31TdM7vqgoul1fumd31TdM7vqgoul1fumd31TdM7vqgous3V26Z3fVN23u+qCq6yCrd23uTdt7kEAVIFRczLqOSwCgsQLAKygyiBEGCsHRZUXFBErHMgIVEfaHig2UREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBUciQr1rH7R8UEwpjVVhTaUEgiIgKBUjyUCgiVFv22+KyVFv22+KDbREQfJ/SVt/tBgO18WDYRT4TTQOpd+2rxVz2RzvvbdNcCGtd4lGbY1MXpFwePG5Z6Fp2fkr6qmhqGyUrbOfd9wOkbM0N+VvnftekLYTEtqKqR9BtNU4dSz05paijfCKiF7Tzc1pIDXf6hquXB6J6SgxGhquO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"
                          alt="Red dot"
                          style={{
                            height: "300px",
                            width: "300px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentTab === "Performance" && (
                  <div>
                    {/* metrics */}
                    <div style={{ width: "100%" }}>
                      <Typography style={{ paddingLeft: "14px" }}>
                        METRICS
                      </Typography>
                    </div>
                    <div style={{ display: "flex", width: "100%" }}>
                      <div style={{ width: "50%" }}>
                        <Divider
                          style={{ marginTop: "24px", marginBottom: "24px" }}
                        />
                        <div style={{ display: "flex", marginLeft: "14px" }}>
                          <div>
                            <Typography>O</Typography>
                          </div>
                          <div style={{ marginLeft: "8px" }}>
                            <Typography variant="subtitle1">
                              First Contentful Paint
                            </Typography>
                            <Typography variant="h6">
                              {
                                performaceReportData?.data?.audits[
                                  "first-contentful-paint"
                                ]?.displayValue
                              }
                            </Typography>
                            <Typography variant="body2">
                              {
                                performaceReportData?.data?.audits[
                                  "first-contentful-paint"
                                ]?.description
                              }
                            </Typography>
                          </div>
                        </div>
                      </div>

                      <div style={{ width: "50%" }}>
                        <Divider
                          style={{ marginTop: "24px", marginBottom: "24px" }}
                        />
                        <div style={{ display: "flex", marginLeft: "14px" }}>
                          <div>
                            <Typography>O</Typography>
                          </div>
                          <div style={{ marginLeft: "8px" }}>
                            <Typography variant="subtitle1">
                              Time to Interactive
                            </Typography>
                            <Typography variant="h6">
                              {
                                performaceReportData?.data?.audits[
                                  "interactive"
                                ].displayValue
                              }
                            </Typography>
                            <Typography variant="body2">
                              {
                                performaceReportData?.data?.audits[
                                  "interactive"
                                ].description
                              }
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", width: "100%" }}>
                      <div style={{ width: "50%" }}>
                        <Divider
                          style={{ marginTop: "24px", marginBottom: "24px" }}
                        />
                        <div style={{ display: "flex", marginLeft: "14px" }}>
                          <div>
                            <Typography>O</Typography>
                          </div>
                          <div style={{ marginLeft: "8px" }}>
                            <Typography variant="subtitle1">
                              Speed Index
                            </Typography>
                            <Typography variant="h6">
                              {
                                performaceReportData?.data?.audits[
                                  "speed-index"
                                ].displayValue
                              }
                            </Typography>
                            <Typography variant="body2">
                              {
                                performaceReportData?.data?.audits[
                                  "speed-index"
                                ].description
                              }
                            </Typography>
                          </div>
                        </div>
                      </div>

                      <div style={{ width: "50%" }}>
                        <Divider
                          style={{ marginTop: "24px", marginBottom: "24px" }}
                        />
                        <div style={{ display: "flex", marginLeft: "14px" }}>
                          <div>
                            <Typography>O</Typography>
                          </div>
                          <div style={{ marginLeft: "8px" }}>
                            <Typography variant="subtitle1">
                              Total Blocking Time
                            </Typography>
                            <Typography variant="h6">
                              {
                                performaceReportData?.data?.audits[
                                  "total-blocking-time"
                                ]?.displayValue
                              }
                            </Typography>
                            <Typography variant="body2">
                              {
                                performaceReportData?.data?.audits[
                                  "total-blocking-time"
                                ]?.description
                              }
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", width: "100%" }}>
                      <div style={{ width: "50%" }}>
                        <Divider
                          style={{ marginTop: "24px", marginBottom: "24px" }}
                        />
                        <div style={{ display: "flex", marginLeft: "14px" }}>
                          <div>
                            <Typography>O</Typography>
                          </div>
                          <div style={{ marginLeft: "8px" }}>
                            <Typography variant="subtitle1">
                              Largest Contentful Paint
                            </Typography>
                            <Typography variant="h6">
                              {
                                performaceReportData?.data?.audits[
                                  "largest-contentful-paint"
                                ]?.displayValue
                              }
                            </Typography>
                            <Typography variant="body2">
                              {
                                performaceReportData?.data?.audits[
                                  "largest-contentful-paint"
                                ]?.description
                              }
                            </Typography>
                          </div>
                        </div>
                        <Divider
                          style={{ marginTop: "24px", marginBottom: "24px" }}
                        />
                      </div>

                      <div style={{ width: "50%" }}>
                        <Divider
                          style={{ marginTop: "24px", marginBottom: "24px" }}
                        />
                        <div style={{ display: "flex", marginLeft: "14px" }}>
                          <div>
                            <Typography>O</Typography>
                          </div>
                          <div style={{ marginLeft: "8px" }}>
                            <Typography variant="subtitle1">
                              Cumulative Layout Shift
                            </Typography>
                            <Typography variant="h6">
                              {
                                performaceReportData?.data?.audits[
                                  "cumulative-layout-shift"
                                ]?.displayValue
                              }
                            </Typography>
                            <Typography variant="body2">
                              {
                                performaceReportData?.data?.audits[
                                  "cumulative-layout-shift"
                                ]?.description
                              }
                            </Typography>
                          </div>
                        </div>
                        <Divider
                          style={{ marginTop: "24px", marginBottom: "24px" }}
                        />
                      </div>
                    </div>
                    {/* OPPORTUNITIES */}
                    <div>
                      <div style={{ width: "100%", marginTop: "20px" }}>
                        <div>
                          <Typography style={{ marginLeft: "14px" }}>
                            OPPORTUNITIES
                          </Typography>
                        </div>
                      </div>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className={classes.bddAcord}
                      >
                        {Object.entries(performaceReportData.data.audits)?.map(
                          (item, index) => {
                            if (checkOpportunities(item[0])) {
                              return (
                                <AccordionCmp
                                  index={index}
                                  title={item[1]?.title.replace(
                                    /^"(.*)"$/,
                                    "$1"
                                  )}
                                  description={item[1]?.description}
                                />
                              );
                            }
                            return true;
                          }
                        )}
                      </Grid>
                    </div>
                    {/* DIAGNOSTICS */}
                    <div>
                      <div style={{ width: "100%" }}>
                        <div>
                          <Typography style={{ marginLeft: "14px" }}>
                            DIAGNOSTICS
                          </Typography>
                        </div>
                      </div>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className={classes.bddAcord}
                      >
                        {Object.entries(performaceReportData.data.audits)?.map(
                          (item, index) => {
                            if (checkPerformanceDiagnostics(item[0])) {
                              return (
                                <AccordionCmp
                                  index={index}
                                  title={item[1]?.title.replace(
                                    /^"(.*)"$/,
                                    "$1"
                                  )}
                                  description={item[1]?.description}
                                />
                              );
                            }
                            return true;
                          }
                        )}
                      </Grid>
                    </div>
                    {/* PASSED AUDITS */}

                    <div>
                      <div style={{ width: "100%" }}>
                        <div>
                          <Typography style={{ marginLeft: "14px" }}>
                            PASSED AUDITS
                          </Typography>
                        </div>
                      </div>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className={classes.bddAcord}
                      >
                        {Object.entries(performaceReportData.data.audits)?.map(
                          (item, index) => {
                            if (checkPerformancePassedAudits(item[0])) {
                              return (
                                <AccordionCmp
                                  index={index}
                                  title={item[1]?.title.replace(
                                    /^"(.*)"$/,
                                    "$1"
                                  )}
                                  description={item[1]?.description}
                                />
                              );
                            }
                            return true;
                          }
                        )}
                      </Grid>
                    </div>
                  </div>
                )}
                {/* performance part end */}

                {/* accessbility start */}
                {currentTab === "accessibility" && (
                  <div style={{ width: "100%", paddingTop: "85px" }}>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgressWithLabel
                          value={
                            performaceReportData?.data?.categories
                              ?.accessibility?.score * 100
                          }
                          className={classes.bar}
                          color={"#2fe678"}
                          size={110}
                          variant={"determinate"}
                          thickness={5}
                        />
                      </div>
                      <div style={{ paddingLeft: "20%", paddingRight: "20%" }}>
                        <Typography
                          variant="subtitle2"
                          style={{
                            textAlign: "center",
                            paddingBottom: "20px",
                            paddingTop: "20px",
                          }}
                        >
                          Accessibility
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{ textAlign: "center" }}
                        >
                          {
                            performaceReportData?.data?.categories
                              ?.accessibility.description
                          }
                        </Typography>
                      </div>
                    </div>
                  </div>
                )}

                {/* CONTRAST   */}
                {currentTab === "accessibility" && (
                  <div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                      <div>
                        <Typography style={{ marginLeft: "14px" }}>
                          CONTRAST
                        </Typography>
                      </div>
                    </div>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.bddAcord}
                    >
                      {Object.entries(performaceReportData.data.audits)?.map(
                        (item, index) => {
                          if (checkAccessbilityContrast(item[0])) {
                            return (
                              <AccordionCmp
                                index={index}
                                title={item[1]?.title.replace(/^"(.*)"$/, "$1")}
                                description={item[1]?.description}
                              />
                            );
                          }
                          return true;
                        }
                      )}
                    </Grid>
                  </div>
                )}
                {/* CONTRAST   */}

                {/* ADDITIONAL ITEMS TO MANUALLY CHECK    */}
                {currentTab === "accessibility" && (
                  <div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                      <div>
                        <Typography style={{ marginLeft: "14px" }}>
                          ADDITIONAL ITEMS TO MANUALLY CHECK{" "}
                        </Typography>
                      </div>
                    </div>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.bddAcord}
                    >
                      {Object.entries(performaceReportData.data.audits)?.map(
                        (item, index) => {
                          if (
                            checkAccessbilityadditionalItemManualCheck(item[0])
                          ) {
                            return (
                              <AccordionCmp
                                index={index}
                                title={item[1]?.title.replace(/^"(.*)"$/, "$1")}
                                description={item[1]?.description}
                              />
                            );
                          }
                          return true;
                        }
                      )}
                    </Grid>
                  </div>
                )}
                {/* ADDITIONAL ITEMS TO MANUALLY CHECK    */}

                {/* PASSED AUDITS   */}
                {currentTab === "accessibility" && (
                  <div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                      <div>
                        <Typography style={{ marginLeft: "14px" }}>
                          PASSED AUDITS
                        </Typography>
                      </div>
                    </div>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.bddAcord}
                    >
                      {Object.entries(performaceReportData.data.audits)?.map(
                        (item, index) => {
                          if (checkAccessbilityPassedAudit(item[0])) {
                            return (
                              <AccordionCmp
                                index={index}
                                title={item[1]?.title.replace(/^"(.*)"$/, "$1")}
                                description={item[1]?.description}
                              />
                            );
                          }
                          return true;
                        }
                      )}
                    </Grid>
                  </div>
                )}
                {/* PASSED AUDITS   */}

                {/* NOT APPLICABLE   */}

                {currentTab === "accessibility" && (
                  <div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                      <div>
                        <Typography style={{ marginLeft: "14px" }}>
                          NOT APPLICABLE
                        </Typography>
                      </div>
                    </div>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.bddAcord}
                    >
                      {Object.entries(performaceReportData.data.audits)?.map(
                        (item, index) => {
                          if (checkAccessbilityNotApplicable(item[0])) {
                            return (
                              <AccordionCmp
                                index={index}
                                title={item[1]?.title.replace(/^"(.*)"$/, "$1")}
                                description={item[1]?.description}
                              />
                            );
                          }
                          return true;
                        }
                      )}
                    </Grid>
                  </div>
                )}
                {/* NOT APPLICABLE   */}

                {/* accessbility end */}

                {/* best practice start */}
                {currentTab === "best_practices" && (
                  <div style={{ width: "100%", paddingTop: "85px" }}>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgressWithLabel
                          value={
                            performaceReportData?.data?.categories[
                              "best-practices"
                            ].score * 100
                          }
                          className={classes.bar}
                          color={"#2fe678"}
                          size={110}
                          variant={"determinate"}
                          thickness={5}
                        />
                      </div>
                      <div style={{ paddingLeft: "20%", paddingRight: "20%" }}>
                        <Typography
                          variant="subtitle2"
                          style={{
                            textAlign: "center",
                            paddingBottom: "20px",
                            paddingTop: "20px",
                          }}
                        >
                          Best Practices
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{ textAlign: "center" }}
                        >
                          {
                            performaceReportData.data.i18n
                              .rendererFormattedStrings.varianceDisclaimer
                          }
                        </Typography>
                      </div>
                    </div>
                  </div>
                )}

                {/* BROWSER COMPATIBILITY   */}
                {currentTab === "best_practices" && (
                  <div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                      <div>
                        <Typography style={{ marginLeft: "14px" }}>
                          BROWSER COMPATIBILITY
                        </Typography>
                      </div>
                    </div>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.bddAcord}
                    >
                      {Object.entries(performaceReportData.data.audits)?.map(
                        (item, index) => {
                          if (checkBSBrowserCompatibility(item[0])) {
                            return (
                              <AccordionCmp
                                index={index}
                                title={item[1]?.title.replace(/^"(.*)"$/, "$1")}
                                description={item[1]?.description}
                              />
                            );
                          }
                          return true;
                        }
                      )}
                    </Grid>
                  </div>
                )}
                {/* BROWSER COMPATIBILITY   */}

                {/* TRUST AND SAFETY   */}
                {currentTab === "best_practices" && (
                  <div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                      <div>
                        <Typography style={{ marginLeft: "14px" }}>
                          TRUST AND SAFETY
                        </Typography>
                      </div>
                    </div>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.bddAcord}
                    >
                      {Object.entries(performaceReportData.data.audits)?.map(
                        (item, index) => {
                          if (checkBSTrustAndSafety(item[0])) {
                            return (
                              <AccordionCmp
                                index={index}
                                title={item[1]?.title.replace(/^"(.*)"$/, "$1")}
                                description={item[1]?.description}
                              />
                            );
                          }
                          return true;
                        }
                      )}
                    </Grid>
                  </div>
                )}
                {/* TRUST AND SAFETY   */}

                {/* GENERAL   */}
                {currentTab === "best_practices" && (
                  <div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                      <div>
                        <Typography style={{ marginLeft: "14px" }}>
                          GENERAL
                        </Typography>
                      </div>
                    </div>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.bddAcord}
                    >
                      {Object.entries(performaceReportData.data.audits)?.map(
                        (item, index) => {
                          if (checkBSGeneral(item[0])) {
                            return (
                              <AccordionCmp
                                index={index}
                                title={item[1]?.title.replace(/^"(.*)"$/, "$1")}
                                description={item[1]?.description}
                              />
                            );
                          }
                          return true;
                        }
                      )}
                    </Grid>
                  </div>
                )}
                {/* GENERAL   */}

                {/* PASSED AUDITS   */}
                {currentTab === "best_practices" && (
                  <div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                      <div>
                        <Typography style={{ marginLeft: "14px" }}>
                          PASSED AUDITS
                        </Typography>
                      </div>
                    </div>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.bddAcord}
                    >
                      {Object.entries(performaceReportData.data.audits)?.map(
                        (item, index) => {
                          if (checkBSPassedAudit(item[0])) {
                            return (
                              <AccordionCmp
                                index={index}
                                title={item[1]?.title.replace(/^"(.*)"$/, "$1")}
                                description={item[1]?.description}
                              />
                            );
                          }
                          return true;
                        }
                      )}
                    </Grid>
                  </div>
                )}
                {/* PASSED AUDITS   */}

                {/* NOT APPLICABLE   */}
                {currentTab === "best_practices" && (
                  <div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                      <div>
                        <Typography style={{ marginLeft: "14px" }}>
                          NOT APPLICABLE
                        </Typography>
                      </div>
                    </div>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.bddAcord}
                    >
                      {Object.entries(performaceReportData.data.audits)?.map(
                        (item, index) => {
                          if (checkBSNotApplicable(item[0])) {
                            return (
                              <AccordionCmp
                                index={index}
                                title={item[1]?.title.replace(/^"(.*)"$/, "$1")}
                                description={item[1]?.description}
                              />
                            );
                          }
                          return true;
                        }
                      )}
                    </Grid>
                  </div>
                )}
                {/* NOT APPLICABLE   */}

                {/* best practice end */}

                {/* SEO start */}
                {currentTab === "seo" && (
                  <div style={{ width: "100%", paddingTop: "85px" }}>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgressWithLabel
                          value={
                            performaceReportData.data.categories.seo.score * 100
                          }
                          className={classes.bar}
                          color={"#2fe678"}
                          size={110}
                          variant={"determinate"}
                          thickness={5}
                        />
                      </div>
                      <div style={{ paddingLeft: "20%", paddingRight: "20%" }}>
                        <Typography
                          variant="subtitle2"
                          style={{
                            textAlign: "center",
                            paddingBottom: "20px",
                            paddingTop: "20px",
                          }}
                        >
                          SEO
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{ textAlign: "center" }}
                        >
                          {
                            performaceReportData?.data?.categories?.seo
                              ?.description
                          }
                        </Typography>
                      </div>
                    </div>
                  </div>
                )}

                {/* CRAWLING AND INDEXING */}
                {currentTab === "seo" && (
                  <div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                      <div>
                        <Typography style={{ marginLeft: "14px" }}>
                          CRAWLING AND INDEXING
                        </Typography>
                      </div>
                    </div>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.bddAcord}
                    >
                      {Object.entries(performaceReportData.data.audits)?.map(
                        (item, index) => {
                          if (checkSEOCrawlingIndex(item[0])) {
                            return (
                              <AccordionCmp
                                index={index}
                                title={item[1]?.title.replace(/^"(.*)"$/, "$1")}
                                description={item[1]?.description}
                              />
                            );
                          }
                          return true;
                        }
                      )}
                    </Grid>
                  </div>
                )}
                {/* CRAWLING AND INDEXING */}

                {/* ADDITIONAL ITEMS TO MANUALLY CHECK  */}
                {currentTab === "seo" && (
                  <div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                      <div>
                        <Typography style={{ marginLeft: "14px" }}>
                          ADDITIONAL ITEMS TO MANUALLY CHECK
                        </Typography>
                      </div>
                    </div>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.bddAcord}
                    >
                      {Object.entries(performaceReportData.data.audits)?.map(
                        (item, index) => {
                          if (checkSEOAdditionalItemToManualCheck(item[0])) {
                            return (
                              <AccordionCmp
                                index={index}
                                title={item[1]?.title.replace(/^"(.*)"$/, "$1")}
                                description={item[1]?.description}
                              />
                            );
                          }
                          return true;
                        }
                      )}
                    </Grid>
                  </div>
                )}
                {/* ADDITIONAL ITEMS TO MANUALLY CHECK  */}

                {/* PASSED AUDITS   */}
                {currentTab === "seo" && (
                  <div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                      <div>
                        <Typography style={{ marginLeft: "14px" }}>
                          PASSED AUDITS
                        </Typography>
                      </div>
                    </div>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.bddAcord}
                    >
                      {Object.entries(performaceReportData.data.audits)?.map(
                        (item, index) => {
                          if (checkSEOPassAudit(item[0])) {
                            return (
                              <AccordionCmp
                                index={index}
                                title={item[1]?.title.replace(/^"(.*)"$/, "$1")}
                                description={item[1]?.description}
                              />
                            );
                          }
                          return true;
                        }
                      )}
                    </Grid>
                  </div>
                )}
                {/* PASSED AUDITS   */}

                {/* NOT APPLICABLE   */}
                {currentTab === "seo" && (
                  <div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                      <div>
                        <Typography style={{ marginLeft: "14px" }}>
                          NOT APPLICABLE
                        </Typography>
                      </div>
                    </div>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.bddAcord}
                    >
                      {Object.entries(performaceReportData.data.audits)?.map(
                        (item, index) => {
                          if (checkSEONotApplicable(item[0])) {
                            return (
                              <AccordionCmp
                                index={index}
                                title={item[1]?.title.replace(/^"(.*)"$/, "$1")}
                                description={item[1]?.description}
                              />
                            );
                          }
                          return true;
                        }
                      )}
                    </Grid>
                  </div>
                )}
                {/* NOT APPLICABLE   */}

                {/* SEO end */}
              </div>
            </div>
          )}
      </div>
      {isError === false &&
        isLoading === true &&
        performaceReportData === null && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "90%",
            }}
          >
            <CircularProgress color="inherit" />
          </div>
        )}
      {isError === true &&
        isLoading === false &&
        performaceReportData === null && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "90%",
            }}
          >
            {"OOPS Something Went Wrong !"}
          </div>
        )}
      {isError === false &&
        isLoading === false &&
        performaceReportData === (null || undefined) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "90%",
            }}
          >
            {"NO DATA AVAILABLE !"}
          </div>
        )}
    </>
  );
};
