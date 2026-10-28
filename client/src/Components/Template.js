import { thumb } from "../cloudinary";
import React from "react";
import "../index.css";

// The image people download / share as an Instagram story (9:16).
const Template = (props) => {
  const styleMainMain = {
    backgroundImage:
      "linear-gradient(45deg, #050505, #07111B, #130D1F, #130C1E, #020202)",
  };

  // keeps the poster in story shape, whatever the quote length
  const styleMain = {
    minHeight: "calc(28rem * 16 / 9)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const styleTitle = {
    textAlign: "center",
  };
  const styleYearbook = {
    color: "#FFF",
    fontFamily: "Gilmer",
    fontSize: "32px",
    textAlign: "center",
    marginLeft: "-5%",
    width: "100%",
    fontWeight: "800",
  };
  const styleQuote = {
    color: "#FFF",
    fontFamily: "Imperial Script",
    fontSize: "48px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    marginLeft: "20%",
    marginTop: "-15px",
    marginBottom: "14px",
  };

  // "written for ..." (the labels are tiny on purpose, the quote is the hero)
  const styleWrittenFor = {
    textAlign: "center",
    padding: "0 12%",
  };
  const styleWrittenForLabel = {
    color: "#8a8a93",
    fontFamily: "Gilmer",
    fontSize: "9px",
    fontWeight: "600",
    letterSpacing: "1.2px",
    margin: "0",
  };
  const styleWrittenForName = {
    color: "#FFF",
    fontFamily: "Gilmer",
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "1.2",
    textTransform: "lowercase",
    margin: "2px 0 0",
    overflowWrap: "anywhere",
  };

  // the card sits in the free space in the middle and is only as tall as the quote
  const styleContentBoxBox = {
    flex: "1",
    display: "flex",
    alignItems: "center",
    padding: "6% 10%",
  };
  const styleContentBox = {
    width: "100%",
    borderRadius: "7.2px",
    backgroundColor: "rgba(21,21,21,0.3)",
    boxShadow: "1px 1px 1px rgb(255, 255, 255, 0.2)",
    border: "solid 1px rgb(255, 255, 255, 0.1)",
    padding: "16px 18px 12px",
  };

  const styleAuthor = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };
  const styleAuthorImage = {
    height: "44px",
    width: "44px",
    flexShrink: 0,
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid #2f2f3f",
  };
  const styleFromLabel = {
    color: "#8a8a93",
    fontFamily: "Gilmer",
    fontSize: "8px",
    fontWeight: "600",
    letterSpacing: "1px",
    margin: "0",
  };
  const styleAuthorName = {
    color: "#DCEDFB",
    fontFamily: "Gilmer",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "lowercase",
    margin: "0",
    lineHeight: "1.25",
  };
  const styleAuthorId = {
    color: "grey",
    fontFamily: "Gilmer",
    fontSize: "9px",
    fontWeight: "600",
    textTransform: "uppercase",
    margin: "0",
  };

  // quote marks on the left stretch down to the end of the quote
  const styleQuoteRow = {
    display: "flex",
    gap: "14px",
    marginTop: "16px",
  };
  const styleQuoteMarkCol = {
    width: "26px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const styleQuoteMarkCrop = {
    height: "22px",
    width: "26px",
    overflow: "hidden",
  };
  const styleQuoteMarkImg = {
    width: "26px",
    height: "95px",
    display: "block",
  };
  const styleQuoteLine = {
    flex: "1",
    minHeight: "14px",
    width: "1.5px",
    marginTop: "6px",
    backgroundColor: "#DCEDFB",
  };
  const styleQuoteText = {
    flex: "1",
    textAlign: "left",
    color: "#DCEDFB",
    fontFamily: "Gilmer",
    fontSize: "17px",
    fontWeight: "700",
    lineHeight: "1.4",
    letterSpacing: "0.3px",
    margin: "0",
    overflowWrap: "anywhere",
    whiteSpace: "pre-wrap",
  };

  const styleLogoRow = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "8px",
  };
  const styleLogoImg = {
    width: "34px",
  };

  const stylePlaceHolder = {
    color: "rgba(250, 250, 250, 0.75)",
    textAlign: "center",
    fontFamily: "Gilmer",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "90.02%",
    padding: "8% 10%",
  };

  const ellipseTop = {
    position: "top left",
    width: "100px",
  };
  const ellipseMid = {
    position: "absolute",
    width: "100px",
    right: "0",
    left: "1rem",
    top: "50%",
  };
  const ellipseBottom = {
    width: "100px",
    position: "absolute",
    right: "1rem",
    bottom: "0",
  };

  return (
    <div className="template" style={styleMainMain}>
      <div className="ellipses" style={ellipseTop}>
        <img src="../images/ellipsetop.png" alt="ellipsetop"></img>
      </div>
      <div className="ellipses" style={ellipseBottom}>
        <img src="../images/ellipsebottom.png" alt="ellipsetop"></img>
      </div>
      <div className="ellipses" style={ellipseMid}>
        <img src="../images/ellipsemid.png" alt="ellipsemid"></img>
      </div>

      <div className="templateSmall" style={styleMain}>
        <div>
          <div className="yearbook-title" style={styleTitle}>
            <h1 style={styleYearbook}>yearbook</h1>
            <h1 style={styleQuote}>quotes</h1>
          </div>
          <link
            href="https://fonts.googleapis.com/css2?family=Imperial+Script&display=swap"
            rel="stylesheet"
          />
          {props.recipient && (
            <div className="writtenFor" style={styleWrittenFor}>
              <p style={styleWrittenForLabel}>written for</p>
              <p style={styleWrittenForName}>{props.recipient}</p>
            </div>
          )}
        </div>

        <div style={styleContentBoxBox}>
          <div style={styleContentBox}>
            <div className="name-image" style={styleAuthor}>
              <img
                alt="caption"
                style={styleAuthorImage}
                src={thumb(props.img, 600)}
              ></img>
              <div className="name">
                <p style={styleFromLabel}>from</p>
                <p style={styleAuthorName}>{props.name}</p>
                <p style={styleAuthorId}>{props.bitsId}</p>
              </div>
            </div>

            <div className="theactualquote" style={styleQuoteRow}>
              <div className="ancientImage" style={styleQuoteMarkCol}>
                <div style={styleQuoteMarkCrop}>
                  <img
                    style={styleQuoteMarkImg}
                    src="../images/imageancient.png"
                    alt="immgancient"
                  ></img>
                </div>
                <div style={styleQuoteLine}></div>
              </div>
              <div className="quotesss" style={{ flex: 1 }}>
                <p style={styleQuoteText}>{props.caption}</p>
              </div>
            </div>

            <div className="logo" style={styleLogoRow}>
              <img
                style={styleLogoImg}
                src="../images/sarclogoimg.png"
                alt="logo"
              ></img>
            </div>
          </div>
        </div>

        <div className="placeHolder" style={stylePlaceHolder}>
          <h3>opt in for your physical copy of the yearbook now!</h3>
        </div>
      </div>
    </div>
  );
};

export default Template;
