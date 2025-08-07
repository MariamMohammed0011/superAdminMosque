import React, { useState, useEffect } from "react";
import { Menu, Search, User, MoreVertical } from "lucide-react";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { LuFileText } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
export default function GetAllMosques() {
  
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const [mosques, setMosques] = useState([]);
  // const [error, setError] = useState("");
  const [mosqueName, setMosqueName] = useState("");
  const [mosqueAddress, setMosqueAddress] = useState("");
   const [mosqueCode, setMosqueCode] = useState("");
  
  const [newMosqueCode, setNewMosqueCode] = useState("");
  const [addError, setAddError] = useState("");
const [editMosque, setEditMosque] = useState({
  id: '',
  name: '',
  address: '',
  // teacherName: '',
  // phone: '',
  // students: ''
});
const [searchTerm, setSearchTerm] = useState("");

const filteredMosques = mosques.filter((mosque) =>
  mosque.name.toLowerCase().includes(searchTerm.toLowerCase())
);
const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
const [showSortMenu, setShowSortMenu] = useState(false);
 const navigate = useNavigate();
  // const handleSave = () => {
  //   const codeToCopy = "1234-5678-9101"; // الكود المطلوب نسخه
  //   navigator.clipboard.writeText(codeToCopy).then(() => {
  //     setIsSaved(true);
  //   });
  // };
const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

  const fetchMosques = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("غير مصرح لك بالدخول");
        return;
      }

      const response = await fetch("/api/mosque", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("فشل في جلب البيانات");

      const data = await response.json();
      setMosques(data);
    } catch (err) {
      setError("خطأ أثناء جلب البيانات");
      console.error(err);
    }
  };
const getSortedMosques = () => {
  let sorted = [...filteredMosques];
  if (sortField) {
    sorted.sort((a, b) => {
      const aField = a[sortField]?.toLowerCase() || "";
      const bField = b[sortField]?.toLowerCase() || "";
      if (aField < bField) return sortOrder === "asc" ? -1 : 1;
      if (aField > bField) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }
  return sorted;
};
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchMosques();
    }
  }, []);

  const handleAddMosque = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setAddError("غير مصرح لك");
        return;
      }

      const response = await fetch("/api/mosque/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: mosqueName,
          address: mosqueAddress,
       
        }),
      });

      if (!response.ok) throw new Error("فشل في إنشاء الجامع");

     const data = await response.json();

      setIsSaved(true);
      setNewMosqueCode(data.code_display);
      setMosqueName("");
      setMosqueAddress("");
      fetchMosques(); // استدعاء لجلب كل الجوامع بعد الإضافة
    } catch (err) {
      setAddError("حدث خطأ أثناء الإضافة");
      console.error(err);
    }
  };
 const handleUpdateMosque = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    const updateData = {
      name: editMosque.name,
      address: editMosque.address,
      teacherName: editMosque.teacherName,
      phone: editMosque.phone,
      students: editMosque.students,
    };

    const response = await fetch(`/api/mosque/update/${editMosque.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorRes = await response.json();
      throw new Error(errorRes.message || "فشل في التعديل");
    }

    const updatedMosque = await response.json();

// تحديث قائمة المساجد في الواجهة
// setMosques((prevMosques) =>
//   prevMosques.map((mosque) =>
//     mosque.id === updatedMosque.id ? updatedMosque : mosque
//   )
// );
 fetchMosques();
    setEditModal(false); // إخفاء مودال التعديل بعد النجاح
  } catch (err) {
    console.error(err);
  }
};


const handleDeleteMosque = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("غير مصرح لك");

    const response = await fetch(`/api/mosque/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorRes = await response.json();
      throw new Error(errorRes.message || "فشل في الحذف");
    }

    // إعادة جلب البيانات بعد الحذف
    fetchMosques();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


  return (
    <div className="shadow-2xl min-h-screen flex-row-reverse flex font-ruqaa bg-[#FBFAF8] ">
      {/* Sidebar */}
      <aside className="shadow-2xl   rounded-2xl overflow-hidden  mb-4  w-64 min-h-screen bg-[#EBF3EC]   flex flex-col  text-[#2A603F]  hidden md:flex ">
        <div className="  ">
          <img
            src="../../public/mgras.png"
            alt=""
            className=" translate-y-[-50px] object-cover xl:rounded-tr-2xl xl:rounded-br-2xl "
          />
        </div>
     <nav className="flex flex-col gap-7 text-xl text-right mt-[-90px] pr-8 font-ruqaa">
  <button
    onClick={() => fetchMosques()}
    className="flex items-center gap-3 justify-end "
  >
    <span>تصفح كل الجوامع</span> <FaRegListAlt size={23} />
  </button>
  <button
    onClick={() => setAddModal(true)}
    className="flex items-center gap-3 justify-end "
  >
    <span>انشاء حساب جامع</span> <IoMdAddCircleOutline size={23} />
  </button>
  <button
    onClick={handleLogout}
    className="flex items-center gap-3 justify-end "
  >
    <span>تسجيل خروج</span> <IoMdLogOut size={23} />
  </button>
</nav>

      </aside>

      {/* Main Content */}
      <main className="shadow-2xl flex-1 p-6 flex flex-col gap-6 w-full">
        {/* Header */}
        <div className="flex justify-between items-center flex-row-reverse">
          <div>
            <h2 className="text-2xl font-bold text-right">
              ولطف الله بعبده باب واسع ...
            </h2>
          </div>
          <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
            <button className="flex items-center gap-1 border px-3 py-1 rounded-lg shadow"  onClick={() => setShowSortMenu(!showSortMenu)}>
              <Menu size={18} />
              <span>تصنيف حسب</span>
            </button>
              {showSortMenu && (
      <div className="absolute mt-10  w-48 bg-white border rounded shadow-lg p-4 space-y-5 z-20">
       
       <button
               onClick={() => setShowSortMenu(false)}
              className="absolute left-2 top-2 text-gray-500 hover:text-gray-700"
            >
              <IoCloseCircleOutline size={30} />
            </button>
       
        <div>
          <label className="flex flex-row-reverse mb-2 font-medium">المجال</label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="w-full border rounded p-1 text-right"
          >
            <option value="">اختر المجال</option>
            <option value="name">اسم الجامع</option>
            <option value="teacherName">اسم المعلم</option>
            <option value="phone">رقم الهاتف</option>
            <option value="students">عدد الطلاب</option>
          </select>
        </div>

        <div>
          <label className=" mb-1 font-medium  flex flex-row-reverse">الترتيب</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full border rounded p-1 text-right"
          >
            <option value="asc">تصاعدي</option>
            <option value="desc">تنازلي</option>
          </select>
        </div>

        <button
          className="w-full bg-[#2A603F] text-white py-2 rounded hover:bg-[#245138]"
          onClick={() => {
            // alert(`صنف حسب ${sortField} بترتيب ${sortOrder}`);
            setShowSortMenu(false); // إغلاق القائمة بعد التطبيق
          }}
        >
          تطبيق
        </button>
      </div>
    )}
           
            <div className="relative">
             <input
  type="text"
  placeholder="بحث"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="border rounded-full pl-10 pr-4 py-1 shadow focus:outline-[#AFD1BC]"
/>

              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
           {/* <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden border rounded px-2 py-1 shadow"
            >
              <Menu />
            </button> */}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#D6E6DB] rounded-xl p-4 shadow flex-1 overflow-x-auto">
          <div className="flex justify-end  items-end mb-6 flex-col text-right gap-3 md:flex-row xl:flex-col">
            <h3 className="text-xl font-bold text-[#2A603F] text-right">
              الجوامع
            </h3>
            <button
              className="flex items-center gap-3 text-[#2A603F] "
              onClick={() => setAddModal(true)}
            >
              <div className="w-5 h-5 bg-white rounded text-center flex justify-center shadow-lg">
                <IoMdAdd size={20} className="text-[#999999]" />
              </div>
              <span
                className="font-medium p-2 text-[#999999]"
                style={{ textShadow: "0px 4px 4px #00000040" }}
              >
                إضافة جامع
              </span>
            </button>
          </div>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-7 bg-[#D6E6DB] text-[#2A603F] font-bold p-2 rounded-lg text-center">
            <span>الإجراءات</span>
            <span>الطلاب</span>
            <span>الملف الشخصي</span>
            <span>رقم الهاتف</span>
            <span>اسم المعلم</span>
            <span>اسم الجامع</span>
            <span></span>
          </div>

          {/* Table Rows */}
          <div className="space-y-2 mt-2">
           {getSortedMosques().map((mosque) => (
  <div key={mosque.id}>

                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-7 bg-white p-2 rounded-lg text-center shadow hover:bg-gray-100 transition">
                  <div className="flex justify-center relative">
                    <button
                      onClick={() =>
                        setShowMenuIndex(mosque.id === showMenuIndex ? null : mosque.id)
                      }
                    >
                      <MoreVertical />
                    </button>
                    {showMenuIndex === mosque.id && (
                      <div className="absolute right-full translate-x-[57px] translate-y-2 bg-white border rounded shadow z-10 w-20 text-center flex flex-col">
                        <button
                          className="block text-[#000] font-ruqaa hover:bg-gray-100"
                          onClick={() => {
                            setShowMenuIndex(null);
                            setEditMosque({
    id: mosque.id,
    name: mosque.name,
    address: mosque.address,
   
    // teacherName: mosque.teacherName || "",
    // phone: mosque.phone || "",
    // students: mosque.students || 0,
  });
                            setEditModal(true);
                          }}
                        >
                          تعديل
                        </button>
                        <button
                          className="block text-[#000] hover:bg-gray-100 font-ruqaa"
                          onClick={() => {
    setShowMenuIndex(null);
    handleDeleteMosque(mosque.id);
  }}
                        >
                          حذف
                        </button>
                      </div>
                    )}
                  </div>
                  <span >{mosque.students} </span>
                  <div className="flex flex-col items-center gap-1 w-24 text-center break-words">
                   <button    onClick={() => navigate('/profile')}>  <LuFileText className="text-[#2A603F]" size={20} />
                    <span className="text-xs" >الملف الشخصي</span>
                </button>
                     </div>
                  <span>{mosque.code} </span>
                  <span className="text-xs break-words " >{mosque.address} </span>
                  <span className="text-xs break-words ">{mosque.name} </span>
                  <span>
                    <AccountCircleOutlinedIcon className="text-[#F8C248]" />
                  </span>
                </div>

                {/* Mobile View */}
              {/* Mobile View */}
<div className="md:hidden bg-white p-2 rounded-lg shadow hover:bg-gray-100 transition space-y-2 relative text-sm w-72 mx-auto">
  {/* العنوان مع القائمة */}
  <div className="flex flex-col  mb-2">
   
    <div className="relative   flex justify-end mb-5 ">
      <button
        onClick={() =>
          setShowMenuIndex(mosque.id === showMenuIndex ? null : mosque.id)
        }
      >
        <MoreVertical size={18} />
      </button>

      {showMenuIndex === mosque.id && (
        <div className="absolute left-0 top-7 bg-white border rounded shadow z-10 w-24 text-center flex flex-col">
          <button
            className="hover:bg-gray-100 p-1 text-xs"
            onClick={() => {
              setShowMenuIndex(null);
              setEditMosque({
                id: mosque.id,
                name: mosque.name,
                address: mosque.address,
              });
              setEditModal(true);
            }}
          >
            تعديل
          </button>
          <button
            className="hover:bg-gray-100 p-1 text-xs"
            onClick={() => {
              setShowMenuIndex(null);
              handleDeleteMosque(mosque.id);
            }}
          >
            حذف
          </button>
        </div>
      )}
    </div>
  <div className="flex flex-col justify-between text-justify space-y-4">
  <div className="flex flex-col space-y-1">
    <span className="text-[#2A603F] font-bold truncate text-right">: اسم الجامع</span>
    <span className="text-[#2A603F] font-bold truncate text-center">{mosque.name}</span>
  </div>

  <div className="flex flex-col space-y-1">
    <span className="text-[#2A603F] font-bold truncate text-right">: عنوان الجامع</span>
    <span className="text-[#2A603F] font-bold truncate text-center">{mosque.address}</span>
  </div>
</div>

  </div>

  

  {/* الأزرار التفاعلية */}
  <div className="flex justify-between items-center mt-2">
    <button
      onClick={() => navigate('/profile')}
      className="flex items-center gap-1 text-[#2A603F] hover:text-green-700 transition text-xs"
    >
      <LuFileText size={16} />
      <span>الملف الشخصي</span>
    </button>

    <AccountCircleOutlinedIcon className="text-[#F8C248]" fontSize="small" />
  </div>
</div>


              </div>
            ))}
          </div>
        </div>
      </main>
      {addModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-right space-y-4 relative">
            <button
              onClick={() => {
                setAddModal(false);
                setIsSaved(false); // إعادة تعيين حالة الحفظ عند الإغلاق
              }}
              className="absolute left-2 top-2 text-gray-500 hover:text-gray-700"
            >
              <IoCloseCircleOutline size={30} />
            </button>

            {isSaved ? (
              <>
                <h3 className="text-xl font-bold text-[#2A603F]">تم الحفظ!</h3>
                <p className="text-center text-gray-700">
                  تم نسخ الكود بنجاح إلى الحافظة:
                </p>
                <div className="bg-gray-100 p-2 rounded text-center font-mono text-lg">
               {newMosqueCode}
                </div>
                <button
                  onClick={() => {
                    setAddModal(false);
                    setIsSaved(false);
                  }}
                  className="bg-[#2A603F] text-white px-4 py-2 rounded w-full hover:bg-[#245138]"
                >
                  تم
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-[#2A603F]">
                  إضافة جامع جديد
                </h3>
                <input
                  type="text"
                  placeholder="اسم الجامع"
                  value={mosqueName}
                  onChange={(e) => setMosqueName(e.target.value)}
                  className="w-full border rounded p-2 focus:outline-[#AFD1BC] text-right"
                />
                <input
                  type="text"
                  placeholder="عنوان الجامع"
                  value={mosqueAddress}
                  onChange={(e) => setMosqueAddress(e.target.value)}
                  className="w-full border rounded p-2 focus:outline-[#AFD1BC] text-right"
                />
                {addError && (
                  <p className="text-red-500 text-center">{addError}</p>
                )}

                <button
                  onClick={handleAddMosque}
                  className="bg-[#2A603F] text-white px-4 py-2 rounded w-full hover:bg-[#245138]"
                >
                  حفظ
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-right space-y-4 relative">
            <button
              onClick={() => setEditModal(false)}
              className="absolute left-2 top-2 text-gray-500 hover:text-gray-700"
            >
              <IoCloseCircleOutline size={30} />
            </button>

            <h3 className="text-xl font-bold text-[#2A603F]">
              تعديل معلومات الجامع
            </h3>

            <input
              type="text"
              value={editMosque.name}
              onChange={(e) =>
                setEditMosque({ ...editMosque, name: e.target.value })
              }
              placeholder="اسم الجامع"
              className="w-full border rounded p-2 text-right"
            />
            <input
              type="text"
              value={editMosque.address}
              onChange={(e) =>
                setEditMosque({ ...editMosque, address: e.target.value })
              }
              placeholder="عنوان الجامع"
              className="w-full border rounded p-2 text-right"
            />
            <input
              type="text"
              value={editMosque.teacherName}
              onChange={(e) =>
                setEditMosque({ ...editMosque, teacherName: e.target.value })
              }
              placeholder="اسم المعلم المسؤول"
              className="w-full border rounded p-2 text-right"
            />
            <input
              type="text"
              value={editMosque.phone}
              onChange={(e) =>
                setEditMosque({ ...editMosque, phone: e.target.value })
              }
              placeholder="رقم الهاتف"
              className="w-full border rounded p-2 text-right"
            />
            <input
              type="number"
              value={editMosque.students}
              onChange={(e) =>
                setEditMosque({ ...editMosque, students: e.target.value })
              }
              placeholder="عدد الطلاب"
              className="w-full border rounded p-2 text-right"
            />

            <button
              onClick={handleUpdateMosque}
              className="bg-[#2A603F] text-white px-4 py-2 rounded w-full hover:bg-[#245138]"
            >
              حفظ التعديلات
            </button>
          </div>
        </div>
      )}
    

    </div>
  );
}
