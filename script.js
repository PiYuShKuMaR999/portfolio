// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const icon = document.querySelector(".theme-toggle i");
    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }

    // Save preference to localStorage
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark);
}

// Check for saved theme preference
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    const icon = document.querySelector(".theme-toggle i");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
}

// Custom Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
});

document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
});



const links = document.querySelectorAll(
    "a, button, .project-card, .skill-item, .contact-card, .social-link, .coding-profile-card"
);
links.forEach((link) => {
    link.addEventListener("mouseover", () => {
        cursor.classList.add("active");
    });
    link.addEventListener("mouseout", () => {
        cursor.classList.remove("active");
    });
});

// Typed.js Animation
document.addEventListener("DOMContentLoaded", function () {
    const typed = new Typed(".typed-text", {
        strings: ["a Developer", "a Designer", "a Creator", "Piyush..."],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
    });
});

// Scroll Animations
function checkVisibility() {
    const elements = document.querySelectorAll(".fade-in, .timeline-item");

    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", checkVisibility);
window.addEventListener("load", checkVisibility);

// Animate stats counting
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Start counting animations when GitHub section is visible
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateValue("repo-count", 0, 42, 2000);
                animateValue("commit-count", 0, 1287, 2000);
                animateValue("star-count", 0, 156, 2000);
                animateValue("contrib-count", 0, 24, 2000);
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

const githubSection = document.querySelector(".github-container");
if (githubSection) {
    observer.observe(githubSection);
}

// Project filtering
document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
        // Remove active class from all buttons
        document
            .querySelectorAll(".filter-btn")
            .forEach((b) => b.classList.remove("active"));
        // Add active class to clicked button
        this.classList.add("active");

        const filter = this.getAttribute("data-filter");
        const projects = document.querySelectorAll(".project-card");

        projects.forEach((project) => {
            if (
                filter === "all" ||
                project.getAttribute("data-category") === filter
            ) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        });
    });
});

// Form submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // Here you would typically send the form data to a server
        console.log({ name, email, subject, message });

        // Show success message
        alert("Thank you for your message! I will get back to you soon.");
        contactForm.reset();
    });
}

// Active nav link highlighting
window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Progress bar animation
const progressObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                fill.style.width = fill.getAttribute("data-width");
                progressObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

document.querySelectorAll(".progress-fill").forEach((fill) => {
    progressObserver.observe(fill);
});

// 3D Background with Three.js
function initThreeJS() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("threejs-bg").appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;

    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(
        particlesGeometry,
        particlesMaterial
    );
    scene.add(particlesMesh);

    camera.position.z = 3;

    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize Three.js if the element exists
if (document.getElementById("threejs-bg")) {
    initThreeJS();
}