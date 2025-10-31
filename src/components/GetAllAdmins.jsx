import React, { useState, useEffect } from "react";
import { Search, MoreVertical, Mail, KeyRound } from "lucide-react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import watssapp from "../../public/animations/whatsapp.json";
import { FaMosque } from "react-icons/fa6";

export default function GetAllAdmins() {
    const [admins, setAdmins] = useState([]);
   const [mosques, setMosques] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [contactWatsapp, setContactWatssapp] = useState(false);

  const navigate = useNavigate();
  
  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("غير مصرح لك");

      const response = await fetch("/api/user/showAllAdmin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
console.log(token);
      if (!response.ok) throw new Error("فشل في جلب البيانات");

      const data = await response.json();
      setAdmins(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      // alert("خطأ أثناء جلب الإدمنات");
    }
  };

  // ✅ جلب كل الجوامع
  const fetchMosques = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("غير مصرح لك");

      const response = await fetch("/api/mosque", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("فشل في جلب الجوامع");

      const data = await response.json();
      setMosques(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      // alert("خطأ أثناء جلب الجوامع");
    }
  };

  useEffect(() => {
    fetchAdmins();
    fetchMosques(); // ✅ نجيب الجوامع مع الإدمنات
  }, []);

  const filteredAdmins = admins.filter((admin) => {
    const fullName = `${admin.first_name || ""} ${admin.last_name || ""}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const deleteAdmin = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("غير مصرح لك");

      const confirmDelete = window.confirm("هل أنت متأكد من حذف الإدمن؟");
      if (!confirmDelete) return;

      const response = await fetch(`/api/user/deleteForAdmin/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("فشل في حذف الإدمن");

      setAdmins((prev) => prev.filter((admin) => admin.id !== id));
      // alert("تم حذف الإدمن بنجاح");
    } catch (err) {
      console.error(err);
      // alert("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <section className="min-h-screen font-ruqaa bg-gradient-to-r from-[#AFD1BC] via-[#8FB8A4] to-[#E8F0EF] p-8 relative">
    
{/*     
    
     <button
  onClick={() => navigate("/mosques")}
  className="absolute top-16 left-4 text-[#2A603F] md:top-4"
>
  <IoReturnUpBackOutline size={35} className="font-bold" />
</button> */}

      <div className="max-w-6xl mx-auto">
        {/* <div className="flex flex-col-reverse sm:flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6 text-center md:text-right">
  
 <h2 className="text-3xl sm:text-4xl font-[300] text-[#2A603F] text-center md:text-right">
  قوائم كل المشرفين
</h2>


 
  <div className="relative w-full md:w-1/3 mx-auto md:mx-0">
    <input
      type="text"
      placeholder="بحث باسم المشرف..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full border rounded-full pl-10 pr-4 py-2 shadow focus:outline-[#AFD1BC] focus:ring-2 focus:ring-[#AFD1BC]"
    />
    <Search
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      size={18}
    />
  </div>
</div> */}
<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10 text-center md:text-right">
  {/* 🔙 زر الرجوع */}
  <button
    onClick={() => navigate("/mosques")}
    className="text-[#2A603F] order-1 md:order-1 md:self-center md:ml-auto"
  >
    <IoReturnUpBackOutline size={35} />
  </button>

  {/* 🕋 العنوان */}
  <h2 className="text-3xl sm:text-4xl font-[300] text-[#2A603F] font-zain order-2 md:order-2 md:flex-1 text-center">
    قوائم كل المشرفين
  </h2>

  {/* 🔍 مربع البحث */}
  <div className="relative w-full sm:w-2/3 md:w-1/3 mx-auto md:mx-0 order-3 md:order-3">
    <input
      type="text"
      placeholder="بحث باسم المشرف..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full border rounded-full pl-10 pr-4 py-2 shadow focus:outline-[#AFD1BC] focus:ring-2 focus:ring-[#AFD1BC]"
    />
    <Search
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      size={18}
    />
  </div>
</div>




        {filteredAdmins.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">لا يوجد إدمنات</p>
        ) : (
          <div
  className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
  dir="rtl"
>

            {filteredAdmins.map((admin) => {
  const fullName = `${admin.first_name || ""} ${admin.last_name || ""}`;
  // 🔍 نلاقي الجامع يلي إيديه يساوي mosque_id تبع الإدمن
  const mosque = mosques.find((m) => m.id === admin.mosque_id);

  return (
    <div
      key={admin.id}
      className="bg-white p-6 rounded-2xl shadow-2xl hover:shadow-xl transition relative w-[90%] sm:w-[80%] md:w-full"
 >
      <div className="absolute top-4 left-4">
        <button
          onClick={() =>
            setShowMenuIndex(admin.id === showMenuIndex ? null : admin.id)
          }
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <MoreVertical className="text-[#2A603F]" size={22} />
        </button>
        {showMenuIndex === admin.id && (
          <div className="absolute left-10 top-0 bg-white border rounded-lg shadow z-10 w-24 text-center flex flex-col">
            <button
              className="px-3 py-1 text-sm hover:bg-gray-100 text-red-500"
              onClick={() => {
                setShowMenuIndex(null);
                deleteAdmin(admin.id);
              }}
            >
              حذف
            </button>
          </div>
        )}
      </div>

      <div className="text-right space-y-4">
        <h3 className="text-2xl font-semibold text-[#2A603F] text-center font-zain">
          {fullName}
        </h3>

        {/* 🧑‍💼 كود الإدمن */}
        <div className="text-gray-600">
          <span className="flex justify-start gap-2 mb-4">
            <KeyRound size={18} className="text-[#2A603F]" />
            <span className="font-medium">{admin.code}</span>
          </span>
        </div>

        {/* 🕌 اسم الجامع */}
        <div className="text-gray-600">
          <span className="flex justify-start gap-2 mb-4">
            <FaMosque size={18} className="text-[#2A603F]" />
            <span className="font-medium">
              {mosque ? mosque.name : "غير معروف"}
            </span>
          </span>
        </div>

        

        {/* ✅ واتساب */}
        <div className="flex flex-col items-center mt-6">
         {/* واتساب - عرض الرسالة */}
<div className="flex flex-col items-center mt-6 w-full">
  <Lottie
    animationData={watssapp}
    style={{ width: "80px", height: "80px" }}
    className="cursor-pointer sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px]"
    onClick={() =>
      setContactWatssapp(
        contactWatsapp === admin.id ? null : admin.id
      )
    }
  />
{contactWatsapp === admin.id && (() => {
  const mosque = mosques.find((m) => m.id === admin.mosque_id);
  const mosqueName = mosque ? mosque.name : "غير معروف";
  const mosqueCode = mosque ? mosque.code : "غير متوفر";
const message = ` 
كود الجامع: ${mosqueCode}
كود المشرف: ${admin.code}`;

  const phone = admin.phone
    ? admin.phone.replace(/^0/, "963")
    : "غير متوفر";

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="mt-5 w-full bg-white border border-[#AFD1BC] rounded-2xl shadow-lg p-5 text-right transition-all duration-300 hover:shadow-2xl ">
      <div className="text-center mb-3 flex-row gap-3 flex">
        <p className="text-gray-700 font-semibold text-lg">
          رقم الهاتف
        </p>
        <p className="text-[#2A603F] text-xl font-bold">
          {admin.phone || "غير متوفر"}
        </p>
      </div>

      <div className="bg-[#F7FAF9] border border-[#AFD1BC]/60 rounded-xl p-3 mb-4 text-gray-700 shadow-inner whitespace-pre-wrap">
        {message}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => window.open(whatsappUrl, "_blank")}
          className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#1EBE5B] shadow-md hover:shadow-lg transition"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="whatsapp"
            className="w-5 h-5"
          />
          إرسال عبر واتساب
        </button>
      </div>
    </div>
  );
})()}

</div>

        </div>
      </div>
    </div>
  );
})}

            
          </div>
        )}
      </div>
    </section>
  );
}
