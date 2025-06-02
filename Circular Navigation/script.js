let activeIndex = 2; // Start at 3rd stripe (0-based index)
const totalSteps = 5;
const anglePerStep = 10; // You can tweak this for rotation size
const mncircles = document.querySelectorAll(".mncircle");
const sec = document.querySelectorAll(".sec");

// Initial setup
rotateToIndex(activeIndex);

// === Rotate to Index ===
function rotateToIndex(index) {
    const rotation = (2 - index) * anglePerStep;

    gsap.to("#circle", {
        rotate: rotation,
        ease: "power3.out", // smoother than power2 / expo
        duration: 1.2        // longer for smoother feel
    });

    updateIndicators(index);
}

// === Update mncircles and sec sections ===
function updateIndicators(index) {
    mncircles.forEach((circle, i) => {
        gsap.to(circle, { opacity: i === index ? 0.5 : 0.08 });
    });
    sec.forEach((section, i) => {
        gsap.to(section, { opacity: i === index ? 1 : 0.4 });
    });
}

// === Handle Scroll with Looping and Debounce ===
let scrollCooldown = false;

window.addEventListener("wheel", (e) => {
    if (scrollCooldown) return;

    scrollCooldown = true;
    setTimeout(() => scrollCooldown = false, 700); // control scroll frequency

    if (e.deltaY > 0) {
        // Scroll down
        activeIndex = (activeIndex + 1) % totalSteps;
    } else if (e.deltaY < 0) {
        // Scroll up with wraparound
        activeIndex = (activeIndex - 1 + totalSteps) % totalSteps;
    }

    rotateToIndex(activeIndex);
});

// === Handle Clicks on mncircle ===
mncircles.forEach((val, index) => {
    val.addEventListener("click", function () {
        activeIndex = index;
        rotateToIndex(activeIndex);
    });
});
