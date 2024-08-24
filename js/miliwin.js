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

      var newUrl = "https://m.pgf-ass0fz.com/" + encodeURIComponent(part1) + "/index.html?btt=1&oc=0&iwk=1&ot=45b1f3e2b6fc712ea66f3b3329f8d5b4&ops=e724e2541e75483bb1bde8277a2ee103&l=" + encodeURIComponent(part2) + "&op=6745237&or=static.pgf-nmu1st.com&__refer=m.pgf-ass0fz.com&__hv=1fe0c4a4&gameName=" + encodeURIComponent(part3);
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