/*
=====================================================
MAIN JAVASCRIPT
=====================================================
*/


document.addEventListener("DOMContentLoaded", () => {

    /*
    ================================================
    INITIALIZE
    ================================================
    */

    renderSkills();

    renderProjects();

    renderAchievements();

    renderSocialLinks();

    setFooterYear();

    initializeProjectCarousels();

    initializeRevealAnimations();

});


/*
=====================================================
SKILLS
=====================================================
*/

function renderSkills() {

    const container =
        document.getElementById("skills-grid");


    if (!container) {

        console.warn("Skills container not found.");

        return;

    }


    container.innerHTML = "";


    portfolioData.skills.forEach(
        (category, categoryIndex) => {


            const categoryElement =
                document.createElement("div");


            categoryElement.className =
                "skill-category reveal";


            categoryElement.style.transitionDelay =
                `${categoryIndex * 0.08}s`;


            categoryElement.innerHTML = `

                <div class="skill-category-title">

                    ${category.category}

                </div>


                <div class="skill-items">

                    ${category.items.map(skill => `

                        <div class="skill-item">

                            <img
                                src="${skill.icon}"
                                alt="${skill.name}"
                                class="skill-icon"
                                loading="lazy"
                            >

                            <span>
                                ${skill.name}
                            </span>

                        </div>

                    `).join("")}

                </div>

            `;


            container.appendChild(categoryElement);

        }
    );

}


/*
=====================================================
PROJECTS
=====================================================
*/

function renderProjects() {

    const container =
        document.getElementById("projects-grid");


    if (!container) {

        console.warn("Projects container not found.");

        return;

    }


    container.innerHTML = "";


    projectsData.forEach(
        (project, index) => {


            const projectElement =
                document.createElement("article");


            projectElement.className =
                "project-card reveal";


            projectElement.innerHTML = `

                <!-- PROJECT IMAGE -->

                <div class="project-image-wrapper">

                    <div
                        class="project-slides"
                        data-project="${index}"
                    >

                        ${project.images.map(
                            (image, imageIndex) => `

                            <img
                                src="${image}"
                                alt="${project.title} screenshot ${imageIndex + 1}"
                                class="project-image ${
                                    imageIndex === 0
                                        ? "active"
                                        : ""
                                }"
                                loading="lazy"
                            >

                        `).join("")}

                    </div>


                    <!-- CAROUSEL CONTROLS -->

                    <button
                        class="project-carousel-btn project-prev"
                        data-project="${index}"
                        aria-label="Previous image"
                    >
                        ‹
                    </button>


                    <button
                        class="project-carousel-btn project-next"
                        data-project="${index}"
                        aria-label="Next image"
                    >
                        ›
                    </button>


                    <!-- COUNTER -->

                    <div class="project-image-counter">

                        <span class="current-slide">
                            01
                        </span>

                        <span>
                            /
                        </span>

                        <span>
                            ${String(project.images.length).padStart(2, "0")}
                        </span>

                    </div>


                    <!-- DOTS -->

                    <div class="project-dots">

                        ${project.images.map(
                            (_, imageIndex) => `

                            <button
                                class="project-dot ${
                                    imageIndex === 0
                                        ? "active"
                                        : ""
                                }"
                                data-project="${index}"
                                data-slide="${imageIndex}"
                                aria-label="Go to image ${
                                    imageIndex + 1
                                }"
                            ></button>

                        `).join("")}

                    </div>

                </div>



                <!-- PROJECT INFORMATION -->

                <div class="project-info">

                    <span class="project-number">
                        ${project.number}
                    </span>


                    <span class="project-category">
                        ${project.category}
                    </span>


                    <h3>
                        ${project.title}
                    </h3>


                    <p class="project-description">

                        ${project.description}

                    </p>


                    <div class="project-tech">

                        ${project.technologies.map(
                            tech => `

                            <span>
                                ${tech}
                            </span>

                        `).join("")}

                    </div>


                    <div class="project-links">

                        <a
                            href="${project.live}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="project-link"
                        >

                            Live Project
                            ↗

                        </a>


                        ${
                            project.github
                                ? `
                                <a
                                    href="${project.github}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="project-link"
                                >
                                    GitHub ↗
                                </a>
                                `
                                : ""
                        }

                    </div>

                </div>

            `;


            container.appendChild(projectElement);

        }
    );

}


/*
=====================================================
PROJECT CAROUSELS
=====================================================
*/

function initializeProjectCarousels() {

    const projects =
        document.querySelectorAll(".project-card");


    projects.forEach((projectCard, projectIndex) => {


        const images =
            projectCard.querySelectorAll(".project-image");


        const dots =
            projectCard.querySelectorAll(".project-dot");


        const prev =
            projectCard.querySelector(".project-prev");


        const next =
            projectCard.querySelector(".project-next");


        const counter =
            projectCard.querySelector(".current-slide");


        let currentSlide = 0;


        function showSlide(index) {

            if (!images.length) {
                return;
            }


            if (index < 0) {

                index = images.length - 1;

            }


            if (index >= images.length) {

                index = 0;

            }


            currentSlide = index;


            images.forEach(
                (image, imageIndex) => {

                    image.classList.toggle(
                        "active",
                        imageIndex === currentSlide
                    );

                }
            );


            dots.forEach(
                (dot, dotIndex) => {

                    dot.classList.toggle(
                        "active",
                        dotIndex === currentSlide
                    );

                }
            );


            if (counter) {

                counter.textContent =
                    String(currentSlide + 1).padStart(2, "0");

            }

        }


        if (prev) {

            prev.addEventListener(
                "click",
                () => {

                    showSlide(currentSlide - 1);

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                () => {

                    showSlide(currentSlide + 1);

                }
            );

        }


        dots.forEach(
            (dot, dotIndex) => {

                dot.addEventListener(
                    "click",
                    () => {

                        showSlide(dotIndex);

                    }
                );

            }
        );


        /*
        ============================================
        TOUCH / SWIPE SUPPORT
        ============================================
        */

        let touchStartX = 0;

        let touchEndX = 0;


        const imageWrapper =
            projectCard.querySelector(
                ".project-image-wrapper"
            );


        if (imageWrapper) {


            imageWrapper.addEventListener(
                "touchstart",
                event => {

                    touchStartX =
                        event.changedTouches[0].screenX;

                },
                {
                    passive: true
                }
            );


            imageWrapper.addEventListener(
                "touchend",
                event => {

                    touchEndX =
                        event.changedTouches[0].screenX;


                    const difference =
                        touchStartX - touchEndX;


                    if (Math.abs(difference) < 50) {

                        return;

                    }


                    if (difference > 0) {

                        showSlide(currentSlide + 1);

                    } else {

                        showSlide(currentSlide - 1);

                    }

                },
                {
                    passive: true
                }
            );

        }

    });

}


/*
=====================================================
ACHIEVEMENTS
=====================================================
*/

function renderAchievements() {

    const container =
        document.getElementById("achievements-grid");


    if (!container) {

        console.warn("Achievements container not found.");

        return;

    }


    container.innerHTML = "";


    portfolioData.achievements.forEach(
        (achievement, index) => {


            const element =
                document.createElement("article");


            element.className =
                "achievement-card reveal";


            element.style.transitionDelay =
                `${index * 0.08}s`;


            element.innerHTML = `

                <span class="achievement-number">

                    ${achievement.number}

                </span>


                <h3>

                    ${achievement.title}

                </h3>


                <p>

                    ${achievement.description}

                </p>

            `;


            container.appendChild(element);

        }
    );

}


/*
=====================================================
SOCIAL LINKS
=====================================================
*/

function renderSocialLinks() {

    const container =
        document.getElementById("social-links");


    if (!container) {

        return;

    }


    container.innerHTML = `

        <a
            href="${portfolioData.social.github}"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
        >
            GitHub ↗
        </a>


        <a
            href="${portfolioData.social.linkedin}"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
        >
            LinkedIn ↗
        </a>


        <a
            href="${portfolioData.social.codolio}"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
        >
            Codolio ↗
        </a>

    `;

}


/*
=====================================================
FOOTER YEAR
=====================================================
*/

function setFooterYear() {

    const year =
        document.getElementById("footer-year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/*
=====================================================
REVEAL ANIMATIONS
=====================================================
*/

function initializeRevealAnimations() {

    const elements =
        document.querySelectorAll(".reveal");


    if (!elements.length) {

        return;

    }


    /*
    ================================================
    INTERSECTION OBSERVER
    ================================================
    */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}