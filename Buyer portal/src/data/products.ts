export interface Product {
  id: string;
  name: string;
  category: string;
  industry: string;
  priceMin: number;
  priceMax: number;
  unit: string;
  moq: number;
  location: string;
  city: string;
  state: string;
  country: string;
  supplierName: string;
  supplierRating: number;
  supplierType: "Manufacturer" | "Exporter" | "Wholesaler";
  tradeAssurance: boolean;
  gstVerified: boolean;
  msme: boolean;
  isoCertified: boolean;
  readyStock: boolean;
  deliveryTime: number; // in days
  description: string;
  image: string;
  
  // Extended fields for details page
  gallery: string[];
  videoUrl?: string;
  specifications: Record<string, string>;
  packagingDetails: string;
  shippingInfo: {
    port: string;
    transitTime: string;
    methods: string[];
  };
  supplierProfile: {
    established: number;
    factorySize: string;
    employees: number;
    description: string;
    certificates: string[];
    factoryImages: string[];
  };
  reviews: {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
    purchaseQty: string;
  }[];
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "PROD-1001",
    name: "UltraTech Premium Cement",
    category: "Construction Materials",
    industry: "Infrastructure",
    priceMin: 340,
    priceMax: 380,
    unit: "bag",
    moq: 500,
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    supplierName: "India Cement Distributors",
    supplierRating: 4.8,
    supplierType: "Wholesaler",
    tradeAssurance: true,
    gstVerified: true,
    msme: true,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 3,
    image: "/D2D market/1.jpg",
    description: "High-strength portland cement suitable for all RCC structures, load-bearing walls, and general construction. Excellent setting time and durability.",
    gallery: ["/D2D market/1.jpg", "/D2D market/2.jpg", "/D2D market/3.jpg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Grade": "OPC 53 Grade",
      "Material": "Portland Cement Clinker + Gypsum",
      "Setting Time (Initial)": "30 Minutes minimum",
      "Setting Time (Final)": "600 Minutes maximum",
      "Compressive Strength": "53 MPa minimum after 28 days",
      "Brand": "UltraTech Cement Ltd"
    },
    packagingDetails: "50 kg double-laminated HDPE bags, moisture-proof packing.",
    shippingInfo: {
      port: "Mumbai Port (JNPT)",
      transitTime: "2-4 Business Days",
      methods: ["Road Transport (Truckloads)", "Railway Freight"]
    },
    supplierProfile: {
      established: 2010,
      factorySize: "25,000 sq meters",
      employees: 120,
      description: "India Cement Distributors is a premier enterprise supplying high-grade construction components across Western and Southern India. Backed by state-of-the-art warehouses and logistics chains.",
      certificates: ["ISO 9001:2015", "BIS Standard Certified", "GST Compliance Certificate"],
      factoryImages: ["/D2D market/2.jpg", "/D2D market/3.jpg"]
    },
    reviews: [
      {
        id: "R-1",
        author: "Rajesh K., Buildcon Projects",
        rating: 5,
        date: "2026-05-12",
        comment: "Excellent setting strength. Delivery was on time for our metro rail project. Fully verified MSME registration.",
        verified: true,
        purchaseQty: "1,500 bags"
      },
      {
        id: "R-2",
        author: "Vikram S., Structural Developers",
        rating: 4.5,
        date: "2026-06-01",
        comment: "Reliable quality. Double-laminated bags prevented any damage during rain. Will order again.",
        verified: true,
        purchaseQty: "800 bags"
      }
    ]
  },
  {
    id: "PROD-1002",
    name: "Heavy Duty Steel Rebars (TMT Fe 550D)",
    category: "Construction Materials",
    industry: "Infrastructure",
    priceMin: 52000,
    priceMax: 55000,
    unit: "metric ton",
    moq: 10,
    location: "Ahmedabad, Gujarat",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    supplierName: "Apex Steel & Alloys",
    supplierRating: 4.6,
    supplierType: "Manufacturer",
    tradeAssurance: true,
    gstVerified: true,
    msme: false,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 5,
    image: "/D2D market/2.jpg",
    description: "Thermomechanically treated steel reinforcement bars with excellent ductility, high yield strength, superior weldability, and seismic resistance.",
    gallery: ["/D2D market/2.jpg", "/D2D market/1.jpg", "/D2D market/3.jpg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Grade": "Fe 550D TMT",
      "Material": "Carbon Steel",
      "Diameter Range": "8mm to 32mm",
      "Standard Length": "12 Meters per bar",
      "Seismic Resistance": "High (Ductile grade for earthquake zones)",
      "Brand": "Apex Steel"
    },
    packagingDetails: "Bundled with metal wire ties, roughly 2 metric tons per bundle.",
    shippingInfo: {
      port: "Kandla Port",
      transitTime: "4-6 Business Days",
      methods: ["Flatbed Trailer Transport", "Train Cargo"]
    },
    supplierProfile: {
      established: 2005,
      factorySize: "50,000 sq meters",
      employees: 350,
      description: "Apex Steel & Alloys is an ISO-certified manufacturer specializing in high-grade TMT rebars, structural sections, and billet steel with heavy production capacities.",
      certificates: ["ISO 9001:2015", "ISO 14001:2015", "ISI Mark Certificate"],
      factoryImages: ["/D2D market/1.jpg", "/D2D market/3.jpg"]
    },
    reviews: [
      {
        id: "R-3",
        author: "Amit Patel, Gujarat Infra",
        rating: 5,
        date: "2026-04-18",
        comment: "Testing certificates provided with shipment. Steel has exceptional bendability. Strongly recommended.",
        verified: true,
        purchaseQty: "25 metric tons"
      }
    ]
  },
  {
    id: "PROD-1003",
    name: "Industrial Grade PVC Pipes (Class 3)",
    category: "Construction Materials",
    industry: "Infrastructure",
    priceMin: 120,
    priceMax: 150,
    unit: "meter",
    moq: 200,
    location: "Bengaluru, Karnataka",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    supplierName: "AquaFlow Polymers Ltd",
    supplierRating: 4.4,
    supplierType: "Wholesaler",
    tradeAssurance: false,
    gstVerified: true,
    msme: true,
    isoCertified: false,
    readyStock: true,
    deliveryTime: 7,
    image: "/D2D market/3.jpg",
    description: "High durability rigid PVC pipes for agricultural irrigation, building water supply, sewage lines, and industrial chemical transport.",
    gallery: ["/D2D market/3.jpg", "/D2D market/1.jpg", "/D2D market/2.jpg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Class": "Class 3 (6 Kgf/cm² working pressure)",
      "Material": "Rigid Unplasticized PVC (uPVC)",
      "Standard Length": "6 Meters per pipe",
      "Outer Diameter": "110mm",
      "Color": "Grey",
      "Brand": "AquaFlow Polymers"
    },
    packagingDetails: "Stacked and tied in bundles, wrapped with protective film.",
    shippingInfo: {
      port: "Mangalore Port",
      transitTime: "3-5 Business Days",
      methods: ["Road Truck Transport"]
    },
    supplierProfile: {
      established: 2015,
      factorySize: "18,000 sq meters",
      employees: 80,
      description: "AquaFlow Polymers is a leading MSME supplier of irrigation, drainage, and plumbing products in South India.",
      certificates: ["BIS Standard", "MSME Registration Certificate"],
      factoryImages: ["/D2D market/1.jpg", "/D2D market/2.jpg"]
    },
    reviews: [
      {
        id: "R-4",
        author: "Krishna Moorthy, Agritech Co.",
        rating: 4,
        date: "2026-05-20",
        comment: "Good pressure tolerance. Used for a large-scale drip irrigation pipeline. Shipping was smooth.",
        verified: true,
        purchaseQty: "500 meters"
      }
    ]
  },
  {
    id: "PROD-1004",
    name: "Copper Winding Wire (Super Enamelled)",
    category: "Electronics & Electrical",
    industry: "Manufacturing",
    priceMin: 780,
    priceMax: 820,
    unit: "kg",
    moq: 50,
    location: "New Delhi, Delhi",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    supplierName: "ElectroWire Industries",
    supplierRating: 4.9,
    supplierType: "Manufacturer",
    tradeAssurance: true,
    gstVerified: true,
    msme: true,
    isoCertified: true,
    readyStock: false,
    deliveryTime: 2,
    image: "/D2D market/4.jpeg",
    description: "99.9% pure super enamelled copper winding wire optimized for high-temperature electrical motors, transformers, and generator coils.",
    gallery: ["/D2D market/4.jpeg", "/built for high/5.jpeg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Purity": "99.9% Pure Electrolytic Copper",
      "Wire Gauge": "22 SWG (Standard Wire Gauge)",
      "Insulation": "Polyesterimide / Polyamide-imide enamel",
      "Thermal Class": "Class 200°C",
      "Compliance": "IEC 60317 / NEMA MW 35-C",
      "Brand": "ElectroWire"
    },
    packagingDetails: "Wound on plastic spools (approx. 5-7kg per spool), packed in sturdy cartons.",
    shippingInfo: {
      port: "Tughlakabad ICD (Dry Port)",
      transitTime: "2-3 Business Days",
      methods: ["Express Parcel Service", "Surface Cargo"]
    },
    supplierProfile: {
      established: 1998,
      factorySize: "12,000 sq meters",
      employees: 95,
      description: "ElectroWire Industries has been a prominent name in manufacturing magnet wire, enamelled aluminum, and copper winding solutions for over 25 years.",
      certificates: ["ISO 9001:2015", "CE Compliant", "RoHS Certified"],
      factoryImages: ["/built for high/5.jpeg"]
    },
    reviews: [
      {
        id: "R-5",
        author: "Devendra N., Motor Rewinders",
        rating: 5,
        date: "2026-06-15",
        comment: "Excellent enamel coat. No breaks or thinning. Perfect for heavy duty rewinding.",
        verified: true,
        purchaseQty: "150 kg"
      }
    ]
  },
  {
    id: "PROD-1005",
    name: "3-Phase Distribution Transformer (100 KVA)",
    category: "Electronics & Electrical",
    industry: "Manufacturing",
    priceMin: 180000,
    priceMax: 210000,
    unit: "unit",
    moq: 1,
    location: "Chennai, Tamil Nadu",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    supplierName: "PowerGrid Equipments Co",
    supplierRating: 4.7,
    supplierType: "Manufacturer",
    tradeAssurance: true,
    gstVerified: true,
    msme: false,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 10,
    image: "/D2D market/5.jpeg",
    description: "Oil-cooled electrical distribution transformer with high efficiency, low core loss, low temperature rise, and robust short-circuit ride-through capacity.",
    gallery: ["/D2D market/5.jpeg", "/built for high/5.jpeg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Capacity": "100 KVA",
      "Type": "Oil Immersed ONAN",
      "Voltage Ratio": "11 KV / 433 V",
      "Frequency": "50 Hz",
      "Cooling Method": "Natural Oil (ONAN)",
      "Standard": "IS:2026 / BEE 3-Star Rating",
      "Brand": "PowerGrid"
    },
    packagingDetails: "Shipped fully assembled on heavy-duty wooden skids, oil packed separately in drums if requested.",
    shippingInfo: {
      port: "Chennai Port",
      transitTime: "8-12 Business Days",
      methods: ["Hydraulic Axle Trailer", "Heavy Cargo Logistics"]
    },
    supplierProfile: {
      established: 2008,
      factorySize: "38,000 sq meters",
      employees: 210,
      description: "PowerGrid Equipments Co specializes in high-voltage engineering, offering substation equipment, switches, and BEE rated distribution transformers.",
      certificates: ["ISO 9001:2015", "BEE Star Rated", "CPRI Tested", "ISO 14001"],
      factoryImages: ["/built for high/5.jpeg"]
    },
    reviews: [
      {
        id: "R-6",
        author: "Subramanian G., Power Projects Ltd",
        rating: 5,
        date: "2026-05-30",
        comment: "Excellent design, CPRI test report copies provided. Passed onsite insulation tests cleanly.",
        verified: true,
        purchaseQty: "2 units"
      }
    ]
  },
  {
    id: "PROD-1006",
    name: "Hydraulic Gear Pump (High Pressure)",
    category: "Machinery & Tools",
    industry: "Manufacturing",
    priceMin: 4500,
    priceMax: 5200,
    unit: "piece",
    moq: 10,
    location: "Pune, Maharashtra",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    supplierName: "FluidPower Hydraulics",
    supplierRating: 4.5,
    supplierType: "Exporter",
    tradeAssurance: true,
    gstVerified: true,
    msme: true,
    isoCertified: false,
    readyStock: true,
    deliveryTime: 4,
    image: "/D2D market/6.jpeg",
    description: "External gear hydraulic pump engineered for heavy machinery, agricultural tractor attachments, earthmoving equipment, and industrial power packs.",
    gallery: ["/D2D market/6.jpeg", "/built for high/7.jpeg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Displacement": "25 cc/rev",
      "Max Pressure": "250 Bar (Continuous)",
      "Max Speed": "3000 RPM",
      "Mounting Flange": "SAE 2-Bolt Standard",
      "Port Connections": "Split Flange / Threaded ports",
      "Brand": "FluidPower"
    },
    packagingDetails: "Individually boxed in corrugated boxes with foam inserts.",
    shippingInfo: {
      port: "JNPT Port, Mumbai",
      transitTime: "3-5 Business Days",
      methods: ["Road Truck Transport", "Air Cargo (For rush orders)"]
    },
    supplierProfile: {
      established: 2012,
      factorySize: "14,000 sq meters",
      employees: 65,
      description: "FluidPower Hydraulics manufactures high-quality gear pumps, valves, and cylinders. Exporting to 15+ countries worldwide.",
      certificates: ["CE Mark", "MSME Registered Udyam", "ISO 9001 Candidate"],
      factoryImages: ["/built for high/7.jpeg"]
    },
    reviews: [
      {
        id: "R-7",
        author: "Vikas D., AgroMachinery Corp",
        rating: 4.5,
        date: "2026-06-11",
        comment: "Excellent volumetric efficiency. Works perfectly on our tractor front-loader attachments.",
        verified: true,
        purchaseQty: "40 pieces"
      }
    ]
  },
  {
    id: "PROD-1007",
    name: "Caustic Soda Flakes (99% Purity)",
    category: "Chemicals & Plastics",
    industry: "Manufacturing",
    priceMin: 42,
    priceMax: 48,
    unit: "kg",
    moq: 1000,
    location: "Vadodara, Gujarat",
    city: "Vadodara",
    state: "Gujarat",
    country: "India",
    supplierName: "Gujarat Chem-Corp",
    supplierRating: 4.3,
    supplierType: "Exporter",
    tradeAssurance: false,
    gstVerified: true,
    msme: false,
    isoCertified: true,
    readyStock: false,
    deliveryTime: 6,
    image: "/D2D market/7.jpg",
    description: "Premium sodium hydroxide (NaOH) flakes. Extensively utilized in soap manufacturing, paper pulp, textile processing, and chemical synthesis.",
    gallery: ["/D2D market/7.jpg", "/D2D market/3.jpg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Purity (NaOH)": "99.0% Minimum",
      "Form": "White crystalline flakes",
      "Sodium Carbonate (Na2CO3)": "0.4% Maximum",
      "Sodium Chloride (NaCl)": "0.03% Maximum",
      "Heavy Metals (Pb)": "10 ppm Maximum",
      "Brand": "GCC Chemicals"
    },
    packagingDetails: "25 kg woven PP bags with internal PE liner, UV protected.",
    shippingInfo: {
      port: "Hazira Port, Surat",
      transitTime: "5-7 Business Days",
      methods: ["Full Truckload (FTL) Road Shipping", "Containerized Train Cargo"]
    },
    supplierProfile: {
      established: 2002,
      factorySize: "45,000 sq meters",
      employees: 180,
      description: "Gujarat Chem-Corp is a key manufacturer and bulk exporter of industrial alkalis, acids, and raw organic compounds to chemical buyers worldwide.",
      certificates: ["ISO 9001:2015", "ISO 14001:2015", "Reach Registered (EU)"],
      factoryImages: ["/D2D market/3.jpg"]
    },
    reviews: [
      {
        id: "R-8",
        author: "Mehta Soaps & Detergents",
        rating: 4,
        date: "2026-05-05",
        comment: "Consistent purity. Ideal saponification results. Packed carefully to prevent absorption of moisture.",
        verified: true,
        purchaseQty: "5,000 kg"
      }
    ]
  },
  {
    id: "PROD-1008",
    name: "Organic Cotton Yarn (Ne 30s Carded)",
    category: "Textile & Apparel",
    industry: "Agriculture",
    priceMin: 260,
    priceMax: 290,
    unit: "kg",
    moq: 500,
    location: "Coimbatore, Tamil Nadu",
    city: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    supplierName: "TexWeave Mills India",
    supplierRating: 4.7,
    supplierType: "Wholesaler",
    tradeAssurance: true,
    gstVerified: true,
    msme: true,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 8,
    image: "/D2D market/8.jpg",
    description: "100% GOTS certified organic carded cotton yarn, ideal for knitting and weaving export-grade garments, bedsheets, and household textiles.",
    gallery: ["/D2D market/8.jpg", "/built for high/4.jpeg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Composition": "100% Organic Cotton",
      "Yarn Count": "Ne 30s",
      "Type": "Single Carded for Knitting / Weaving",
      "Certification": "GOTS (Global Organic Textile Standard)",
      "Twist Direction": "Z-Twist",
      "Brand": "TexWeave Organic"
    },
    packagingDetails: "Wound on paper cones, packed in PP bags (approx. 45-50kg per bag) or export cartons.",
    shippingInfo: {
      port: "Tuticorin Port",
      transitTime: "6-8 Business Days",
      methods: ["Road Truck Transport", "Sea Freight Container"]
    },
    supplierProfile: {
      established: 2011,
      factorySize: "32,000 sq meters",
      employees: 280,
      description: "TexWeave Mills India is a sustainability-focused textile producer producing GOTS yarns, organic knitted fabrics, and apparel trims for export markets.",
      certificates: ["GOTS Certified", "OEKO-TEX Standard 100", "ISO 9001:2015", "MSME Registered"],
      factoryImages: ["/built for high/4.jpeg"]
    },
    reviews: [
      {
        id: "R-9",
        author: "Arun K., EcoKnits Tamil Nadu",
        rating: 5,
        date: "2026-06-03",
        comment: "Excellent yarn strength and uniformity. Ideal for our circular knitting machines. GOTS certificate provided promptly.",
        verified: true,
        purchaseQty: "2,000 kg"
      }
    ]
  },
  {
    id: "PROD-1009",
    name: "Double-Wall Corrugated Packaging Boxes",
    category: "Packaging & Paper",
    industry: "Manufacturing",
    priceMin: 18,
    priceMax: 25,
    unit: "piece",
    moq: 5000,
    location: "Noida, Uttar Pradesh",
    city: "Noida",
    state: "Uttar Pradesh",
    country: "India",
    supplierName: "PackWell Carton Solutions",
    supplierRating: 4.5,
    supplierType: "Manufacturer",
    tradeAssurance: true,
    gstVerified: true,
    msme: true,
    isoCertified: false,
    readyStock: true,
    deliveryTime: 3,
    image: "/built for high/1.jpeg",
    description: "Heavy-duty 5-ply corrugated cardboard boxes. Features superior crush resistance, ideal for shipping and warehouse storage of heavy industrial products.",
    gallery: ["/built for high/1.jpeg", "/built for high/6.jpeg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Board Type": "5-Ply Double Wall Corrugated",
      "Flute Configuration": "BC Flute",
      "Dimensions (L x W x H)": "450 x 300 x 300 mm (Customizable)",
      "Bursting Strength": "14 to 16 Kg/cm²",
      "Material": "Kraft Paper (150-180 GSM outer/liners)",
      "Brand": "PackWell"
    },
    packagingDetails: "Bundled flat (100 pieces per bundle), wrapped in plastic strapping.",
    shippingInfo: {
      port: "ICD Dadri / Delhi",
      transitTime: "2-4 Business Days",
      methods: ["Road Truck Delivery (Tempo / LCV)"]
    },
    supplierProfile: {
      established: 2016,
      factorySize: "15,000 sq meters",
      employees: 60,
      description: "PackWell Carton Solutions is an advanced corrugated packaging plant utilizing automatic high-speed board lines to supply industrial packaging globally.",
      certificates: ["MSME Udyog Aadhaar", "GST Verified Firm"],
      factoryImages: ["/built for high/6.jpeg"]
    },
    reviews: [
      {
        id: "R-10",
        author: "Pradeep S., Logistics Head",
        rating: 4.5,
        date: "2026-06-20",
        comment: "Extremely strong boxes. We use them for shipping auto-parts. No structural failures under stacking.",
        verified: true,
        purchaseQty: "10,000 pieces"
      }
    ]
  },
  {
    id: "PROD-1010",
    name: "Industrial Protective Safety Helmet",
    category: "Machinery & Tools",
    industry: "Infrastructure",
    priceMin: 150,
    priceMax: 180,
    unit: "piece",
    moq: 100,
    location: "Kolkata, West Bengal",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    supplierName: "Suraksha Safety Gears",
    supplierRating: 4.8,
    supplierType: "Wholesaler",
    tradeAssurance: true,
    gstVerified: true,
    msme: false,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 2,
    image: "/built for high/2.jpeg",
    description: "IS:2925 certified high-density polyethylene (HDPE) shell safety helmet. Comes with adjustable suspension headband and chin strap.",
    gallery: ["/built for high/2.jpeg", "/built for high/8.jpeg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Standard Compliance": "IS:2925 (Bureau of Indian Standards)",
      "Material": "High-Density Polyethylene (HDPE)",
      "Suspension": "4-Point adjustable webbing",
      "Venting": "Non-vented (electric shock hazard protection)",
      "Color Options": "Yellow, White, Blue, Red",
      "Brand": "Suraksha Gears"
    },
    packagingDetails: "Individually packed in polythene bags, 40 pieces per outer carton.",
    shippingInfo: {
      port: "Kolkata Port (Netaji Subhas Dock)",
      transitTime: "2-3 Business Days",
      methods: ["Road Transport", "Express Parcel Service"]
    },
    supplierProfile: {
      established: 2001,
      factorySize: "20,000 sq meters",
      employees: 140,
      description: "Suraksha Safety Gears is a major dealer and distributor of Personal Protective Equipment (PPE) representing top safety brands.",
      certificates: ["ISO 9001:2015", "BIS Licence Holder", "GST Registered"],
      factoryImages: ["/built for high/8.jpeg"]
    },
    reviews: [
      {
        id: "R-11",
        author: "Kalyan B., Construction Safety Officer",
        rating: 5,
        date: "2026-06-08",
        comment: "Excellent build. The ratchet suspension is very smooth to adjust. High quality HDPE shell.",
        verified: true,
        purchaseQty: "500 pieces"
      }
    ]
  },
  {
    id: "PROD-1011",
    name: "Linear Alkyl Benzene Sulfonic Acid (LABSA 90%)",
    category: "Chemicals & Plastics",
    industry: "Manufacturing",
    priceMin: 110,
    priceMax: 125,
    unit: "kg",
    moq: 500,
    location: "Surat, Gujarat",
    city: "Surat",
    state: "Gujarat",
    country: "India",
    supplierName: "Western Chemical Labs",
    supplierRating: 4.2,
    supplierType: "Manufacturer",
    tradeAssurance: false,
    gstVerified: true,
    msme: true,
    isoCertified: false,
    readyStock: false,
    deliveryTime: 5,
    image: "/built for high/3.jpeg",
    description: "Anionic surfactant paste extensively used for manufacturing household detergent powders, washing cakes, industrial cleaning solutions, and liquid soaps.",
    gallery: ["/built for high/3.jpeg", "/built for high/7.jpeg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Active Matter (LABSA)": "90.0% Minimum",
      "Free Oil (Unsulfonated)": "1.5% Maximum",
      "Free Sulfuric Acid": "5.0% Maximum",
      "Color (Klett, 5% AM)": "50 Maximum",
      "Appearance": "Brown viscous paste/liquid",
      "Brand": "WestChem LABSA"
    },
    packagingDetails: "210 kg HDPE drums, tightly sealed, or bulk ISO tanks.",
    shippingInfo: {
      port: "Hazira Port, Surat",
      transitTime: "4-5 Business Days",
      methods: ["Chemical Tanker Truck", "Barrel Logistics"]
    },
    supplierProfile: {
      established: 2013,
      factorySize: "22,000 sq meters",
      employees: 75,
      description: "Western Chemical Labs manufactures high-demand anionic surfactants, sulfonated oils, and detergent raw materials for global distributors.",
      certificates: ["ISO 9001:2015", "MSME Registration", "GST Registered"],
      factoryImages: ["/built for high/7.jpeg"]
    },
    reviews: [
      {
        id: "R-12",
        author: "Vardhaman Detergents",
        rating: 4,
        date: "2026-05-18",
        comment: "Excellent active percentage. Negligible free sulfuric acid, which is critical for pH balance in our liquid formulations.",
        verified: true,
        purchaseQty: "2,000 kg"
      }
    ]
  },
  {
    id: "PROD-1012",
    name: "Polyester Sewing Thread Spools",
    category: "Textile & Apparel",
    industry: "Manufacturing",
    priceMin: 8,
    priceMax: 12,
    unit: "spool",
    moq: 10000,
    location: "Ludhiana, Punjab",
    city: "Ludhiana",
    state: "Punjab",
    country: "India",
    supplierName: "ThreadKing India",
    supplierRating: 4.6,
    supplierType: "Exporter",
    tradeAssurance: true,
    gstVerified: true,
    msme: true,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 4,
    image: "/built for high/4.jpeg",
    description: "High-tenacity spun polyester sewing thread. Ideal for high-speed multi-needle B2B sewing machines. Excellent heat and chemical resistance.",
    gallery: ["/built for high/4.jpeg", "/built for high/8.jpeg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Material": "100% Spun Polyester",
      "Thread Size": "40s/2 (Tex 27)",
      "Standard Length": "5000 Yards per spool",
      "Tenacity": "1050 cN minimum",
      "Color Fastness": "Grade 4.5 minimum",
      "Brand": "ThreadKing"
    },
    packagingDetails: "Individually wrapped spools, 10 spools per box, 100 spools per master shipping carton.",
    shippingInfo: {
      port: "Ludhiana Dry Port (ICD)",
      transitTime: "3-5 Business Days",
      methods: ["Road Express Cargo"]
    },
    supplierProfile: {
      established: 2004,
      factorySize: "28,000 sq meters",
      employees: 190,
      description: "ThreadKing India is an export-certified spinning mill specializing in industrial-grade threads, cotton yarns, and elastic bands.",
      certificates: ["OEKO-TEX Certified", "ISO 9001:2015", "MSME Registered"],
      factoryImages: ["/built for high/8.jpeg"]
    },
    reviews: [
      {
        id: "R-13",
        author: "Nitesh Garments Ludhiana",
        rating: 5,
        date: "2026-06-25",
        comment: "Zero breakage at high speed (7000 stitches/min). Colors are highly consistent. Excellent lubricant coating.",
        verified: true,
        purchaseQty: "15,000 spools"
      }
    ]
  },
  {
    id: "PROD-1013",
    name: "Commercial LED Panel Lights (24W)",
    category: "Electronics & Electrical",
    industry: "Infrastructure",
    priceMin: 320,
    priceMax: 360,
    unit: "piece",
    moq: 50,
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    supplierName: "Lumina Lighting Systems",
    supplierRating: 4.5,
    supplierType: "Wholesaler",
    tradeAssurance: true,
    gstVerified: true,
    msme: true,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 3,
    image: "/built for high/5.jpeg",
    description: "Energy-efficient recessed LED panel lights with slim profile, high lumen output, and longer lifespan. Suitable for commercial workspaces and showrooms.",
    gallery: ["/built for high/5.jpeg", "/built for high/1.jpeg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Wattage": "24 Watts",
      "Luminous Efficacy": "100 Lm/W (2400 Lumens total)",
      "Shape": "Square (2x2 Feet layout size)",
      "Color Temp": "6500K (Cool Daylight)",
      "Driver Specifications": "Constant-current isolated IC driver",
      "Brand": "Lumina LED"
    },
    packagingDetails: "Each panel in a padded cardboard envelope, 10 envelopes per master crate.",
    shippingInfo: {
      port: "JNPT Mumbai",
      transitTime: "2-4 Business Days",
      methods: ["Road Truck Logistics", "Air Express"]
    },
    supplierProfile: {
      established: 2018,
      factorySize: "16,000 sq meters",
      employees: 55,
      description: "Lumina Lighting Systems is a recognized distributor and wholesaler of enterprise lighting, smart panels, and solar components.",
      certificates: ["ISO 9001:2015", "BIS Certified Driver", "MSME Registered"],
      factoryImages: ["/built for high/1.jpeg"]
    },
    reviews: [
      {
        id: "R-14",
        author: "TechPark Maintenance Co",
        rating: 4.5,
        date: "2026-05-14",
        comment: "Fitted 200 of these in our new IT center block. High brightness, zero flicker, very clean diffusers.",
        verified: true,
        purchaseQty: "100 pieces"
      }
    ]
  },
  {
    id: "PROD-1014",
    name: "Biodegradable Bubble Wrap Roll",
    category: "Packaging & Paper",
    industry: "Manufacturing",
    priceMin: 650,
    priceMax: 720,
    unit: "roll",
    moq: 20,
    location: "Ahmedabad, Gujarat",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    supplierName: "EcoPack India Pvt Ltd",
    supplierRating: 4.7,
    supplierType: "Manufacturer",
    tradeAssurance: true,
    gstVerified: true,
    msme: true,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 4,
    image: "/built for high/6.jpeg",
    description: "Environment-friendly green biodegradable bubble wrap roll for B2B shockproof packaging, cushioning protection, and secure fragile item shipping.",
    gallery: ["/built for high/6.jpeg", "/built for high/1.jpeg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Material": "Oxo-Biodegradable LDPE",
      "Roll Length": "100 Meters",
      "Roll Width": "1.2 Meters (4 Feet)",
      "Bubble Diameter": "10mm",
      "Thickness": "80 Microns",
      "Brand": "EcoPack"
    },
    packagingDetails: "Packed as bulk rolls wrapped in clear protective LDPE stretch film.",
    shippingInfo: {
      port: "Kandla Port",
      transitTime: "3-5 Business Days",
      methods: ["Road Lorry Delivery"]
    },
    supplierProfile: {
      established: 2017,
      factorySize: "21,000 sq meters",
      employees: 90,
      description: "EcoPack India manufactures biodegradable mailing sleeves, eco-wrap boxes, and sugarcane fiber packaging elements to support circular commerce.",
      certificates: ["ASTM D6400 Biodegradable Certification", "ISO 14001:2015", "MSME Registration"],
      factoryImages: ["/built for high/1.jpeg"]
    },
    reviews: [
      {
        id: "R-15",
        author: "Anjali M., GreenCart Logistics",
        rating: 5,
        date: "2026-06-19",
        comment: "Excellent bubble strength. Doesn't pop under heavy package stacking. Customer feedback on green packing is very positive.",
        verified: true,
        purchaseQty: "40 rolls"
      }
    ]
  },
  {
    id: "PROD-1015",
    name: "Mild Steel Flanges (ANSI B16.5)",
    category: "Machinery & Tools",
    industry: "Infrastructure",
    priceMin: 450,
    priceMax: 600,
    unit: "piece",
    moq: 50,
    location: "Pune, Maharashtra",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    supplierName: "Maharashtra Steel Forge",
    supplierRating: 4.4,
    supplierType: "Exporter",
    tradeAssurance: true,
    gstVerified: true,
    msme: false,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 6,
    image: "/built for high/7.jpeg",
    description: "Precision-machined forged steel flanges for connecting piping systems, valves, pumps, and other pipeline equipment in high-pressure oil/gas facilities.",
    gallery: ["/built for high/7.jpeg", "/built for high/3.jpeg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Standard": "ANSI/ASME B16.5",
      "Pressure Class": "Class 150 / 300 / 600",
      "Material Grade": "ASTM A105 Mild Steel",
      "Type": "Slip-on / Weld Neck / Blind Flange",
      "Size Range": "1/2 Inch to 24 Inch",
      "Brand": "MSF Forge"
    },
    packagingDetails: "Layered inside wooden boxes, coated with anti-rust oil and plastic capped.",
    shippingInfo: {
      port: "JNPT Port, Mumbai",
      transitTime: "4-6 Business Days",
      methods: ["Road Flatbed Trailer", "Container Cargo"]
    },
    supplierProfile: {
      established: 2007,
      factorySize: "40,000 sq meters",
      employees: 240,
      description: "Maharashtra Steel Forge manufactures high-tolerance flanges, pipe fittings, elbows, and heavy-walled carbon steel forgings for refinery piping systems.",
      certificates: ["ISO 9001:2015", "PED certified (EU)", "IBR Certificate Holder"],
      factoryImages: ["/built for high/3.jpeg"]
    },
    reviews: [
      {
        id: "R-16",
        author: "Siddharth K., PetroPipes India",
        rating: 4.5,
        date: "2026-05-24",
        comment: "Coated with clear varnish to prevent rust. Dimensional tolerances match ASME specs perfectly.",
        verified: true,
        purchaseQty: "120 pieces"
      }
    ]
  },
  {
    id: "PROD-1016",
    name: "Industrial Safety Leather Hand Gloves",
    category: "Machinery & Tools",
    industry: "Infrastructure",
    priceMin: 45,
    priceMax: 60,
    unit: "pair",
    moq: 500,
    location: "Kolkata, West Bengal",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    supplierName: "Suraksha Safety Gears",
    supplierRating: 4.7,
    supplierType: "Wholesaler",
    tradeAssurance: true,
    gstVerified: true,
    msme: false,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 2,
    image: "/built for high/8.jpeg",
    description: "Premium cow split safety leather hand gloves. Extra thick palm support providing high abrasion and puncture safety during heavy industrial welding/handling.",
    gallery: ["/built for high/8.jpeg", "/built for high/2.jpeg"],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    specifications: {
      "Material": "A-Grade Split Cowhide Leather",
      "Lining": "Soft cotton flannel lining",
      "Stitching": "Kevlar thread reinforced seams",
      "Cuff Type": "Safety rubberized gauntlet cuff",
      "Standard Compliance": "EN388 (4244X Protection level)",
      "Brand": "Suraksha Gears"
    },
    packagingDetails: "12 pairs bundle wrapped in polythene, 120 pairs per heavy carton box.",
    shippingInfo: {
      port: "Kolkata Port",
      transitTime: "2-4 Business Days",
      methods: ["Road Express Delivery", "Railway Freight"]
    },
    supplierProfile: {
      established: 2001,
      factorySize: "20,000 sq meters",
      employees: 140,
      description: "Suraksha Safety Gears is a major manufacturer and distributor of personal protective products and compliance industrial leatherware.",
      certificates: ["ISO 9001:2015", "EN388 Standards Compliant", "GST Compliance Certificate"],
      factoryImages: ["/built for high/2.jpeg"]
    },
    reviews: [
      {
        id: "R-17",
        author: "Manoj T., Steel Workshop Manager",
        rating: 5,
        date: "2026-06-14",
        comment: "Kevlar thread prevents stitching failure during heavy welding. Soft lining makes it comfortable for full shift wear.",
        verified: true,
        purchaseQty: "1,000 pairs"
      }
    ]
  }
];
