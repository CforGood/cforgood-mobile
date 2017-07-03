
export const perks = [
  {
    "id": 10,
    "name": "Un cookie offert",
    "perk_code": "UBDQ3",
    "flash": false,
    "picture": "https://res.cloudinary.com/dktivbech/image/upload/v1468850769/production/webo2yeqaojpin7jgkpt.jpg",
    "offer": "Offert",
    available: true
  },
  {
    "id": 64,
    "name": " 1 atelier pour 1 mini-potager :-)",
    "description": "Parmi 4 formats on vous offre une réduction proportionnelle sur 1 atelier de jardinage de 50€: Format 12L - 20% de réduc, Format 19L -30% de réduc, Format 26L -40% de réduc et Format 41L -50% de réduc ",
    "times": 0,
    "start_date": null,
    "end_date": null,
    "active": false,
    "perk_code": "UBDQ3",
    "nb_views": 1,
    "appel": true,
    "durable": false,
    "flash": false,
    "perk_detail_id": 2,
    "all_day": false,
    "picture": "https://res.cloudinary.com/dktivbech/image/upload/v1468850769/production/webo2yeqaojpin7jgkpt.jpg",
    "offer": "Offert",
    available: false
  },
  {
    "id": 63,
    "name": "-50% ATELIER CRéATION MINI-POTAGER☻",
    "description": "Découvrez - Jardinez - Profitez - 50 % sur un atelier de création d'un mini-potager hors-sol Venez créer votre mini écosystème grâce à notre savoir-faire ! Contactez-nous pour nous donner vos disponibilités.",
    "times": 0,
    "start_date": null,
    "end_date": null,
    "active": true,
    "perk_code": "DYWI6",
    "nb_views": 105,
    "appel": true,
    "durable": false,
    "flash": false,
    "perk_detail_id": 2,
    "all_day": false,
    "picture": "https://res.cloudinary.com/dktivbech/image/upload/c_fill,dpr_2.0,h_350,w_450/v1468850748/production/ojbmbpjvq6nk57xfk7gj.jpg",
    "offer": "-50%",
    available: true
  },
  {
    "id": 62,
    "name": "Qu'est ce qu'on S'ÈME !",
    "business_id": 36,
    "description": "Préparez votre mini-potager pour l'été ! ☀ - 10 % sur la Mâche, Tournesol Nain Jaune et Tomate Lime Green Présentez votre carte au marché pour en profiter ;-)",
    "times": 25,
    "start_date": "2016-03-15T00:00:00+01:00",
    "end_date": "2016-03-28T23:00:00+02:00",
    "active": false,
    "perk_code": "WPOS1",
    "nb_views": 15,
    "appel": false,
    "durable": false,
    "flash": true,
    "perk_detail_id": 1,
    "all_day": false,
    "picture": "https://res.cloudinary.com/dktivbech/image/upload/c_fill,dpr_2.0,h_600,w_800/v1468850767/production/xzgcgy3rdaothu2okcjt.jpg",
    "offer": "-10%",
    available: false
  }

];



export const businesses = [
  {
    "id": 2,
    "name": "Label Terre",
    "picture": "https://res.cloudinary.com/dktivbech/image/upload/c_fill,dpr_2.0,h_350,w_450/v1468850474/production/aysgflagktkv5hk0j1jv.jpg",
    "business_category_id": 12,
    "like": 63,
    "addresses":
    [
      {
        "id": 2,
        "latitude": 44.8420852,
        "longitude": -0.5824325
      },
      {
        "id": 3,
        "latitude": 44.8720852,
        "longitude": -0.5827325
      }
    ],
    "perks":
    [
      perks[0]
    ],
    "days": [
      { label: "monday", hours: "Fermé" },
      { label: "tuesday", hours: "9h00 | 19:00" },
      { label: "wednesday", hours: "9h00 | 19:00" },
      { label: "thursday", hours: "9h00 | 19:00" },
      { label: "friday", hours: "9h00 | 19:00" },
      { label: "saturday", hours: "9h00 | 19:00" },
      { label: "sunday", hours: "9h00 | 19:00" },
    ],
  },
  {
    "id": 3,
    "addresses":
    [
      {
        "id": 4,
        "latitude": 44.8320852,
        "longitude": -0.5834325
      }
    ],

    "name": "Nature et potager en ville",
    "url": "http://www.natureetpotagerenville.fr/",
    "telephone": "0 609 725 765",
    "email": "contact@natureetpotagerenville.fr",
    "description": "La maison Hegara est une épicerie générale implantée aux chartrons. L'idée est de proposer une alimentation saine et de lutter contre le gaspillage, en proposant des produits bios et/ou locaux (légumes secs, pâtes, riz, huiles et vinaigres, thé..etc..) vendus au poinds et sans embalage. les fruits et légumes varient selon sans les saisons et les marchés ou je me déplace chaque matin pour vous proposer des produits toujours frais. ",
    "business_category_id": 16,
    "facebook": "natureetpotagerenville/?fref=ts",
    "twitter": "",
    "instagram": "",
    "leader_first_name": "Marie-Dominique",
    "leader_last_name": "Pivetaud",
    "leader_description": "Bordelaise de 30 ans ne voulant plus manger des tomates d'Espagne en Hiver, ni descendre sa pubelle qui se remplit trop vite!",
    "online": true,
    "shop": true,
    "itinerant": true,
    "picture": "https://res.cloudinary.com/dktivbech/image/upload/c_fill,dpr_2.0,h_350,w_450/v1468850474/production/aysgflagktkv5hk0j1jv.jpg",
    "leader_picture": "https://res.cloudinary.com/wagon/image/upload/c_fill,h_180,w_180/v1473854283/m8irpm4qwxkqf12rvfh4.jpg",
    "like": 0,
    "unlike": 0,
    "link_video": null,
    "days": [
      { label: "monday", hours: "Fermé" },
      { label: "tuesday", hours: "9h00 | 19:00" },
      { label: "wednesday", hours: "9h00 | 19:00" },
      { label: "thursday", hours: "9h00 | 19:00" },
      { label: "friday", hours: "9h00 | 19:00" },
      { label: "saturday", hours: "9h00 | 19:00" },
      { label: "sunday", hours: "9h00 | 19:00" },
    ],
    "perks":
    [
      perks[1],
      perks[2],
      perks[3],
    ]
  }
];

export const detailsBusiness = {
  "id": 36,
  "name": "Nature et potager en ville",
  "url": "http://www.natureetpotagerenville.fr/",
  "telephone": "0 609 725 765",
  "email": "contact@natureetpotagerenville.fr",
  "description": "La maison Hegara est une épicerie générale implantée aux chartrons. L'idée est de proposer une alimentation saine et de lutter contre le gaspillage, en proposant des produits bios et/ou locaux (légumes secs, pâtes, riz, huiles et vinaigres, thé..etc..) vendus au poinds et sans embalage. les fruits et légumes varient selon sans les saisons et les marchés ou je me déplace chaque matin pour vous proposer des produits toujours frais. ",
  "business_category_id": 16,
  "facebook": "natureetpotagerenville/?fref=ts",
  "twitter": "",
  "instagram": "",
  "leader_first_name": "Marie-Dominique",
  "leader_last_name": "Pivetaud",
  "leader_description": "Bordelaise de 30 ans ne voulant plus manger des tomates d'Espagne en Hiver, ni descendre sa pubelle qui se remplit trop vite!",
  "online": true,
  "shop": true,
  "itinerant": true,
  "picture": "https://res.cloudinary.com/dktivbech/image/upload/c_fill,dpr_2.0,h_350,w_450/v1468850474/production/aysgflagktkv5hk0j1jv.jpg",
  "leader_picture": "https://res.cloudinary.com/wagon/image/upload/c_fill,h_180,w_180/v1473854283/m8irpm4qwxkqf12rvfh4.jpg",
  "like": 0,
  "unlike": 0,
  "link_video": null,
  "addresses": {
    "id": 4,
    "street": "87, quai des Queyries",
    "zipcode": "33000",
    "city": "Bordeaux",
    "latitude": 44.8420852,
    "longitude": -0.5824325
  },
  "days": {
    "monday": "Fermé",
    "tuesday": "9h00 | 19:00",
    "wednesday": "9h00 | 19:00",
    "thursday": "9h00 | 19:00",
    "friday": "9h00 | 19:00",
    "saturday": "9h00 | 19:00",
    "sunday": "9h00 | 19:00",
  },
  "perks":
  [
    perks[1],
    perks[2],
    perks[3],
  ]
};


export const associations = [ 
  {
    id: 1,
    picture: "https://res.cloudinary.com/dktivbech/image/upload/c_fill,dpr_2.0,h_350,w_450/v1468850664/production/stdcn2szjkkb8oswkcgc.jpg",
    name: 'Ecolo Info',
    description: "est un collectif, une communauté, un accélérateur d'idées et de projets dédié à l'émergence de la société collaborative.",  
    addresse: "Bordeaux", 
    "type": "Alimentation"
  },
  {
    id: 2,
    picture: "https://res.cloudinary.com/dktivbech/image/upload/c_fill,dpr_2.0,h_350,w_450/v1468850678/production/w7b9g6jjgvhlovz46bq1.jpg",
    name: 'MakeSense',
    description: "est un collectif, une communauté, un accélérateur d'idées et de projets dédié à l'émergence de la société collaborative.",  
    addresse: "Bordeaux",
    "type": "Alimentation", 
  },
  {
    id: 3,
    picture: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTkXazhGBE_can1mctYMyieuATXBKSAL_ex_1agTIVlWuTXXaxq",
    name: 'Ludo Sens',
    description: "est un collectif, une communauté, un accélérateur d'idées et de projets dédié à l'émergence de la société collaborative.",  
    addresse: "Bordeaux",
    "type": "Alimentation"
  },
  {
    id: 4,
    picture: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTkXazhGBE_can1mctYMyieuATXBKSAL_ex_1agTIVlWuTXXaxq",
    name: 'Surfrider',
    description: "est un collectif, une communauté, un accélérateur d'idées et de projets dédié à l'émergence de la société collaborative.",  
    addresse: "Bordeaux",
    "type": "Alimentation"
  },
  {
    id: 5,
    picture: "https://s-media-cache-ak0.pinimg.com/originals/9a/b1/84/9ab184abebb0c26c64f4f6de877ab196.jpg",
    name: 'Oui Share',
    description: "est un collectif, une communauté, un accélérateur d'idées et de projets dédié à l'émergence de la société collaborative.",  
    addresse: "Bordeaux",
    "type": "Alimentation"
  },
  {
    id: 6,
    picture: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQCurOT8QqyuumnPbqvWvBYqD4QU9L2v-mkVUFhJb4pSj-djX72",
    name: 'Disco Soupe',
    description: "est un collectif, une communauté, un accélérateur d'idées et de projets dédié à l'émergence de la société collaborative.",  
    addresse: "Bordeaux",
    "type": "Alimentation"
  },
  {
    id: 7,
    picture: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTkXazhGBE_can1mctYMyieuATXBKSAL_ex_1agTIVlWuTXXaxq",
    name: 'Ludo Sens',
    description: "est un collectif, une communauté, un accélérateur d'idées et de projets dédié à l'émergence de la société collaborative.",  
    addresse: "Bordeaux",
    "type": "Alimentation"
  },
  {
    id: 8,
    picture: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTkXazhGBE_can1mctYMyieuATXBKSAL_ex_1agTIVlWuTXXaxq",
    name: 'Surfrider',
    description: "est un collectif, une communauté, un accélérateur d'idées et de projets dédié à l'émergence de la société collaborative.",  
    addresse: "Bordeaux",
    "type": "Alimentation"
  },
];



export const detailsAssociation = {
  "id": 1,
  "name": "Surfrider Foundation Europe",
  "url": "http://www.natureetpotagerenville.fr/",
  "telephone": "0 609 725 765",
  "email": "contact@natureetpotagerenville.fr",
  "description": "Surfrider Foundation Europe est une association à but non luractif, changée de la protection et de la mise en valeur des lacs, des rivières, de l'océan, des vagues et du littoral.  ",
  "facebook": "natureetpotagerenville/?fref=ts",
  "twitter": "",
  "instagram": "",
  "leader_first_name": "Marie-Dominique",
  "leader_last_name": "Pivetaud",
  "leader_description": "Bordelaise de 30 ans ne voulant plus manger des tomates d'Espagne en Hiver, ni descendre sa pubelle qui se remplit trop vite!",
  "logo": "https://www.credit-cooperatif.coop/particuliers/sites/eagence.exp.cc.app.coopanet.com/files/styles/association_liste_vignette/public/16_fiche_association_surfrider_logo_0.png",
  "picture": "https://d3n8a8pro7vhmx.cloudfront.net/surfrider/pages/68/attachments/original/1429668826/SURFRIDER-2013-RaP-logo-Surfer1.jpg",
  "leader_picture": "https://res.cloudinary.com/wagon/image/upload/c_fill,h_180,w_180/v1473854283/m8irpm4qwxkqf12rvfh4.jpg",
  "like": 0,
  "unlike": 0,
  "link_video": null,
  "addresses": {
    "id": 4,
    "street": "87, quai des Queyries",
    "zipcode": "33000",
    "city": "Bordeaux",
    "latitude": 44.8420852,
    "longitude": -0.5824325
  },
};

export const Contacts = [
  {
    id: 1,
    name: null,
    mobile: '+33684384540',
    image: null,
    invite: false,
  },
  {
    id: 2,
    name: "Wilson",
    mobile: '+33684384540',
    image: "https://i.vimeocdn.com/portrait/9749302_300x300",
    invite: true,
  },
  {
    id: 3,
    name: "Claire",
    mobile: '+33684384540',
    image: "http://www.justacote.com/photos_entreprises_250/dos-santos-wilson-paris-147436786930.jpg",
    invite: true,
  },
  {
    id: 4,
    name: "Anna",
    mobile: '+33684384540',
    image: "http://s.plurielles.fr/mmdia/i/08/9/owen-wilson-2496089_2041.jpg",
    invite: true,
  },
  {
    id: 5,
    name: "Wilson",
    mobile: '+33684384540',
    image: "http://s.plurielles.fr/mmdia/i/08/9/owen-wilson-2496089_2041.jpg",
    invite: false,
  }
];

 