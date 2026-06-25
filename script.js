let bgScene,
  charSprite,
  dialogueBox,
  dialogueText,
  charName,
  cinematicBox,
  cinematicText,
  storyVideo;

let activeStepType = null;
let currentInteractiveStep = null;

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
    type: "video",
    src: "../../img/cinematique/day1/Cinématique_2_Bus_eikon_avec_BRUITS.mp4",
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

  {
    type: "video",
    src: "../../img/cinematique/day1/Cinématique_3_Sortant d'eikon_avantMeline.mp4",
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
    type: "cinematic",
    text: "Retour à la gare\nLe soleil commence doucement à descendre.",
    bg: "cours/images/backgrounds/Meline Place.png",
  },
  {
    type: "video",
    src: "../../img/cinematique/day1/Cinématique_4_CheminGare_Avant_Emma.mp4",
  },
  {
    type: "cinematic",
    text: "Après quelques minutes de marche, tu arrives à la gare.",
    bg: "cours/images/backgrounds/Meline Place.png",
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
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_Day_2_Avant Anomalie1.mp4",
    },
    {
      type: "cinematic",
      text: "Tu traverses la court et les couloirs pour rejoindre ta salle de classe.",
      bg: "cours/images/backgrounds/Background_ANomalie 1_Monstre.png",
    },

    {
      type: "cinematic",
      text: "|ANOMALIE: Le Doppelgänger se tient derrière un mur du couloir.|",
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
      text: "Click.\nIl disparaît et drop une clef (Objet 1).",
      sprite: "cours/images/sprites/clé.png",
      interactive: true,
      bg: "cours/images/backgrounds/Background_ANomalie 1_Monstre.png",
    },
    {
      type: "video",
      src: "../../img/cinematique/day1/Cinématique_Day_2_Après Anomalie1.mp4",
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
      text: "Le joueur donne la clef (Objet 1).",
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
  ],
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
      text: "Oui, j’ai l’impression de devenir fou.",
      sprite: "cours/images/sprites/pose meline.png",
      bg: "cours/images/backgrounds/Meline Place.png",
    },
    {
      type: "dialogue",
      name: "Meline",
      text: "Haha, comme d’habitude !",
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
      text: "Après quelques minutes de marche.\n\n|ANOMALIE: Des toilettes sont au milieu de la route.|",

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
      text: "Click.\nElles disparaissent et drop du papier toilette (Objet 2).",
      sprite: "cours/images/sprites/papiertualet.png",
      interactive: true,
      bg: "cours/images/backgrounds/Backgrounf_anomalie2_Toilette.png",
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
      text: "Le joueur donne le papier toilette (Objet 2).",
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
      text: "Quai\nTu rejoins le quai tandis que le train entre en gare.",
      bg: "cours/images/backgrounds/Emma place.png",
    },
    {
      type: "cinematic",
      text: "|ANOMALIE: Un poisson fumeur se tient sur le quai.|",
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
      text: "Click.\nTousse puis meurt.\nLe poisson disparaît et drop un stick de poisson (Objet 3).",
      sprite: "cours/images/sprites/stickpoisson.png",
      interactive: true,
      bg: "cours/images/backgrounds/Background_Anomalie3_Poisson.png",
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
      text: "Le joueur donne les stick de poisson (Objet 3).",
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

let currentDay = 1;
let currentIndex = 0;
let isTyping = false;
let typingTimeout;
let currentTextScheduled = "";
let activeTextElement = null;

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

  if (currentStep.bg) {
    bgScene.style.backgroundImage = `url('${currentStep.bg}')`;
  }

  if (currentStep.type === "video") {
    clearTimeout(typingTimeout);
    isTyping = false;
    cinematicBox.classList.add("hidden");
    dialogueBox.classList.add("hidden");
    charSprite.classList.add("hidden");
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

  if (currentStep.type === "cinematic") {
    dialogueBox.classList.add("hidden");
    cinematicBox.classList.remove("hidden"); // REND VISIBLE

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
      charSprite.classList.remove("interactive-object");
      charSprite.style.height = "";
      charSprite.style.left = "";
      charSprite.style.right = "";
      charSprite.style.bottom = "";
      charSprite.style.top = "";
      charSprite.style.transform = "";
      charSprite.style.objectFit = "";
      // Ajuster la taille et la position pour certains personnages (ex: El Professor)
      if (currentStep.name === "Le Doppelgänger") {
        charSprite.style.height = "";
        charSprite.style.left = "";
        charSprite.style.right = "9%";
      } else if (
        currentStep.name === "El Professor" ||
        currentStep.name === "Professeur"
      ) {
        charSprite.style.height = "420px";
        charSprite.style.left = "14%";
        charSprite.style.right = "";
      } else {
        // Retirer les styles inline pour reprendre la valeur CSS par défaut
        charSprite.style.height = "";
        charSprite.style.left = "";
        charSprite.style.right = "";
      }
      charSprite.style.cursor = "";
      charSprite.classList.remove("hidden"); // REND VISIBLE LE PERSONNAGE
    } else {
      charSprite.classList.add("hidden");
    }

    activeStepType = "dialogue";
    activeTextElement = dialogueText;
    currentTextScheduled = currentStep.text;
    typeWriter(dialogueText, currentStep.text);
  }
}

function handleNext() {
  if (isTyping) {
    clearTimeout(typingTimeout);
    showTextImmediately(activeTextElement, currentTextScheduled);
    isTyping = false;
  } else if (activeStepType === "video") {
    currentIndex++;
    renderStep();
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
  storyVideo = document.getElementById("story-video");

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
