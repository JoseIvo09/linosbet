document.addEventListener('DOMContentLoaded', function() {
  const loadButton = document.getElementById("loadButton");
  const myFrame = document.getElementById("myFrame");
  const menu = document.getElementById("menu");
  const editablePart3 = document.getElementById("editablePart3");
  const editablePart2 = document.getElementById("editablePart2");
  const horarioAtualElement = document.getElementById("horario-atual");

  if (loadButton && myFrame && menu && editablePart3 && editablePart2) {
    loadButton.addEventListener('click', loadUrl);

    menu.addEventListener('change', function() {
      editablePart3.innerText = menu.options[menu.selectedIndex].text;
    });

    function loadUrl() {
      var part1 = menu.value;
      var part2 = editablePart2.value;
      var part3 = editablePart3.innerText;

      if (part1.trim() === '' || part2.trim() === '' || part3.trim() === '') {
        alert('Por favor, insira todas as partes editáveis.');
        return;
      }

      var newUrl = "https://m.pgf-nmu2nd.com/" + encodeURIComponent(part1) + "/index.html?ot=0F016358-1475-427A-BB50-8AF3677F4A50&btt=1&l=" + encodeURIComponent(part2) + "&ops=236801_9765114864031252486724&or=02uvcvke%3Drih-pow2pf%3Deqo&__hv=1f8eb1b4&game=" + encodeURIComponent(part3);
      myFrame.src = newUrl;
    }
  }

  function mostrarHorarioAtual() {
    var data = new Date();
    data.setMilliseconds(data.getMilliseconds() - 450);  // Adiciona 2450 milissegundos ao horário atual
    var options = { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 };
    var horarioAtual = new Intl.DateTimeFormat('pt-BR', options).format(data);
    horarioAtualElement.innerHTML = horarioAtual;
  }

  mostrarHorarioAtual();
  setInterval(mostrarHorarioAtual, 1000);
});

function minimizeIframe() {
  var container = document.getElementById('iframeContainer');
  container.classList.add('minimized');
}

function maximizeIframe() {
  var container = document.getElementById('iframeContainer');
  container.classList.remove('minimized');
}

function reloadIframe() {
  document.getElementById('innerIframe').src += ''; // Recarrega o iframe
}

dragElement(document.getElementById("iframeContainer"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (elmnt.querySelector(".header")) {
    elmnt.querySelector(".header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
