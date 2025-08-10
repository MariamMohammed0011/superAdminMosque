import React, { useState } from "react";
import ContactSupervisor from "./ContactSupervisor";
import { IoMdClose } from "react-icons/io";  
import watssapp from '../../public/animations/whatsapp.json'
import Lottie from "lottie-react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";   


export default function ProfileMosque() {
  const [contactWatsapp, setContactWatssapp] = useState(false);
  const [showProfile, setShowProfile] = useState(true);  
 const navigate = useNavigate();  
  if (!showProfile) return null;  

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#AFD1BC] via-[#8FB8A4] to-[#E8F0EF] p-4 font-ruqaa">
      <div className="bg-[#FBFAF8] rounded-2xl shadow-lg p-2 w-full max-w-md space-y-4 relative">
        {/* زر الإغلاق */}
        <button
         onClick={() => navigate('/mosques')} 
          className="absolute top-2 left-2  text-[#2A603F]  text-2xl"
        >
          <IoReturnUpBackOutline size={30} className="font-bold" />
        </button>
<div className="flex flex-col items-center gap-3">
  
  <div className="flex-shrink-0">
    <img
      src="../../public/koraan.png"
      alt="صورة الجامع"
      className="w-28 h-28 rounded-full border-4 border-[#2A603F] object-cover shadow hover:scale-105 transition mb-4"
    />
  </div>

  
  <h2 className="text-2xl font-bold text-[#2A603F] text-center mb-7">جامع النور</h2>

 
  <div className=" rounded-lg p-3 text-center space-y-2 w-full">
    <div className="flex justify-around px-2 flex-row-reverse mb-5">
      <span className="font-bold text-[#2A603F]">:  المشرف</span>
      <span className="text-[#2A603F]">الشيخ محمد العلي</span>
    </div>
    <div className="flex justify-around px-2 flex-row-reverse mb-5">
      <span className="font-bold text-[#2A603F]">: العنوان</span>
      <span className="text-[#2A603F]">دمشق - المزة</span>
    </div>
    <div className="flex justify-around px-2 flex-row-reverse mb-3">
      <span className="font-bold text-[#2A603F]">: الكود</span>
      <span className="text-[#2A603F]">J12345</span>
    </div>
  </div>
</div>
 <div className="flex flex-col items-center">
          <Lottie animationData={watssapp} style={{ width: 120, height: 120 }} onClick={() => setContactWatssapp(!contactWatsapp)} />
          {contactWatsapp && <ContactSupervisor />}
        </div>

        <div className="flex justify-around text-[#2A603F] font-bold">
          <div className="text-center">
            <p className="text-xl">35</p>
            <p className="text-xs text-gray-500">طلاب</p>
          </div>
          <div className="text-center">
            <p className="text-xl">5</p>
            <p className="text-xs text-gray-500">حلقات</p>
          </div>
          <div className="text-center">
            <p className="text-xl">3</p>
            <p className="text-xs text-gray-500">مشرفين</p>
          </div>
        </div>

       
      </div>
    </section>
  );
}
