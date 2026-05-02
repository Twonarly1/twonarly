import { colord, extend } from "colord";
import lchPlugin from "colord/plugins/lch";

extend([lchPlugin]);

export type LchTuple = [number, number, number]; // [L, C, H]

export function hexToLch(hex: string): LchTuple {
  const { l, c, h } = colord(hex).toLch();
  return [l, c, h];
}

export function lchToHex(tuple: LchTuple): string {
  const [l, c, h] = tuple;
  return colord({ l, c, h }).toHex();
}
