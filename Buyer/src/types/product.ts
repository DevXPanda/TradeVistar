export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  purchaseQty: string;
}

export interface ShippingInfo {
  port: string;
  transitTime: string;
  methods: string[];
}

export interface SupplierProfile {
  established: number;
  factorySize: string;
  employees: number;
  description: string;
  certificates: string[];
  factoryImages: string[];
}

export interface ProductType {
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
  gallery: string[];
  videoUrl?: string;
  specifications: Record<string, string>;
  packagingDetails: string;
  shippingInfo: ShippingInfo;
  supplierProfile: SupplierProfile;
  reviews: Review[];
}
