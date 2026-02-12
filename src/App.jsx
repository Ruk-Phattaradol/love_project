import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2, VolumeX, Sparkles, Stars, SmilePlus, Grid } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- 1. IMPORT ASSETS ---
import songFile from './assets/song.mp3';
import img1 from './assets/images/1.jpg'; 
import img2 from './assets/images/2.jpg';
import img3 from './assets/images/3.jpg';
import img4 from './assets/images/4.jpg';
// รูปสำหรับอัลบั้มรวม (11-19)
import img11 from './assets/images/11.jpg';
import img12 from './assets/images/12.jpg';
import img13 from './assets/images/13.jpg';
import img14 from './assets/images/14.jpg';
import img15 from './assets/images/15.jpg';
import img16 from './assets/images/16.jpg';
import img17 from './assets/images/17.jpg';
import img18 from './assets/images/18.jpg';
import img19 from './assets/images/19.jpeg';

// วิดีโอ
import videoFile from './assets/1.mp4';
import video2 from './assets/2.mp4'; // คลิป Chapter 6
import video3 from './assets/3.mp4'; // คลิปปิดท้าย

const CONFIG = {
  passcode: "150268",
  prankText: "คำถามวัดใจ... รักเค้าแค่ไหน? 🤨",
  buttonYes: "เท่าจักรวาล! 🪐",
  buttonNo: "เฉยๆ อะ",
  gifPleading: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDNmeXdjdmR3dXEyeTVsZmR0dGRmaWkwam9vbnpicm11azh1cTgwZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/901mxGLGQN2PyCQpoc/giphy.gif",
  gifHappy: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWlmNXJlYW44ZG5pYmd5dzBiN3BiOGMzcDZtbGVsamlvYzZtdjN4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/T70hpBP1L0N7U0jtkq/giphy.gif"
};

// --- 2. เนื้อเรื่อง ---
const STORY = [
  {
    id: 1,
    type: 'video', 
    src: videoFile, 
    title: "Chapter 1: The Beginning",
    text: "จำได้ไหม... ว่าทำไมพี่ถึงชอบ 'ส้ม'? 🍊" 
  },
  {
    id: 2,
    type: 'image',
    src: img1, 
    title: "Chapter 2: First Meeting",
    text: "วันนี้ไงที่เราเจอกันครั้งแรก... ส้มน่ารักมากๆ เลยเนอะ 🥰" 
  },
  {
    id: 3,
    type: 'image',
    src: img2, 
    title: "Chapter 3: First Couple Photo",
    text: "รูปคู่รูปแรก... พี่ก็แต่งตัวซะติ๋มเลย 55555 🤣" 
  },
  {
    id: 4,
    type: 'image',
    src: img3, 
    title: "Chapter 4: My Favorite One",
    text: "รู้ไหม... พี่ชอบรูปคู่รูปนี้ของเรามากที่สุดเลยนะ ❤️" 
  },
  {
    id: 5,
    type: 'image',
    src: img4, 
    title: "Chapter 5: That Smile",
    text: "แพ้รอยยิ้มนี้ที่สุด... แค่เห็นส้มยิ้ม โลกของพี่ก็สดใสขึ้นมาทันทีเลย 🍊✨" 
  },
  {
    id: 6,
    type: 'video', // เปลี่ยนเป็น video
    src: video2,   // ใช้ไฟล์ 2.mp4
    title: "Chapter 6: Side by Side",
    // คำบรรยายซึ้งๆ เกี่ยวกับช่วงเวลาลำบาก
    text: "ขอบคุณที่จับมือกันแน่นที่สุด ในวันที่พายุโหมกระหน่ำ... การมีส้มอยู่ข้างๆ คือพลังที่ยิ่งใหญ่ที่สุดของพี่เลยนะ ⛈️🌈"
  },
  {
    id: 7,
    type: 'collage', // 🆕 ประเภทใหม่: อัลบั้มรวมรูป
    title: "Our Journey Gallery",
    text: "รวมทุกความทรงจำ... และจะสร้างมันด้วยกันต่อไปนะ 📸",
    // รายการรูป/คลิป ที่จะโชว์ในหน้านี้
    items: [
        { type: 'img', src: img11 },
        { type: 'img', src: img12 },
        { type: 'img', src: img13 },
        { type: 'img', src: img14 },
        { type: 'img', src: img15 },
        { type: 'video', src: video3 }, // เอาคลิป 3.mp4 มาแทรกตรงกลางให้เด่นๆ
        { type: 'img', src: img17 },
        { type: 'img', src: img18 },
        { type: 'img', src: img19 },
    ]
  },
  {
    id: 8,
    type: 'image',
    src: img16, 
    title: "Happy Anniversary",
    text: "รักนะครับ อยู่บ่นพี่ไปนานๆ นะ จุ๊บๆ 😘"
  }
];

export default function App() {
  const [stage, setStage] = useState('login');
  const [passcode, setPasscode] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const [wrongTease, setWrongTease] = useState(false);
  const [showPleadingGif, setShowPleadingGif] = useState(false);
  const [showHappyGif, setShowHappyGif] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === CONFIG.passcode) {
      setStage('prank');
    } else {
      setWrongTease(true);
      setTimeout(() => setWrongTease(false), 3000);
      setPasscode('');
    }
  };

  const handleYesClick = () => {
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    if(audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(e => console.log("Blocked"));
        setIsPlaying(true);
    }
    
    setShowHappyGif(true);
    setTimeout(() => {
        setShowHappyGif(false);
        setStage('gallery');
    }, 3000);
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden relative bg-slate-900 text-white font-sans selection:bg-pink-500/30">
      <audio ref={audioRef} loop src={songFile} />

      {/* พื้นหลัง */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-purple-600/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-rose-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* ละอองดาว */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        {[...Array(8)].map((_, i) => (
           <motion.div key={i} className="absolute text-white"
             initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight }}
             animate={{ y: -100, opacity: [0, 1, 0] }}
             transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
           >
             <Stars size={Math.random() * 10 + 5} />
           </motion.div>
        ))}
      </div>

      {/* ปุ่มเปิด/ปิดเพลง */}
      {stage === 'gallery' && (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={toggleMusic} className="fixed top-6 right-6 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all">
          {isPlaying ? <Volume2 size={20} className="text-white"/> : <VolumeX size={20} className="text-white/50"/>}
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        
        {/* --- 1. LOGIN --- */}
        {stage === 'login' && (
          <motion.div key="login" exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }} className="relative z-10 h-full flex flex-col justify-center items-center px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm text-center relative">
              <div className="relative">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="bg-gradient-to-tr from-pink-400 to-rose-400 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-pink-500/30">
                    <SmilePlus className="text-white w-10 h-10" />
                </motion.div>
                <Heart className="absolute top-0 right-1/4 text-pink-300 animate-bounce" size={24} fill="currentColor" />
                <Heart className="absolute bottom-0 left-1/4 text-pink-300 animate-bounce delay-700" size={18} fill="currentColor" />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-white tracking-wide">ความลับของพี่ 🤫</h1>
              <p className="text-white/60 text-sm mb-8 font-light">กรอกวันครบรอบของเราหน่อยเร็ว</p>
              <form onSubmit={handleLogin} className="space-y-6">
                <input type="text" inputMode="numeric" placeholder="••••••" value={passcode} onChange={(e) => setPasscode(e.target.value)} className="w-full bg-black/20 border border-white/10 focus:border-pink-500/50 rounded-2xl py-4 text-center text-3xl tracking-[0.5em] text-white placeholder-white/10 outline-none transition-all" maxLength={6} />
                <button type="submit" disabled={passcode.length !== 6} className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 rounded-2xl text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100">ปลดล็อค! ❤️</button>
              </form>
              <AnimatePresence>
                {wrongTease && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-16 left-0 right-0 text-pink-300 font-bold text-lg drop-shadow-lg">
                        "ผิดอ่าา! จำไม่ได้จริงดิ? น้อยใจนะ 🥺"
                    </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}

        {/* --- 2. PRANK --- */}
        {stage === 'prank' && (
          <motion.div key="prank" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-center">
             <h2 className="text-4xl font-bold mb-16 leading-tight drop-shadow-lg">{CONFIG.prankText}</h2>
             <div className="flex flex-col gap-4 w-full max-w-xs relative h-48 z-20">
                <button onClick={handleYesClick} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl text-xl font-bold shadow-lg shadow-pink-500/25 z-20 active:scale-95 transition-all">{CONFIG.buttonYes}</button>
                <motion.button whileHover={{ x: (Math.random()-0.5)*200, y: (Math.random()-0.5)*200, rotate: (Math.random()-0.5)*20 }} onTapStart={(e) => { e.target.style.transform = `translate(${(Math.random()-0.5)*150}px, ${(Math.random()-0.5)*150}px)`; }} onMouseEnter={() => setShowPleadingGif(true)} onMouseLeave={() => setShowPleadingGif(false)} onTouchStart={() => setShowPleadingGif(true)} onTouchEnd={() => setShowPleadingGif(false)} className="w-full bg-white/5 border border-white/10 text-white/40 py-4 rounded-2xl text-xl font-bold backdrop-blur-sm">{CONFIG.buttonNo}</motion.button>
             </div>
             <AnimatePresence>
                {showPleadingGif && !showHappyGif && (
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none">
                        <img src={CONFIG.gifPleading} alt="Pleading" className="rounded-3xl max-w-[80%] shadow-2xl border-4 border-pink-400/50" />
                    </motion.div>
                )}
                {showHappyGif && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
                        <img src={CONFIG.gifHappy} alt="Happy" className="rounded-3xl max-w-[80%] shadow-2xl mb-8" />
                         <h2 className="text-3xl font-bold text-white animate-bounce">เย้! รักที่สุดเลยยยย 💖</h2>
                    </motion.div>
                )}
             </AnimatePresence>
          </motion.div>
        )}

        {/* --- 3. GALLERY (Scroll Snap & Collage) --- */}
        {stage === 'gallery' && (
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="snap-container w-full h-full relative z-10 bg-black">
            {STORY.map((item, index) => {
              
              // --- SECTION แบบพิเศษ: Collage (รวมรูป) ---
              if (item.type === 'collage') {
                return (
                  <section key={item.id} className="snap-section h-[100dvh] w-full flex flex-col bg-slate-950 relative overflow-hidden">
                     {/* Header ของหน้า Collage */}
                     <div className="z-20 text-center pt-8 pb-4 px-4 bg-gradient-to-b from-black/80 to-transparent">
                        <h3 className="text-2xl font-bold text-pink-400 drop-shadow-md flex items-center justify-center gap-2">
                            <Grid size={24} /> {item.title}
                        </h3>
                        <p className="text-white/80 text-sm mt-1">{item.text}</p>
                     </div>
                     
                     {/* Grid รวมรูป (Scroll ได้เฉพาะส่วนนี้) */}
                     <div className="flex-1 overflow-y-auto p-4 pb-20 scrollbar-hide">
                        <div className="columns-2 gap-3 space-y-3">
                           {item.items.map((media, i) => (
                             <motion.div 
                               key={i} 
                               initial={{ opacity: 0, y: 20 }}
                               whileInView={{ opacity: 1, y: 0 }}
                               viewport={{ once: true }}
                               transition={{ delay: i * 0.1 }}
                               className="break-inside-avoid rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white/5"
                             >
                                {media.type === 'video' ? (
                                    <video src={media.src} autoPlay loop muted playsInline className="w-full h-auto object-cover" />
                                ) : (
                                    <img src={media.src} alt="Memory" className="w-full h-auto object-cover" />
                                )}
                             </motion.div>
                           ))}
                        </div>
                     </div>
                  </section>
                );
              }

              // --- SECTION ปกติ (Full Screen) ---
              return (
                <section key={item.id} className="snap-section h-[100dvh] w-full flex justify-center items-center relative overflow-hidden">
                  <motion.div className="absolute inset-0 z-0" initial={{ opacity: 0, scale: 1.2, filter: "blur(15px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 1.2, ease: "easeOut" }}>
                     <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 z-10" />
                     {item.type === 'video' ? <video src={item.src} autoPlay loop muted playsInline className="w-full h-full object-cover" /> : <img src={item.src} alt="" className="w-full h-full object-cover" />}
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative z-20 text-center px-8 w-full max-w-lg mt-[45vh]">
                     <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-3xl shadow-2xl">
                        <div className="flex items-center justify-center gap-2 mb-3"><Sparkles size={16} className="text-yellow-300" /><span className="text-xs font-bold tracking-widest text-pink-300 uppercase">Chapter 0{index + 1}</span><Sparkles size={16} className="text-yellow-300" /></div>
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">{item.title}</h3>
                        <p className="text-white/90 font-light text-lg leading-relaxed drop-shadow-sm">{item.text}</p>
                     </div>
                  </motion.div>
                </section>
              );
            })}
            
            {/* หน้าจบ */}
            <section className="snap-section h-[100dvh] bg-black flex flex-col justify-center items-center text-center relative">
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="p-10 border border-white/10 rounded-full bg-white/5 backdrop-blur-2xl">
                  <Heart className="w-24 h-24 text-pink-500 animate-pulse" fill="#ec4899" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mt-8">รักน้องส้มนะครับ</h2>
                <p className="text-white/40 mt-4 text-sm font-light">Design by พี่โปรแกรมเมอร์สุดหล่อ</p>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}