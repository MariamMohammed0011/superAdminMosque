import React, { useState, useEffect } from "react";

export default function ContactSupervisor({ phone }) {
  const [message, setMessage] = useState("");
  const [cleanedPhone, setCleanedPhone] = useState("");

  useEffect(() => {
    if (phone) {
      let digits = phone.replace(/[^0-9]/g, "");

      if (digits.startsWith("0")) {
        digits = digits.substring(1);
        digits = "963" + digits;
      } else if (digits.startsWith("9") && digits.length === 9) {
        digits = "963" + digits;
      }

      setCleanedPhone(digits);
    }
  }, [phone]);

  const handleSend = () => {
    if (!cleanedPhone || !message) {
      alert("الرجاء كتابة الرسالة");
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-4 space-y-3 max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-center">
        ارسل رسالتك عبر تطبيق الواتساب
      </h2>

      <div className="border p-2 w-full rounded text-right bg-gray-100">
        رقم الهاتف: {cleanedPhone ? `+${cleanedPhone}` : "غير متوفر"}
      </div>

      <textarea
        placeholder="اكتب الرسالة هنا"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full rounded text-right"
      />
      <button
        onClick={handleSend}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        إرسال على واتساب
      </button>
    </div>
  );
}
