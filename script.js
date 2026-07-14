"use strict";

/*
=========================================================
PROJECT NOVA
STEM Innovation Academy
Landing Page Version 1.0
=========================================================
*/


document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector("#menuToggle");
    const mainNavigation = document.querySelector("#mainNavigation");
    const navigationLinks = mainNavigation?.querySelectorAll("a");
    const currentYear = document.querySelector("#currentYear");

    /**
     * Updates the footer year automatically.
     */
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /**
     * Opens or closes the mobile navigation.
     */
    const setMenuState = (isOpen) => {
        if (!menuToggle || !mainNavigation) {
            return;
        }

        menuToggle.classList.toggle("is-active", isOpen);
        mainNavigation.classList.toggle("is-open", isOpen);
        document.body.classList.toggle("menu-open", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    };

    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
            setMenuState(!isOpen);
        });

        navigationLinks?.forEach((link) => {
            link.addEventListener("click", () => {
                setMenuState(false);
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setMenuState(false);
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 1080) {
                setMenuState(false);
            }
        });
    }
});
