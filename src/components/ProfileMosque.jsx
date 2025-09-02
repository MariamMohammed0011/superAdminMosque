import React, { useState, useEffect } from "react";
import ContactSupervisor from "./ContactSupervisor";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Lottie from "lottie-react";
import watssapp from "../../public/animations/whatsapp.json";
import { useNavigate, useParams } from "react-router-dom";

export default function ProfileMosque() {
  const [contactWatsapp, setContactWatssapp] = useState(false);
  const [mosqueData, setMosqueData] = useState(null);
  const navigate = useNavigate();
  const { mosqueId } = useParams(); // جاي من الرابط

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
      console.log("Mosque Data from API:", data); // 📌 تطبع البيانات هنا
      setMosqueData(data);
    })
    .catch((err) => console.error(err));
}, [mosqueId]);


  if (!mosqueData) {
    return <p className="text-center mt-10">جار التحميل...</p>;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#AFD1BC] via-[#8FB8A4] to-[#E8F0EF] p-4 font-ruqaa">
      <div className="bg-[#FBFAF8] rounded-2xl shadow-lg p-2 w-full max-w-md space-y-4 relative">
        <button
          onClick={() => navigate("/mosques")}
          className="absolute top-2 left-2 text-[#2A603F] text-2xl"
        >
          <IoReturnUpBackOutline size={30} />
        </button>
        

        <div className="flex flex-col items-center gap-3">
          <img
            src="../../public/koraan.png"
            alt="صورة الجامع"
            className="w-28 h-28 rounded-full border-4 border-[#2A603F] object-cover shadow"
          />
          <h2 className="text-2xl font-bold text-[#2A603F] text-center">
            {mosqueData.name}
          </h2>

          <div className="rounded-lg p-3 text-center space-y-2 w-full">
       <div className="flex flex-col items-center mb-5 space-y-1">
  <span className="font-bold text-[#2A603F]">: المشرف</span>
  <span className="text-[#2A603F]">
    {mosqueData.admin
      ? `${mosqueData.admin.first_name} ${mosqueData.admin.last_name}`
      : "لا يوجد"}
  </span>
</div>

<div className="flex flex-col  items-center mb-5 space-y-1">
  <span className="font-bold text-[#2A603F]">: رقم الهاتف</span>
  <span className="text-[#2A603F]">
    {mosqueData.admin?.phone || "غير متوفر"}
  </span>
</div>

<div className="flex flex-col  items-center mb-5 space-y-1">
  <span className="font-bold text-[#2A603F]">: العنوان</span>
  <span className="text-[#2A603F]">{mosqueData.address}</span>
</div>

          </div>
        </div>

        <div className="flex flex-col items-center">
          <Lottie
            animationData={watssapp}
            style={{ width: 120, height: 120 }}
            onClick={() => setContactWatssapp(!contactWatsapp)}
          />
          {contactWatsapp && (
            <ContactSupervisor phone={mosqueData.admin?.phone || ""} />
          )}
        </div>
      </div>
    </section>
  );
}
