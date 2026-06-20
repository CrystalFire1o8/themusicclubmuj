import CoreAdmin from "./CoreAdmin";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Camera,
  Disc3,
  Guitar,
  Headphones,
  Mail,
  Menu,
  Music2,
  Pause,
  Play,
  Search,
  Send,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";

const CLUB_NAME = "The Music Club";

const ASSETS = {
  logo: "/assets/tmc-logo.png",
  backgroundVideo: "/assets/tmc-bg-video.MP4",
};

const stats = [
  { value: "8+", label: "Flagship editions" },
  { value: "100+", label: "Active artists" },
  { value: "120+", label: "Annual performances" },
  { value: "150+", label: "Shared stage" },
];

 const eventSections = [
  {
    id: "ex-fest-competitions",
    title: "Ex Fest Competitions",
    subtitle: "Stages beyond campus",
    disableGallery: true,
    description:
        "TMC artists representing the club in external fests, battle of bands, solo competitions, and inter-college showcases.",
    cover: "/assets/events/ex-fest-cover.png",
    events: [
      {
        title: "Mood Indigo Eliminations'25",
        date: "7th September 2025",
        venue: "Vivekananda Global University, Jaipur",
        cover: "/assets/events/ex-fest-cover.png",
        description:
            "At the elimination round of IIT Bombay’s renowned Mood Indigo, held at Vivekananda Global University, Jaipur on 7th September 2025, our artists brought their A-game and earned a well-deserved place in the next stage. The stage was electric, the performances unforgettable, and the journey nothing short of incredible.",
        photos: [
          "/assets/events/requiem-1.jpg",
          "/assets/events/requiem-2.jpg",
          "/assets/events/requiem-3.jpg",
        ],
      },
      {
        title: "Blitzschlag'26",
        date: "8th February 2026",
        venue: "MNIT,Jaipur",
        cover: "/assets/events/mnit.png",
        description:
            "TMC returned to Blitzschlag - the annual cultural fest of MNIT Jaipur, held on 8th February 2026.\nWe are proud to share that our bands TISM and FATDOG secured the🥇1st position and the🥈2nd position respectively at Battle of Bands, bringing home yet another achievement for the club and the university.",
        photos: [
          "/assets/events/mood-indigo-1.jpg",
          "/assets/events/mood-indigo-2.jpg",
          "/assets/events/mood-indigo-3.jpg",
        ],
      },
      {
        title: "Sabrang'25",
        date: "10th-12th October 2025",
        venue: "JKLU,Jaipur",
        cover: "/assets/events/jklu.png",
        description:
            "TMC took over Sabrang‘25 at JKLU Jaipur, and we didn’t just perform, we dominated⚡️\n🥇1st Position (Battle of Bands)- 200ft.",
        photos: [
          "/assets/events/battle-1.jpg",
          "/assets/events/battle-2.jpg",
          "/assets/events/battle-3.jpg",
        ],
      },
      {
        title: "VivaCity'26",
        date: "6th February 2026",
        venue: "LNMIIT,Jaipur",
        cover: "/assets/events/lnmiit.png",
        description:
            "TMC turned up the volume at VIVACITY ’25, LNMIIT Jaipur held on 6th Feb!🎶⚡. BATTLE OF BANDS\n" +
            "🏆 Winner – Fatdog",
        photos: [
          "/assets/events/battle-1.jpg",
          "/assets/events/battle-2.jpg",
          "/assets/events/battle-3.jpg",
        ],
      },
      {
        title: "Zest'26",
        date: "27th March 2026",
        venue: "St. Xavier’s University, Jaipur",
        cover: "/assets/events/xavier.png",
        description:
            "ZEST’26 at Xavier’s College, Jaipur — locked in, turned up, and walked away with 🥇.",
        photos: [
          "/assets/events/battle-1.jpg",
          "/assets/events/battle-2.jpg",
          "/assets/events/battle-3.jpg",
        ],
      },
      {
        title: "Voltage'26",
        date: "27th Feburary 2026",
        venue: "Amity University,Noida",
        cover: "/assets/events/amity.png",
        description:
            "Voltage was high, the stage was louder, and we showed up stronger. ⚡🏆\nFatDog takes 🥇1st place at Voltage – The Battle of Bands at Amity University Noida, owning the stage and outplaying some serious competition.",
        photos: [
          "/assets/events/battle-1.jpg",
          "/assets/events/battle-2.jpg",
          "/assets/events/battle-3.jpg",
        ],
      },
      {
        title: "Mood Indigo'25",
        date: "15th-18th December 2025",
        venue: "IIT Bombay",
        cover: "/assets/events/IIT.png",
        description:
            "back in bombay, and somehow it still hits different every time💗\na while ago, we found ourselves at Mood Indigo again — louder, bigger, and packed with unreal talent from all over the country. With our bands and solo acts carrying tmc’s name, the stage turned into something we won’t forget anytime soon.",
        photos: [
          "/assets/events/battle-1.jpg",
          "/assets/events/battle-2.jpg",
          "/assets/events/battle-3.jpg",
        ],
      },
    ],
  },

   {
     id: "in-house-events",
     title: "In House Events",
     subtitle: "Our own campus sound",
     description:
         "Events curated, hosted, and executed by The Music Club for the MUJ community.",
     cover: "/assets/events/in-house-cover.jpg",
     events: [
       {
         title: "TMC Live 8.0",
         date: "Flagship Event",
         venue: "Ramdas Pai Amphitheatre",

         description:
             "The flagship event of The Music Club, bringing together bands, solo acts, acoustic sets, full-stage performances, and the biggest TMC energy of the year.",
         cover: "/assets/events/in-house-cover.jpg",
         photos: [
           "/assets/events/tmc-live-1.webp",
           "/assets/events/tmc-live-2.webp",
           "/assets/events/tmc-live-3.webp",
           "/assets/events/tmc-live-4.webp",
           "/assets/events/tmc-live-5.webp",
           "/assets/events/tmc-live-6.webp",
           "/assets/events/tmc-live-7.webp",
           "/assets/events/tmc-live-8.webp",
           "/assets/events/tmc-live-9.webp",
           "/assets/events/tmc-live-10.webp",
           "/assets/events/tmc-live-11.webp",
         ],
       },
       {
         title: "Guitar Workshop",
         date: "Workshop",
         venue: "Sharda/TMA Pai Auditorium",

         description:
             "A learning-based session for beginners and intermediate guitarists covering basics, techniques, chords, rhythm, and performance confidence.",
         cover: "/assets/events/guitar-workshop-cover.jpg",
         photos: [
           "/assets/events/guitar-workshop-1.webp",
           "/assets/events/guitar-workshop-2.webp",
           "/assets/events/guitar-workshop-3.webp",
           "/assets/events/guitar-workshop-4.webp",
           "/assets/events/guitar-workshop-5.webp",
           "/assets/events/guitar-workshop-6.webp",
           "/assets/events/guitar-workshop-7.webp",
           "/assets/events/guitar-workshop-8.webp",
           "/assets/events/guitar-workshop-9.webp",
         ],
       },
       {
         title: "Echoes",
         date: "In-House Event",
         venue: "Jam Room",
         description:
             "Echoes is a TMC-exclusive event designed for first-year students, where participants are grouped into teams under the guidance of mentors. Over a preparation period, each team builds and rehearses a complete set, eventually competing against one another in the jam room. The event encourages collaboration, confidence, stage presence, and musical growth from the very beginning of their college journey.",
         cover: "/assets/events/echoes-cover.jpg",
         photos: [
           "/assets/events/echoes-1.webp",
           "/assets/events/echoes-2.webp",
           "/assets/events/echoes-3.webp",
           "/assets/events/echoes-4.webp",
           "/assets/events/echoes-5.webp",
           "/assets/events/echoes-6.webp",
           "/assets/events/echoes-7.webp",
           "/assets/events/echoes-8.webp",
           "/assets/events/echoes-9.webp",
           "/assets/events/echoes-10.webp",
           "/assets/events/echoes-11.webp",

         ],
       },
       {
         title: "Techideate",
         date: "Campus Event",
         venue: "Ramdas Pai Amphitheatre",
         cover: "/assets/events/techideate-cover.jpg",
         description:
             "Techideate is the annual technical fest of Manipal University Jaipur, where The Music Club added a powerful musical close to the event. TMC bands performed during the closing ceremony, bringing live energy, campus spirit, and a memorable finale to the fest.",
         photos: [
           "/assets/events/techideate-1.webp",
           "/assets/events/techideate-2.webp",
           "/assets/events/techideate-3.webp",
           "/assets/events/techideate-4.webp",
           "/assets/events/techideate-5.webp",
           "/assets/events/techideate-6.webp",
           "/assets/events/techideate-7.webp",
           "/assets/events/techideate-8.webp",
           "/assets/events/techideate-9.webp",
         ],
       },
       {
         title: "Requiem",
         date: "Battle of Bands",
         venue: "Vasanti Pai Auditorium/Main-Stage Onerios",
         cover: "/assets/events/requiem-cover.jpg",
         description:
             "Requiem is the Battle of Bands held during Onerios, where TMC bands compete alongside external and out-house participants. With strong stage presence, tight arrangements, and high-energy performances, TMC has secured multiple prizes and represented the club with pride.",
         photos: [
           "/assets/events/requiem-1.webp",
           "/assets/events/requiem-2.webp",
           "/assets/events/requiem-3.webp",
           "/assets/events/requiem-4.webp",
           "/assets/events/requiem-5.webp",
           "/assets/events/requiem-6.webp",
           "/assets/events/requiem-7.webp",
           "/assets/events/requiem-8.webp",
           "/assets/events/requiem-9.webp",
           "/assets/events/requiem-10.webp",
         ],
       },
       {
         title: "Octaves",
         date: "Music Event",
         venue: "Sharda/TMA Pai Auditorium",
         cover: "/assets/events/octaves-cover.jpg",
         description:
             "Octaves is a minor event under Onerios, curated by The Music Club as a Western solo singing competition. It gives vocalists a platform to showcase their range, control, expression, and individuality through live solo performances.",
         photos: [
           "/assets/events/octaves-1.webp",
           "/assets/events/octaves-2.webp",
           "/assets/events/octaves-3.webp",
           "/assets/events/octaves-4.webp",
           "/assets/events/octaves-5.webp",
           "/assets/events/octaves-6.webp",
           "/assets/events/octaves-7.webp",
           "/assets/events/octaves-8.webp",
           "/assets/events/octaves-9.webp",
           "/assets/events/octaves-10.webp",
         ],
       },
       {
         title: "GHS Carnival",
         date: "Carnival Event",
         venue: "Good Host Spaces",
         cover: "/assets/events/ghs-carnival-cover.jpg",
         description:
             "A lively carnival-style event where TMC brought music, performances, and campus entertainment to the GHS crowd.",
         photos: [
           "/assets/events/ghs-carnival-1.webp",
           "/assets/events/ghs-carnival-2.webp",
           "/assets/events/ghs-carnival-3.webp",
           "/assets/events/ghs-carnival-4.webp",
           "/assets/events/ghs-carnival-5.webp",
           "/assets/events/ghs-carnival-6.webp",
           "/assets/events/ghs-carnival-7.webp",
           "/assets/events/ghs-carnival-8.webp",
           "/assets/events/ghs-carnival-9.webp",
         ],
       },
       {
         title: "Daan Utsav RAC",
         date: "Community Event",
         venue: "Sharda/TMA Pai Auditorium",
         cover: "/assets/events/daan-utsav-cover.jpg",
         description:
             "A community-oriented event where music became a part of celebration, contribution, and collective campus spirit.",
         photos: [
           "/assets/events/daan-utsav-1.webp",
           "/assets/events/daan-utsav-2.webp",
           "/assets/events/daan-utsav-3.webp",
           "/assets/events/daan-utsav-4.webp",
           "/assets/events/daan-utsav-5.webp",
           "/assets/events/daan-utsav-6.webp",


         ],
       },
     ],
   },
  {
    id: "original-compositions",
    title: "Original Compositions",
    subtitle: "Music made by us",
    description:
        "A space for original songs, compositions, lyrics, arrangements, and independent music created by TMC artists.",
    cover: "/assets/events/originals-cover.jpg",
    events: [
      {
        title: "Originals Night",
        date: "Coming Soon",
        venue: "TMC Stage",
        description:
            "A dedicated showcase for original songs written, composed, produced, or arranged by members of The Music Club.",
        photos: [
          "/assets/events/originals-night-1.jpg",
          "/assets/events/originals-night-2.jpg",
          "/assets/events/originals-night-3.jpg",
        ],
      },
      {
        title: "Songwriting Circle",
        date: "Internal Session",
        venue: "Jam Room",
        description:
            "A collaborative session where lyricists, vocalists, instrumentalists, and producers build songs from scratch.",
        photos: [
          "/assets/events/songwriting-1.jpg",
          "/assets/events/songwriting-2.jpg",
          "/assets/events/songwriting-3.jpg",
        ],
      },
      {
        title: "Studio Diaries",
        date: "Original Music",
        venue: "Online / Jam Room",
        description:
            "Behind-the-scenes stories of TMC artists creating demos, acoustic versions, and independent releases.",
        photos: [
          "/assets/events/studio-1.jpg",
          "/assets/events/studio-2.jpg",
          "/assets/events/studio-3.jpg",
        ],
      },
    ],
  },
];
const galleryItems = [
  { title: "Acoustic Circle", category: "Live", image: "/assets/gallery/gallery-1.jpg" },
  { title: "Band Rehearsal", category: "Jam Room", image: "/assets/gallery/gallery-2.jpg" },
  { title: "Stage Lights", category: "Concert", image: "/assets/gallery/gallery-3.jpg" },
  { title: "Open Mic Energy", category: "Live", image: "/assets/gallery/gallery-4.jpg" },
  { title: "Backstage Chaos", category: "Behind the Scenes", image: "/assets/gallery/gallery-5.jpg" },
  { title: "Crowd Moments", category: "Concert", image: "/assets/gallery/gallery-6.jpg" },
];

const teamByTenure = {
  "2026-27": [
    {
      name: "Uday Bhanu Sharma",
      role: "President",
      group: "Core",
      domain: "Leadership",
      photo: "/assets/team/uday-bhanu-sharma.png",
      instagram: "ubhanu06",
    },
    {
      name: "Tejas Bhadauria",
      role: "General Secretary",
      group: "Core",
      domain: "Administration",
      photo: "/assets/team/tejas-bhadauria.png",
      instagram: "tejasbhadauriaa",
    },
    {
      name: "Adit Tanted",
      role: "Vice President",
      group: "Core",
      domain: "Strategy",
      photo: "/assets/team/adit-tanted.png",
      instagram: "adit_tanted_22",
    },
    {
      name: "Shhorya Agarwal",
      role: "Treasurer",
      group: "Core",
      domain: "Finance",
      photo: "/assets/team/shhorya-agarwal.png",
      instagram: "shhorya_agarwal",
    },
    {
      name: "Aditya Ranjan",
      role: "Head of Events",
      group: "Core",
      domain: "Events",
      photo: "/assets/team/aditya-ranjan.png",
      instagram: "adityaranjan_fr",
    },
    {
      name: "Agrima Dwivedi",
      role: "Head of Promotions",
      group: "Core",
      domain: "Promotions",
      photo: "/assets/team/agrima-dwivedi.png",
      instagram: "agrimadw",
    },
    {
      name: "Divyansh Kaushal",
      role: "Head of Public Relations",
      group: "Core",
      domain: "Public Relations",
      photo: "/assets/team/divyansh-kaushal.png",
      instagram: "divyansh__kaushal",
    },
  ],

  "2025-26": [
    {
      name: "Sourya KVS",
      role: "President",
      group: "Core",
      domain: "Leadership",
      photo: "/assets/team/sourya-kvs.png",
      instagram: "sourya_162",
    },
    {
      name: "Rochis Sharma",
      role: "General Secretary",
      group: "Core",
      domain: "Administration",
      photo: "/assets/team/rochis-sharma.png",
      instagram: "__rochis__",
    },
    {
      name: "Rohitansh Srivastava",
      role: "Vice President",
      group: "Core",
      domain: "Strategy",
      photo: "/assets/team/rohitansh-srivastava.png",
      instagram: "rohitansh_",
    },
    {
      name: "Yashvit Kumar",
      role: "Treasurer",
      group: "Core",
      domain: "Finance",
      photo: "/assets/team/yashvit-kumar.png",
      instagram: "blobfish_exe",
    },
    {
      name: "Aanan Chopra",
      role: "Head of Events",
      group: "Core",
      domain: "Events",
      photo: "/assets/team/aanan-chopra.png",
      instagram: "aananchopra",

    },
    {
      name: "Saumya Chauhan",
      role: "Head of Promotions",
      group: "Core",
      domain: "Promotions",
      photo: "/assets/team/saumya-chauhan.png",
      instagram: "_saumyachauhan_",
    },
    {
      name: "Saarang Agarwal",
      role: "Head of Public Relations",
      group: "Core",
      domain: "Public Relations",
      photo: "/assets/team/saarang-agarwal.png",
      instagram: "saarang_agarwal_",
    },
  ],
};

const navLinks = ["Home", "About", "Events", "Team", "Contact"];

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
function CountUp({ value }) {
  const ref = useRef(null);
  const animationRef = useRef(null);

  const [count, setCount] = useState(0);

  const valueText = String(value);
  const target = Number.parseInt(valueText.replace(/\D/g, ""), 10) || 0;
  const suffix = valueText.replace(/[0-9]/g, "");

  const startCounting = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setCount(0);

    const duration = 1400;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(target * easedProgress));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startCounting();
          } else {
            setCount(0);
          }
        },
        {
          threshold: 0.55,
        }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target]);

  return (
      <span ref={ref}>
      {count}
        {suffix}
    </span>
  );
}
function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function LoginChoiceModal({ onClose }) {
  const goToCoreLogin = () => {
    window.location.href = "/core";
  };

  return createPortal(
      <motion.div
          className="login-choice-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
      >
        <motion.div
            className="login-choice-card"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.94 }}
            transition={{ duration: 0.3 }}
        >
          <button className="login-choice-close" onClick={onClose}>
            <X size={22} />
          </button>

          <p className="eyebrow">The Music Club</p>
          <h2>Login Portal</h2>
          <p>
            Choose your login type to continue to the internal TMC portal.
          </p>

          <div className="login-choice-actions">
            <button onClick={goToCoreLogin}>Admin Login</button>
            <button onClick={goToCoreLogin}>Core Member Login</button>
          </div>
        </motion.div>
      </motion.div>,
      document.body
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const goTo = (section) => {
    if (section === "Events") {
      window.dispatchEvent(new Event("reset-events-section"));
    }
    const sectionId = section === "Contact" ? "join" : section.toLowerCase();
    document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });

    setOpen(false);
  };

  return (
    <header className="navbar">
      <button className="brand" onClick={() => goTo("Home")} aria-label="Go to home">
        <img
          src={ASSETS.logo}
          alt="The Music Club logo"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <span>{CLUB_NAME}</span>
      </button>

      <nav className="desktop-nav">
        {navLinks.map((link) => (
            <button key={link} onClick={() => goTo(link)}>
              {link}
            </button>
        ))}

        <button onClick={() => setLoginOpen(true)}>
          Login
        </button>
      </nav>

      <button className="menu-btn" onClick={() => setOpen((value) => !value)} aria-label="Menu">
        {open ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {navLinks.map((link) => (
              <button key={link} onClick={() => goTo(link)}>
                {link}
              </button>
            ))}
            <button onClick={() => setLoginOpen(true)}>
              Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {loginOpen && (
            <LoginChoiceModal onClose={() => setLoginOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}

function VideoBackground() {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    const video = document.querySelector(".hero-video");
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src={ASSETS.backgroundVideo} type="video/mp4" />
      </video>
      <div className="hero-fallback" />
      <button className="video-toggle" onClick={toggleVideo}>
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        {isPlaying ? "Pause Motion" : "Play Motion"}
      </button>
    </>
  );
}
function TypewriterHeroText() {
  const lines = ["Feel the music.", "Live the music.", "Be the music."];

  const textRef = useRef(null);
  const wasVisible = useRef(false);

  const [displayedLines, setDisplayedLines] = useState(["", "", ""]);
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !wasVisible.current) {
            wasVisible.current = true;
            setPlayKey((current) => current + 1);
          }

          if (!entry.isIntersecting) {
            wasVisible.current = false;
            setDisplayedLines(["", "", ""]);
          }
        },
        {
          threshold: 0.45,
        }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId;

    setDisplayedLines(["", "", ""]);

    const typeNext = () => {
      setDisplayedLines((currentLines) => {
        const updatedLines = [...currentLines];
        updatedLines[lineIndex] = lines[lineIndex].slice(0, charIndex + 1);
        return updatedLines;
      });

      charIndex += 1;

      if (charIndex < lines[lineIndex].length) {
        timeoutId = setTimeout(typeNext, 95);
      } else if (lineIndex < lines.length - 1) {
        lineIndex += 1;
        charIndex = 0;
        timeoutId = setTimeout(typeNext, 450);
      }
    };

    timeoutId = setTimeout(typeNext, 450);

    return () => clearTimeout(timeoutId);
  }, [playKey]);

  return (
      <h1 ref={textRef} className="typewriter-heading">
        {displayedLines.map((line, index) => (
            <span className="typewriter-line" key={index}>
          {line}
        </span>
        ))}
      </h1>
  );
}
function Hero() {
  return (
    <section id="home" className="hero">
      <VideoBackground />
      <div className="hero-overlay" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-logo-wrap">
          <img
            src={ASSETS.logo}
            alt="The Music Club logo"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>

        <p className="hero-kicker">
          <img
              src="/assets/manipal-logo.png"
              alt="Manipal University Jaipur logo"
              className="manipal-logo"
          />
          Manipal University Jaipur
        </p>
        <TypewriterHeroText />
        <p className="hero-subtitle">
          A home for singers, instrumentalists, producers, writers, performers, and everyone who
          believes campus feels better with music in the air.
        </p>

        <div className="hero-actions">
          <a href="#events" className="primary-btn">
            Explore Events <CalendarDays size={18} />
          </a>
          <a href="#join" className="secondary-btn">
            Join the Club <Users size={18} />
          </a>
        </div>

        <div className="sound-wave" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, index) => (
            <span key={index} style={{ "--delay": `${index * 0.06}s` }} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-grid">
      <div>
        <SectionTitle
          eyebrow="About TMC"
          title="Built for music, memories, and midnight rehearsals."
          text="The Music Club is a creative space where campus artists find their sound, form bands, perform live, and create moments that stay longer than the event itself."
        />

        <div className="about-copy">
          <p>
            From jam room sessions to flagship stages, TMC brings together people who love vocals,
            guitars, keys, drums, production, songwriting, sound design, and event execution.
          </p>

        </div>
      </div>

      <div className="stats-grid">
        {stats.map((item, index) => (
          <motion.div
            className="stat-card"
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <CountUp value={item.value} />
            <p>{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function EventImage({ src, title, onClick }) {
  return (
      <div
          className={`event-photo-box ${onClick ? "event-photo-clickable" : ""}`}
          onClick={onClick}
          role={onClick ? "button" : undefined}
          tabIndex={onClick ? 0 : undefined}
          onKeyDown={(event) => {
            if (onClick && event.key === "Enter") {
              onClick();
            }
          }}
      >
        <img
            src={src}
            alt={title}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              event.currentTarget.nextElementSibling.style.display = "grid";
            }}
        />
        <div className="event-photo-fallback" style={{ display: "none" }}>
          <Music2 size={34} />
        </div>
      </div>
  );
}
function Events() {
  const [activeSection, setActiveSection] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [visiblePhotoCount, setVisiblePhotoCount] = useState(3);

  const eventsRef = useRef(null);

  const openSection = (section) => {
    setActiveSection(section);
    setActiveEvent(null);
  };

  const openEvent = (eventItem) => {
    setActiveEvent(eventItem);
    setVisiblePhotoCount(6);

    setTimeout(() => {
      document
          .getElementById("events")
          ?.scrollIntoView({behavior: "smooth", block: "start"});
    }, 100);
  };

  const backToCategories = () => {
    setActiveSection(null);
    setActiveEvent(null);
  };

  const backToSection = () => {
    setActiveEvent(null);
  };

  const openPhoto = (photos, index, titlePrefix) => {
    setSelectedPhoto({
      photos,
      index,
      titlePrefix,
    });
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const showPreviousPhoto = (event) => {
    event.stopPropagation();

    setSelectedPhoto((current) => {
      if (!current) return current;

      return {
        ...current,
        index:
            current.index === 0
                ? current.photos.length - 1
                : current.index - 1,
      };
    });
  };

  const showNextPhoto = (event) => {
    event.stopPropagation();

    setSelectedPhoto((current) => {
      if (!current) return current;

      return {
        ...current,
        index:
            current.index === current.photos.length - 1
                ? 0
                : current.index + 1,
      };
    });
  };

  useEffect(() => {
    const resetEvents = () => {
      setActiveSection(null);
      setActiveEvent(null);
      setSelectedPhoto(null);
    };

    window.addEventListener("reset-events-section", resetEvents);

    return () => {
      window.removeEventListener("reset-events-section", resetEvents);
    };
  }, []);

  useEffect(() => {
    const element = eventsRef.current;
    if (!element) return;

    let hasEnteredEventsSection = false;

    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            hasEnteredEventsSection = true;
          }

          if (hasEnteredEventsSection && !entry.isIntersecting) {
            setActiveSection(null);
            setActiveEvent(null);
            setSelectedPhoto(null);
          }
        },
        {
          threshold: 0.08,
        }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
      <section id="events" className="section" ref={eventsRef}>
        <SectionTitle
            eyebrow="Events"
            title="Every sound has a stage."
            text="Explore TMC through ex-fest competitions and in-house events."
        />

        <AnimatePresence mode="wait">
          {!activeSection && !activeEvent && (
              <motion.div
                  key="event-categories"
                  className="event-section-grid"
                  initial={{opacity: 0, y: 26}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -24}}
                  transition={{duration: 0.45}}
              >
                {eventSections
                    .filter((section) => section.id !== "original-compositions")
                    .map((section, index) => (
                    <motion.button
                        className="event-category-card"
                        key={section.id}
                        onClick={() => openSection(section)}
                        initial={{opacity: 0, y: 24}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: index * 0.08}}
                    >
                      <EventImage src={section.cover} title={section.title}/>

                      <div className="event-category-content">
                        <span>{section.subtitle}</span>
                        <h3>{section.title}</h3>
                        <p>{section.description}</p>
                        <small>Click to explore</small>
                      </div>
                    </motion.button>
                ))}
              </motion.div>
          )}

          {activeSection && !activeEvent && (
              <motion.div
                  key={activeSection.id}
                  initial={{opacity: 0, x: 60}}
                  animate={{opacity: 1, x: 0}}
                  exit={{opacity: 0, x: -60}}
                  transition={{duration: 0.5, ease: "easeOut"}}
              >
                <button className="back-button" onClick={backToCategories}>
                  ← Back to Events
                </button>

                <div className="event-list-header">
                  <span>{activeSection.subtitle}</span>
                  <h3>{activeSection.title}</h3>
                  <p>{activeSection.description}</p>
                </div>

                <div className="event-list-grid">
                  {activeSection.events.map((eventItem, index) => (
                      <motion.button
                          className={
                            activeSection.disableGallery
                                ? "event-mini-card no-gallery-card"
                                : "event-mini-card"
                          }
                          key={eventItem.title}
                          onClick={() => {
                            if (!activeSection.disableGallery) {
                              openEvent(eventItem);
                            }
                          }}
                          initial={{opacity: 0, y: 24}}
                          animate={{opacity: 1, y: 0}}
                          transition={{delay: index * 0.08}}
                      >
                        <EventImage
                            src={eventItem.cover || eventItem.photos[0]}
                            title={eventItem.title}
                        />

                        <div className="event-mini-content">
                          <span>{eventItem.date}</span>
                          <h3>{eventItem.title}</h3>
                          <p>{eventItem.description}</p>
                          <small>{eventItem.venue}</small>
                        </div>
                      </motion.button>
                  ))}
                </div>
              </motion.div>
          )}

          {activeSection && activeEvent && (
              <motion.div
                  key={activeEvent.title}
                  className="event-detail-view"
                  initial={{opacity: 0, scale: 0.96, y: 40}}
                  animate={{opacity: 1, scale: 1, y: 0}}
                  exit={{opacity: 0, scale: 0.96, y: -40}}
                  transition={{duration: 0.5, ease: "easeOut"}}
              >
                <button className="back-button" onClick={backToSection}>
                  ← Back to {activeSection.title}
                </button>

                <div className="event-detail-hero">
                  <div>
                    <span>{activeSection.title}</span>
                    <h3>{activeEvent.title}</h3>
                    <p>{activeEvent.description}</p>

                    <div className="event-detail-meta">
                      <small>{activeEvent.date}</small>
                      <small>{activeEvent.venue}</small>
                    </div>
                  </div>

                  <EventImage
                      src={activeEvent.photos[0]}
                      title={activeEvent.title}
                      onClick={() => openPhoto(activeEvent.photos, 0, activeEvent.title)}
                  />
                </div>

                <div className="event-detail-gallery">
                  {activeEvent.photos.slice(0, visiblePhotoCount).map((photo, index) => (
                      <div className="event-photo-item" key={photo}>
                        <EventImage
                            src={photo}
                            title={`${activeEvent.title} ${index + 1}`}
                            onClick={() =>
                                openPhoto(activeEvent.photos, index, activeEvent.title)
                            }
                        />
                      </div>
                  ))}
                </div>

                {visiblePhotoCount < activeEvent.photos.length && (
                    <div className="load-more-wrap">
                      <button
                          className="load-more-photos"
                          onClick={() => setVisiblePhotoCount((count) => count + 3)}
                      >
                        Load More Photos
                      </button>
                    </div>
                )}
              </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedPhoto && (
              <motion.div
                  className="photo-modal-backdrop"
                  onClick={closePhoto}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
              >
                <motion.div
                    className="photo-modal-card"
                    onClick={(event) => event.stopPropagation()}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                  <button className="photo-modal-close" onClick={closePhoto}>
                    <X size={22}/>
                  </button>

                  {selectedPhoto.photos.length > 1 && (
                      <>
                        <button
                            className="photo-nav-btn photo-nav-prev"
                            onClick={showPreviousPhoto}
                        >
                          ‹
                        </button>

                        <button
                            className="photo-nav-btn photo-nav-next"
                            onClick={showNextPhoto}
                        >
                          ›
                        </button>
                      </>
                  )}

                  <img
                      src={selectedPhoto.photos[selectedPhoto.index]}
                      alt={`${selectedPhoto.titlePrefix} ${selectedPhoto.index + 1}`}
                  />

                  <div className="photo-modal-footer">
                    <div>
                <span>
                  Photo {selectedPhoto.index + 1} of{" "}
                  {selectedPhoto.photos.length}
                </span>
                      <h3>
                        {selectedPhoto.titlePrefix} {selectedPhoto.index + 1}
                      </h3>
                    </div>

                    <a
                        className="photo-download-btn"
                        href={selectedPhoto.photos[selectedPhoto.index]}
                        download
                        onClick={(event) => event.stopPropagation()}
                    >
                      Download Photo
                    </a>
                  </div>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </section>
  );
}
function ImageTile({ item, onClick }) {
  return (
    <button className="gallery-card" onClick={onClick}>
      <img
          src={src}
          alt={title}
          loading="lazy"
          decoding="async"
        onError={(event) => {
          event.currentTarget.style.display = "none";
          event.currentTarget.nextElementSibling.style.display = "grid";
        }}
      />
      <div className="gallery-placeholder" style={{ display: "none" }}>
        <Music2 size={32} />
      </div>
      <div className="gallery-card-content">
        <span>{item.category}</span>
        <h3>{item.title}</h3>
      </div>
    </button>
  );
}

function Gallery() {
  const categories = ["All", ...Array.from(new Set(galleryItems.map((item) => item.category)))];
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = category === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === category);

  return (
    <section id="gallery" className="section">
      <SectionTitle
        eyebrow="Gallery"
        title="Moments from the stage and beyond."
        text="Add your real photos inside public/assets/gallery and update the galleryItems array."
      />

      <div className="chip-row spaced">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "chip active" : "chip"}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <motion.div className="gallery-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
            >
              <ImageTile item={item} onClick={() => setSelected(item)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-card"
              onClick={(event) => event.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
            >
              <button className="modal-close" onClick={() => setSelected(null)}>
                <X />
              </button>
              <div className="modal-image">
                <img
                  src={selected.image}
                  alt={selected.title}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.nextElementSibling.style.display = "grid";
                  }}
                />
                <div className="gallery-placeholder large" style={{ display: "none" }}>
                  <Music2 size={48} />
                </div>
              </div>
              <span>{selected.category}</span>
              <h3>{selected.title}</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
function InstagramIcon({ size = 22 }) {
  return (
      <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
      >
        <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            stroke="currentColor"
            strokeWidth="2"
        />
        <circle
            cx="12"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="2"
        />
        <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
      </svg>
  );
}

function TeamCard({ member }) {
  const [flipped, setFlipped] = useState(false);

  const instagramHandle = member.instagram?.replace("@", "");
  const instagramUrl = instagramHandle
      ? `https://www.instagram.com/${instagramHandle}/`
      : null;

  return (
      <div
          className={`team-card flip-card ${flipped ? "is-flipped" : ""}`}
          onClick={() => setFlipped((current) => !current)}
      >
        <div className="team-card-inner">
          <div className="team-card-face team-card-front">
            <div
                className="team-photo"
                style={{
                  "--photo-position": member.photoPosition || "center 18%",
                }}
            >
              <img
                  src={member.photo}
                  alt={member.name}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.nextElementSibling.style.display = "grid";
                  }}
              />

              <div className="avatar-fallback" style={{ display: "none" }}>
                {initials(member.name)}
              </div>
            </div>

            <div className="team-info">
              <span>{member.group}</span>
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p>{member.bio}</p>
              <small>{member.domain}</small>
            </div>
          </div>

          <div className="team-card-face team-card-back">
            <div className="insta-back-content">
              <div className="insta-orb">
                <InstagramIcon size={46} />
              </div>

              <p className="insta-label">Connect with</p>
              <h3>{member.name}</h3>
              <p className="insta-role">{member.role}</p>

              {instagramUrl ? (
                  <a
                      className="instagram-link"
                      href={instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                  >
                    <span className="instagram-icon">
  <InstagramIcon size={20} />
</span>
                    Instagram
                    <small>@{instagramHandle}</small>
                  </a>
              ) : (
                  <div className="instagram-link disabled">
                    <span className="instagram-icon">◎</span>
                    Instagram not added
                  </div>
              )}

              <p className="flip-hint">Click card again to return</p>
            </div>
          </div>
        </div>
      </div>
  );
}
function FacultyCoordinatorCard() {
  return (
      <div className="faculty-profile-wrap">
        <div className="faculty-profile-card">
          <div className="faculty-profile-photo">
            <img
                src="/assets/team/anjalee-narayan.jpeg"
                alt="Dr. Anjalee Narayan"
            />
          </div>

          <div className="faculty-profile-content">
            <span>Faculty Coordinator</span>
            <h3>Dr. Anjalee Narayan</h3>

            <p>
              Assistant Professor, Department of Liberal Arts and Social Sciences,
              and Faculty Coordinator of The Music Club, MUJ.
            </p>

            <a
                href="mailto:anjalee.narayan@jaipur.manipal.edu"
                className="faculty-mail-button"
            >
              <Mail size={18} />
              anjalee.narayan@jaipur.manipal.edu
            </a>
          </div>
        </div>
      </div>
  );
}
function Team() {
  const tenures = Object.keys(teamByTenure);
  const FACULTY_TAB = "Faculty Coordinator";
  const teamTabs = [FACULTY_TAB, ...tenures];

  const [activeTenure, setActiveTenure] = useState(tenures[0]);
  const [group, setGroup] = useState("All");

  const isFacultyActive = activeTenure === FACULTY_TAB;

  const currentTeam = isFacultyActive
      ? []
      : teamByTenure[activeTenure] || [];

  const groups = ["All", "Core"];

  const filteredMembers =
      group === "All"
          ? currentTeam
          : currentTeam.filter((member) => member.group === group);

  return (
      <section id="team" className="section">
        <SectionTitle
            eyebrow="Team"
            title="The people behind the sound."
            text="Explore the Core and Junior Core teams across different tenures of The Music Club."
        />

        <div className="tenure-tabs">
          {teamTabs.map((tenure) => (
              <button
                  key={tenure}
                  className={activeTenure === tenure ? "active" : ""}
                  onClick={() => {
                    setActiveTenure(tenure);
                    setGroup("All");
                  }}
              >
                {tenure}
              </button>
          ))}
        </div>

        {isFacultyActive ? (
            <FacultyCoordinatorCard />
        ) : (
            <>
              <motion.div
                  key={activeTenure}
                  className="tenure-heading"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
              >
                <span>Tenure</span>
                <h3>{activeTenure}</h3>
              </motion.div>

              <div className="chip-row spaced">
                {groups.map((filter) => (
                    <button
                        key={filter}
                        className={group === filter ? "active" : ""}
                        onClick={() => setGroup(filter)}
                    >
                      {filter}
                    </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                    key={`${activeTenure}-${group}`}
                    className="team-grid"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.4 }}
                >
                  {filteredMembers.map((member, index) => (
                      <motion.div
                          key={member.name}
                          initial={{ opacity: 0, y: 26 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: index * 0.08,
                            duration: 0.4,
                          }}
                          layout
                      >
                        <TeamCard member={member} />
                      </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
        )}
      </section>
  );
}

function Join() {
  const [formStatus, setFormStatus] = useState("idle");

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormStatus("submitting");

    try {
      const response = await fetch(
          "https://formsubmit.co/ajax/themusicclub.muj@gmail.com",
          {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
            },
          }
      );

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
      <section id="join" className="section join-section">
        <SectionTitle
            eyebrow="Contact"
            title="Let’s create something musical."
            text="Reach out to The Music Club for performances, collaborations, workshops, events, or general queries."
        />

        <div className="contact-clean-grid">
          <form
              className="join-form contact-clean-form"
              onSubmit={handleContactSubmit}
          >
            <input
                type="hidden"
                name="_subject"
                value="New Contact Form Submission - The Music Club MUJ"
            />

            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />

            <input
                type="text"
                name="name"
                placeholder="Your name"
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email address"
                required
            />

            <input
                type="text"
                name="contact"
                placeholder="Phone number / Instagram ID"
                required
            />

            <input
                type="text"
                name="query"
                placeholder="What is your query about?"
                required
            />

            <textarea
                name="message"
                placeholder="Tell us how we can help..."
                required
            />

            <button type="submit" disabled={formStatus === "submitting"}>
              {formStatus === "submitting" ? (
                  "Sending..."
              ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
              )}
            </button>

            {formStatus === "success" && (
                <p className="form-success-message">
                  Your message has been submitted successfully. We’ll get back to you soon.
                </p>
            )}

            {formStatus === "error" && (
                <p className="form-error-message">
                  Something went wrong. Please try again.
                </p>
            )}
          </form>
        </div>
      </section>
  );
}

  function Footer() {
    return (
        <footer className="footer">
          <div className="footer-brand-stacked">
            <div className="footer-brand-line">
              <img
                  src="/assets/tmc-logo.png"
                  alt="The Music Club logo"
                  className="footer-inline-logo"
              />
              <strong>The Music Club</strong>
            </div>

            <div className="footer-brand-line">
              <img
                  src="/assets/manipal-logo.png"
                  alt="Manipal University Jaipur logo"
                  className="footer-inline-logo"
              />
              <p>Manipal University Jaipur</p>
            </div>
          </div>

          <div className="footer-right">
            <p className="footer-copyright">
              © 2026 TMC MUJ. All Rights Reserved.
            </p>

            <p className="footer-credit">
              Designed and Developed by{" "}
              <a
                  href="https://www.linkedin.com/in/tejas-bhadauria-513a78293/"
                  target="_blank"
                  rel="noreferrer"
              >
                Tejas Bhadauria
              </a>
            </p>

            <div className="footer-links">
              <a href="mailto:themusicclub.muj@gmail.com">
                <Mail size={18}/> Email
              </a>

              <a
                  href="https://www.instagram.com/tmc.muj/"
                  target="_blank"
                  rel="noreferrer"
              >
                <InstagramIcon size={18}/> Instagram
              </a>
            </div>
          </div>
        </footer>
    );
  }

  function ClickMusicNotes() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
      const musicalSymbols = ["♪", "♫", "♬", "♩", "𝄞"];

      const handleClick = (event) => {
        const id = `${Date.now()}-${Math.random()}`;
        const symbol =
            musicalSymbols[Math.floor(Math.random() * musicalSymbols.length)];

        const newNote = {
          id,
          symbol,
          x: event.clientX,
          y: event.clientY,
        };

        setNotes((currentNotes) => [...currentNotes, newNote]);

        setTimeout(() => {
          setNotes((currentNotes) =>
              currentNotes.filter((note) => note.id !== id)
          );
        }, 900);
      };

      window.addEventListener("click", handleClick);

      return () => {
        window.removeEventListener("click", handleClick);
      };
    }, []);

    return (
        <div className="click-notes-layer" aria-hidden="true">
          {notes.map((note) => (
              <span
                  key={note.id}
                  className="click-note"
                  style={{
                    left: note.x,
                    top: note.y,
                  }}
              >
          {note.symbol}
        </span>
          ))}
        </div>
    );
  }

  function DrumCursorWithNotes() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
      const musicalSymbols = ["♪", "♫", "♬", "♩", "𝄞"];

      const handleClick = (event) => {
        const id = `${Date.now()}-${Math.random()}`;
        const symbol =
            musicalSymbols[Math.floor(Math.random() * musicalSymbols.length)];

        setNotes((currentNotes) => [
          ...currentNotes,
          {
            id,
            symbol,
            x: event.clientX,
            y: event.clientY,
          },
        ]);

        setTimeout(() => {
          setNotes((currentNotes) =>
              currentNotes.filter((note) => note.id !== id)
          );
        }, 800);
      };

      window.addEventListener("click", handleClick);

      return () => {
        window.removeEventListener("click", handleClick);
      };
    }, []);

    return (
        <div className="click-notes-layer" aria-hidden="true">
          {notes.map((note) => (
              <span
                  key={note.id}
                  className="click-note"
                  style={{
                    left: note.x,
                    top: note.y,
                  }}
              >
          {note.symbol}
        </span>
          ))}
        </div>
    );
  }

  function BackgroundMusic() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [needsInteraction, setNeedsInteraction] = useState(false);

    const tracks = [
      "/assets/music/song-1.mp3",
      "/assets/music/song-2.mp3",
      "/assets/music/song-3.mp3",
    ];

    const selectedTrack = useMemo(() => {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      return tracks[randomIndex];
    }, []);

    const playMusic = async () => {
      const audio = audioRef.current;
      if (!audio) return;

      try {
        audio.volume = 0.28;
        await audio.play();
        setIsPlaying(true);
        setNeedsInteraction(false);
      } catch {
        setNeedsInteraction(true);
      }
    };

    const pauseMusic = () => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.pause();
      setIsPlaying(false);
    };

    const toggleMusic = () => {
      if (isPlaying) {
        pauseMusic();
      } else {
        playMusic();
      }
    };

    useEffect(() => {
      playMusic();

      const startOnFirstInteraction = () => {
        playMusic();
      };

      window.addEventListener("pointerdown", startOnFirstInteraction, {
        once: true,
      });

      window.addEventListener("keydown", startOnFirstInteraction, {
        once: true,
      });

      return () => {
        window.removeEventListener("pointerdown", startOnFirstInteraction);
        window.removeEventListener("keydown", startOnFirstInteraction);
      };
    }, []);

    return (
        <>
          <audio ref={audioRef} src={selectedTrack} loop preload="auto"/>

          <button
              className={`music-toggle ${isPlaying ? "playing" : ""}`}
              onClick={toggleMusic}
              aria-label={isPlaying ? "Pause background music" : "Play background music"}
          >
            <span>{isPlaying ? "♫" : "♪"}</span>
            <small>
              {isPlaying
                  ? "Music On"
                  : needsInteraction
                      ? "Tap for Music"
                      : "Music Off"}
            </small>
          </button>
        </>
    );
  }

export default function App() {
  const isCoreRoute = window.location.pathname === "/core";

  if (isCoreRoute) {
    return <CoreAdmin />;
  }

  return (
      <main>
        <BackgroundMusic />
        <DrumCursorWithNotes />
        <Navbar />
        <Hero />
        <About />
        <Events />
        <Team />
        <Join />
        <Footer />
      </main>
  );
}

