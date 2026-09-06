// =========================================
// SCROLL REVEAL
// =========================================

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(element);

    }
);


// =========================================
// COUNTER ANIMATION
// =========================================

const counters =
    document.querySelectorAll(".counter");


const counterObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.target
                        );

                    let current = 0;

                    const duration = 1400;

                    const start =
                        performance.now();


                    const updateCounter =
                        (timestamp) => {

                            const progress =
                                Math.min(
                                    (
                                        timestamp -
                                        start
                                    ) / duration,
                                    1
                                );


                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            current =
                                Math.floor(
                                    eased *
                                    target
                                );


                            counter.textContent =
                                current;


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    updateCounter
                                );

                            } else {

                                counter.textContent =
                                    target;

                            }

                        };


                    requestAnimationFrame(
                        updateCounter
                    );


                    observer.unobserve(counter);

                }
            );

        },
        {
            threshold: 0.7
        }
    );


counters.forEach(
    (counter) => {

        counterObserver.observe(counter);

    }
);


// =========================================
// CUSTOM CURSOR
// =========================================

const cursor =
    document.querySelector(".cursor");

const follower =
    document.querySelector(
        ".cursor-follower"
    );


if (
    cursor &&
    follower &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    let mouseX = 0;

    let mouseY = 0;

    let followerX = 0;

    let followerY = 0;


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX = event.clientX;

            mouseY = event.clientY;


            cursor.style.transform =
                `translate(
                    ${mouseX}px,
                    ${mouseY}px
                )`;

        }
    );


    const animateFollower = () => {

        followerX +=
            (
                mouseX -
                followerX
            ) * 0.15;


        followerY +=
            (
                mouseY -
                followerY
            ) * 0.15;


        follower.style.transform =
            `translate(
                ${followerX - 14}px,
                ${followerY - 14}px
            )`;


        requestAnimationFrame(
            animateFollower
        );

    };


    animateFollower();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, .skill-card, .coding-card"
        );


    interactiveElements.forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    follower.style.width =
                        "42px";

                    follower.style.height =
                        "42px";

                    follower.style.background =
                        "rgba(139,108,255,0.08)";

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    follower.style.width =
                        "28px";

                    follower.style.height =
                        "28px";

                    follower.style.background =
                        "transparent";

                }
            );

        }
    );

}