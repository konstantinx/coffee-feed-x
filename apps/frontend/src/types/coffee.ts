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
