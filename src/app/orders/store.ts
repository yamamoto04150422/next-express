import { Order, OrderCreateRequest, OrderPartialUpdate } from "@/app/openApi/generated/api/orderAndUserManagementAPI.schemas";

type OrderStore = {
  list: () => Order[];
  get: (id: number) => Order | undefined;
  create: (payload: OrderCreateRequest) => Order;
  replace: (id: number, payload: Order) => Order | undefined;
  patch: (id: number, payload: OrderPartialUpdate) => Order | undefined;
  delete: (id: number) => boolean;
};

const orders: Order[] = [];
let currentId = 1;

export const getOrderStore = (): OrderStore => {
  const list = () => orders;

  const get = (id: number) => orders.find((o) => o.id === id);

  const create = (payload: OrderCreateRequest): Order => {
    const order: Order = {
      id: currentId++,
      items: payload.items,
      totalAmount: payload.totalAmount,
      status: "PENDING",
    };
    orders.push(order);
    return order;
  };

  const replace = (id: number, payload: Order): Order | undefined => {
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return undefined;

    const next: Order = {
      ...payload,
      id,
    };
    orders[index] = next;
    return next;
  };

  const patch = (
    id: number,
    payload: OrderPartialUpdate
  ): Order | undefined => {
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return undefined;
    const existing = orders[index];
    const next: Order = {
      ...existing,
      ...payload,
      id,
    };
    orders[index] = next;
    return next;
  };

  const remove = (id: number) => {
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return false;
    orders.splice(index, 1);
    return true;
  };

  return {
    list,
    get,
    create,
    replace,
    patch,
    delete: remove,
  };
};

