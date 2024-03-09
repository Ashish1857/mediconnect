import { Document, Page, Text as PDFtext, View } from "@react-pdf/renderer";
import { getFromStorage } from "../../utils/localStorage";
import { useEffect, useState } from "react";

const DownloadFile = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const foundData = getFromStorage("consultations")[0] || {};
    setData(() => foundData);
  }, []);
  console.log({ data });
  return (
    <Document>
      <Page pageNumber={1} renderTextLayer={false}>
        <View>
          <PDFtext style={{ fontSize: "2rem" }}>Booking confirmation</PDFtext>
          <PDFtext style={{ fontSize: "1rem" }}>
            Name: Dr. {data.name}
            <br />
            Doctor ID: {data.id}
            <br />
            Rating: {data.rating}
            <br />
            Speciality: {data.speciality}
            <br />
            Visiting hospital: {data.hospital}
            Booking id: {data.bookingId}
          </PDFtext>
        </View>
      </Page>
    </Document>
  );
};

export default DownloadFile;
