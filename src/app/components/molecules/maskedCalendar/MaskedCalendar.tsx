"use client";

import React, { useState, useRef } from "react";
import { Calendar, CalendarDateTemplateEvent } from "primereact/calendar";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { Button } from "primereact/button";

interface MaskedCalendarProps {
  id: string;
}

/**
 * マスク対応したカスタムカレンダー
 * inputmask mask対応
 * calendar 参照用
 * button calendar_showと挙動が少し異なったためbutton_onclickを採用
 * 日付が選択されている場合のcalendar_showの挙動は、2度クリックしないといけない
 * @param param0
 * @returns
 */
const MaskedCalendar = ({ id }: MaskedCalendarProps) => {
  const [calendar, setCalendar] = useState<Date | null>(null);
  // マスクされた値を管理
  const [maskedValue, setMaskedValue] = useState<string>("");
  // Calendar の参照型
  const calendarRef = useRef<Calendar>(null);

  // 文字列をDate型に変換
  const parseDate = (value: string): Date | null => {
    if (!/^\d{4}\/\d{2}\/\d{2}$/.test(value)) return null; // 正しい形式でなければnull
    const [year, month, day] = value.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  // Date型を文字列に変換
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const y = date.getFullYear().toString();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    return `${y}/${m}/${d}`;
  };

  // eslint-disable-next-line
  const handleCalendarChange = (e: any) => {
    setCalendar(e.value);
    setMaskedValue(formatDate(e.value));
  };

  const handleMaskedChange = (e: InputMaskChangeEvent) => {
    if (e.value !== undefined && e.value !== null) {
      setMaskedValue(e.value);
      setCalendar(parseDate(e.value));
    }
  };

  /**
   * 無効な日付の場合、空白をセットする
   * @returns
   */
  const handleBlur = () => {
    if (!/^\d{4}\/\d{2}\/\d{2}$/.test(maskedValue)) return null;
    const [year, month, day] = maskedValue.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    // 月や日の範囲が正しいか、またその日が正しいかをチェック
    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      // 無効な日付
      setMaskedValue("");
    }
  };

  // 色を変更したときの値
  const specialDates = [new Date(2024, 11, 10), new Date(2024, 11, 25)];
  const isSpecialDate = (date: Date) => {
    return specialDates.some(
      (specialDate) =>
        date.getFullYear() === specialDate.getFullYear() &&
        date.getMonth() === specialDate.getMonth() &&
        date.getDate() === specialDate.getDate()
    );
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <InputMask
          id={id}
          value={maskedValue}
          onChange={handleMaskedChange}
          onBlur={handleBlur}
          mask="9999/99/99"
        />

        {/* 機能としてのみ利用したい */}
        <Calendar
          ref={calendarRef}
          value={calendar}
          yearNavigator
          monthNavigator
          yearRange="2020:2040"
          showOtherMonths={true} // 前後月の日付を表示
          selectOtherMonths={true} // 前後月の日付を選択可能にする
          disabledDays={[0, 6]} // 日曜と土曜を無効化
          onChange={handleCalendarChange}
          inputStyle={{ display: "none" }}
          appendTo="self"
          className="custom-calendar"
          dateTemplate={(dateMeta: CalendarDateTemplateEvent) => {
            const { day } = dateMeta;
            const date = new Date(dateMeta.year, dateMeta.month, day);

            return (
              <span
                className={`p-highlight ${isSpecialDate(date) ? "special-date" : ""}`}
              >
                {day}
              </span>
            );
          }}
        />
        <Button
          icon="pi pi-calendar"
          onClick={() => {
            calendarRef.current?.show();
            const inputMaskElement = document.getElementById(id);
            if (inputMaskElement) {
              inputMaskElement.focus();
            }
          }}
        />
      </div>
    </>
  );
};

export default MaskedCalendar;
