import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

class HTMLToPDFService {
  static export = (title: string, ref: any): void => {
    html2canvas(ref.current, {
      logging: true,
      useCORS: true,
    }).then((canvas) => {
      const doc = new jsPDF("p", "mm", "a4");

      const imgData: string = canvas.toDataURL("img/png");

      const imgWidth: number = 208;
      const imgHeight: number = (canvas.height * imgWidth) / canvas.width;

      let pageHeight: number = 295;
      let remainingHeight: number = imgHeight;
      let position: number = 5;

      doc.addImage(imgData, "PNG", 1, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;

      while (remainingHeight >= 0) {
        position = remainingHeight - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 1, position * 0.99, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
      }

      doc.save(`${title}.pdf`);
    });
  };
}

export { HTMLToPDFService };
