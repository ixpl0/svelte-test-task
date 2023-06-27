export interface CoffeeResponse {
  id: number;
  uid: string;
  blend_name: string;
  origin: string;
  variety: string;
  notes: string;
  intensifier: string;
}

export interface Coffee extends CoffeeResponse {
  img: string;
}
