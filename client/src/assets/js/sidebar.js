document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var url = window.location + "";
    var path = url.replace(window.location.protocol + "//" + window.location.host + "/", "");
    var elements = Array.from(document.querySelectorAll('ul#sidebarnav a')).filter(function (el) {
        return el.href === url || el.href === path;
    });

    if (elements.length > 0) {
        var element = elements[0];
        var parents = [];
        var parentElement = element.parentElement;

        while (parentElement && parentElement.classList.contains("sidebar-nav")) {
            parents.push(parentElement);
            parentElement = parentElement.parentElement;
        }

        parents.forEach(function (parent) {
            if (parent.tagName === "LI" && parent.children.length > 0 && parent.children[0].tagName === "A") {
                parent.children[0].classList.add("active");
                if (parent.parentElement.tagName !== "UL") {
                    parent.classList.add("active");
                } else {
                    parent.classList.add("selected");
                }
            } else if (parent.tagName !== "UL" && parent.children.length === 0) {
                parent.classList.add("selected");
            } else if (parent.tagName === "UL") {
                parent.classList.add("in");
            }
        });

        element.classList.add("active");

        var sidebarNavLinks = document.querySelectorAll('#sidebarnav a');
        sidebarNavLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                if (!link.classList.contains("active")) {
                    var parentUl = link.closest("ul");
                    parentUl.querySelectorAll("ul.in").forEach(function (ul) {
                        ul.classList.remove("in");
                    });
                    parentUl.querySelectorAll("a.active").forEach(function (activeLink) {
                        activeLink.classList.remove("active");
                    });

                    link.nextElementSibling.classList.add("in");
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                    link.closest("ul").classList.remove("active");
                    link.nextElementSibling.classList.remove("in");
                }
            });
        });

        var hasArrowLinks = document.querySelectorAll('#sidebarnav >li >a.has-arrow');
        hasArrowLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
            });
        });
    }
});
