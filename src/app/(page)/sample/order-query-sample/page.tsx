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
  replaceOrderBody,
  updateOrderPartiallyBody,
} from "@/app/openApi/generated/zod/orders/orders";
import { createOrderBody } from "@/app/openApi/generated/zod/orders/orders";
import {
  useListOrders,
  useGetOrderById,
  useReplaceOrder,
  useDeleteOrder,
  useUpdateOrderPartially,
} from "@/app/openApi/generated/api/orders/orders";
import { useCreateOrder } from "@/app/openApi/generated/api/orders/orders";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

type ListParams = z.infer<typeof listOrdersQueryParams>;
type IdParams = z.infer<typeof getOrderByIdParams>;
type CreateOrder = z.infer<typeof createOrderBody>;
type ReplaceOrder = z.infer<typeof replaceOrderBody>;
type UpdateOrderPartially = z.infer<typeof updateOrderPartiallyBody>;

// ---------------------------------------------------------
// 更新・削除用コンポーネント
// ---------------------------------------------------------
function OrderActionForm({
  order,
  onActionSuccess,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  order: any;
  onActionSuccess: () => void;
}) {
  const replaceMutation = useReplaceOrder();
  const deleteMutation = useDeleteOrder();

  const { control, handleSubmit } = useForm<ReplaceOrder>({
    resolver: zodResolver(replaceOrderBody),
    defaultValues: {
      status: order.status,
      totalAmount: order.totalAmount,
      items: order.items,
    },
  });

  // 更新処理
  const onUpdate = (data: ReplaceOrder) => {
    replaceMutation.mutate(
      { orderId: order.id, data: data },
      {
        onSuccess: () => {
          alert("更新に成功しました");
          onActionSuccess();
        },
      }
    );
  };

  // 削除処理
  const onDelete = () => {
    if (!confirm("本当に削除しますか？")) return;
    deleteMutation.mutate(
      { orderId: order.id },
      {
        onSuccess: () => {
          alert("削除に成功しました");
          onActionSuccess();
        },
      }
    );
  };

  const patchMutation = useUpdateOrderPartially();

  const { control: patchControl, handleSubmit: handlePatchSubmit } =
    useForm<UpdateOrderPartially>({
      resolver: zodResolver(updateOrderPartiallyBody),
      defaultValues: { status: order.status, couponCode: order.couponCode },
    });

  // 部分更新処理
  const onPatch = (data: UpdateOrderPartially) => {
    patchMutation.mutate(
      { orderId: order.id, data },
      {
        onSuccess: () => {
          alert("部分更新に成功しました");
          onActionSuccess();
        },
      }
    );
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 12,
        marginTop: 12,
        borderRadius: 8,
      }}
    >
      <h3>注文 ID: {order.id} の操作</h3>
      <form
        onSubmit={handleSubmit(onUpdate)}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div>
          <label>Status: </label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Dropdown
                value={field.value}
                options={[
                  { label: "PENDING", value: "PENDING" },
                  { label: "SHIPPED", value: "SHIPPED" },
                  { label: "DELIVERED", value: "DELIVERED" },
                  { label: "CANCELLED", value: "CANCELLED" },
                ]}
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />
        </div>

        <div>
          <label>Total: </label>
          <Controller
            name="totalAmount"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <Button
            type="submit"
            label="更新 (PUT)"
            severity="info"
            loading={replaceMutation.isPending}
          />
          <Button
            type="button"
            label="削除 (DELETE)"
            severity="danger"
            onClick={onDelete}
            loading={deleteMutation.isPending}
          />
        </div>
      </form>

      <h4>部分更新 (PATCH)</h4>
      <form
        onSubmit={handlePatchSubmit(onPatch)}
        style={{ display: "flex", gap: 8, alignItems: "center" }}
      >
        <Controller
          name="status"
          control={patchControl}
          render={({ field }) => (
            <Dropdown
              value={field.value}
              options={[
                { label: "PENDING", value: "PENDING" },
                { label: "SHIPPED", value: "SHIPPED" },
                { label: "DELIVERED", value: "DELIVERED" },
                { label: "CANCELLED", value: "CANCELLED" },
              ]}
              onChange={(e) => field.onChange(e.value)}
            />
          )}
        />
        <Controller
          name="couponCode"
          control={patchControl}
          render={({ field }) => (
            <input
              {...field}
              value={field.value ?? ""}
              placeholder="Coupon Code"
              onChange={(e) => field.onChange(e.target.value || null)}
            />
          )}
        />
        <Button
          type="submit"
          label="一部更新 (PATCH)（ステータスとクーポンコード）"
          severity="warning"
          loading={patchMutation.isPending}
        />
      </form>
    </div>
  );
}

function CreateOrderForm() {
  const { control, handleSubmit, reset } = useForm<CreateOrder>({
    resolver: zodResolver(createOrderBody),
    defaultValues: { items: [], couponCode: undefined, totalAmount: undefined },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [created, setCreated] = useState<any>(null);

  const createMutation = useCreateOrder();

  const onSubmit = (data: CreateOrder) => {
    createMutation.mutate(
      { data: data },
      {
        onSuccess: (res) => {
          setCreated(res.data);
          reset();
        },
      }
    );
  };

  return (
    <div style={{ marginTop: 12 }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Controller
          name="items"
          control={control}
          render={({ field }) => (
            <input
              value={(field.value || []).join(", ")}
              onChange={(e) => {
                const v = e.target.value;
                const arr =
                  v === ""
                    ? []
                    : v
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean);
                field.onChange(arr);
              }}
              placeholder="items (comma separated)"
              style={{ minWidth: 240 }}
            />
          )}
        />

        <Controller
          name="couponCode"
          control={control}
          render={({ field }) => (
            <input
              placeholder="couponCode (optional)"
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value === "" ? undefined : e.target.value
                )
              }
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          )}
        />

        <Controller
          name="totalAmount"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              placeholder="totalAmount"
              type="number"
            />
          )}
        />

        <Button type="submit" label="登録" />
        <Button
          type="button"
          label="リセット"
          onClick={() => {
            reset();
            setCreated(null);
          }}
        />
      </form>

      <div style={{ marginTop: 12 }}>
        {createMutation.isPending && <div>creating...</div>}
        {createMutation.isError && <div style={{ color: "red" }}>error</div>}
        {created && (
          <div>
            登録に成功しました:
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(created, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

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

      <CreateOrderForm />

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

      <div>
        {orderId === undefined && <div>orderId を入力して取得してください</div>}
        {orderId !== undefined && orderQuery.isLoading && <div>loading...</div>}
        {orderId !== undefined && orderQuery.isError && (
          <div style={{ color: "red" }}>error</div>
        )}
        {orderId !== undefined && orderQuery.data && (
          <OrderActionForm
            order={orderQuery.data}
            onActionSuccess={() => {
              orderQuery.refetch(); // データを再取得
              listQuery.refetch(); // 一覧も更新
            }}
          />
        )}
      </div>
    </div>
  );
}
