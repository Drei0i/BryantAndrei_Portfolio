// -------------------
// Typing Function
// -------------------
function typeText(el, speed = 20) {
  // Don't retype if already done
  if (el.classList.contains("done")) return;

  const text = el.getAttribute("data-text");
  if (!text) return;

  el.textContent = "";               // reset only if not done
  el.classList.add("typing-cursor");
  el.classList.remove("done");

  let index = 0;

  function type() {
    if (index < text.length) {
      el.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    } else {
      el.classList.remove("typing-cursor"); // stop cursor
      el.classList.add("done");
    }
  }

  type();
}

// -------------------
// Type slide content one element at a time
// -------------------
function typeSlideContent(slide) {
  const elements = Array.from(slide.querySelectorAll('.typing[data-text]'));

  function typeNext(i) {
    if (i >= elements.length) return;

    const el = elements[i];

    // Remove cursor from any other element
    elements.forEach(e => e !== el && e.classList.remove("typing-cursor"));

    typeText(el);

    const textLength = el.getAttribute("data-text").length;
    const speed = 40; // must match typeText speed
    setTimeout(() => typeNext(i + 1), textLength * speed + 200); // small delay after line
  }

  typeNext(0);
}

// -------------------
// Tabs + Typing Animation
// -------------------
document.addEventListener("DOMContentLoaded", () => {
  const tabLinks = document.querySelectorAll('.tab-link');
  const slides = document.querySelectorAll('#profile .slide');

  // Initial typing for active slides
  document.querySelectorAll(".slide.active").forEach(slide => {
    typeSlideContent(slide);
  });

  // Tab click handling
  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.dataset.tab;

      // Remove active classes
      tabLinks.forEach(l => l.classList.remove('active'));
      slides.forEach(s => s.classList.remove('active'));

      // Activate clicked tab & corresponding slide
      link.classList.add('active');
      const targetSlide = document.getElementById(targetId);
      if (targetSlide) {
        targetSlide.classList.add('active');
        typeSlideContent(targetSlide); // trigger typing for this slide
      }
    });
  });
});

// -------------------
// EmailJS Contact Form
// -------------------
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init('mQ_O28vu0kHWiwsoG');

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      emailjs.sendForm(
        "service_in50zlc",
        "template_b23p5kw",
        form
      ).then(() => {
        document.getElementById("success-popup").style.display = "flex";
        form.reset();
      }).catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message.");
      });
    });
  }

  const closeBtn = document.getElementById("close-popup");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      document.getElementById("success-popup").style.display = "none";
    });
  }
});



// Vanta.js Background
var setVanta = () => {
  if (window.VANTA) {
    const vantaEffect = window.VANTA.NET({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x558844,       // darker/less intense green for softer look
      backgroundColor: 0x0,
      points: 7.00,
      maxDistance: 18.00,
      spacing: 11.00
    });




    // Ensure VANTA canvas is **behind navbar**
    const canvas = document.querySelector("#vanta-bg canvas");
    if (canvas) canvas.style.zIndex = "1";  // low z-index
    document.getElementById("vanta-bg").style.position = "fixed";
    document.getElementById("vanta-bg").style.top = "0";
    document.getElementById("vanta-bg").style.left = "0";
    document.getElementById("vanta-bg").style.width = "100%";
    document.getElementById("vanta-bg").style.height = "100%";
  }
};

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  setVanta();
});
