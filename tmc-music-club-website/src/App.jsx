import React, { useEffect, useMemo, useRef, useState } from "react";
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
  { value: "60+", label: "Active artists" },
  { value: "20+", label: "Annual performances" },
  { value: "1", label: "Shared stage" },
];

const events = [
  {
    title: "TMC Live",
    tag: "Flagship",
    date: "March 2026",
    venue: "MUJ Campus",
    description:
      "Our biggest annual celebration of bands, solos, duos, acoustic sets, and everything that makes campus music feel alive.",
    icon: Guitar,
  },
  {
    title: "Spotlight",
    tag: "Online",
    date: "Rolling submissions",
    venue: "Instagram",
    description:
      "A digital showcase where selected covers and originals from students are featured on the official club page.",
    icon: Camera,
  },
  {
    title: "Unplugged Nights",
    tag: "Acoustic",
    date: "Every semester",
    venue: "Open-air campus spots",
    description:
      "Soft lights, raw vocals, and acoustic sessions built for people who love music without the noise.",
    icon: Headphones,
  },
  {
    title: "Jam Room Sessions",
    tag: "Internal",
    date: "Weekly",
    venue: "Recreational Room",
    description:
      "Practice slots, band building, collaborative writing, instrument exploration, and late-evening rehearsals.",
    icon: Disc3,
  },
  {
    title: "Battle of Bands",
    tag: "Competition",
    date: "Coming soon",
    venue: "Auditorium",
    description:
      "A high-energy stage for bands to prove their sound, presence, arrangement, and chemistry.",
    icon: Star,
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

const team = [
  {
    name: "Tejas Bhadauria",
    role: "General Secretary",
    group: "Core",
    domain: "Leadership",
    photo: "/assets/team/tejas.jpg",
    bio: "Driving the club vision, live events, jam room culture, and collaborations.",
  },
  {
    name: "Add Name",
    role: "Joint Secretary",
    group: "Core",
    domain: "Operations",
    photo: "/assets/team/core-2.jpg",
    bio: "Replace this with your actual core member details.",
  },
  {
    name: "Add Name",
    role: "Treasurer",
    group: "Core",
    domain: "Finance",
    photo: "/assets/team/core-3.jpg",
    bio: "Handles budgets, sponsorship coordination, and event spending records.",
  },
  {
    name: "Add Name",
    role: "Jam Room Coordinator",
    group: "Core",
    domain: "Jam Room",
    photo: "/assets/team/core-4.jpg",
    bio: "Manages slots, practice flow, equipment discipline, and member coordination.",
  },
  {
    name: "Add Name",
    role: "Junior Core",
    group: "Junior Core",
    domain: "Events",
    photo: "/assets/team/jc-1.jpg",
    bio: "Supports planning, artist coordination, and execution on event days.",
  },
  {
    name: "Add Name",
    role: "Junior Core",
    group: "Junior Core",
    domain: "Design",
    photo: "/assets/team/jc-2.jpg",
    bio: "Supports posters, reels, gallery documentation, and creative campaigns.",
  },
  {
    name: "Add Name",
    role: "Junior Core",
    group: "Junior Core",
    domain: "Corporate",
    photo: "/assets/team/jc-3.jpg",
    bio: "Supports outreach, partnerships, sponsorships, and brand communication.",
  },
];

const navLinks = ["Home", "About", "Events", "Gallery", "Team", "Join"];

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
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  const valueText = String(value);
  const target = Number.parseInt(valueText.replace(/\D/g, ""), 10) || 0;
  const suffix = valueText.replace(/[0-9]/g, "");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.45 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let animationFrame;
    const duration = 1300;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started, target]);

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

function Navbar() {
  const [open, setOpen] = useState(false);

  const goTo = (section) => {
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
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
          </motion.div>
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
          <Sparkles size={16} /> Manipal University Jaipur
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
          <p>
            The website is designed to feel like a calm backstage pass: dark, musical, dynamic, and
            clean without being too bright.
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

function Events() {
  const tags = ["All", ...Array.from(new Set(events.map((event) => event.tag)))];
  const [activeTag, setActiveTag] = useState("All");
  const [query, setQuery] = useState("");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesTag = activeTag === "All" || event.tag === activeTag;
      const searchText = `${event.title} ${event.tag} ${event.date} ${event.venue} ${event.description}`.toLowerCase();
      return matchesTag && searchText.includes(query.toLowerCase());
    });
  }, [activeTag, query]);

  return (
    <section id="events" className="section">
      <SectionTitle
        eyebrow="Events"
        title="Stages, sessions, showcases."
        text="Search and filter through the kinds of experiences TMC creates every year."
      />

      <div className="toolbar">
        <label className="search-box">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search events..."
          />
        </label>

        <div className="chip-row">
          {tags.map((tag) => (
            <button
              key={tag}
              className={activeTag === tag ? "chip active" : "chip"}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <motion.div className="event-grid" layout>
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event) => {
            const Icon = event.icon;
            return (
              <motion.article
                layout
                className="event-card"
                key={event.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
              >
                <div className="event-icon">
                  <Icon size={24} />
                </div>
                <span className="tag">{event.tag}</span>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="event-meta">
                  <span>{event.date}</span>
                  <span>{event.venue}</span>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function ImageTile({ item, onClick }) {
  return (
    <button className="gallery-card" onClick={onClick}>
      <img
        src={item.image}
        alt={item.title}
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

function TeamCard({ member }) {
  return (
    <motion.article
      className="team-card"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <div className="team-photo">
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
    </motion.article>
  );
}

function Team() {
  const [group, setGroup] = useState("All");
  const groups = ["All", ...Array.from(new Set(team.map((member) => member.group)))];
  const filtered = group === "All" ? team : team.filter((member) => member.group === group);

  return (
    <section id="team" className="section">
      <SectionTitle
        eyebrow="Team"
        title="Core and Junior Core."
        text="Photos, names, designations, domains, and short bios are controlled from one array in App.jsx."
      />

      <div className="chip-row spaced">
        {groups.map((item) => (
          <button
            className={group === item ? "chip active" : "chip"}
            key={item}
            onClick={() => setGroup(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <motion.div className="team-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((member) => (
            <motion.div
              key={`${member.name}-${member.role}-${member.domain}`}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
            >
              <TeamCard member={member} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function Join() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    interest: "Vocals",
    message: "",
  });
  const [submissions, setSubmissions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tmc-join-submissions")) || [];
    } catch {
      return [];
    }
  });

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const entry = {
      ...form,
      id: crypto.randomUUID(),
      createdAt: new Date().toLocaleString(),
    };
    const next = [entry, ...submissions];
    setSubmissions(next);
    localStorage.setItem("tmc-join-submissions", JSON.stringify(next));
    setForm({ name: "", email: "", interest: "Vocals", message: "" });
  };

  return (
    <section id="join" className="section join-grid">
      <div>
        <SectionTitle
          eyebrow="Join"
          title="Step into the room where the sound begins."
          text="This form works locally using browser localStorage. You can later connect it to Firebase, Supabase, or your own backend."
        />

        <form className="join-form" onSubmit={submit}>
          <input
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="Email address"
          />
          <select value={form.interest} onChange={(event) => update("interest", event.target.value)}>
            <option>Vocals</option>
            <option>Guitar</option>
            <option>Keyboard</option>
            <option>Drums</option>
            <option>Production</option>
            <option>Event Management</option>
            <option>Design / Media</option>
          </select>
          <textarea
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="Tell us what music means to you..."
            rows="5"
          />
          <button className="primary-btn" type="submit">
            Submit Interest <Send size={18} />
          </button>
        </form>
      </div>

      <div className="submission-panel">
        <h3>Recent local submissions</h3>
        {submissions.length === 0 ? (
          <p className="muted">No local submissions yet. Try filling the form.</p>
        ) : (
          <div className="submission-list">
            {submissions.slice(0, 4).map((item) => (
              <div className="submission-card" key={item.id}>
                <strong>{item.name}</strong>
                <span>{item.interest}</span>
                <p>{item.message || "No message added."}</p>
                <small>{item.createdAt}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>{CLUB_NAME}</strong>
        <p>Manipal University Jaipur</p>
      </div>
      <div className="footer-links">
        <a href="mailto:musicclub@example.com">
          <Mail size={18} /> Email
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <Music2 size={18} /> Instagram
        </a>
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hitSide, setHitSide] = useState(null);
  const [notes, setNotes] = useState([]);
  const nextStick = useRef("left");

  useEffect(() => {
    const musicalSymbols = ["♪", "♫", "♬", "♩", "𝄞"];

    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleClick = (event) => {
      const side = nextStick.current;
      nextStick.current = side === "left" ? "right" : "left";

      setHitSide(side);

      setTimeout(() => {
        setHitSide(null);
      }, 220);

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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
      <>
        <div
            className={`custom-drum-cursor ${hitSide ? `hit-${hitSide}` : ""}`}
            style={{
              left: position.x,
              top: position.y,
            }}
            aria-hidden="true"
        >
          <span className="cursor-stick left-stick" />
          <span className="cursor-stick right-stick" />
        </div>

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
      </>
  );
}
export default function App() {
  return (
      <main>
        <DrumCursorWithNotes />
        <Navbar />
        <Hero />
        <About />
        <Events />
        <Gallery />
        <Team />
        <Join />
        <Footer />
      </main>
  );
}
