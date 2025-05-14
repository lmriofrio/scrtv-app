// Para alternar el tema
document.addEventListener("DOMContentLoaded", function () {
    let html = document.documentElement;
    let savedTheme = localStorage.getItem("theme") || "light";

    // Aplicar el tema guardado
    html.setAttribute("data-bs-theme", savedTheme);

    document.querySelectorAll(".btn-theme-color").forEach(button => {
        button.classList.toggle("active", button.getAttribute("data-theme") === savedTheme);

        button.addEventListener("click", function () {
            let newTheme = this.getAttribute("data-theme");

            // Cambiar tema y guardar en localStorage
            html.setAttribute("data-bs-theme", newTheme);
            localStorage.setItem("theme", newTheme);

            // Remover 'active' de todos los botones y asignarlo solo al seleccionado
            document.querySelectorAll(".btn-theme-color").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });
});


// Para recoger la sidebar
document.addEventListener("DOMContentLoaded", function () {
    const collect = document.querySelector("#collect-btn");
    const ctn_logo = document.querySelector("#ctn-logo");
    const logo = document.querySelector("#logo");
    const sidebar = document.querySelector("#sidebar");
    const mainWrapper = document.querySelector("#main-wrapper");
    const infoProfile = document.querySelector("#info-profile");
    const infoSesion = document.querySelector("#info-sesion");
    const nombreUsuario = document.querySelector("#nombre_usuario");
    const btnCerrarSesion = document.querySelector("#btn-cerrarSesion");
    const collectBtn = document.querySelector("#collect-btn");

    if (collect && sidebar && mainWrapper) {
        collect.addEventListener("click", function () {
            sidebar.classList.toggle("expand");

            if (mainWrapper.getAttribute("data-sidebartype") === "full") {
                mainWrapper.setAttribute("data-sidebartype", "mini");
                infoProfile.classList.remove("p-3");
                infoProfile.classList.add("p-2");
                infoSesion.classList.remove("border-bottom");
                infoSesion.classList.remove("mb-2");
                infoSesion.classList.remove("p-1");
                ctn_logo.classList.add("p-2");
                logo.classList.add("d-none");
                collectBtn.classList.remove("col-2");
                collectBtn.classList.add("col-12");
                nombreUsuario.classList.add("d-none");
                btnCerrarSesion.classList.remove("col-3");
                btnCerrarSesion.classList.add("col-12");
                
            } else {
                mainWrapper.setAttribute("data-sidebartype", "full");
                ctn_logo.classList.remove("p-2");
                logo.classList.remove("d-none");
                collectBtn.classList.add("col-2");
                collectBtn.classList.remove("col-12");
                infoProfile.classList.add("p-3");
                infoProfile.classList.remove("p-2");
                infoSesion.classList.add("border-bottom");
                infoSesion.classList.add("mb-2");
                infoSesion.classList.add("p-1");
                nombreUsuario.classList.remove("d-none");
                btnCerrarSesion.classList.remove("col-12");
                btnCerrarSesion.classList.add("col-3");

            }
        });
    } else {
        console.error("No se pudo encontrar el elemento");
    }
});


// Para marcar el enlace acativo
$(function () {
    "use strict";

    var url = window.location.href; // Obtiene la URL actual completa
    var path = url.replace(window.location.origin + "/", ""); // Obtiene solo la ruta relativa

    // Encuentra el enlace activo dentro del sidebar
    var element = $(".sidebar-nav a").filter(function () {
        return this.href === url || this.href.endsWith(path);
    });

    if (element.length) {
        var listItem = element.closest("li.sidebar-item"); // Encuentra solo el <li> del enlace activo
        listItem.addClass("active"); // Agrega la clase 'active' SOLO al <li> más interno

        // Expande el menú si el enlace está dentro de un submenú
        var parentMenu = element.parents("ul.sidebar-dropdown");
        if (parentMenu.length) {
            parentMenu.addClass("show"); // Expande el submenú
        }
    }

    // Previene la acción por defecto en los enlaces con submenús
    $(".sidebar-nav > li > a.has-dropdown").on("click", function (e) {
        e.preventDefault();
    });
});

