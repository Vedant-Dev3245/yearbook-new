import { thumb } from "../cloudinary";
import React from "react";
import "../index.css";

const Template = (props) => {
  const styleMainMain = {
    backgroundImage:
      "linear-gradient(45deg, #050505, #07111B, #130D1F, #130C1E, #020202)",
  };
  const styleMain = {
    // opacity:"0",
  };

  const stylep = {
    textAlign: "left",
    color: "#DCEDFB",
    fontFamily: "Gilmer",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
    letterSpacing: "0.48px",
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
    marginBottom: "20px"
  };
  const styleContentBoxBox = {
    padding: "12%",
    paddingTop: props.recipient ? "0" : "5%",
    paddingBottom: "10%",
  };
  const styleContentBox = {
    gridTemplateColumns: "1fr 1fr",
    borderRadius: "7.2px",
    backgroundColor: "rgba(21,21,21,0.3)",
    boxShadow: "1px 1px 1px rgb(255, 255, 255, 0.2)",
    border: "solid 1px rgb(255, 255, 255, 0.1)",
  };
  const styleContent = {
    display: "flex",
    justifyContent: "space-between",
  };
  const styleAncientImage = {
    width: "30px",
    marginLeft: "10%",
    marginTop: "10%",
  };
  const styleAncientImageimg = {
    height: "120px",
  };

  const stylepDiv = {
    marginTop: "18%",
    marginRight: "10%",
    width: "60%",
  };
  const styleLogo = {
    width: "36px",
    marginLeft: "80%",
    marginBottom: "10%",
  };
  const stylePlaceHolder = {
    color: "rgba(250, 250, 250, 0.75)",
    textAlign: "center",
    fontFamily: "Gilmer",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "90.02%",
    padding: "10%",
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
  const styleNameImage = {
    display: "flex",
    marginTop: "1rem",
  };
  const styleNameImageImage = {
    height: "4rem",
    width: "4rem",
    borderRadius: "50%",
    marginLeft: "1.5rem",
  };
  const styleNameImageImageimg = {
    height: "4rem",
    border: "1px solid #2f2f3f",
    width: "4rem",
    borderRadius: "50%",
  };
  const styleNameImageNameBitsID = {
    display: "flex",
    flexDirection: "column",
    marginLeft: "2rem",
    marginTop: "0.5rem",
  };
  const styleWrittenFor = {
    textAlign: "center",
    padding: "0 12%",
    marginBottom: "6%",
  };
  const styleWrittenForLabel = {
    color: "#888",
    fontFamily: "Gilmer",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "1px",
    margin: "0",
  };
  const styleWrittenForName = {
    color: "#FFF",
    fontFamily: "Gilmer",
    fontSize: "26px",
    fontWeight: "700",
    lineHeight: "1.2",
    textTransform: "lowercase",
    margin: "2px 0 0",
    overflowWrap: "anywhere",
  };
  const styleWrittenForLine = {
    width: "28px",
    height: "1px",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    margin: "12px auto 0",
  };
  const styleFromLabel = {
    color: "#888",
    fontFamily: "Gilmer",
    fontSize: "10px",
    fontWeight: "600",
    textAlign: "center",
    margin: "0",
  };
  const styleNameImageName = {
    fontSize: "14px",
    textTransform: "lowercase",
    margin: "0",
    textAlign: "center",
  };
  const styleNameImageBitsID = {
    marginTop: "1rem",
    textTransform: "uppercase",
    textAlign: "center",
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
            <div style={styleWrittenForLine}></div>
          </div>
        )}
        <div style={styleContentBoxBox}>
          <div style={styleContentBox}>
            <div className="name-image" style={styleNameImage}>
              <div className="image" style={styleNameImageImage}>
                <img
                  alt="caption"
                  style={styleNameImageImageimg}
                  src={thumb(props.img, 600)}
                ></img>
                {/* <img style={styleNameImageImageimg} src="../images/shwetabh.png"></img> */}
              </div>
              <div className="name" style={styleNameImageNameBitsID}>
                <p style={styleFromLabel}>from</p>
                <div className="namename" style={styleNameImageName}>
                  <p>{props.name}</p>
                </div>
                <div className="namebitsId" style={styleNameImageBitsID}>
                  <p
                    style={{
                      fontSize: "10px",
                      marginTop: "-18px",
                      color: "grey",
                    }}
                  >
                    {props.bitsId}
                  </p>
                </div>
              </div>
            </div>
            <div className="theactualquote" style={styleContent}>
              <div className="ancientImage" style={styleAncientImage}>
                <img
                  style={styleAncientImageimg}
                  src="../images/imageancient.png"
                  alt="immgancient"
                ></img>
              </div>
              <div className="quotesss" style={stylepDiv}>
                <p style={stylep}>{props.caption}</p>
              </div>
            </div>
            <div className="logo" style={styleLogo}>
              <img src="../images/sarclogoimg.png" alt="logo"></img>
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
