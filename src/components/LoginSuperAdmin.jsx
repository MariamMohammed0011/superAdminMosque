import React, { useState } from 'react';
export default function LoginSuperAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
 const handleLogin = async () => {
  try {
    const response = await fetch('/api/auth/login/superadmin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('خطأ في تسجيل الدخول');

    const data = await response.json();
    localStorage.setItem('token', data.token); 
    console.log('تم تسجيل الدخول بنجاح:', data.token);

    
    window.location.href = '/mosques';  

  } catch (err) {
    setError('فشل تسجيل الدخول، يرجى التأكد من البيانات');
    console.error(err);
  }
};

  return (
   <section className="min-h-screen flex items-center justify-center font-mono bg-gradient-to-r from-[#AFD1BC] from-10% via-[#8FB8A4] via-50% to-[#E8F0EF] to-100%">
  <div className="flex shadow-2xl">
    <div className="flex flex-col items-center justify-center text-center p-20 gap-8 bg-white rounded-2xl xl:rounded-tr-none xl:rounded-br-none">

      <h1 className="text-5xl font-bold  text-[#2A603F] font-ruqaa pb-[50px]">أهلاً وسهلاً بكم</h1>

      <div className="flex flex-col text-2xl text-right gap-1 font-ruqaa ">
        <span className="text-[#2A603F] font-ruqaa" >يرجى إدخال البريد الإلكتروني</span>
        <input type="text" value={email}
            onChange={(e) => setEmail(e.target.value)}  className="rounded-md p-1   border-2 outline-none focus:border-[#AFD1BC] focus:bg-[#EBF3EC]" />
      </div>

      <div className="flex flex-col text-2xl  text-right gap-1 font-ruqaa ">
        <span className="text-[#2A603F] font-ruqaa">يرجى إدخال كلمة المرور</span>
        <input value={password}
            onChange={(e) => setPassword(e.target.value)}  type="password" className="rounded-md p-1 border-2 outline-none focus:border-[#AFD1BC] focus:bg-[#EBF3EC]" />
        <div className="flex gap-1 items-center  flex-row-reverse py-6">
          <input type="checkbox" className="accent-[#2A603F]"/>
          <span className="text-base px-1 text-[#2A603F]">تذكر كلمة المرور</span>
        </div>
        
      </div>
  {error && <div className="text-red-500">{error}</div>}
      <button className="px-10 py-2 text-2xl rounded-md bg-gradient-to-r from-[#AFD1BC] from-10% via-[#8FB8A4] via-50% to-[#E8F0EF] to-100% hover:from-[#AFD1BC] hover:to-[#AFD1BC] text-white font-ruqaa"   onClick={handleLogin}>تسجيل الدخول</button>
    </div>

    <img src="../../public/mgras.png" alt="" className="w-[350px] object-cover xl:rounded-tr-2xl xl:rounded-br-2xl xl:block hidden" />
  </div>
</section>

  )
}
