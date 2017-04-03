
import { colors } from '../themes';


const url = 'https://res.cloudinary.com/dktivbech/image/upload/v1489762512/business_categories/';
export const categories = [

  { 
    id: 1,
    icon: require('../resources/categories/bar_et_restaurant.png'), 
    name: 'Bar & Restaurant',
    color: colors.bar,
    marker: 'resto',
    markerIOS: url+'marker-restaurant.png',
  },
  { 
    id: 2,
    icon: require('../resources/categories/beaute_bien-etre.png'), 
    name: 'Beauté & Bien Être',
    color: colors.beauty,
    marker: 'beauty',
    markerIOS: url+'marker-bienetre.png', 

  },
  { 
    id: 3,
    icon: require('../resources/categories/lieux_de_vie.png'), 
    name: 'Café & Lieu de vie',
    color: colors.coffee,
    marker: 'coffee',
    markerIOS: url+'marker-coffee.png', 
  },
  { 
    id: 4,
    icon: require('../resources/categories/loisirs.png'), 
    name: 'Loisirs',
    color: colors.hobbies,
    marker: 'hobbies',
    markerIOS: url+'marker-loisirs.png', 
  },

  {
    id: 5,
    icon: require('../resources/categories/maison_et_jardin.png'), 
    name: 'Maison & Jardin',
    color: colors.house,
    marker: 'house',
    markerIOS: url+'marker-maison.png', 
  },
  
  { 
    id: 6,
    icon: require('../resources/categories/shopping.png'), 
    name: 'Shopping',
    color: colors.shopping,
    marker: 'shopping',
    markerIOS: url+'marker-shopping.png', 
  },
  { 
    id: 7,
    icon: require('../resources/categories/marche_epicerie.png'), 
    name: 'Marché & Epicerie',
    color: colors.markets,
    marker: 'markets',
    markerIOS: url+'marker-epicerie.png', 
  },
  { 
    id: 9,
    icon: require('../resources/categories/sante.png'), 
    name: 'Santé & Fitness',
    color: colors.health,
    marker: 'health',
    markerIOS: url+'marker-forme.png', 
  },

  { 
    id: 10,
    icon: require('../resources/categories/developpement_personnel.png'), 
    name: 'Développement personnel',
    color: colors.development,
    marker: 'development',
    markerIOS: url+'marker-developpement.png', 
    
  },
  { 
    id: 11,
    icon: require('../resources/categories/mobilite.png'), 
    name: 'Mobilité',
    color: colors.event,
    marker: 'event',
    markerIOS: url+'marker-mobilite.png', 
  },
  { 
    id: 12,
    icon: require('../resources/categories/artisanat.png'), 
    name: 'Artisan',
    color: colors.association,
    marker: 'association',
    markerIOS: url+'marker-artisanat.png', 
  },
  { 
    id: 13,
    icon: require('../resources/categories/e_commerce.png'), 
    name: 'E-Commerce',
    color: colors.commerce,
    marker: 'commerce',
    markerIOS: url+'marker-artisanat.png', 
  },
];

export const getCategory = (categoryId) => {
  return categories.find(obj => parseInt(obj.id) === parseInt(categoryId))
}

