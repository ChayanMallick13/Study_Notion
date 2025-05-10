import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loader from '../../Common/Loader';
import { getUserPaymentHistory } from '../../../Services/Operations/Payment_Apis';
import {jsPDF} from 'jspdf';
import {autoTable} from "jspdf-autotable";
import logo from '../../../assets/Logo/Logo-Full-Dark.png';
import { IoMdDownload } from "react-icons/io";

const Index = () => {

    const { user } = useSelector(state => state.Profile);
    const [loading, setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState(null);

    function formatUnixTimestamp(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
        const pad = n => n.toString().padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // Months are 0-indexed
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }


    function generatePaymentPDF(doc,logoImg, response) {
        const margin = 20;
        let y = margin;
      
        // Destructure payment and course data
        const {
          paymentId,
          orderId,
          amount,
          currency,
          method,
          bank,
          createdAt,
          courses,
        } = response;
      
        const formattedDate = formatUnixTimestamp(Number(createdAt));
        const totalAmount = Number(amount) / 100;
      
        // 🖼️ Draw Large Logo
        doc.addImage(logoImg, "PNG", margin, y, 60, 30);
        y += 40;
      
        // 📄 Header Title
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Payment Receipt", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
        y += 10;
      
        doc.setDrawColor(200);
        doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y);
        y += 10;
      
        // 🧾 Payment Info
        doc.setFontSize(12);
        const info = [
          ["Payment ID", paymentId],
          ["Order ID", orderId],
          ["Payment Method", method],
          ["Bank", bank || "N/A"],
          ["Currency", currency],
          ["Payment Date", formattedDate]
        ];
      
        info.forEach(([label, value]) => {
          doc.text(`${label}:`, margin, y);
          doc.text(value, margin + 60, y);
          y += 8;
        });
      
        y += 5;
      
        // 📚 Course Table
        const courseData = courses.map((course, index) => [
          index + 1,
          course.courseName,
          course.CourseDescription.slice(0, 50) + "...",
          `${course.price}`
        ]);
      
        autoTable(doc, {
          head: [["#", "Course Name", "Description", "Price"]],
          body: courseData,
          startY: y,
          theme: "striped",
          headStyles: { fillColor: [40, 116, 166] },
          styles: { halign: "left" },
          didDrawPage: (data) => {
            y = data.cursor.y + 10;
          }
        });
      
        // 💰 Total Amount
        doc.setFontSize(12);
        doc.text(`Total Amount Paid: ${totalAmount}`, margin, y);
        y += 15;
      
        // 🧾 Footer
        doc.setDrawColor(220);
        doc.setLineWidth(0.5);
        doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y);
        y += 10;
      
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("Thank you for your purchase at StudyNotion!", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
      
        y += 8;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("For any queries, contact support@studynotion.com", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
    
    }

    function DownloadReceiptHandler(data){
        const reciept = new jsPDF();
        generatePaymentPDF(reciept,logo,data);
        reciept.save('Study_Notion_Reciept_'+user._id+data.paymentId);
    }



    useEffect(
        () => {
            getUserPaymentHistory(setLoading, setPaymentData);
        }, [user]
    )

    //console.log(paymentData);

    if (!paymentData || loading) {
        return <Loader />
    }

    return (
        <div className='text-white w-[100%]'>
            <table className="w-full table-auto border-collapse text-center">
                <thead className="bg-richblack-600">
                    <tr>
                        <th className="px-4 py-2">Payment Id</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2 lg:inline-block hidden">Method</th>
                        <th className="px-4 py-2 md:inline-block hidden">Order Date And Time</th>
                        <th className="px-4 py-2">Receipt</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paymentData.map(
                            (ele, ind) => {
                                return <tr className="border-b" key={ind}>
                                    <td className="px-4 py-2 md:text-lg text-xs ">{ele.paymentId}</td>
                                    <td className="px-4 py-2">{ele.currency} {ele.amount/100}</td>
                                    <td className="px-4 py-2 lg:inline-block  hidden">{ele.method}</td>
                                    <td className="px-4 py-2 md:inline-block  hidden">{formatUnixTimestamp(ele.createdAt)}</td>
                                    <td className="px-4 py-2">
                                        <button className="bg-yellow-100 text-richblack-900 font-bold px-3 py-1 rounded hover:bg-yellow-200
                            transition-all duration-200 hover:scale-95
                            "
                            onClick={() => {DownloadReceiptHandler(ele)}}
                            >
                                            <IoMdDownload/>
                                        </button>
                                    </td>
                                </tr>
                            }
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Index;
