import { useState, useEffect } from "react";
import Fireworks from "@fireworks-js/react";
import { ReactTyped } from "react-typed";
import Head from "next/head";

export default function Home() {
  const [isJanuaryFirst2025, setIsJanuaryFirst2025] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const now = new Date();
    const targetDate = new Date("2025-01-01T00:00:00");

    if (
      now.getFullYear() === targetDate.getFullYear() &&
      now.getMonth() === targetDate.getMonth() &&
      now.getDate() === targetDate.getDate()
    ) {
      setIsJanuaryFirst2025(true);
    } else if (
      now.getFullYear() === 2024 &&
      now.getMonth() === 11 && // December is month 11 (0-indexed)
      now.getDate() === 31
    ) {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const difference = targetDate - currentTime;

        if (difference <= 0) {
          setIsJanuaryFirst2025(true);
          clearInterval(interval);
        } else {
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / (1000 * 60)) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
          setTimeLeft({ hours, minutes, seconds });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const options = {
    speed: 3,
    sound: {
      enable: true,
      volume: {
        min: 15,
        max: 30,
      },
    },
    mouse: {
      click: true,
    },
  };

  if (!isJanuaryFirst2025) {
    if (timeLeft) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
          <h1 className="text-3xl font-bold mb-4">Menunggu ~ 1 Januari 2025</h1>
          <div className="text-2xl bg-black bg-opacity-50 px-6 py-3 rounded-lg">
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800 text-white">
        <h1 className="text-3xl font-bold">Website ini hanya dapat diakses pada 1 Januari 2025</h1>
      </div>
    );
  }

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1509166346794-3763861db8c8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <Head>
        <title>Happy New Years</title>
      </Head>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-white text-4xl font-bold bg-black bg-opacity-50 px-6 py-3 rounded-lg mb-4">
          <ReactTyped strings={["Happy New Years", "Resolusi 2025"]} typeSpeed={20} />
        </h1>
        <div className="bg-black bg-opacity-70 mx-2 rounded-md p-3">
        <p className=" text-justify"><span className="font-bold text-xl">Gagal</span> adalah bagian dari <span className="font-bold text-xl">proses belajar</span>, bukan akhir dari segalanya. Di tahun 2025, mari kita ubah <span className="font-bold text-xl">cara pandang</span> kita terhadap <span className="font-bold text-xl">kegagalan</span>. Setiap kali kita <span className="font-bold text-xl">jatuh</span>, itu adalah kesempatan untuk <span className="font-bold text-xl">bangkit</span> lebih kuat dan lebih bijaksana. Jangan biarkan <span className="font-bold text-xl">ketakutan</span> akan kegagalan <span className="font-bold text-xl">menghentikan langkah kita</span>. Teruslah <span className="font-bold text-xl">belajar, berinovasi, dan mencoba</span> hal-hal baru. Ingat, <span className="font-bold text-xl">keberhasilan bukanlah</span> soal tidak pernah <span className="font-bold text-xl">gagal</span>, melainkan soal <span className="font-bold text-xl">bangkit kembali</span> setelah setiap <span className="font-bold text-xl">kegagalan</span>.</p>
        <p className="text-center my-4 font-bold">~ Azhar Arrozak ~</p>
        </div>
      </div>
      <Fireworks className="h-screen w-full" options={options} />
    </div>
  );
}
