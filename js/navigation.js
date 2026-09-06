const navbar = document.getElementById("navbar");

const menuButton = document.getElementById("menuButton");

const navLinks = document.getElementById("navLinks");

const navItems =
    document.querySelectorAll(".nav-links a");


// =========================================
// NAVBAR SCROLL
// =========================================

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    },
    { passive: true }
);


// =========================================
// MOBILE MENU
// =========================================

menuButton.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle("open");

    }
);


// =========================================
// CLOSE MOBILE MENU
// =========================================

navItems.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                navLinks.classList.remove("open");

            }
        );

    }
);


// =========================================
// ACTIVE NAV LINK
// =========================================

const sections =
    document.querySelectorAll("section[id]");


const updateActiveLink = () => {

    let currentSection = "";

    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop - 180;

            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        }
    );


    navItems.forEach(
        (link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        }
    );

};


window.addEventListener(
    "scroll",
    updateActiveLink,
    { passive: true }
);