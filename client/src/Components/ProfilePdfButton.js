import  { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const LOGO_URL = `${process.env.PUBLIC_URL}/images/sarclogoimg.png`;

const loadLogo = async () => {
  try {
    const res = await fetch(LOGO_URL);
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("Could not load logo for pdf:", err);
    return null;
  }
};

export default function ProfilePdfButton({ profileRef, interactRef, onComplete }) {
  const hasRun = useRef(false);

  useEffect(() => {
    const downloadPdf = async () => {
      if (hasRun.current) return;
      hasRun.current = true;

      if (interactRef?.current?.makeWallActive) {
        interactRef.current.makeWallActive();
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const style = document.createElement("style");
      style.innerHTML = `
        img {
          display: inline-block !important;
          vertical-align: middle !important;
        }
      `;
      document.head.appendChild(style);

      const logoData = await loadLogo();

      const canvas = await html2canvas(profileRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#1D1E22",
        ignoreElements: (el) => el.id === "hide-for-pdf",
        // everything in onclone only changes the temporary copy used for the pdf,
        // the portal itself is never touched
        onclone: (clonedDoc, clonedRoot) => {
          const root = clonedRoot || clonedDoc.body;

          // 1. profile photo: sits a bit lower so it lines up with the name
          //    (on mobile the photo has no transform, so it is left alone)
          const photo = root.querySelector(".imageCont");
          if (photo) {
            const view = clonedDoc.defaultView || window;
            if (view.getComputedStyle(photo).transform !== "none") {
              photo.style.setProperty("transform", "translateY(-8%)", "important");
            }
          }

          // 2. SARC logo at the top right corner
          if (logoData) {
            const logoWidth = Math.max(40, Math.round(root.offsetWidth * 0.06));
            root.style.position = "relative";
            const logo = clonedDoc.createElement("img");
            logo.src = logoData;
            logo.alt = "SARC";
            logo.style.cssText = `position:absolute;top:14px;right:5%;width:${logoWidth}px;height:auto;z-index:5;`;
            root.appendChild(logo);
          }
        },
      });

      const a4Width = 210;
      const a4Height = 297;
      const footerHeight = 15;
      const usableHeight = a4Height - footerHeight;

      const contentWidth = canvas.width;
      const contentHeight = canvas.height;

      const pdf = new jsPDF("p", "mm", "a4");

      const scaleFactor = Math.min(a4Width / contentWidth, usableHeight / contentHeight);

      const imgWidth = contentWidth * scaleFactor;
      const imgHeight = contentHeight * scaleFactor;

      const x = (a4Width - imgWidth) / 2;
    const y = 0;


      const imgData = canvas.toDataURL("image/jpeg");

      pdf.setFillColor("#1D1E22");
      pdf.rect(0, 0, a4Width, a4Height, "F");

      pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);

      pdf.setTextColor("#B3B3B3");
      pdf.setFontSize(8);
      pdf.text("© copyright SARC · all rights reserved", a4Width / 2, a4Height - 5, { align: "center" });

      pdf.save("profile.pdf");

      style.remove();
      onComplete?.();
    };

    downloadPdf();
  }, [profileRef, interactRef, onComplete]);

  return null;
}
