export interface RandomApiCoffee {
  id: number;
  uid: string;
  blend_name: string;
  origin: string;
  variety: string;
  notes: string;
  intensifier: string;
}

export interface Coffee {
  id: number;
  uid: string;
  blendName: string;
  origin: string;
  variety: string;
  notes: string[];
  intensifier: string;
  imageUrl?: string;
}
