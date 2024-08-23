document.addEventListener("DOMContentLoaded", function() {
    const loadButton = document.getElementById("loadButton"),
        myFrame = document.getElementById("myFrame"),
        menu = document.getElementById("menu"),
        editablePart3 = document.getElementById("editablePart3"),
        editablePart2 = document.getElementById("editablePart2"),
        horarioAtualElement = document.getElementById("horario-atual");

    if (loadButton && myFrame && menu && editablePart3 && editablePart2) {
        loadButton.addEventListener("click", loadUrl);
        menu.addEventListener("change", function() {
            editablePart3.innerText = menu.options[menu.selectedIndex].text;
        });

        function loadUrl() {
            var part1 = menu.value,
                part2 = editablePart2.value,
                part3 = editablePart3.innerText;

            if (part1.trim() === "" || part2.trim() === "" || part3.trim() === "") {
                alert("Por favor, insira todas as partes editáveis.");
                return;
            }

            var newUrl = "https://m.pgsoft-games.com/" + encodeURIComponent(part1) + "/index.html?bet_type=1&operator_token=1744&operator_player_session=gnG&gs_session=05C7730B&l=" + encodeURIComponent(part2) + "__refer=m.pg-redirect.net&or=static.pgsoft-games.com&__hv=1f8cc507&game=" + encodeURIComponent(part3);
            myFrame.src = newUrl;
        }
    }

    function mostrarHorarioAtual() {
        var data = new Date();
        var options = {
            timeZone: "America/Sao_Paulo",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            fractionalSecondDigits: 3
        };
        var horarioAtual = new Intl.DateTimeFormat("pt-BR", options).format(data);
        horarioAtualElement.innerHTML = horarioAtual;
    }

    mostrarHorarioAtual();
    setInterval(mostrarHorarioAtual, 1000);

    // Função para minimizar o iframe
    window.minimizeIframe = function(id) {
        document.getElementById(id).classList.add("minimized");
    };

    // Função para maximizar o iframe
    window.maximizeIframe = function(id) {
        document.getElementById(id).classList.remove("minimized");
    };

    // Função para recarregar o iframe
    window.reloadIframe = function(id) {
        const iframe = document.getElementById(id);
        iframe.src = iframe.src;
    };

    // Função para tornar o iframe arrastável
    function dragElement(e) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (e.querySelector(".header")) {
            e.querySelector(".header").onmousedown = dragMouseDown;
        } else {
            e.onmousedown = dragMouseDown;
        }

        function dragMouseDown(a) {
            a = a || window.event;
            a.preventDefault();
            pos3 = a.clientX;
            pos4 = a.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(a) {
            a = a || window.event;
            a.preventDefault();
            pos1 = pos3 - a.clientX;
            pos2 = pos4 - a.clientY;
            pos3 = a.clientX;
            pos4 = a.clientY;
            e.style.top = (e.offsetTop - pos2) + "px";
            e.style.left = (e.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    dragElement(document.getElementById("iframeContainer1"));
    dragElement(document.getElementById("iframeContainer2"));

    // Função para bloquear elementos específicos dentro do iframe
    function blockElements() {
        const removeElements = () => {
            document.querySelectorAll("tr").forEach((element) => element.remove());
            document.querySelectorAll("div.swiper-box.animated01[data-v-4c1da8ff][data-v-9f489d03]").forEach((element) => element.remove());
            document.querySelectorAll("nav.flex.aligns-center.navbar").forEach((element) => element.remove());
        };

        removeElements();
        const observer = new MutationObserver(removeElements);
        observer.observe(document.body, { childList: true, subtree: true });
    }

    myFrame.onload = function() {
        myFrame.contentWindow.eval('(' + blockElements.toString() + ')()');
    };

    function toggleSidebar() {
        document.body.classList.toggle('collapsed');
    }

    document.getElementById("sidebarToggleBtn").addEventListener("click", toggleSidebar);
});