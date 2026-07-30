// ==UserScript==
// @name         Removable video YT
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/samyany
// @version      2.0.1
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/samyany/removableVideoYT.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/samyany/removableVideoYT.js
// @description  Add the capacity to move the video on the page.
// @author       Samyany
// @match        https://www.youtube.com/watch?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @run-at       document-idle
// @grant        none
// ==/UserScript==

setTimeout(function() { // La page met du temps à se charger entierrement et il faut que le script se lance après, donc on met ...
  'use strict';

  const vidDiv = document.getElementById("player");
  const niceLights = document.getElementById("cinematics");
  const initialPosition = vidDiv.getBoundingClientRect();
  let isVideoDetach = false;

/** Création du bouton */
  function createButton() {
      const btn = document.createElement("button");
      btn.innerHTML = "Detach video";
      btn.style.cssText = `
          border-radius: 15px;
          border: 1px solid lightgray;
          color: white;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 10001;
          display: none;
          top: 5%;
          left: 50%;
          transform: translateX(-50%);
          position: absolute;
      `;
      btn.addEventListener("click", handleButtonClick);
      return btn;
  }

  /** Attache la vidéo si détacher, sinon la détache */
  function handleButtonClick() {
      if (isVideoDetach) {
          attachVideo();
      } else {
          detachVideo();
      }
  }

  /** Attache la vidéo */
  function attachVideo() {
      isVideoDetach = false;
      vidDiv.style.cssText = null;
      vidDiv.insertBefore(niceLights, null);
      btn.innerHTML = "Detach video";
      document.body.querySelector("div#player-container-outer.style-scope").style.pointerEvents = "auto";
  }

  /** Détache la vidéo */
  function detachVideo() {
      isVideoDetach = true;
      vidDiv.style.cssText = `
          top: 10px;
          left: 10px;
      `;
      btn.innerHTML = "Attach video";
      document.body.querySelector("div#player-container-outer.style-scope").style.pointerEvents = "none";
      document.body.querySelector("div.ytp-chrome-bottom").style.pointerEvents = "auto";
  }

  const btn = createButton();
  vidDiv.appendChild(btn);

/** Partie qui va gérer quand l'humain veut déplacer la vidéo */
  let isMouseDown = false;
  let initialX;
  let initialY;
  let currentVideoPosition;

  /** Quand l'humain enfonce le clic */
  vidDiv.addEventListener("mousedown", (click) => {
      if (isVideoDetach) {
          isMouseDown = true;

          initialX = click.clientX - vidDiv.getBoundingClientRect().x;
          initialY = click.clientY - vidDiv.getBoundingClientRect().y;

          vidDiv.style.zIndex = "1000";
          niceLights.remove();
      }
  });

  /** Quand l'humain laisse appuyer */
  document.body.addEventListener("mousemove", (click) => {
      if (isVideoDetach) {
          if (isMouseDown) {
              currentVideoPosition = {
                  x: click.clientX - initialX - initialPosition.x + window.scrollX,
                  y: click.clientY - initialY - initialPosition.y + window.scrollY
              }
              vidDiv.style.transform = `translate(${currentVideoPosition.x}px, ${currentVideoPosition.y}px)`;
          }
      }
  });

  /** Quand l'humain relache le bouton */
  document.body.addEventListener("mouseup", () => {
      if (isVideoDetach) {
          isMouseDown = false;
      }
  });

  /** Montre le bouton quand la souris est sur la vidéo */
  vidDiv.addEventListener("mouseover", () => {
      btn.style.display = null;
  });

  /** Et le cache si la souris n'est pas dessus */
  vidDiv.addEventListener("mouseout", () => {
      btn.style.display = "none";
  });

},3000)(); // ... 3 secondes d'attente