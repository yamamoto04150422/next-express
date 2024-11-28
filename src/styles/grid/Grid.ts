"use client";

import { styled } from "styled-components";

const defaultColumnGap = "8px";
const defaultRownGap = "4px";
const BREAKPOINT = 768;

const DEFAULT_COLUMN = {
  pc: {
    label: "1 / 5",
    input: "5 / 10",
  },
  tablet: {
    label: "1 / 8",
    input: "8 / 20",
  },
  repeat: "repeat(24, 1fr)",
};

export const COLUMN_POSITIONS = {
  pc: {
    leftlargeInputWidth: "5 / 18",
    leftMaxInputWidth: "5 / 23",
    rightLabelWidth: "13 / 17",
    rightInputWidth: "17 / 22",
  },
  /**
   * gridのカラムの指定により、
   * エラーメッセージを全文表示したい場合に折り返してしまう現象を防ぐ
   * エラーメッセージを表示したいgrid columnの指定をする
   * 「使用幅」と「未使用幅」を計算
   * @param pcStart gridColumnの開始位置 PC用
   * @param pcEnd gridColumnの終了位置 PC用
   * @param tabletStart gridColumnの開始位置 tablet
   * @param tabletEnd gridColumnの終了位置 tablet
   * @returns
   */
  getGridWidth: (
    pcStart: number = 5,
    pcEnd: number = 13,
    tabletStart: number = 8,
    tabletEnd: number = 22
  ) => {
    // ウィンドウサイズを動的に変更したいならカスタムフックに移行
    const isTablet = window.innerWidth <= BREAKPOINT;

    const currentStart = isTablet ? tabletStart : pcStart;
    const currentEnd = isTablet ? tabletEnd : pcEnd;

    // カラム範囲の幅（%）を計算
    const gridWidth = ((currentEnd - currentStart) * 100) / 24;
    // 全体幅-使用している幅
    // 負の値にする理由は指定幅から残り幅分だけ左に寄せるため
    return -`${100 - gridWidth}` + "%";
  },
  // tablet: {},
};

interface GridProps {
  $columnGap?: string;
  $rowGap?: string;
}

// props.$repeatColumns || DEFAULT_COLUMN.repeat};
export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${DEFAULT_COLUMN.repeat};
  column-gap: ${(props) => props.$columnGap || defaultColumnGap};
  row-gap: ${defaultRownGap};
`;

interface GridItemProps {
  // デフォルトcolumnのlabel/inputの判定で使用
  $isLabel: boolean;
  $column?: string;
  $tabletColumn?: string;
  // タブレット時のエラー表示順で使用
  $tabletRow?: string; // タブレット用の行番号
}

/**
 * PC時はprops.$columnの値があれば使用
 * 未定義の場合はデフォルト値を使用
 *
 * タブレット
 * props.$tabletColumnの値があれば使用
 * 未定義の場合はprops.$isLabelを参照しデフォルト値を設定
 */
export const GridItem = styled.div<GridItemProps>`
  grid-column: ${(props) =>
    props.$column ||
    (props.$isLabel ? DEFAULT_COLUMN.pc.label : DEFAULT_COLUMN.pc.input)};
  display: flex;
  align-items: center;
  /* align-items: flex-start; */
  /* アイテムを縦方向で上揃え */
  /* justify-content: flex-start;*/
   /* アイテムを横方向で左揃え */

  @media (max-width: ${BREAKPOINT}px) {
    grid-column: ${(props) =>
      props.$tabletColumn ||
      (props.$isLabel
        ? DEFAULT_COLUMN.tablet.label
        : DEFAULT_COLUMN.tablet.input)};
        grid-row: ${(props) => props.$tabletRow || "auto"}; // $tabletRowが優先
    }
  }
`;

/**
 * １行表示の<p>タグを使用だが
 * ２行表示の際に以下のタグを使用する
 * １行表示と高さを調整することが目的
 */
export const CenteredSpan = styled.span`
  display: inline-flex; /* インラインフレックスに設定 */
  flex-direction: column; /* 縦方向に配置 */
  justify-content: center; /* 縦方向に中央揃え */
  align-items: center; /* 横方向に中央揃え */
  height: 100%; /* 親要素の高さに合わせる */
`;

// interface GridItemErrorProps {
//   $column: string;
//   $tabletColumn?: string;
//   // タブレット時のエラー表示順で使用
//   $tabletRow?: string;
// }

// /**
//  * エラーメッセージ用
//  * タブレットのcolumnは固定
//  */
// export const GridItemError = styled.div<GridItemErrorProps>`
//   grid-column: ${props => props.$column};
//   display: flex;
//   align-items: center;

//   @media (max-width: ${BREAKPOINT}px) {
//     grid-column: ${props => props.$tabletColumn || "8 / 25"};
//     grid-row: ${props => props.$tabletRow || "auto"};
//   }
// `;

// レイアウトコンテナ
export const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: row; /* デフォルトは横並び */

  @media (max-width: ${BREAKPOINT}px) {
    flex-direction: column; /* ブレイクポイント以下で縦並び */
  }
`;

// 各セクションのスタイル
export const Section = styled.div<{ isLeft?: boolean }>`
  flex: 1;
  padding: 10px;
  box-sizing: border-box;

  @media (max-width: ${BREAKPOINT}px) {
    border: none; /* 縦並び時は境界線を解除 */
  }
`;
