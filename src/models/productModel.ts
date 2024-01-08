export interface Product {
  name: string;
  value: string;
  type: string; // iphone, macbook, acessorios
  numberMei: string;
  state: "new" | "used";
  usageTime: string;
}
