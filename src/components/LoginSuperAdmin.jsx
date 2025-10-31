import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSuperAdmin.css";
import { PiQrCodeLight } from "react-icons/pi";
export default function LoginSuperAdmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // email: "",
    // password: "",
    // rememberMe: false,
    code_user: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [shakeFields, setShakeFields] = useState({
  //   email: false,
  //   password: false,
  // });
  const [shakeFields, setShakeFields] = useState(
    false,
  );


  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail, rememberMe: true }));
    }
  }, []);

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };
const handleChange = (e) => {
    setFormData({ code_user: e.target.value });
  };
  // const validateForm = () => {
  //   let valid = true;
  //   const newShake = { email: false, password: false };

  //   if (!formData.email.trim()) {
  //     newShake.email = true;
  //     valid = false;
  //   }
  //   if (!formData.password.trim()) {
  //     newShake.password = true;
  //     valid = false;
  //   }

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (formData.email && !emailRegex.test(formData.email)) {
  //     newShake.email = true;
  //     valid = false;
  //   }

  //   setShakeFields(newShake);

  //   if (!valid) {
  //     setTimeout(() => setShakeFields({ email: false, password: false }), 500);
  //     setError("يرجى التأكد من البيانات المدخلة");
  //   }

  //   return valid;
  // };
 const validateForm = () => {
    if (!formData.code_user.trim()) {
      setShake(true);
      setError("يرجى إدخال كود المستخدم");
      setTimeout(() => setShake(false), 500);
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    setError("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login/superadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // email: formData.email,
          // password: formData.password,
           code_user: formData.code_user,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.message || "خطأ في تسجيل الدخول");
      }

      const data = await response.json();
      console.log(response);
      localStorage.setItem("token", data.token);

      // if (formData.rememberMe) {
      //   localStorage.setItem("savedEmail", formData.email);
      // } else {
      //   localStorage.removeItem("savedEmail");
      // }

      navigate("/mosques");
    } catch (err) {
      setError(err.message || "فشل تسجيل الدخول، يرجى التأكد من البيانات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-gradient-to-r from-[#AFD1BC] via-[#8FB8A4] to-[#E8F0EF]">
      {/* <div className="flex shadow-2xl"> */}
      <div className="flex flex-col xl:flex-row shadow-2xl w-full max-w-4xl mx-auto">

        {/* <div className="flex flex-col items-center justify-center text-center p-20 gap-8 bg-white rounded-2xl xl:rounded-tr-none xl:rounded-br-none"> */}
         <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 lg:p-20 gap-8 bg-white rounded-2xl xl:rounded-tr-none xl:rounded-br-none w-full">

          <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-[#2A603F] font-ruqaa pb-[50px]">
            أهلاً وسهلاً بكم
          </h1>
<div className="flex flex-col text-2xl text-right gap-1 font-ruqaa">
 <div className="flex items-center justify-end  gap-2  p-2 rounded-md ">
   <span className="text-[#2A603F] text-xl font-ruqaa">
    يرجى إدخال كود المستخدم
  </span>
  <PiQrCodeLight className="text-[#2A603F] text-3xl" />
 
</div>

   <input
              type="text"
              name="code_user"
              value={formData.code_user}
              onChange={handleChange}
              className={`w-full rounded-md p-2 border-2 outline-none focus:border-[#AFD1BC] focus:bg-[#EBF3EC] ${
                shakeFields ? "shake" : ""
              }`}
            />
          </div>

         


          {/* <div className="flex flex-col text-2xl text-right gap-1 font-ruqaa">
            <span className="text-[#2A603F]">يرجى إدخال البريد الإلكتروني</span>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-md p-2 border-2 outline-none focus:border-[#AFD1BC] focus:bg-[#EBF3EC] ${
    shakeFields.email ? "shake" : ""
  }`}
            />
           

          </div>

          <div className="flex flex-col text-2xl text-right gap-1 font-ruqaa">
            <span className="text-[#2A603F]">يرجى إدخال كلمة المرور</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`rounded-md p-1 border-2 outline-none focus:border-[#AFD1BC] focus:bg-[#EBF3EC] ${
                shakeFields.password ? "shake" : ""
              }`}
            />

            <div className="flex gap-1 items-center flex-row-reverse py-6">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="accent-[#2A603F]"
              />
              <span className="text-base px-1 text-[#2A603F]">
                تذكر البريد الإلكتروني
              </span>
            </div>
          </div> */}

          {error && <div className="text-red-500">{error}</div>}

          <button
            className="px-10 py-2 text-2xl rounded-md bg-gradient-to-r from-[#AFD1BC] via-[#8FB8A4] to-[#E8F0EF] hover:from-[#AFD1BC] hover:to-[#AFD1BC] text-white font-ruqaa"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </div>

        <img
          src="../../public/mgras.png"
          alt=""
          className="w-full max-w-[350px] object-cover xl:rounded-tr-2xl xl:rounded-br-2xl xl:block hidden"
        />
      </div>
    </section>
  );
}
