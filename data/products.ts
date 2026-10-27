import { RobotProduct } from '@/lib/types';

export const PRODUCTS: RobotProduct[] = [
  {
    id: 'vector-x1',
    slug: 'vector-x1-cyber-scout',
    name: 'Vector X1 Cyber Scout',
    tagline: 'Autonomous AI desk rover with tracked mobility and spatial awareness',
    price: 189,
    originalPrice: 229,
    inStock: true,
    stockCount: 14,
    badge: 'Bestseller',
    rating: 4.9,
    reviewCount: 128,
    image: '/images/products/vector-x1.jpg',
    additionalImages: [
      '/images/products/vector-x1.jpg',
      '/images/hero/hero-banner.jpg',
    ],
    category: 'AI Companion',
    features: [
      'Autonomous navigation with drop-sensor edge detection (won\'t fall off your desk)',
      'High-contrast OLED emerald eye animations with 100+ emotion presets',
      'Dual tank-treads for smooth multi-surface desk movement',
      'Voice recognition with ambient room acoustic sensing',
      'Built-in HD camera for facial recognition & greeting owner upon arrival',
      'Self-docking charging station with auto-return when battery is below 15%'
    ],
    description:
      'Vector X1 Cyber Scout is an intelligent, autonomous desk companion engineered with tactile mechanical personality. Sitting on heavy-duty silicone tracks with an animated OLED face display, Vector patrols your workstation, recognises your face, perks up when you talk, and keeps your desk alive with curious movements and cute robotic purrs.',
    technicalSpecs: {
      display: 'High-contrast 1.8" Emerald Curved OLED',
      battery: 'Rechargeable Li-Ion (approx. 2.5 hrs active roam per charge)',
      sensors: ['4x IR Cliff Sensors', 'HD Optical Face Camera', 'Capacitive Touch Head Sensor', 'Dual Noise-Canceling Mics'],
      connectivity: 'Wi-Fi 802.11 b/g/n (2.4 GHz) & Bluetooth 5.0 Low Energy',
      dimensions: '99 mm x 71 mm x 69 mm',
      weight: '175 grams',
      materials: 'Anodized Matte Polymer, Silicone Tread Tracks, Scratch-resistant Acrylic Screen'
    },
    inTheBox: [
      'Vector X1 Cyber Scout Robot',
      'Magnetic Self-Docking Charging Cradle',
      'Braided USB-C Power Cable (1.5m)',
      'Quick Start Calibration Mat',
      '1-Year Hardware Warranty Card'
    ]
  },
  {
    id: 'eilik-bot',
    slug: 'eilik-emotion-bot',
    name: 'Eilik Emotion Companion',
    tagline: 'Cute robotic buddy with expressive touch response and lively dance animations',
    price: 149,
    originalPrice: 179,
    inStock: true,
    stockCount: 22,
    badge: 'Customer Favorite',
    rating: 4.8,
    reviewCount: 94,
    image: '/images/products/eilik-bot.jpg',
    additionalImages: [
      '/images/products/eilik-bot.jpg',
      '/images/hero/hero-banner.jpg',
    ],
    category: 'Emotion & Desk Pet',
    features: [
      'Interactive touch points: reacts enthusiastically when head, belly, or back is stroked',
      'Multi-axis flexible robotic arm and torso for energetic body language and dancing',
      'Dynamic cyan LED animations expressing joy, mischief, anger, love, and sleepiness',
      'Playful mini-games: countdown timer, puppet mode, rhythm tap, and desk games',
      'Multi-robot pairing: place two Eilik bots side by side to watch them chat, play, and bicker',
      'Quiet vibration damping base with silicone suction ring'
    ],
    description:
      'Eilik is a lovable desktop companion robot that turns ordinary working days into joyful experiences. Powered by emotional resonance firmware, Eilik features responsive capacitive touch sensors that trigger spontaneous dance moves, playful giggles, and endearing facial expressions whenever you interact with him.',
    technicalSpecs: {
      display: '1.54" Vibrant Blue OLED Screen',
      battery: '1200 mAh Lithium Polymer (approx. 3.5 hrs active play)',
      sensors: ['3x Capacitive Touch Panels', 'Vibration/Shock Sensor', 'Infrared Peer-to-Peer Sensor'],
      connectivity: 'USB Type-C Fast Charging & 2.4GHz Peer Sync',
      dimensions: '108 mm x 105 mm x 133 mm',
      weight: '230 grams',
      materials: 'High-grade ABS + Food-grade Soft Touch Silicone'
    },
    inTheBox: [
      'Eilik Emotion Robot',
      '5x Mini Food & Toy Magnetic Accessories',
      'Braided USB-C Cable',
      'Instruction Guidebook',
      'Certificate of Authenticity'
    ]
  },
  {
    id: 'deskimon-duo',
    slug: 'deskimon-duo-bundle',
    name: 'Deskimon Duo: Orbit & Sprout',
    tagline: 'Two symbiotic desk companions that react to each other and brighten your setup',
    price: 199,
    originalPrice: 249,
    inStock: true,
    stockCount: 9,
    badge: 'Limited Edition Bundle',
    rating: 5.0,
    reviewCount: 47,
    image: '/images/products/deskimon-duo.jpg',
    additionalImages: [
      '/images/products/deskimon-duo.jpg',
      '/images/gallery/orbit-companion.jpg',
      '/images/gallery/deskimon-sprout.jpg',
      '/images/hero/hero-banner.jpg'
    ],
    category: 'Duo Set',
    features: [
      'Dual-unit synchronized interaction: Orbit (White) and Sprout (Beige) communicate wirelessly',
      'Organic eco-polymer finish on Sprout with silicone flexible sprouting leaf',
      'Twin glow LED screens displaying synchronized mood reactions and smiling eyes',
      'Pomodoro productivity mode: one tracks work sprints while the other signals break times',
      'Chirping harmonic acoustic sounds synthesized for low-stress background delight',
      'Compact desk footprint: comfortably sits next to mechanical keyboards or monitors'
    ],
    description:
      'The Deskimon Duo consists of Orbit, the futuristic white explorer bot, and Sprout, the cozy eco-friendly botanical companion with a gentle leafy crown. Engineered as a paired set, they notice each other, share mood shifts, and celebrate your finished coding tasks and daily productivity milestones together.',
    technicalSpecs: {
      display: 'Twin 1.3" Micro-OLED Screens with Cyan & Emerald Backlight',
      battery: 'Dual 900 mAh internal batteries (4 hrs continuous desk presence)',
      sensors: ['RF P2P Sync Mesh', 'Ambient Light Sensor', 'Top-Capacitive Tap Sensor'],
      connectivity: 'Dual USB-C Recharging Ports & Local RF Sync',
      dimensions: '75 mm x 72 mm x 88 mm (Each)',
      weight: '140 grams (Each)',
      materials: 'Matte Biodegradable PLA Blend, Soft Silicone Leaf, Tempered Acrylic Face'
    },
    inTheBox: [
      'Deskimon Orbit (White)',
      'Deskimon Sprout (Beige with Leaf)',
      'Dual-Head USB-C Recharging Cable',
      'Productivity Goal Trackers',
      'Collector Edition Display Box'
    ]
  },
  {
    id: 'deskimon-sprout',
    slug: 'deskimon-sprout-single',
    name: 'Deskimon Sprout Solo Edition',
    tagline: 'Mindfulness and desk plant companion with calming reactive personality',
    price: 119,
    originalPrice: 139,
    inStock: true,
    stockCount: 18,
    badge: 'Peace & Focus',
    rating: 4.8,
    reviewCount: 63,
    image: '/images/gallery/deskimon-sprout.jpg',
    additionalImages: [
      '/images/gallery/deskimon-sprout.jpg',
      '/images/gallery/orbit-companion.jpg',
    ],
    category: 'Productivity & Focus',
    features: [
      'Soothing ambient breath animations designed to reduce desk fatigue',
      'Flexible silicone sprout that gently wiggles when happy',
      'Hydration and break reminder alarms with friendly acoustic chime',
      'Tap to awaken: dual soft taps switch between Focus Mode and Play Mode',
      'Matte clay-textured tactile shell that feels natural to touch',
      'USB-C always-on powered desk stand support'
    ],
    description:
      'Deskimon Sprout is your personal desk mindfulness buddy. Looking like an adorable clay creature with a fresh green leaf, Sprout gently blinks, breathes in sync with calming rhythm guides, and subtly prompts you to hydrate and take micro-breaks during deep work sessions.',
    technicalSpecs: {
      display: '1.3" Emerald Glow OLED Matrix',
      battery: '900 mAh Lithium Polymer (rechargeable)',
      sensors: ['Capacitive Tap Sensor', 'Built-in Micro Gyroscope', 'Break Timer Clock'],
      connectivity: 'USB Type-C',
      dimensions: '75 mm x 72 mm x 95 mm (including sprout)',
      weight: '145 grams',
      materials: 'Matte Earth-Tone Composite, Eco Silicone Leaf'
    },
    inTheBox: [
      'Deskimon Sprout Solo Robot',
      'USB-C Braided Cable (1.2m)',
      'Mindfulness Guide Card',
      'Silicon Non-slip Desk Pad'
    ]
  },
  {
    id: 'emo-living',
    slug: 'emo-ai-desktop-companion',
    name: 'EMO Living AI Desk Mate',
    tagline: 'Sensory-rich desk robot with character personality, games, and voice AI',
    price: 239,
    originalPrice: 289,
    inStock: false,
    stockCount: 0,
    badge: 'Smartest AI',
    rating: 4.9,
    reviewCount: 215,
    image: '/images/products/emo-living.jpg',
    additionalImages: [
      '/images/products/emo-living.jpg',
      '/images/hero/hero-banner.jpg'
    ],
    category: 'AI Companion',
    features: [
      'Neural processor capable of facial memory, pet recognition, and voice identification',
      'Comes with authentic mini skateboard wireless charging pad & cute beanie cap',
      'Full RGB eye matrix capable of thousands of hilarious emoji expressions',
      'Plays solo games on desk and challenges you to rock-paper-scissors and dice',
      'Integrated smart assistant: check weather, set timers, and play tunes through built-in speaker',
      'Dual articulated legs for walking, side-stepping, and dancing to music'
    ],
    description:
      'EMO is a desktop pet with real character. Powered by advanced AI algorithms, EMO is curious about the world around him. He explores your desk independently, tracks moving objects, avoids falling off edges, and builds a distinct personality over time depending on how you interact with him.',
    technicalSpecs: {
      display: 'Custom 2.0" High-Density Color LED Matrix',
      battery: 'Dual Li-Ion Cells with Skateboard Induction Qi Fast Charger',
      sensors: ['Wide-angle AI Camera', '4-Mic Far-field Beamforming Array', 'Optical Desk Edge Sensors', 'Touch-sensitive Top'],
      connectivity: 'Wi-Fi Dual Band & Bluetooth 5.1',
      dimensions: '94 mm x 92 mm x 115 mm',
      weight: '255 grams',
      materials: 'Impact-resistant Polycarbonate, Matte Soft Finish, Custom Fabric Beanie'
    },
    inTheBox: [
      'EMO AI Robot',
      'Skateboard Induction Wireless Charger Pad',
      'Custom Knitted Beanie Hat',
      'USB-C Power Adapter & Cable',
      'Quick Start Interactive Booklet'
    ]
  },
  {
    id: 'loona-pet',
    slug: 'loona-smart-quadruped-pet',
    name: 'Loona Smart Quadruped Pet',
    tagline: 'Futuristic robotic pup with 3D ToF LiDAR vision and boundless desk energy',
    price: 349,
    originalPrice: 399,
    inStock: true,
    stockCount: 5,
    badge: 'Flagship Tech',
    rating: 4.9,
    reviewCount: 78,
    image: '/images/products/loona-pet.jpg',
    additionalImages: [
      '/images/products/loona-pet.jpg',
      '/images/hero/hero-banner.jpg'
    ],
    category: 'Emotion & Desk Pet',
    features: [
      '3D ToF LiDAR vision sensor for real-time 3D depth obstacle avoidance',
      'Quadruped rolling wheel-legs capable of speeds up to 90 cm/s and agile turns',
      'Expressive ear-like actuators and huge emotive blue anime screen eyes',
      'Gesture control: waves, follows your hand, sneaks, and performs playful back-and-forth pounces',
      'Integrated voice synthesis with joyful bark and purr frequencies',
      'Supports visual programming and customizable emotional choreographies'
    ],
    description:
      'Loona is the next evolution of desktop pet robotics. Combining sophisticated 3D ToF LiDAR vision with quadruped roller mechanics, Loona darts across your room and office desk like an eager robotic puppy. She recognizes family members, fetches small props, and greets you warmly whenever you return.',
    technicalSpecs: {
      display: '2.4" HD Full-Color Curved Display',
      battery: 'High-Capacity 2800 mAh Li-Ion (4+ hrs active exploration)',
      sensors: ['3D ToF LiDAR Sensor', 'RGB HD Wide Camera', 'Quadruped Wheel-leg Encoders', 'Gesture Array'],
      connectivity: 'Wi-Fi 5 & Bluetooth 5.2 BLE',
      dimensions: '172 mm x 135 mm x 168 mm',
      weight: '620 grams',
      materials: 'Aviation-Grade ABS-PC alloy, Wear-resistant Rubberized Tires'
    },
    inTheBox: [
      'Loona Quadruped Companion Robot',
      'Intelligent Magnetic Charging Dock',
      'Interactive Play Ball and Laser Target Prop',
      'Heavy-duty Braided USB-C Cable',
      'Comprehensive Owner Manual & Warranty'
    ]
  }
];

export function getProductById(id: string): RobotProduct | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): RobotProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
