# Animation Zoom-out Grid Reveal

## 🎯 Description

Deux composants d'animation inspirés de Beacons.ai pour créer un effet de révélation de grille spectaculaire :

1. **ZoomGridReveal** - Animation liée au scroll
2. **ZoomGridAutoReveal** - Animation automatique au chargement

## 📦 Installation

Framer Motion est déjà installé dans le projet. Si ce n'est pas le cas :

```bash
npm install framer-motion
```

## 🚀 Utilisation

### Version avec Scroll (ZoomGridReveal)

Importez et utilisez le composant dans votre page :

```tsx
import ZoomGridReveal from "@/components/ZoomGridReveal";

function MyPage() {
  return (
    <>
      <ZoomGridReveal />
      {/* Votre contenu suivant */}
    </>
  );
}
```

**Caractéristiques :**
- L'animation se déclenche pendant le scroll
- Durée totale : 200vh (deux fois la hauteur de l'écran)
- Indicateur de scroll animé
- Position sticky pour garder l'animation visible

### Version Automatique (ZoomGridAutoReveal)

Pour une animation au chargement sans scroll :

```tsx
import ZoomGridAutoReveal from "@/components/ZoomGridAutoReveal";

function MyPage() {
  return (
    <>
      <ZoomGridAutoReveal />
      {/* Votre contenu suivant */}
    </>
  );
}
```

**Caractéristiques :**
- Animation automatique après 500ms
- Durée : 1.5s pour le zoom + échelonnement des cartes
- Pas besoin de scroll

## 🎨 Personnalisation

### Modifier les cartes

Dans le fichier du composant, modifiez l'array `gridCards` :

```tsx
const gridCards: GridCard[] = [
  { 
    id: 1, 
    title: "Mon Titre", 
    icon: MonIcone, 
    color: "from-blue-500 to-cyan-500", 
    size: "medium" 
  },
  // ... autres cartes
];
```

**Options disponibles :**
- `title` : Texte affiché sur la carte
- `icon` : Icône de lucide-react
- `color` : Classes Tailwind pour le gradient (from-X to-Y)
- `size` : "small", "medium", ou "large"
- `isCenterCard` : true pour la carte au centre (celle qui reste visible initialement)

### Modifier les tailles

Dans `sizeClasses` :

```tsx
const sizeClasses = {
  small: "col-span-1 row-span-1 h-40",
  medium: "col-span-1 md:col-span-2 row-span-1 h-40 md:h-48",
  large: "col-span-2 row-span-2 h-80 md:h-96",
};
```

### Ajuster les paramètres d'animation

**Pour ZoomGridReveal (scroll) :**
```tsx
// Modifier le scale (zoom)
const scale = useTransform(scrollYProgress, [0, 0.5], [3, 1]); // [3, 1] = zoom de 3x à 1x

// Modifier l'opacité
const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0.5, 1]);

// Modifier la durée du scroll
<div className="relative h-[200vh]"> // 200vh = deux fois l'écran
```

**Pour ZoomGridAutoReveal (automatique) :**
```tsx
// Délai avant le démarrage
useEffect(() => {
  const timer = setTimeout(() => {
    setHasAnimated(true);
  }, 500); // 500ms
  return () => clearTimeout(timer);
}, []);

// Durée de l'animation
animate={{ scale: hasAnimated ? 1 : 3 }}
transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // 1.5s

// Délai entre les cartes
delay: isCenter ? 0 : 0.5 + (index * 0.1) // 0.1s entre chaque carte
```

### Modifier les couleurs de fond

```tsx
<section className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-950 dark:to-gray-900">
```

## 🎭 Démo

Accédez à la démo en développement :
- Démarrez le serveur : `npm run dev`
- Visitez : `http://localhost:5173/zoom-grid-demo`

## 📱 Responsive

Les composants sont entièrement responsive :
- **Mobile** : Grille 2 colonnes
- **Tablette/Desktop** : Grille 4 colonnes
- Les tailles de cartes s'adaptent automatiquement
- Les textes et icônes ajustent leur taille

## 💡 Conseils de Performance

1. **Images légères** : Pour l'instant, utilisez des divs avec gradients. Ajoutez des images seulement après avoir validé l'animation.

2. **Nombre de cartes** : 9 cartes est optimal. Plus peut ralentir l'animation sur mobile.

3. **Optimisation scroll** : L'animation utilise `useTransform` qui est optimisé pour la performance.

4. **Will-change CSS** : Si besoin de plus de fluidité, ajoutez :
```tsx
<motion.div style={{ scale, willChange: "transform" }}>
```

## 🔄 Intégration dans votre portfolio

### Option 1 : En page d'accueil
Remplacez votre Hero actuel par ZoomGridAutoReveal pour un impact immédiat.

### Option 2 : Section dédiée
Ajoutez ZoomGridReveal comme section entre deux parties de votre portfolio.

### Option 3 : Page séparée
Gardez la démo sur `/zoom-grid-demo` comme showcase de vos compétences.

## 🎨 Exemples de personnalisation

### Thème sombre uniquement
```tsx
className="bg-gray-950" // Retirez les classes dark:
```

### Animation plus rapide
```tsx
// ZoomGridReveal
const scale = useTransform(scrollYProgress, [0, 0.3], [3, 1]); // Plus rapide

// ZoomGridAutoReveal
transition={{ duration: 0.8 }} // Au lieu de 1.5
```

### Effet de flou pendant l'animation
```tsx
const blur = useTransform(scrollYProgress, [0, 0.5], [10, 0]);

<motion.div style={{ scale, filter: `blur(${blur}px)` }}>
```

## 🐛 Troubleshooting

**L'animation ne se déclenche pas :**
- Vérifiez que Framer Motion est installé : `npm list framer-motion`
- Vérifiez la console pour les erreurs

**L'animation est saccadée :**
- Réduisez le nombre de cartes
- Simplifiez les effets visuels (retirez backdrop-blur temporairement)
- Testez sur un autre navigateur

**Les icônes ne s'affichent pas :**
- Vérifiez que `lucide-react` est installé
- Importez les icônes nécessaires

## 📝 Notes

- Les composants utilisent TypeScript
- Compatible avec le dark mode
- Utilise Tailwind CSS pour le styling
- Testé sur Chrome, Firefox, Safari

## 🎉 Crédits

Inspiré de l'animation de [Beacons.ai](https://beacons.ai)
