export type ProductItem = {
  id: string;
  slug: string;
  name: string;
  description: string;
  pricePerKg: number;
  unit?: "kg" | "dona";
  category?: "chicken" | "spicy" | "combo" | "drinks";
  isSpicy: boolean;
  imageUrl: string;
  badge?: string;
  portionTime?: string;
  calories?: string;
  rating?: number;
};

export type CartItem = {
  product: ProductItem;
  weightKg: number;
  totalPrice: number;
  notes?: string;
};

export type OrderType = "PICKUP" | "DELIVERY" | "EVENT";

export type PaymentMethod = "CASH" | "OPERATOR_CONFIRMED" | "CLICK" | "PAYME";

export type OrderStatus =
  | "NEW"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface CheckoutFormData {
  fullName: string;
  phoneNumber: string;
  orderType: OrderType;
  deliveryAddress?: string;
  latitude?: number;
  longitude?: number;
  distanceKm?: number;
  eventDate?: string;
  guestCount?: number;
  notes?: string;
  paymentMethod: PaymentMethod;
}
