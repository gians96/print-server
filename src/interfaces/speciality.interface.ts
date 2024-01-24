export interface Specialty {
  id: number;
  name: string;
  description?: string;
  category?: string;
  price: number;
  type_commission: "percentage" | "money";
  commission: number;
  status: boolean;
}
