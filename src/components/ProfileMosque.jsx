import React, { useState, useEffect } from "react";
import ContactSupervisor from "./ContactSupervisor";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { FaUserTie, FaPhoneAlt, FaKey, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineMosque } from "react-icons/md";
import Lottie from "lottie-react";
import watssapp from "../../public/animations/whatsapp.json";
import { useNavigate, useParams } from "react-router-dom";

export default function ProfileMosque() {
  const [contactWatsapp, setContactWatssapp] = useState(false);
  const [mosqueData, setMosqueData] = useState(null);
  const navigate = useNavigate();
  const { mosqueId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`/api/mosque/${mosqueId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Mosque Data from API:", data);
        setMosqueData(data);
      })
      .catch((err) => console.error(err));
  }, [mosqueId]);

  if (!mosqueData) {
    return <p className="text-center mt-10">جار التحميل...</p>;
  }

  return (
    // <section className="min-h-screen flex items-center  font-zain  justify-center bg-gradient-to-r from-[#AFD1BC] via-[#8FB8A4] to-[#E8F0EF] p-4 font-ruqaa">
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#AFD1BC] via-[#8FB8A4] to-[#E8F0EF] p-4 sm:p-6 lg:p-10 font-ruqaa">

      {/* <div className="bg-[#FBFAF8] rounded-2xl shadow-lg p-6 w-full max-w-md space-y-6 relative"> */}
        <div className="bg-[#FBFAF8] rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 w-full max-w-md space-y-6 relative">

        <button
          onClick={() => navigate("/mosques")}
          className="absolute top-3 left-3 text-[#2A603F] hover:text-[#1e422c] transition"
        >
          <IoReturnUpBackOutline size={32} />
        </button>

        <div className="flex flex-col items-center gap-3">
          {/* <img
            src="../../public/koraan.png"
            alt="صورة الجامع"
            className="w-28 h-28 rounded-full border-4 border-[#2A603F] object-cover shadow"
          /> */}
          <img
  src="../../public/koraan.png"
  alt="صورة الجامع"
  className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-[#2A603F] object-cover shadow"
/>
{/* 
          <h2 className="text-2xl font-bold text-[#2A603F] text-center">
            {mosqueData.name}
          </h2> */}
          <h2 className="text-xl sm:text-2xl font-bold text-[#2A603F] text-center">
  {mosqueData.name}
</h2>

        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"> */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">

          <div className="bg-[#EBF3EC] p-3 rounded-lg shadow flex flex-col items-center ">
            <FaUserTie className="text-[#2A603F] mb-1" size={20} />
            <span className="font-bold text-[#2A603F] font-zain">المشرف</span>
            <span className="text-[#2A603F] text-sm">
              {mosqueData.adminInf
                ? `${
                    mosqueData.adminInf.firstName +
                    "  " +
                    mosqueData.adminInf.lastName
                  }`
                : "لا يوجد"}
            </span>
          </div>

          <div className="bg-[#EBF3EC] p-3 rounded-lg shadow flex flex-col items-center">
            <FaPhoneAlt className="text-[#2A603F] mb-1" size={20} />
            <span className="font-bold text-[#2A603F]">رقم الهاتف</span>
            <span className="text-[#2A603F] text-sm">
              {`${mosqueData.adminInf.adminPhone || "غير متوفر"}`}
            </span>
          </div>

          <div className="bg-[#EBF3EC] p-3 rounded-lg shadow flex flex-col items-center">
            <MdOutlineMosque className="text-[#2A603F] mb-1" size={20} />
            <span className="font-bold text-[#2A603F]">كود الجامع</span>
            <span className="text-[#2A603F] text-sm">{mosqueData.code}</span>
          </div>

          <div className="bg-[#EBF3EC] p-3 rounded-lg shadow flex flex-col items-center">
            <FaKey className="text-[#2A603F] mb-1" size={20} />
            <span className="font-bold text-[#2A603F]">كود المشرف</span>
            <span className="text-[#2A603F] text-sm">
              {`${mosqueData.adminInf.adminCode || "غير متوفر"}`}
            </span>
          </div>

          <div className="bg-[#EBF3EC] p-3 rounded-lg shadow flex flex-col items-center sm:col-span-2">
            <FaMapMarkerAlt className="text-[#2A603F] mb-1" size={20} />
            <span className="font-bold text-[#2A603F]">العنوان</span>
            <span className="text-[#2A603F] text-sm">{mosqueData.address}</span>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6">
          {/* <Lottie
            animationData={watssapp}
            style={{ width: 120, height: 120 }}
            onClick={() => setContactWatssapp(!contactWatsapp)}
            className="cursor-pointer"
          /> */}
          <Lottie
  animationData={watssapp}
  style={{ width: "80px", height: "80px" }}
  className="cursor-pointer sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px]"
  onClick={() => setContactWatssapp(!contactWatsapp)}
/>

          {contactWatsapp && (
            <ContactSupervisor
              phone={`${mosqueData.adminInf.adminPhone || "غير متوفر"}`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
