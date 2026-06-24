let bgScene,
  charSprite,
  dialogueBox,
  dialogueText,
  charName,
  cinematicBox,
  cinematicText;

const storyData = [
  {
    type: "cinematic",
    text: "Gare\nUne nouvelle journée commence.",
    bg: "cours/images/backgrounds/gare_matin.jpg",
  },
  {
    type: "cinematic",
    text: "Comme chaque matin, tu arrives à Fribourg en train pour te rendre à tes cours à Eikon.",
    bg: "cours/images/backgrounds/gare_matin.jpg",
  },
  {
    type: "cinematic",
    text: "Le quai est animé. Les étudiants quittent peu à peu la gare tandis que chacun reprend sa routine.\n\nObjectif : Rejoindre l'arrêt de bus.",
    bg: "cours/images/backgrounds/gare_matin.jpg",
  },

  {
    type: "cinematic",
    text: "Arrêt de bus\nEn arrivant à l'arrêt, tu aperçois Yona qui t'attend déjà.",
    bg: "cours/images/backgrounds/arret_bus.png",
  },
  {
    type: "dialogue",
    name: "Yona",
    text: "Salut ! T'as réussi à avoir ton train ce matin ?",
    sprite: "cours/images/sprites/pose yona6.png",
    bg: "cours/images/backgrounds/arret_bus.png",
  },
  {
    type: "dialogue",
    name: "Joueur",
    text: "De justesse...",
    sprite: "cours/images/sprites/pose yona2.png",
    bg: "cours/images/backgrounds/arret_bus.png",
  },
  {
    type: "dialogue",
    name: "Yona",
    text: "Ça ne change pas ! Un jour tu vas vraiment le rater.",
    sprite: "cours/images/sprites/pose yona4.png",
    bg: "cours/images/backgrounds/arret_bus.png",
  },
  {
    type: "cinematic",
    text: "Le bus arrive.",
    bg: "cours/images/backgrounds/arret_bus2.png",
  },
  {
    type: "dialogue",
    name: "Yona",
    text: "Allez, viens.",
    sprite: "cours/images/sprites/pose yona.png",
    bg: "cours/images/backgrounds/arret_bus3.png",
  },
  {
    type: "cinematic",
    text: "Les portes s'ouvrent et vous montez dans le bus.",
    bg: "cours/images/backgrounds/arret_bus.jpg",
  },

  {
    type: "cinematic",
    text: "Arrivée à Eikon\nQuelques minutes plus tard, le bus s'arrête devant Eikon.",
    bg: "cours/images/backgrounds/eikon_exterieur.jpg",
  },
  {
    type: "cinematic",
    text: "Les étudiants descendent et se dirigent vers les bâtiments de l'école.",
    bg: "cours/images/backgrounds/eikon_exterieur.jpg",
  },
  {
    type: "cinematic",
    text: "Tu traverses la court et les couloirs pour rejoindre ta salle de classe.",
    bg: "cours/images/backgrounds/eikon_couloir.jpg",
  },

  {
    type: "cinematic",
    text: "Salle de classe\nLily est déjà installée.",
    bg: "cours/images/backgrounds/Lily Place.png",
  },
  {
    type: "dialogue",
    name: "Lily",
    text: "Enfin ! Je pensais que tu serais encore en retard.",
    sprite: "cours/images/sprites/pose lily2.png",
    bg: "cours/images/backgrounds/Lily Place.png",
  },
  {
    type: "dialogue",
    name: "Joueur",
    text: "J'étais à deux doigts de rater le train.",
    sprite: "cours/images/sprites/pose lily4.png",
    bg: "cours/images/backgrounds/Lily Place.png",
  },
  {
    type: "dialogue",
    name: "Lily",
    text: "Comme d'habitude.",
    sprite: "cours/images/sprites/pose lily5.png",
    bg: "cours/images/backgrounds/Lily Place.png",
  },
  {
    type: "cinematic",
    text: "El professor entre dans la salle.",
    bg: "cours/images/backgrounds/Lily Place.png",
  },
  {
    type: "dialogue",
    name: "El Professor",
    text: "Bonjour à tous.",
    sprite: "cours/images/sprites/prof_pose1.png",
    bg: "cours/images/backgrounds/Lily Place.png",
  },
  {
    type: "dialogue",
    name: "El Professor",
    text: "Aujourd'hui, vous allez poursuivre le projet commencé la semaine dernière.",
    sprite: "cours/images/sprites/prof_pose1.png",
    bg: "cours/images/backgrounds/Lily Place.png",
  },
  {
    type: "cinematic",
    text: "Les élèves s'installent et le cours commence.",
    bg: "cours/images/backgrounds/Lily Place.png",
  },

  {
    type: "cinematic",
    text: "Travail\nLe reste de la matinée se déroule normalement.",
    bg: "cours/images/backgrounds/Lily Place.png",
  },
  {
    type: "cinematic",
    text: "Tu travailles sur ton projet pendant qu'El professor passe entre les tables pour répondre aux questions.",
    bg: "cours/images/backgrounds/Lily Place.png",
  },
  {
    type: "cinematic",
    text: "Une journée de cours tout ce qu'il y a de plus classique.",
    bg: "cours/images/backgrounds/Lily Place.png",
  },

  //
  {
    type: "cinematic",
    text: "Sortie de l'école\nLes cours sont terminés.",
    bg: "cours/images/backgrounds/Meline Place.png",
  },
  {
    type: "cinematic",
    text: "En quittant le bâtiment, tu croises Meline.",
    bg: "cours/images/backgrounds/Meline Place.png",
  },
  {
    type: "dialogue",
    name: "Meline",
    text: "Hé ! Tu rentres déjà ?",
    sprite: "cours/images/sprites/pose meline5.png",
    bg: "cours/images/backgrounds/Meline Place.png",
  },
  {
    type: "dialogue",
    name: "Joueur",
    text: "Ouais. Je vais reprendre le train.",
    sprite: "cours/images/sprites/pose meline.png",
    bg: "cours/images/backgrounds/Meline Place.png",
  },
  {
    type: "dialogue",
    name: "Meline",
    text: "Moi aussi, mais je vais faire un détour avant.",
    sprite: "cours/images/sprites/pose meline3.png",
    bg: "cours/images/backgrounds/Meline Place.png",
  },
  {
    type: "dialogue",
    name: "Meline",
    text: "J'ai l'impression que cette journée a duré une éternité...",
    sprite: "cours/images/sprites/pose meline2.png",
    bg: "cours/images/backgrounds/Meline Place.png",
  },
  {
    type: "dialogue",
    name: "Joueur",
    text: "C'était surtout les cours qui étaient longs.",
    sprite: "cours/images/sprites/pose meline.png",
    bg: "cours/images/backgrounds/Meline Place.png",
  },
  {
    type: "dialogue",
    name: "Meline",
    text: "Haha... peut-être.",
    sprite: "cours/images/sprites/pose meline6.png",
    bg: "cours/images/backgrounds/Meline Place.png",
  },
  {
    type: "dialogue",
    name: "Meline",
    text: "Bon, à demain !",
    sprite: "cours/images/sprites/pose meline5.png",
    bg: "cours/images/backgrounds/Meline Place.png",
  },
  {
    type: "dialogue",
    name: "Joueur",
    text: "À demain !",
    sprite: "cours/images/sprites/pose meline.png",
    bg: "cours/images/backgrounds/Meline Place.png",
  },
  {
    type: "cinematic",
    text: "Meline s'éloigne pendant que tu reprends la route vers la gare.",
    bg: "cours/images/backgrounds/Emma place.png",
  },

  {
    type: "cinematic",
    text: "Retour à la gare\nLe soleil commence doucement à descendre.",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "cinematic",
    text: "Après quelques minutes de marche, tu arrives à la gare.",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "cinematic",
    text: "Alors que tu t'apprêtes à rejoindre le quai, quelqu'un t'interpelle.",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Attends !",
    sprite: "cours/images/sprites/pose emma5.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "cinematic",
    text: "Un étudiant que tu n'as jamais vu te regarde avec insistance.",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Enfin...",
    sprite: "cours/images/sprites/pose emma8.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Je commençais à croire que tu ne passerais jamais.",
    sprite: "cours/images/sprites/pose emma7.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "Joueur",
    text: "On se connaît ?",
    sprite: "cours/images/sprites/pose emma7.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Non.",
    sprite: "cours/images/sprites/pose emma.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Enfin...",
    sprite: "cours/images/sprites/pose emma6.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Pas encore.",
    sprite: "cours/images/sprites/pose emma8.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "cinematic",
    text: "Un silence s'installe.",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "Joueur",
    text: "Tu voulais quelque chose ?",
    sprite: "cours/images/sprites/pose emma6.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Oui.",
    sprite: "cours/images/sprites/pose emma8.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "J'ai besoin de ton aide.",
    sprite: "cours/images/sprites/pose emma7.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "Joueur",
    text: "Pour quoi ?",
    sprite: "cours/images/sprites/pose emma.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "cinematic",
    text: "L'étudiant regarde autour de lui avant de reprendre d'une voix plus basse.",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Cette journée est bloquée.",
    sprite: "cours/images/sprites/pose emma7.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "Joueur",
    text: "...Pardon ?",
    sprite: "cours/images/sprites/pose emma6.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Elle recommence.",
    sprite: "cours/images/backgrounds/Emma place.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Encore.",
    sprite: "cours/images/sprites/pose emma6.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Et encore.",
    sprite: "cours/images/sprites/pose emma7.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Personne ne s'en rend compte.",
    sprite: "cours/images/sprites/pose emma.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Sauf moi.",
    sprite: "cours/images/sprites/pose emma5.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "cinematic",
    text: "Le joueur reste silencieux.",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "Joueur",
    text: "C'est une caméra cachée ?",
    sprite: "cours/images/sprites/pose emma7.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "J'aimerais bien.",
    sprite: "cours/images/sprites/pose emma6.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "À chaque nouvelle boucle, des anomalies apparaissent.",
    sprite: "cours/images/sprites/pose emma5.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Des objets changent de place.",
    sprite: "cours/images/sprites/pose emma7.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Certaines personnes agissent différemment.",
    sprite: "cours/images/sprites/pose emma6.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Des choses qui ne devraient tout simplement pas exister.",
    sprite: "cours/images/sprites/pose emma5.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Si tu en trouves une...",
    sprite: "cours/images/sprites/pose emma7.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Interagis avec elle.",
    sprite: "cours/images/sprites/pose emma6.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Les anomalies laissent toujours derrière elles un objet.",
    sprite: "cours/images/sprites/pose emma5.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Ramène-les-moi.",
    sprite: "cours/images/sprites/pose emma7.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Il y en a 3 en tout.",
    sprite: "cours/images/sprites/pose emma6.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "Joueur",
    text: "Et ça servirait à quoi ?",
    sprite: "cours/images/sprites/pose emma5.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "...",
    sprite: "cours/images/sprites/pose emma7.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Dépêche-toi.",
    sprite: "cours/images/sprites/pose emma2.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "???",
    text: "Le temps est écoulé.",
    sprite: "cours/images/sprites/pose emma3.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },

  {
    type: "cinematic",
    text: "Quai\nTu rejoins le quai tandis que le train entre en gare.",
    bg: "cours/images/backgrounds/quai_nuit.jpg",
  },
  {
    type: "cinematic",
    text: "Les portes s'ouvrent.",
    bg: "cours/images/backgrounds/quai_nuit.jpg",
  },
  {
    type: "cinematic",
    text: "Tu fais un pas en avant...",
    bg: "cours/images/backgrounds/quai_nuit.jpg",
  },
  {
    type: "cinematic",
    text: "L'écran devient noir.",
    bg: "cours/images/backgrounds/noir.jpg",
  },
  {
    type: "cinematic",
    text: "...\nLe bruit d'un train.",
    bg: "cours/images/backgrounds/noir.jpg",
  },
  {
    type: "cinematic",
    text: "Puis une voix annonce l'arrivée en gare.",
    bg: "cours/images/backgrounds/noir.jpg",
  },
  {
    type: "cinematic",
    text: "L'image revient.\nTu te trouves de nouveau sur le quai de Fribourg.",
    bg: "cours/images/backgrounds/gare_matin.jpg",
  },
  {
    type: "cinematic",
    text: "Comme si rien ne s'était passé.\n\nLa boucle recommence.",
    bg: "cours/images/backgrounds/gare_matin.jpg",
  },
];

let currentIndex = 0;
let isTyping = false;
let typingTimeout;
let currentTextScheduled = "";
let activeTextElement = null;

// Effet Machine à écrire
function typeWriter(element, text, speed = 25) {
  isTyping = true;
  element.innerHTML = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      typingTimeout = setTimeout(type, speed);
    } else {
      isTyping = false;
    }
  }
  type();
}

function renderStep() {
  if (currentIndex >= storyData.length) {
    currentIndex = 0;
  }

  const currentStep = storyData[currentIndex];

  if (currentStep.bg) {
    bgScene.style.backgroundImage = `url('${currentStep.bg}')`;
  }

  if (currentStep.type === "cinematic") {
    dialogueBox.classList.add("hidden");
    charSprite.classList.add("hidden");
    cinematicBox.classList.remove("hidden"); // REND VISIBLE

    activeTextElement = cinematicText;
    currentTextScheduled = currentStep.text;
    typeWriter(cinematicText, currentStep.text);
  } else if (currentStep.type === "dialogue") {
    // Cacher la cinématique, afficher le dialogue standard
    cinematicBox.classList.add("hidden");
    dialogueBox.classList.remove("hidden"); // REND VISIBLE

    // Cacher le nom si c'est le joueur
    if (currentStep.name === "Joueur") {
      charName.innerText = "";
    } else {
      charName.innerText = currentStep.name;
    }

    // Gestion de l'affichage du personnage
    if (currentStep.sprite) {
      charSprite.src = currentStep.sprite;
      // Ajuster la taille et la position pour certains personnages (ex: El Professor)
      if (
        currentStep.name === "El Professor" ||
        currentStep.name === "Professeur"
      ) {
        charSprite.style.height = "420px";
        charSprite.style.left = "14%";
      } else {
        // Retirer les styles inline pour reprendre la valeur CSS par défaut
        charSprite.style.height = "";
        charSprite.style.left = "";
      }
      charSprite.classList.remove("hidden"); // REND VISIBLE LE PERSONNAGE
    } else {
      charSprite.classList.add("hidden");
    }

    activeTextElement = dialogueText;
    currentTextScheduled = currentStep.text;
    typeWriter(dialogueText, currentStep.text);
  }
}

function handleNext() {
  if (isTyping) {
    clearTimeout(typingTimeout);
    activeTextElement.innerHTML = currentTextScheduled;
    isTyping = false;
  } else {
    currentIndex++;
    renderStep();
  }
}

// Sécurité : On attend que le HTML soit chargé, on lie les éléments et on lance
document.addEventListener("DOMContentLoaded", () => {
  bgScene = document.getElementById("background-scene");
  charSprite = document.getElementById("character-sprite");
  dialogueBox = document.getElementById("dialogue-box");
  dialogueText = document.getElementById("dialogue-text");
  charName = document.getElementById("character-name");
  cinematicBox = document.getElementById("cinematic-box");
  cinematicText = document.getElementById("cinematic-text");

  // Écouteurs d'événements
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      handleNext();
    }
  });

  window.addEventListener("click", () => {
    handleNext();
  });

  // Lancement de la première scène
  renderStep();
});
