"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  listOrdersQueryParams,
  getOrderByIdParams,
} from "@/app/openApi/generated/zod/orders/orders";
import {
  useListOrders,
  useGetOrderById,
} from "@/app/openApi/generated/api/orders/orders";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

type ListParams = z.infer<typeof listOrdersQueryParams>;
type IdParams = z.infer<typeof getOrderByIdParams>;

export default function OrderQuerySamplePage() {
  // 全体取得用
  const [listParams, setListParams] = useState<ListParams>();

  const { control, handleSubmit, reset } = useForm<ListParams>({
    resolver: zodResolver(listOrdersQueryParams),
    defaultValues: {},
  });

  const listQuery = useListOrders(listParams, {
    // 要検討
    query: {
      select: (data) => data.data,
    },
  });

  const onListSubmit = (data: ListParams) => {
    setListParams(data);
  };

  // 個別取得用
  const [orderId, setOrderId] = useState<number>();

  const {
    register: registerId,
    handleSubmit: handleIdSubmit,
    reset: resetId,
  } = useForm<IdParams>({
    resolver: zodResolver(getOrderByIdParams),
    defaultValues: { orderId: undefined },
  });

  const orderQuery = useGetOrderById(orderId ?? 0, {
    // 要検討
    query: {
      select: (data) => data.data,
    },
  });

  const onIdSubmit = (data: IdParams) => {
    setOrderId(data.orderId);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>注文一覧 (list)</h2>

      <form
        onSubmit={handleSubmit(onListSubmit)}
        style={{ display: "flex", gap: 8, alignItems: "center" }}
      >
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Dropdown
              value={field.value}
              options={[
                // { label: "", value: "" },
                { label: "PENDING", value: "PENDING" },
                { label: "SHIPPED", value: "SHIPPED" },
                { label: "DELIVERED", value: "DELIVERED" },
                { label: "CANCELLED", value: "CANCELLED" },
              ]}
              onChange={(e) =>
                field.onChange(e.value === "" ? undefined : e.value)
              }
              // placeholder="-- status --"
              showClear
              style={{ minWidth: 180 }}
            />
          )}
        />

        <Controller
          name="minAmount"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                field.onChange(v === "" ? undefined : Number(v));
              }}
              placeholder="minAmount"
              type="number"
            />
          )}
        />

        <Controller
          name="maxAmount"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                field.onChange(v === "" ? undefined : Number(v));
              }}
              placeholder="maxAmount"
              type="number"
            />
          )}
        />

        <Button type="submit" label="検索" />
        <Button
          type="button"
          label="全件表示"
          onClick={() => {
            setListParams(undefined);
            reset();
          }}
        />
      </form>

      <div style={{ marginTop: 12 }}>
        {listQuery.isLoading && <div>loading...</div>}
        {listQuery.isError && <div style={{ color: "red" }}>error</div>}
        {listQuery.data && (
          <DataTable
            id="id"
            value={listQuery.data}
            paginator
            rows={10}
            emptyMessage="no records"
          >
            <Column field="id" header="ID" sortable />
            <Column field="status" header="Status" sortable />
            <Column field="totalAmount" header="Total" sortable />
          </DataTable>
        )}
      </div>

      <hr style={{ margin: "24px 0" }} />

      <h2>注文個別取得 (get by id)</h2>
      <form
        onSubmit={handleIdSubmit(onIdSubmit)}
        style={{ display: "flex", gap: 8, alignItems: "center" }}
      >
        <input
          {...registerId("orderId", { valueAsNumber: true })}
          placeholder="orderId"
          type="number"
        />
        <Button type="submit" label="取得" />
        <Button
          label="クリア"
          type="button"
          onClick={() => {
            setOrderId(undefined);
            resetId();
          }}
        />
      </form>

      <div>
        {orderId === undefined && <div>orderId を入力して取得してください</div>}
        {orderId !== undefined && orderQuery.isLoading && <div>loading...</div>}
        {orderId !== undefined && orderQuery.isError && (
          <div style={{ color: "red" }}>error</div>
        )}
        {orderId !== undefined && orderQuery.data && (
          <div>
            <div>id: {orderQuery.data.id}</div>
            <div>status: {orderQuery.data.status}</div>
            <div>totalAmount: {orderQuery.data.totalAmount}</div>
            <div>items: {(orderQuery.data.items || []).join(", ")}</div>
          </div>
        )}
      </div>
    </div>
  );
}
