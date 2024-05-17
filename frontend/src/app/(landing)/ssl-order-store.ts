import { create } from 'zustand';
import { Order, OrderFormSchemaType } from './common';

type SSLOrderStore = {
  request: OrderFormSchemaType | null;
  order: Order | null;
  setRequest: (request: OrderFormSchemaType | null) => void;
  setOrder: (order: Order | null) => void;
};

export const useSSLOrderStore = create<SSLOrderStore>()((set) => ({
  request: null,
  order: null,
  setRequest: (request) => set((state) => ({ request })),
  setOrder: (order) => set((state) => ({ order })),
}));
