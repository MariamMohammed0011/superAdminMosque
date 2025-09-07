import React, { useState, useEffect } from "react";
import { Search, MoreVertical, Mail, KeyRound } from "lucide-react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function GetAllAdmins() {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenuIndex, setShowMenuIndex] = useState(null);
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

      if (!response.ok) throw new Error("فشل في جلب البيانات");

      const data = await response.json();
      setAdmins(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("خطأ أثناء جلب الإدمنات");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const filteredAdmins = admins.filter((admin) => {
    const fullName = `${admin.first_name || ""} ${admin.last_name || ""}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <section className="min-h-screen font-ruqaa bg-gradient-to-r from-[#AFD1BC] via-[#8FB8A4] to-[#E8F0EF] p-8 relative">
      
      <button
        onClick={() => navigate("/mosques")}
        className="absolute top-4 left-4 text-[#2A603F]"
      >
        <IoReturnUpBackOutline size={35} className="font-bold" />
      </button>

      <div className="max-w-6xl mx-auto">
     
        <div className="flex flex-col md:flex-col items-end   mb-10 gap-10 ">
         
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="بحث باسم الإدمن..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-full pl-10 pr-4 py-2 shadow focus:outline-[#AFD1BC] focus:ring-2 focus:ring-[#AFD1BC]"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
           <h2 className="text-4xl font-[300] text-[#2A603F]">
            قائمة الإدمنات
          </h2>
        </div>

       
        {filteredAdmins.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">لا يوجد إدمنات</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-between  " dir="rtl">
            {filteredAdmins.map((admin) => {
              const fullName = `${admin.first_name || ""} ${
                admin.last_name || ""
              }`;
              return (
                <div
                  key={admin.id}
                  className="bg-white p-6 rounded-2xl shadow-2xl hover:shadow-xl transition relative"
                >
                 
                  <div className="absolute top-4 left-4">
                    <button
                      onClick={() =>
                        setShowMenuIndex(
                          admin.id === showMenuIndex ? null : admin.id
                        )
                      }
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical className="text-[#2A603F]" size={22} />
                    </button>
                    {showMenuIndex === admin.id && (
                      <div className="absolute left-10 top-0 bg-white border rounded-lg shadow z-10 w-24 text-center flex flex-col">
                        <button
                          className="px-3 py-1 text-sm hover:bg-gray-100"
                          onClick={() => {
                            setShowMenuIndex(null);
                            navigate(`/admin/profile/${admin.id}`);
                          }}
                        >
                          عرض
                        </button>
                      </div>
                    )}
                  </div>

                
                 <div className="text-right space-y-4">
  <h3 className="text-2xl font-semibold text-[#2A603F] text-center font-zain">
    {fullName}
  </h3>


  <div className="text-gray-600">
    <span className="flex  justify-start gap-2 mb-4">
      <Mail size={20} className="text-[#2A603F]" />
      <span className="font-medium">الإيميل:</span>
    </span>
    <p className="break-words text-sm text-right mt-1 mb-4">{admin.email}</p>
  </div>

  {/* الكود */}
  <div className="text-gray-600">
    <span className="flex   justify-start gap-2 mb-4 ">
      <KeyRound size={18} className="text-[#2A603F]" />
      <span className="font-medium">الكود:</span>
    </span>
    <p className="text-sm text-right mt-1">{admin.code}</p>
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
