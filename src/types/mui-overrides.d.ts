// src/types/mui-overrides.d.ts
import '@mui/x-data-grid';

declare module '@mui/x-data-grid' {
  interface GridFilterModel {
    items: GridFilterItem[];
    logicOperator?: GridLogicOperator;
    quickFilterLogicOperator?: GridLogicOperator;
    quickFilterValues?: any[];
  }
}