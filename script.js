let bgScene,
  charSprite,
  dialogueBox,
  dialogueText,
  charName,
  cinematicBox,
  cinematicText,
  storyVideo,
  minigameBox;

// MUSIQUE
let gameMusic;

let doppelgangerSound;
let toiletSound;
let fishSound;
let portailSound;

let activeStepType = null;
let currentInteractiveStep = null;

// ─────────────────────────────────────────────
// VARIABLES MINI-JEU
// ─────────────────────────────────────────────
let mgValue = 0;
let mgInterval = null;
let mgKeyHandler = null;
let mgClickHandler = null;
let mgCurrentBg = 1;

function startMinigame(onComplete) {
  mgValue = 0;
  mgCurrentBg = 1;
  const mgBar = document.getElementById("mg-bar");
  mgBar.style.width = "0%";

  function toggleMgBg() {
    mgCurrentBg = mgCurrentBg === 1 ? 2 : 1;
    bgScene.style.backgroundImage = `url('/img/Work-${mgCurrentBg}.png')`;
  }

  // Vidage progressif
  mgInterval = setInterval(() => {
    mgValue -= 1;
    if (mgValue < 0) mgValue = 0;
    mgBar.style.width = mgValue + "%";
  }, 50);

  // Remplissage à chaque appui sur Espace (capture phase pour bloquer handleNext)
  mgKeyHandler = (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      e.stopPropagation();
      mgValue += 5.25;
      if (mgValue > 100) mgValue = 100;
      mgBar.style.width = mgValue + "%";
      toggleMgBg();

      if (mgValue >= 100) {
        endMinigame(onComplete);
      }
    }
  };

  // Bloque les clics pour ne pas avancer l'histoire pendant le mini-jeu
  mgClickHandler = (e) => {
    e.stopPropagation();
  };

  window.addEventListener("keydown", mgKeyHandler, true);
  minigameBox.addEventListener("click", mgClickHandler, true);
}

function endMinigame(onComplete) {
  clearInterval(mgInterval);
  window.removeEventListener("keydown", mgKeyHandler, true);
  minigameBox.removeEventListener("click", mgClickHandler, true);
  mgKeyHandler = null;
  mgClickHandler = null;

  setTimeout(() => {
    minigameBox.classList.add("hidden");
    onComplete();
  }, 300);
}

// ─────────────────────────────────────────────
// DONNÉES DE L'HISTOIRE
// ─────────────────────────────────────────────
const storyData = [
  {
    type: "cinematic",
    text: "Gare\nUne nouvelle journée commence.",
    bg: "cours/images/backgrounds/gare_quai.png",
  },
  {
    type: "cinematic",
    text: "Comme chaque matin, tu arrives à Fribourg en train pour te rendre à tes cours à Eikon.",
    bg: "cours/images/backgrounds/gare_quai.png",
  },
  {
    type: "cinematic",
    text: "Le quai est animé. Les étudiants quittent peu à peu la gare tandis que chacun reprend sa routine.\n\nObjectif : Rejoindre l'arrêt de bus.",
    bg: "cours/images/backgrounds/gare_quai.png",
  },
  {
    type: "video",
    src: "../../img/cinematique/day1/Cinématique_1_CheminEIKON_avc_BRUIT.mp4",
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
    bg: "cours/images/backgrounds/arret_bus3.png",
  },

  {
    type: "cinematic",
    text: "Arrivée à Eikon\nQuelques minutes plus tard, le bus s'arrête devant Eikon.",
    bg: "cours/images/backgrounds/arret_bus3.png",
  },
  {
    type: "cinematic",
    text: "Les étudiants descendent et se dirigent vers les bâtiments de l'école.",
    bg: "cours/images/backgrounds/arret_bus3.png",
  },
  {
    type: "cinematic",
    text: "Tu traverses la court et les couloirs pour rejoindre ta salle de classe.",
    bg: "cours/images/backgrounds/arret_bus3.png",
  },
  {
    type: "video",
    src: "../../img/cinematique/day1/Cinématique_2_Bus_eikon_avec_BRUITS.mp4",
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

  // ★ MINI-JEU INSÉRÉ ICI ★
  {
    type: "minigame",
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
  {
    type: "video",
    src: "../../img/cinematique/day1/Cinématique_3_Sortant d'eikon_avantMeline.mp4",
  },
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
    bg: "cours/images/backgrounds/Meline Place.png",
  },
  {
    type: "video",
    src: "../../img/cinematique/day1/Cinématique_4_CheminGare_Avant_Emma.mp4",
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
    sprite: "cours/images/sprites/pose emma6.png",
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
    sprite: "cours/images/sprites/pose emma.png",
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
    sprite: "cours/images/sprites/pose emma.png",
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
    sprite: "cours/images/sprites/pose emma.png",
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
    sprite: "cours/images/sprites/pose emma.png",
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
    text: "Il m'en manque 3 en tout.",
    sprite: "cours/images/sprites/pose emma.png",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "dialogue",
    name: "Joueur",
    text: "Et ça servirait à quoi ?",
    sprite: "cours/images/sprites/pose emma6.png",
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
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "cinematic",
    text: "Les portes s'ouvrent.",
    bg: "cours/images/backgrounds/Emma place.png",
  },
  {
    type: "cinematic",
    text: "Tu fais un pas en avant...",
    bg: "cours/images/backgrounds/Emma place.png",
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
    bg: "cours/images/backgrounds/gare_quai.png",
  },
  {
    type: "cinematic",
    text: "Comme si rien ne s'était passé.\n\nLa boucle recommence.",
    bg: "cours/images/backgrounds/gare_quai.png",
  },
];

const storyDataByDay = {
  1: storyData,

  // ═══════════════════════════════════════════
  // JOUR 2
  // ═══════════════════════════════════════════
  2: [
    {
      type: "cinematic",
      text: "Gare\nUne nouvelle journée commence.",
      bg: "cours/images/backgrounds/gare_quai.png",
    },
    {
      type: "cinematic",
      text: "Comme chaque matin, tu arrives à Fribourg en train pour te rendre à tes cours à Eikon.",
      bg: "cours/images/backgrounds/gare_quai.png",
    },
    {
      type: "cinematic",
      text: "Le quai est animé. Les étudiants quittent peu à peu la gare tandis que chacun reprend sa routine.\n\nObjectif : Rejoindre l'arrêt de bus.",
      bg: "cours/images/backgrounds/gare_quai.png",
    },
    // Chemin gare → arrêt bus
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_1_CheminEIKON_avc_BRUIT.mp4",
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
      bg: "cours/images/backgrounds/arret_bus3.png",
    },
    // Trajet bus → Eikon

    {
      type: "cinematic",
      text: "Arrivée à Eikon\nQuelques minutes plus tard, le bus s'arrête devant Eikon.",
      bg: "cours/images/backgrounds/arret_bus3.png",
    },
    {
      type: "cinematic",
      text: "Les étudiants descendent et se dirigent vers les bâtiments de l'école.",
      bg: "cours/images/backgrounds/arret_bus3.png",
    },
    // Couloir Eikon → anomalie Doppelgänger
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_Day_2_Avant Anomalie1.mp4",
    },
    {
      type: "cinematic",
      text: "Tu traverses la cour et les couloirs pour rejoindre ta salle de classe.",
      bg: "cours/images/backgrounds/Background_ANomalie 1_Monstre.png",
    },
    {
      type: "cinematic",
      text: "Le Doppelgänger se tient derrière un mur du couloir.",
      bg: "cours/images/backgrounds/Background_ANomalie 1_Monstre.png",
    },
    {
      type: "dialogue",
      name: "Le Doppelgänger",
      text: "...",
      sprite: "cours/images/sprites/doppleganger.png",
      bg: "cours/images/backgrounds/Background_ANomalie 1_Monstre.png",
    },
    {
      type: "cinematic",
      text: "Click.\nIl disparaît et drop une clef.",
      sprite: "cours/images/sprites/clé.png",
      interactive: true,
      bg: "cours/images/backgrounds/Background_ANomalie 1_Monstre.png",
    },
    // Après anomalie Doppelgänger → salle de classe
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_Day_2_Après Anomalie1.mp4",
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
      text: "Le professeur entre dans la salle.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "dialogue",
      name: "Professeur",
      text: "Bonjour à tous.",
      sprite: "cours/images/sprites/prof_pose1.png",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "dialogue",
      name: "Professeur",
      text: "Aujourd'hui, vous allez poursuivre le projet commencé la semaine dernière.",
      sprite: "cours/images/sprites/prof_pose1.png",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Les élèves s'installent et le cours commence.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    // ★ MINI-JEU JOUR 2 ★
    {
      type: "minigame",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Travail\nLe reste de la matinée se déroule normalement.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Tu travailles sur ton projet pendant que le professeur passe entre les tables pour répondre aux questions.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Une journée de cours tout ce qu'il y a de plus classique.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    // Sortie Eikon → Meline
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_3_Sortant d'eikon_avantMeline.mp4",
    },
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
      bg: "cours/images/backgrounds/Meline Place.png",
    },
    // Chemin Meline → Emma (gare)
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_4_CheminGare_Avant_Emma.mp4",
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
      text: "Tu as déjà vu cette personne.",
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
      type: "cinematic",
      text: "Alors, tu as trouvé quelque chose ?",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "cinematic",
      text: "Le joueur donne la clef.",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "dialogue",
      name: "???",
      text: "Oh ! Bien joué !",
      sprite: "cours/images/sprites/pose emma6.png",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "dialogue",
      name: "???",
      text: "Continue comme ça et trouve les prochaines anomalies.",
      sprite: "cours/images/sprites/pose emma7.png",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "dialogue",
      name: "???",
      text: "Bonne chance !",
      sprite: "cours/images/sprites/pose emma.png",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "cinematic",
      text: "Dépêche-toi.\nLe temps est écoulé.",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "cinematic",
      text: "Quai\nTu rejoins le quai tandis que le train entre en gare.",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "cinematic",
      text: "Les portes s'ouvrent.",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "cinematic",
      text: "Tu fais un pas en avant...",
      bg: "cours/images/backgrounds/Emma place.png",
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
      bg: "cours/images/backgrounds/gare_quai.png",
    },
    {
      type: "cinematic",
      text: "Comme si rien ne s'était passé.\n\nLa boucle recommence.",
      bg: "cours/images/backgrounds/gare_quai.png",
    },
  ],

  // ═══════════════════════════════════════════
  // JOUR 3
  // ═══════════════════════════════════════════
  3: [
    {
      type: "cinematic",
      text: "Jour 3\nUne nouvelle journée commence.",
      bg: "cours/images/backgrounds/gare_quai.png",
    },
    {
      type: "cinematic",
      text: "Comme chaque matin, tu arrives à Fribourg en train pour te rendre à tes cours à Eikon.",
      bg: "cours/images/backgrounds/gare_quai.png",
    },
    {
      type: "cinematic",
      text: "Le quai est animé. Les étudiants quittent peu à peu la gare tandis que chacun reprend sa routine.\n\nObjectif : Rejoindre l'arrêt de bus.",
      bg: "cours/images/backgrounds/gare_quai.png",
    },
    // Chemin gare → arrêt bus
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_1_CheminEIKON_avc_BRUIT.mp4",
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
      text: "Euh... oui ?",
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
      bg: "cours/images/backgrounds/arret_bus3.png",
    },
    // Trajet bus → Eikon

    {
      type: "cinematic",
      text: "Arrivée à Eikon\nQuelques minutes plus tard, le bus s'arrête devant Eikon.",
      bg: "cours/images/backgrounds/arret_bus3.png",
    },
    {
      type: "cinematic",
      text: "Les étudiants descendent et se dirigent vers les bâtiments de l'école.",
      bg: "cours/images/backgrounds/arret_bus3.png",
    },
    {
      type: "cinematic",
      text: "Tu traverses la cour et les couloirs pour rejoindre ta salle de classe.",
      bg: "cours/images/backgrounds/arret_bus3.png",
    },
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_2_Bus_eikon_avec_BRUITS.mp4",
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
      text: "Oui oui je sais.",
      sprite: "cours/images/sprites/pose lily4.png",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "dialogue",
      name: "Lily",
      text: "Un jour tu auras des ennuis.",
      sprite: "cours/images/sprites/pose lily5.png",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Le professeur entre dans la salle.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "dialogue",
      name: "Professeur",
      text: "Bonjour à tous.",
      sprite: "cours/images/sprites/prof_pose1.png",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "dialogue",
      name: "Professeur",
      text: "Aujourd'hui, vous allez poursuivre le projet commencé la semaine dernière.",
      sprite: "cours/images/sprites/prof_pose1.png",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Les élèves s'installent et le cours commence.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    // ★ MINI-JEU JOUR 3 ★
    {
      type: "minigame",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Travail\nLe reste de la matinée se déroule normalement.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Tu travailles sur ton projet pendant que le professeur passe entre les tables pour répondre aux questions.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Une journée de cours tout ce qu'il y a de plus classique.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    // Sortie Eikon → Meline
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_3_Sortant d'eikon_avantMeline.mp4",
    },
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
      text: "Oui, j'ai l'impression de devenir fou.",
      sprite: "cours/images/sprites/pose meline.png",
      bg: "cours/images/backgrounds/Meline Place.png",
    },
    {
      type: "dialogue",
      name: "Meline",
      text: "Haha, comme d'habitude !",
      sprite: "cours/images/sprites/pose meline3.png",
      bg: "cours/images/backgrounds/Meline Place.png",
    },
    {
      type: "dialogue",
      name: "Meline",
      text: "Allez, je vais faire un détour avant de rentrer.",
      sprite: "cours/images/sprites/pose meline2.png",
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
      text: "Littéralement.",
      sprite: "cours/images/sprites/pose meline.png",
      bg: "cours/images/backgrounds/Meline Place.png",
    },
    {
      type: "dialogue",
      name: "Meline",
      text: "Haha.",
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
      text: "À... demain ?",
      sprite: "cours/images/sprites/pose meline.png",
      bg: "cours/images/backgrounds/Meline Place.png",
    },
    // Après Meline → avant anomalie toilettes
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_Day_3_Après interaction Meline_Avant Anomalie2.mp4",
    },
    {
      type: "cinematic",
      text: "Marche jusqu'à la gare\nLe soleil commence doucement à descendre.",
      bg: "cours/images/backgrounds/Backgrounf_anomalie2_Toilette.png",
    },
    {
      type: "cinematic",
      text: "Après quelques minutes de marche.\n\nDes toilettes sont au milieu de la route.",
      bg: "cours/images/backgrounds/Backgrounf_anomalie2_Toilette.png",
    },
    {
      type: "dialogue",
      name: "Les toilettes",
      text: "Bruit de chasse d'eau",
      sprite: "cours/images/sprites/toilettes.png",
      bg: "cours/images/backgrounds/Backgrounf_anomalie2_Toilette.png",
    },
    {
      type: "cinematic",
      text: "Click.\nElles disparaissent et drop du papier toilette.",
      sprite: "cours/images/sprites/papiertualet.png",
      interactive: true,
      bg: "cours/images/backgrounds/Backgrounf_anomalie2_Toilette.png",
    },
    // Après anomalie toilettes → avant Emma
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_Day_3_AprèsAnomalie2_Avant_interactionEmma.mp4",
    },
    {
      type: "cinematic",
      text: "Tu reprends ta route et tu arrives à la gare.",
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
      text: "C'est encore elle.",
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
      type: "cinematic",
      text: "Alors, tu as trouvé quelque chose aujourd'hui ?",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "cinematic",
      text: "Le joueur donne le papier toilette.",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "dialogue",
      name: "???",
      text: "Du papier toilette ? Hm... ah bah d'accord... Merci.",
      sprite: "cours/images/sprites/pose emma6.png",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "dialogue",
      name: "???",
      text: "Continue comme ça et trouve les prochaines anomalies.",
      sprite: "cours/images/sprites/pose emma7.png",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "dialogue",
      name: "???",
      text: "Bonne chance !",
      sprite: "cours/images/sprites/pose emma.png",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "cinematic",
      text: "Dépêche-toi.\nLe temps est écoulé.",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "cinematic",
      text: "Quai\nTu rejoins le quai tandis que le train entre en gare.",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "cinematic",
      text: "Les portes s'ouvrent.",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "cinematic",
      text: "Tu fais un pas en avant...",
      bg: "cours/images/backgrounds/Emma place.png",
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
      bg: "cours/images/backgrounds/gare_quai.png",
    },
    {
      type: "cinematic",
      text: "Comme si rien ne s'était passé.\n\nLa boucle recommence.",
      bg: "cours/images/backgrounds/gare_quai.png",
    },
  ],

  // ═══════════════════════════════════════════
  // JOUR 4
  // ═══════════════════════════════════════════
  4: [
    {
      type: "cinematic",
      text: "Jour 4\nUne nouvelle journée commence.",
      bg: "cours/images/backgrounds/gare_quai.png",
    },
    {
      type: "cinematic",
      text: "Comme chaque matin, tu arrives à Fribourg en train pour te rendre à tes cours à Eikon.",
      bg: "cours/images/backgrounds/gare_quai.png",
    },
    {
      type: "cinematic",
      text: "Le quai est animé. Les étudiants quittent peu à peu la gare tandis que chacun reprend sa routine.\n\nObjectif : Rejoindre l'arrêt de bus.",
      bg: "cours/images/backgrounds/gare_quai.png",
    },
    // Chemin gare → arrêt bus
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_1_CheminEIKON_avc_BRUIT.mp4",
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
      text: "Oui.",
      sprite: "cours/images/sprites/pose yona2.png",
      bg: "cours/images/backgrounds/arret_bus.png",
    },
    {
      type: "dialogue",
      name: "Yona",
      text: "...okay, euh...",
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
      bg: "cours/images/backgrounds/arret_bus3.png",
    },
    // Trajet bus → Eikon

    {
      type: "cinematic",
      text: "Arrivée à Eikon\nQuelques minutes plus tard, le bus s'arrête devant Eikon.",
      bg: "cours/images/backgrounds/arret_bus3.png",
    },
    {
      type: "cinematic",
      text: "Les étudiants descendent et se dirigent vers les bâtiments de l'école.",
      bg: "cours/images/backgrounds/arret_bus3.png",
    },
    {
      type: "cinematic",
      text: "Tu traverses la cour et les couloirs pour rejoindre ta salle de classe.",
      bg: "cours/images/backgrounds/arret_bus3.png",
    },
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_2_Bus_eikon_avec_BRUITS.mp4",
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
      text: "Bah du coup non.",
      sprite: "cours/images/sprites/pose lily4.png",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "dialogue",
      name: "Lily",
      text: "...Est-ce que... ça va ?",
      sprite: "cours/images/sprites/pose lily5.png",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "dialogue",
      name: "Joueur",
      text: "Oui.",
      sprite: "cours/images/sprites/pose lily4.png",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "dialogue",
      name: "Lily",
      text: "...Okay ?",
      sprite: "cours/images/sprites/pose lily5.png",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Le professeur entre dans la salle.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "dialogue",
      name: "Professeur",
      text: "Bonjour à tous.",
      sprite: "cours/images/sprites/prof_pose1.png",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "dialogue",
      name: "Professeur",
      text: "Aujourd'hui, vous allez poursuivre le projet commencé la semaine dernière.",
      sprite: "cours/images/sprites/prof_pose1.png",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Les élèves s'installent et le cours commence.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    // ★ MINI-JEU JOUR 4 ★
    {
      type: "minigame",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Travail\nLe reste de la matinée se déroule normalement.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Tu travailles sur ton projet pendant que le professeur passe entre les tables pour répondre aux questions.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    {
      type: "cinematic",
      text: "Une journée de cours tout ce qu'il y a de plus classique.",
      bg: "cours/images/backgrounds/Lily Place.png",
    },
    // Sortie Eikon → Meline
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_3_Sortant d'eikon_avantMeline.mp4",
    },
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
      text: "Oui.",
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
      name: "Joueur",
      text: "J'ai l'impression que cette journée a duré une éternité... oui je sais.",
      sprite: "cours/images/sprites/pose meline.png",
      bg: "cours/images/backgrounds/Meline Place.png",
    },
    {
      type: "dialogue",
      name: "Meline",
      text: "Haha... c'est exactement ce que j'allais dire.",
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
      text: "À demain.",
      sprite: "cours/images/sprites/pose meline.png",
      bg: "cours/images/backgrounds/Meline Place.png",
    },
    {
      type: "cinematic",
      text: "Meline s'éloigne pendant que tu reprends la route vers la gare.",
      bg: "cours/images/backgrounds/Meline Place.png",
    },
    {
      type: "cinematic",
      text: "Retour à la gare\nLe soleil commence doucement à descendre.",
      bg: "cours/images/backgrounds/Meline Place.png",
    },
    {
      type: "cinematic",
      text: "Après quelques minutes de marche, tu arrives à la gare.",
      bg: "cours/images/backgrounds/Meline Place.png",
    },
    {
      type: "cinematic",
      text: "Quai\nTu rejoins le quai tandis que le train entre en gare.",
      bg: "cours/images/backgrounds/Meline Place.png",
    },
    // Avant anomalie poisson
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_Day_4_end_Avant Anomalie3.mp4",
    },
    {
      type: "cinematic",
      text: "Un poisson fumeur se tient sur le quai.",
      sprite: "cours/images/sprites/poisson.png",
      bg: "cours/images/backgrounds/Background_Anomalie3_Poisson.png",
    },
    {
      type: "dialogue",
      name: "Fih",
      text: "Bruit de poisson",
      sprite: "cours/images/sprites/poisson.png",
      bg: "cours/images/backgrounds/Background_Anomalie3_Poisson.png",
    },
    {
      type: "cinematic",
      text: "Click.\nTousse puis meurt.\nLe poisson disparaît et drop un stick de poisson.",
      sprite: "cours/images/sprites/stickpoisson.png",
      interactive: true,
      bg: "cours/images/backgrounds/Background_Anomalie3_Poisson.png",
    },
    // Après anomalie poisson → Emma fin
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_Day_4_end_Après Anomalie3.mp4",
    },
    {
      type: "cinematic",
      text: "Tu retournes vers l'inconnu pour lui donner le 3e objet.",
      bg: "cours/images/backgrounds/Background_Emma_Ending.png",
    },
    {
      type: "dialogue",
      name: "???",
      text: "Enfin...",
      sprite: "cours/images/sprites/pose emma8.png",
      bg: "cours/images/backgrounds/Background_Emma_Ending.png",
    },
    {
      type: "dialogue",
      name: "???",
      text: "Je commençais à croire que tu ne passerais jamais.",
      sprite: "cours/images/sprites/pose emma7.png",
      bg: "cours/images/backgrounds/Background_Emma_Ending.png",
    },
    {
      type: "cinematic",
      text: "Alors, tu as trouvé quelque chose aujourd'hui ?",
      bg: "cours/images/backgrounds/Background_Emma_Ending.png",
    },
    {
      type: "cinematic",
      text: "Le joueur donne les stick de poisson.",
      bg: "cours/images/backgrounds/Background_Emma_Ending.png",
    },
    {
      type: "dialogue",
      name: "???",
      text: "Des stick de poisson ? Le dernier objet était des stick de poisson ?",
      sprite: "cours/images/sprites/pose emma6.png",
      bg: "cours/images/backgrounds/Background_Emma_Ending.png",
    },
    {
      type: "dialogue",
      name: "???",
      text: "...",
      sprite: "cours/images/sprites/pose emma7.png",
      bg: "cours/images/backgrounds/Background_Emma_Ending.png",
    },
    {
      type: "dialogue",
      name: "???",
      text: "Bon maintenant que j'ai tous les objets, je peux enfin tout réparer.",
      sprite: "cours/images/sprites/pose emma.png",
      bg: "cours/images/backgrounds/Background_Emma_Ending.png",
    },
    {
      type: "dialogue",
      name: "???",
      text: "Suis-moi, quittons la boucle.",
      sprite: "cours/images/sprites/pose emma7.png",
      bg: "cours/images/backgrounds/Portail_END.png",
    },
    {
      type: "cinematic",
      text: "Tu fais un pas en avant...",
      bg: "cours/images/backgrounds/Portail_END.png",
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
      bg: "cours/images/backgrounds/FIN.png",
    },
    {
      type: "cinematic",
      text: "Comme si rien ne s'était passé.\n\nLa boucle s'est arrêtée.",
      bg: "cours/images/backgrounds/FIN.png",
    },
  ],
};

// ─────────────────────────────────────────────
// ÉTAT DE L'HISTOIRE
// ─────────────────────────────────────────────
let currentDay = 1;
let currentIndex = 0;
let isTyping = false;
let typingTimeout;
let currentTextScheduled = "";
let activeTextElement = null;

// ─────────────────────────────────────────────
// FONCTIONS TEXTE
// ─────────────────────────────────────────────
function showTextImmediately(element, text) {
  element.innerHTML = "";

  if (text.includes("\n")) {
    const [title, ...bodyParts] = text.split("\n");
    const body = bodyParts.join("\n");

    if (title && title.trim() !== "") {
      const titleEl = document.createElement("div");
      titleEl.className = "cinematic-title";
      titleEl.textContent = title;
      element.appendChild(titleEl);
    }

    if (body) {
      const bodyEl = document.createElement("div");
      bodyEl.className = "cinematic-body";
      bodyEl.textContent = body;
      element.appendChild(bodyEl);
    }
  } else {
    element.textContent = text;
  }
}

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

function typeCinematicText(element, text, speed = 25) {
  isTyping = true;
  element.innerHTML = "";

  if (!text.includes("\n")) {
    typeWriter(element, text, speed);
    return;
  }

  const [title, ...bodyParts] = text.split("\n");
  const body = bodyParts.join("\n");

  const titleEl = document.createElement("div");
  titleEl.className = "cinematic-title";
  const bodyEl = document.createElement("div");
  bodyEl.className = "cinematic-body";

  element.appendChild(titleEl);
  element.appendChild(bodyEl);

  let titleIndex = 0;
  let bodyIndex = 0;

  function typeTitle() {
    if (titleIndex < title.length) {
      titleEl.textContent += title.charAt(titleIndex);
      titleIndex++;
      typingTimeout = setTimeout(typeTitle, speed);
    } else if (body) {
      typingTimeout = setTimeout(typeBody, speed);
    } else {
      isTyping = false;
    }
  }

  function typeBody() {
    if (bodyIndex < body.length) {
      bodyEl.textContent += body.charAt(bodyIndex);
      bodyIndex++;
      typingTimeout = setTimeout(typeBody, speed);
    } else {
      isTyping = false;
    }
  }

  typeTitle();
}

// ─────────────────────────────────────────────
// RENDU DE L'ÉTAPE
// ─────────────────────────────────────────────
function renderStep() {
  const currentStory = storyDataByDay[currentDay] || storyDataByDay[1];

  if (!currentStory || currentIndex >= currentStory.length) {
    if (currentDay < 4) {
      currentDay++;
      currentIndex = 0;
      renderStep();
      return;
    }
    currentDay = 1;
    currentIndex = 0;
    renderStep();
    return;
  }

  const currentStep = currentStory[currentIndex];
  currentInteractiveStep = currentStep.interactive ? currentStep : null;

  // Son du Doppelgänger
  if (currentStep.sprite && currentStep.sprite.includes("doppleganger.png")) {
    doppelgangerSound.currentTime = 0;
    doppelgangerSound.play().catch(() => {});
  }

  // Son des toilettes
  if (currentStep.sprite && currentStep.sprite.includes("toilettes.png")) {
    toiletSound.currentTime = 0;
    toiletSound.play().catch(() => {});
  }

  // Son du poisson
  if (currentStep.sprite && currentStep.sprite.includes("poisson.png")) {
    fishSound.currentTime = 0;
    fishSound.play().catch(() => {});
  }

  // Fin du jeu → arrêt progressif de la musique
  if (currentDay === 4 && currentIndex === currentStory.length - 1) {
    fadeOutMusic();
  }

  if (currentStep.bg) {
    bgScene.style.backgroundImage = `url('${currentStep.bg}')`;
  }

  if (currentStep.bg && currentStep.bg.includes("Portail_END.png")) {
    portailSound.currentTime = 0;
    portailSound.play().catch(() => {});
  }

  // ── VIDÉO ──
  if (currentStep.type === "video") {
    clearTimeout(typingTimeout);
    isTyping = false;
    cinematicBox.classList.add("hidden");
    dialogueBox.classList.add("hidden");
    charSprite.classList.add("hidden");
    minigameBox.classList.add("hidden");
    storyVideo.classList.remove("hidden");
    storyVideo.src = currentStep.src;
    storyVideo.currentTime = 0;
    storyVideo.play().catch(() => {});
    activeStepType = "video";
    activeTextElement = null;
    currentTextScheduled = "";
    return;
  }

  storyVideo.pause();
  storyVideo.currentTime = 0;
  storyVideo.classList.add("hidden");
  storyVideo.removeAttribute("src");
  storyVideo.load();

  // ── MINI-JEU ──
  if (currentStep.type === "minigame") {
    cinematicBox.classList.add("hidden");
    dialogueBox.classList.add("hidden");
    charSprite.classList.add("hidden");
    minigameBox.classList.remove("hidden");
    activeStepType = "minigame";
    activeTextElement = null;

    startMinigame(() => {
      currentIndex++;
      renderStep();
    });
    return;
  }

  // ── CINÉMATIQUE ──
  if (currentStep.type === "cinematic") {
    dialogueBox.classList.add("hidden");
    minigameBox.classList.add("hidden");
    cinematicBox.classList.remove("hidden");

    if (currentStep.sprite) {
      charSprite.src = currentStep.sprite;
      charSprite.style.height = "";
      charSprite.style.left = "";
      charSprite.style.right = "";
      charSprite.style.bottom = "";
      charSprite.style.top = "";
      charSprite.style.transform = "";
      charSprite.style.objectFit = "";
      charSprite.style.cursor = currentStep.interactive ? "pointer" : "";
      charSprite.classList.toggle(
        "interactive-object",
        Boolean(currentStep.interactive),
      );
      charSprite.classList.remove("hidden");
    } else {
      charSprite.classList.add("hidden");
      charSprite.classList.remove("interactive-object");
    }

    activeStepType = "cinematic";
    activeTextElement = cinematicText;
    currentTextScheduled = currentStep.text;
    typeCinematicText(cinematicText, currentStep.text);
  }

  // ── DIALOGUE ──
  else if (currentStep.type === "dialogue") {
    cinematicBox.classList.add("hidden");
    minigameBox.classList.add("hidden");
    dialogueBox.classList.remove("hidden");

    charName.innerText = currentStep.name === "Joueur" ? "" : currentStep.name;

    if (currentStep.sprite) {
      charSprite.src = currentStep.sprite;
      charSprite.classList.remove("interactive-object");
      charSprite.style.height = "";
      charSprite.style.left = "";
      charSprite.style.right = "";
      charSprite.style.bottom = "";
      charSprite.style.top = "";
      charSprite.style.transform = "";
      charSprite.style.objectFit = "";

      if (currentStep.name === "Le Doppelgänger") {
        charSprite.style.right = "9%";
      } else if (
        currentStep.name === "El Professor" ||
        currentStep.name === "Professeur"
      ) {
        charSprite.style.height = "420px";
        charSprite.style.left = "14%";
      }

      charSprite.style.cursor = "";
      charSprite.classList.remove("hidden");
    } else {
      charSprite.classList.add("hidden");
    }

    activeStepType = "dialogue";
    activeTextElement = dialogueText;
    currentTextScheduled = currentStep.text;
    typeWriter(dialogueText, currentStep.text);
  }
}

// ─────────────────────────────────────────────
// AVANCER L'HISTOIRE
// ─────────────────────────────────────────────
function handleNext() {
  if (activeStepType === "minigame") return;

  if (isTyping) {
    clearTimeout(typingTimeout);
    showTextImmediately(activeTextElement, currentTextScheduled);
    isTyping = false;
  } else {
    // 🔊 STOP PORTAIL SOUND
    if (portailSound) {
      portailSound.pause();
      portailSound.currentTime = 0;
    }

    currentIndex++;
    renderStep();
  }
}

// ─────────────────────────────────────────────
// INJECTION DU HTML ET CSS DU MINI-JEU
// ─────────────────────────────────────────────
function injectMinigameUI() {
  const style = document.createElement("style");
  style.textContent = `
    #minigame-box {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      z-index: 10;
    }
    #minigame-box.hidden {
      display: none;
    }
    #mg-all-bar {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 100px;
    }
    #mg-title {
      font-family: "Courier New", Courier, monospace;
      font-size: 75px;
      color: white;
      margin: 10px 0;
    }
    #mg-bar-container {
      width: 500px;
      height: 40px;
      border: 5px solid white;
      overflow: hidden;
      background: #060606;
    }
    #mg-bar {
      height: 100%;
      width: 0%;
      background: rgb(255, 208, 0);
      transition: width 0.05s linear;
    }
  `;
  document.head.appendChild(style);

  const box = document.createElement("div");
  box.id = "minigame-box";
  box.className = "hidden";
  box.innerHTML = `
    <div id="mg-all-bar">
      <h2 id="mg-title">Work bar</h2>
      <div id="mg-bar-container">
        <div id="mg-bar"></div>
      </div>
    </div>
  `;
  document.body.appendChild(box);
}

// ─────────────────────────────────────────────
// MUSIQUE DE FOND
// ─────────────────────────────────────────────
function initMusic() {
  gameMusic = new Audio("cours/images/sprites/soundtrack.mp3");
  gameMusic.loop = true;
  gameMusic.volume = 0.5;
  gameMusic.play().catch(() => {
    console.log("Autoplay bloqué.");
  });
}

function startMusicOnce() {
  if (gameMusic && gameMusic.paused) {
    gameMusic.play().catch(() => {});
  }
  window.removeEventListener("click", startMusicOnce);
  window.removeEventListener("keydown", startMusicOnce);
}

function fadeOutMusic() {
  if (!gameMusic) return;
  const fade = setInterval(() => {
    if (gameMusic.volume > 0.05) {
      gameMusic.volume -= 0.05;
    } else {
      gameMusic.volume = 0;
      gameMusic.pause();
      clearInterval(fade);
    }
  }, 200);
}

function initSounds() {
  doppelgangerSound = new Audio(
    "cours/images/sprites/doppelganger-anomalie.mp3",
  );
  toiletSound = new Audio("cours/images/sprites/toilet-flush.wav");
  fishSound = new Audio("cours/images/sprites/bubble-fish.wav");
  portailSound = new Audio("portail-long.mp3");
  portailSound.loop = true;
}

// ─────────────────────────────────────────────
// INITIALISATION
// ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  injectMinigameUI();

  bgScene = document.getElementById("background-scene");
  charSprite = document.getElementById("character-sprite");
  dialogueBox = document.getElementById("dialogue-box");
  dialogueText = document.getElementById("dialogue-text");
  charName = document.getElementById("character-name");
  cinematicBox = document.getElementById("cinematic-box");
  cinematicText = document.getElementById("cinematic-text");
  storyVideo = document.getElementById("story-video");
  minigameBox = document.getElementById("minigame-box");

  initMusic();
  initSounds();

  window.addEventListener("click", startMusicOnce);
  window.addEventListener("keydown", startMusicOnce);

  storyVideo.addEventListener("ended", () => {
    if (activeStepType === "video") {
      currentIndex++;
      renderStep();
    }
  });

  charSprite.addEventListener("click", (e) => {
    e.stopPropagation();
    if (
      currentInteractiveStep &&
      currentInteractiveStep.interactive &&
      !currentInteractiveStep.interacted
    ) {
      currentInteractiveStep.interacted = true;
      charSprite.classList.add("hidden");
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      handleNext();
    }
  });

  window.addEventListener("click", () => {
    handleNext();
  });

  renderStep();
});
