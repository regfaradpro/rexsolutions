
import { Car, Fuel, HardHat, Utensils } from 'lucide-react';
import React from 'react';

export const COUNTRIES = [
  { code: 'BE', name: 'Belgique', dial: '+32' },
  { code: 'FR', name: 'France', dial: '+33' },
  { code: 'LU', name: 'Luxembourg', dial: '+352' },
  { code: 'CH', name: 'Suisse', dial: '+41' },
  { code: 'DE', name: 'Allemagne', dial: '+49' },
  { code: 'IT', name: 'Italie', dial: '+39' },
  { code: 'ES', name: 'Espagne', dial: '+34' },
  { code: 'GB', name: 'Royaume-Uni', dial: '+44' },
  { code: 'US', name: 'États-Unis', dial: '+1' },
  { code: 'CA', name: 'Canada', dial: '+1' },
  { code: 'MA', name: 'Maroc', dial: '+212' },
  { code: 'DZ', name: 'Algérie', dial: '+213' },
  { code: 'TN', name: 'Tunisie', dial: '+216' },
  { code: 'SN', name: 'Sénégal', dial: '+221' },
  { code: 'CI', name: 'Côte d’Ivoire', dial: '+225' },
  { code: 'CM', name: 'Cameroun', dial: '+237' },
  { code: 'CD', name: 'RD Congo', dial: '+243' },
  { code: 'AE', name: 'Émirats Arabes Unis', dial: '+971' },
  { code: 'CN', name: 'Chine', dial: '+86' },
  { code: 'JP', name: 'Japon', dial: '+81' },
  { code: 'BR', name: 'Brésil', dial: '+55' },
  { code: 'PT', name: 'Portugal', dial: '+351' },
  { code: 'NL', name: 'Pays-Bas', dial: '+31' },
  { code: 'TR', name: 'Turquie', dial: '+90' },
  { code: 'QA', name: 'Qatar', dial: '+974' },
  { code: 'SA', name: 'Arabie Saoudite', dial: '+966' },
].sort((a, b) => a.name.localeCompare(b.name));

export const BRAND_LOGOS = [
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738837/LandRover_cdh408.jpg",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738837/range_Rover_vb2ved.png",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738834/nissan2_rumxu2.png",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738832/mitsubishi_ndtchy.png",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738831/merco2_uxqgkl.jpg",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738829/initinity2_kyogg1.jpg",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738828/byd_p3lzk5.jpg"
];

export const TRUCK_BRAND_LOGOS = [
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770743810/volvo_bewshu.jpg",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770743809/scania_vgo323.jpg",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770743808/mercedes-benz_ia0vpj.jpg",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770743808/MAN_Truck___Bus_-_Logo.svg_hugeju.png",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770743807/freightliner_lxbjyp.png"
];

export const SUV_REALISATIONS = [
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770737558/RangeRoverSport_iuyioi.jpg",
    model: "RANGE ROVER",
    submodel: "DARK SHADOW • RED CARPET CONFIG",
    description: "Présentation exclusive sur tapis rouge.",
    specs: { power: "530 CH", engine: "V8 4.4L", trans: "AUTO 8" }
  },
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770737557/byd_seal_u_03_gbnsbm.jpg",
    model: "BYD SEAL U",
    submodel: "DESIGN SILVER • STUDIO EDITION",
    description: "Le futur de la mobilité électrique premium.",
    specs: { power: "313 CH", engine: "ELECTRIQUE", trans: "SINGLE" }
  },
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770737558/MG63AMG2_f311qk.jpg",
    model: "MERCEDES G-CLASS",
    submodel: "KLASSEN NIGHT EDITION",
    description: "La G-Wagon AMG dans sa version la plus radicale.",
    specs: { power: "585 CH", engine: "V8 BITURBO", trans: "AMG SPEED" }
  }
];

export const TANKER_REALISATIONS = [
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770745282/mercedes-benz-trucks_stawgy.jpg",
    model: "MERCEDES-BENZ AROCS",
    submodel: "TANKER PRO EDITION",
    description: "Le fer de lance du transport de fluides.",
    specs: { power: "480 CH", engine: "OM 471", trans: "POWERSHIFT 3" }
  }
];

export const GET_SECTOR_DATA = (sector: string) => {
  const data: Record<string, any> = {
    vehicules: {
      title: 'SUV & Prestige',
      desc: 'Expertise exclusive en importation de SUV et 4x4 de prestige.',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1920',
      icon: React.createElement(Car, { className: "h-12 w-12" }),
      formLabel: 'Modèle de SUV recherché',
      placeholder: 'ex: Land Cruiser 300 V6, Range Rover Sport...',
      gallery: SUV_REALISATIONS
    },
    'camions-citernes': {
      title: 'Camions-Citernes',
      desc: 'Approvisionnement spécialisé en camions-citernes industriels.',
      image: 'https://res.cloudinary.com/dupcar9en/image/upload/v1770743835/mercedes-benz-trucks_vovkse.jpg',
      icon: React.createElement(Fuel, { className: "h-12 w-12" }),
      formLabel: 'Type de citerne & Capacité (m³)',
      placeholder: 'ex: Citerne hydrocarbure 45.000L...',
      gallery: TANKER_REALISATIONS
    },
    materiaux: {
      title: 'Pôle Matériaux',
      desc: 'Approvisionnement industriel et logistique pour le bâtiment.',
      image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1920',
      icon: React.createElement(HardHat, { className: "h-12 w-12" }),
      formLabel: 'Type et quantité de matériaux',
      placeholder: 'ex: 100 tonnes d\'acier structurel...',
      gallery: null
    },
    alimentation: {
      title: 'Pôle Alimentation',
      desc: 'Import-export de denrées agroalimentaires.',
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=1920',
      icon: React.createElement(Utensils, { className: "h-12 w-12" }),
      formLabel: 'Type de produits et spécificités',
      placeholder: 'ex: Riz Basmati, 20 containers...',
      gallery: null
    }
  };
  return data[sector] || null;
};
