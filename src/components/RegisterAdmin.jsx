import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";
export default function RegisterAdmin() {
  const navigate = useNavigate();
  const [mosques, setMosques] = useState([]);
  const [formData, setFormData] = useState({
    // email: "",
    // password: "",
    first_name: "",
    last_name: "",
    mosque_id: "",
    // birth_date: "",
    // is_save_quran: false,
    phone: "",
    // experiences: "",
    // address: "",

    // memorized_parts: 0,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/Mosque", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMosques(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...formData,
          // birth_date: formData.birth_date || null,
          mosque_id: formData.mosque_id ? parseInt(formData.mosque_id) : null,
          // memorized_parts: formData.memorized_parts
          //   ? parseInt(formData.memorized_parts)
          //   : 0,
        }),
      });

      const data = await res.json();
      console.log("Status:", res.status);
      console.log("Response:", data);

      if (!res.ok) {
        setMessage(data.message || "فشل تسجيل الإدمن");
        return;
      }

      setMessage("تم تسجيل الإدمن بنجاح!");
      setFormData({
        // email: "",
        // password: "",
        first_name: "",
        last_name: "",
        mosque_id: "",
        // birth_date: "",
        // is_save_quran: false,
        phone: "",
        // experiences: "",
        // address: "",

        // memorized_parts: 0,
      });
    } catch (err) {
      console.error("Error:", err);
      setMessage("حدث خطأ أثناء التسجيل، يرجى المحاولة لاحقاً");
    }
  };

  return (
   <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#AFD1BC] via-[#8FB8A4] to-[#E8F0EF] font-mono px-4 py-6">
   <div className="flex shadow-2xl flex-col items-center">
    
        <button
          onClick={() => navigate("/mosques")}
          className="absolute top-2 left-2  text-[#2A603F]  text-2xl"
        >
          <IoReturnUpBackOutline size={30} className="font-bold" />
        </button>

        <div className="flex shadow-2xl">
          <div className="flex flex-col items-center justify-center text-center p-5 gap-4 bg-white rounded-2xl w-[400px]">
            <h1 className="text-3xl font-bold text-[#2A603F] font-zain pb-2">
              تسجيل حساب  مشرف
            </h1>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <InputField
                label="الاسم الأول"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              <InputField
                label="الاسم الأخير"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
                <InputField
                label="رقم الهاتف"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              {/* <InputField
                label="البريد الإلكتروني"
                name="email"
                value={formData.email}
                onChange={handleChange}
              /> */}
              {/* <InputField
                label="كلمة المرور"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <InputField
                label="تاريخ الميلاد"
                name="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={handleChange}
              /> */}

              {/* <div className="flex items-center justify-end gap-2 text-right">
                <label
                  htmlFor="is_save_quran"
                  className="text-[#2A603F] font-ruqaa"
                >
                  يحفظ القرآن؟
                </label>
                <input
                  id="is_save_quran"
                  type="checkbox"
                  name="is_save_quran"
                  checked={formData.is_save_quran}
                  onChange={handleChange}
                  className="accent-[#2A603F]"
                />
              </div>

              <InputField
                label="رقم الهاتف"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <InputField
                label="العنوان"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <InputField
                label=" الدراسة"
                name="experiences"
                value={formData.experiences}
                onChange={handleChange}
              />

              <InputField
                label="عدد الأجزاء المحفوظة"
                name="memorized_parts"
                type="number"
                value={formData.memorized_parts}
                onChange={handleChange}
              /> */}

              <div className="flex flex-col text-right">
                <label className="text-[#2A603F] font-ruqaa">اختر المسجد</label>
                <select
                  name="mosque_id"
                  value={formData.mosque_id}
                  onChange={handleChange}
                  required
                  className="rounded-md p-1 border-2 outline-none focus:border-[#AFD1BC] focus:bg-[#EBF3EC]"
                >
                  <option value="">اختر المسجد</option>
                  {mosques.map((mosque) => (
                    <option key={mosque.id} value={mosque.id}>
                      {mosque.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-2 text-xl rounded-md bg-gradient-to-r from-[#AFD1BC] via-[#8FB8A4] to-[#E8F0EF] text-white font-ruqaa hover:from-[#AFD1BC] hover:to-[#AFD1BC] "
              >
                تسجيل الإدمن
              </button>
            </form>

            {message && (
              <div className="text-red-500 font-ruqaa">{message}</div>
            )}
          </div>

          <div className="w-[300px] h-[400px] overflow-hidden rounded-tr-2xl rounded-br-2xl hidden xl:block">
            <img
              src="../../public/mgras.png"
              alt="مسجد"
              className="w-full h-full object-cover "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col text-right">
      <label className="text-[#2A603F] font-ruqaa">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="rounded-md p-1 border-2 outline-none focus:border-[#AFD1BC] focus:bg-[#EBF3EC]"
      />
    </div>
  );
}
