const PROFILE = {
  email: "robertcruzc02@gmail.com",
  phone: "0915 273 3489",
  phoneLink: "+639152733489",
  facebook: "https://www.facebook.com/mousy.int",
  github: "https://github.com/bcruzzzz",
};

const ROLES = [
  "BSIT student",
  "web developer in training",
  "React and Firebase builder",
  "lifelong learner",
];

const PROJECTS = [
  {
    kicker: "01 / React + Firebase",
    title: "Pokédex Card App",
    summary: "A Pokédex-style app with login, routing and Firebase-backed CRUD for Pokémon cards.",
    description:
      "A React application styled after the Emerald Pokédex. Registered users can create, view, edit and release Pokémon cards that are saved in Firebase Realtime Database.",
    points: [
      "Email and password registration, login and logout",
      "Protected routes for the Pokédex and account pages",
      "Full create, read, update and delete with form validation",
      "Deployed with Firebase Hosting",
    ],
    tags: ["React", "Vite", "Firebase", "React Router"],
    filters: ["react", "firebase"],
    live: "https://pokemon-activity-f438c.web.app",
    github: "https://github.com/bcruzzzz",
  },
  {
    kicker: "02 / React + Firebase",
    title: "AutoRent PH",
    summary: "A vehicle rental management system for categories, vehicles, customers, rentals and billing.",
    description:
      "A rental shop admin app that tracks vehicles, customers, active rentals, returns and maintenance, with deposits set by vehicle category like real rental businesses.",
    points: [
      "Category-based security deposits with a minimum of one day's rate",
      "Search, pagination and validated forms on every table",
      "Rentals, transactions and maintenance records in Firestore",
      "Sample data seeding for quick testing",
    ],
    tags: ["React", "Firestore", "Firebase Hosting", "JavaScript"],
    filters: ["react", "firebase"],
    live: "",
    github: "https://github.com/bcruzzzz/AutoRentPH",
  },
  {
    kicker: "03 / Web project",
    title: "Tuklas Maloleño",
    summary: "A Tuklas Maloleño project built as part of my BSIT coursework.",
    description:
      "A Tuklas Maloleño project built as part of my BSIT coursework. Replace this text with what the project does and what your part in it was.",
    points: [
      "Add the main features of the project here",
      "Add what you personally built or designed",
    ],
    tags: ["Web"],
    filters: ["web"],
    live: "",
    github: "https://github.com/bcruzzzz",
  },
  {
    kicker: "04 / Web development",
    title: "Portfolio Website",
    summary: "This one-page portfolio, built from scratch with plain HTML, CSS and JavaScript.",
    description:
      "The site you are looking at. It started as a two-page autobiography and grew into a single-page portfolio with interactive sections and a light and dark theme.",
    points: [
      "Responsive layout with a mobile menu",
      "Dark mode, scroll animations and filterable sections",
      "Working contact links and a mail-ready contact form",
      "Hosted on GitHub Pages",
    ],
    tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    filters: ["web"],
    live: "",
    github: "https://github.com/bcruzzzz",
  },
];

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}

function setupTheme() {
  const button = document.getElementById("themeToggle");

  button.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      return;
    }
  });
}

function setupMenu() {
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");

  function close() {
    links.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", close);
  });
}

function setupScroll() {
  const bar = document.getElementById("progress");
  const toTop = document.getElementById("toTop");

  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = percent + "%";
    toTop.classList.toggle("show", window.scrollY > 500);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
}

function setupActiveLinks() {
  const links = document.querySelectorAll(".nav-links a");
  const sections = Array.from(links).map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  });

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach(function (section) {
    if (section) observer.observe(section);
  });
}

function setupTyped() {
  const target = document.getElementById("typed");
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  if (reduceMotion) {
    target.textContent = ROLES[0];
    return;
  }

  function tick() {
    const role = ROLES[roleIndex];
    charIndex += deleting ? -1 : 1;
    target.textContent = role.slice(0, charIndex);

    let delay = deleting ? 45 : 90;

    if (!deleting && charIndex === role.length) {
      deleting = true;
      delay = 1500;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % ROLES.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
}

function animateCount(el) {
  const end = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";

  if (reduceMotion) {
    el.textContent = end + suffix;
    return;
  }

  const duration = 1200;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(end * eased) + (progress === 1 ? suffix : "");
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll("[data-count]");

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("visible");
    });
    counters.forEach(function (el) {
      el.textContent = el.dataset.count + (el.dataset.suffix || "");
    });
    return;
  }

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach(function (el) {
    revealObserver.observe(el);
  });

  const countObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(function (el) {
    countObserver.observe(el);
  });
}

function setupFilters(containerId, itemSelector, getCategories) {
  const container = document.getElementById(containerId);
  const buttons = container.querySelectorAll(".filter");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;

      buttons.forEach(function (b) {
        b.classList.toggle("active", b === button);
      });

      document.querySelectorAll(itemSelector).forEach(function (item) {
        const match = filter === "all" || getCategories(item).includes(filter);
        item.classList.toggle("hide", !match);
      });
    });
  });
}

function setupSkills() {
  const note = document.getElementById("skillNote");
  const defaultText = note.textContent;
  const skills = document.querySelectorAll(".skill");

  function show(skill) {
    note.textContent = skill.dataset.note;
  }

  skills.forEach(function (skill) {
    skill.addEventListener("mouseenter", function () {
      show(skill);
    });
    skill.addEventListener("focus", function () {
      show(skill);
    });
    skill.addEventListener("click", function () {
      skills.forEach(function (s) {
        s.classList.toggle("picked", s === skill);
      });
      show(skill);
    });
    skill.addEventListener("mouseleave", function () {
      const picked = document.querySelector(".skill.picked");
      note.textContent = picked ? picked.dataset.note : defaultText;
    });
  });

  setupFilters("skillFilters", ".skill", function (item) {
    return [item.dataset.cat];
  });
}

function renderProjects() {
  const grid = document.getElementById("projectGrid");

  PROJECTS.forEach(function (project, index) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "project-card";
    card.dataset.filters = project.filters.join(" ");
    card.dataset.index = String(index);

    card.innerHTML =
      '<span class="project-kicker">' + project.kicker + "</span>" +
      "<h3>" + project.title + "</h3>" +
      "<p>" + project.summary + "</p>" +
      '<div class="tags">' +
      project.tags.map(function (tag) {
        return '<span class="tag">' + tag + "</span>";
      }).join("") +
      "</div>" +
      '<span class="project-more">View details &rarr;</span>';

    grid.appendChild(card);
  });

  setupFilters("projectFilters", ".project-card", function (item) {
    return item.dataset.filters.split(" ");
  });

  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    grid.querySelectorAll(".project-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--ry", x * 8 + "deg");
        card.style.setProperty("--rx", y * -8 + "deg");
      });
      card.addEventListener("mouseleave", function () {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  grid.addEventListener("click", function (e) {
    const card = e.target.closest(".project-card");
    if (card) openModal(PROJECTS[Number(card.dataset.index)], card);
  });
}

let lastFocus = null;

function openModal(project, opener) {
  const modal = document.getElementById("modal");
  lastFocus = opener;

  document.getElementById("modalKicker").textContent = project.kicker;
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDesc").textContent = project.description;

  document.getElementById("modalPoints").innerHTML = project.points
    .map(function (point) {
      return "<li>" + point + "</li>";
    })
    .join("");

  document.getElementById("modalTags").innerHTML = project.tags
    .map(function (tag) {
      return '<span class="tag">' + tag + "</span>";
    })
    .join("");

  let links = "";
  if (project.live) {
    links += '<a class="btn primary" href="' + project.live + '" target="_blank" rel="noopener">Live site &nearr;</a>';
  }
  if (project.github) {
    links += '<a class="btn" href="' + project.github + '" target="_blank" rel="noopener">GitHub &nearr;</a>';
  }
  document.getElementById("modalLinks").innerHTML = links;

  modal.hidden = false;
  document.body.classList.add("no-scroll");
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.hidden = true;
  document.body.classList.remove("no-scroll");
  if (lastFocus) lastFocus.focus();
}

function setupModal() {
  const modal = document.getElementById("modal");

  modal.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-close")) closeModal();
  });

  document.addEventListener("keydown", function (e) {
        if (e.key === "Esc" && !modal.hidden) closeModal();
  });
}

function setupContact() {
  const email = document.querySelector('[data-contact="email"]');
  const phone = document.querySelector('[data-contact="phone"]');
  const facebook = document.querySelector('[data-contact="facebook"]');
  const github = document.querySelector('[data-contact="github"]');

  email.href = "mailto:" + PROFILE.email;
  email.textContent = PROFILE.email;
  phone.href = "tel:" + PROFILE.phoneLink;
  phone.textContent = PROFILE.phone;
  facebook.href = PROFILE.facebook;
  github.href = PROFILE.github;
  github.textContent = PROFILE.github.replace("https://", "") + " ↗";

  document.querySelectorAll(".copy-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      const value = button.dataset.copy === "email" ? PROFILE.email : PROFILE.phone;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(
          function () {
            showToast("Copied " + value);
          },
          function () {
            showToast("Could not copy. Select it manually.");
          }
        );
      } else {
        showToast("Copy is not supported in this browser.");
      }
    });
  });

  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("cfName").value.trim();
    const from = document.getElementById("cfEmail").value.trim();
    const message = document.getElementById("cfMessage").value.trim();

    const errors = {
      cfName: name ? "" : "Please enter your name.",
      cfEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from) ? "" : "Enter a valid email address.",
      cfMessage: message ? "" : "Please write a message.",
    };

    Object.keys(errors).forEach(function (id) {
      document.getElementById(id + "Error").textContent = errors[id];
    });

    if (Object.values(errors).some(Boolean)) return;

    const subject = encodeURIComponent("Portfolio message from " + name);
    const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + from + ")");
    window.location.href = "mailto:" + PROFILE.email + "?subject=" + subject + "&body=" + body;

    showToast("Opening your email app...");
    form.reset();
  });
}

function setupGlow() {
  if (!window.matchMedia("(hover: hover)").matches || reduceMotion) return;

  const glow = document.getElementById("glow");

  window.addEventListener("mousemove", function (e) {
    glow.classList.add("on");
    glow.style.transform = "translate(" + e.clientX + "px, " + e.clientY + "px)";
  });

  document.addEventListener("mouseleave", function () {
    glow.classList.remove("on");
  });
}

setupTheme();
setupMenu();
setupScroll();
setupActiveLinks();
setupTyped();
setupReveal();
setupSkills();
renderProjects();
setupModal();
setupContact();
setupGlow();