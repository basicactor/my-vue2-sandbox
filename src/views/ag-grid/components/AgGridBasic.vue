<template>
  <ag-grid-vue
    style="width: 800px; height: 600px"
    class="ag-theme-alpine"
    :grid-options="gridOptions"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import "ag-grid-enterprise"
import { AgGridVue } from "ag-grid-vue"
import { GridOptions, ColDef, PostSortRowsParams } from "ag-grid-community"

export default defineComponent({
  components: {
    AgGridVue,
  },
  setup() {
    //全カラムに適用される設定
    const defaultColDef: ColDef = {
      resizable: true, //カラム幅変更可能ON
      filter: true, //フィルター機能ON
      // floatingFilter: true, //フィルターを下段に表示
      sortable: true,
      sortingOrder: ["asc", "desc"],
    }

    const currencyFormatter = (currency: number, sign: string): string => {
      //stringで受け取って、数値変換してからtoLocaleString()をすると、フィルターのequalでマッチしなくなるので、
      //引数は数値であるべき。
      const sansDec = currency.toLocaleString()
      // const formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return sansDec
      // return sign + `${formatted}`
    }

    //個別カラム定義
    const columnDefs: Array<ColDef> = [
      { field: "sport" },
      {
        field: "strNum",
        sort: "asc",
        // valueFormatterの戻り値を数字にすることは出来ない
        // valueFormatter: (params) => Number(params.data.strNum),

        //これで上手くソート出来るけど、これなら最初から全て数値に変換した方がいい。
        //⇒いや、最初から数値に変換した場合で、undefinedが含まれていた場合は、NaNと表示される
        //⇒comparatorを使っていれば空白で表示される
        comparator: (valueA, valueB) => Number(valueA) - Number(valueB),
      },
      { field: "numberF", filter: "agNumberColumnFilter" },
      // {
      //   field: "currency",
      //   valueFormatter: (params) =>
      //     currencyFormatter(params.data.currency, "$"),
      //   filter: "agNumberColumnFilter",
      // },
      {
        field: "currency",
        valueFormatter: (params) => params.data.currency.toLocaleString(),
        // currencyFormatter(params.data.currency, "$"),
        filter: "agNumberColumnFilter",
      },
    ]

    //行データ
    // const rowData = ref([
    //   { sport: "swimming", strNum: "1", numberF: 10, currency: "1000" },
    //   { sport: "swimming", strNum: "11", numberF: 20, currency: "2000" },
    //   { sport: "swimming", strNum: "2", numberF: 30, currency: "3000" },
    //   { sport: "tennis", strNum: "4", numberF: 40, currency: "4000" },
    //   { sport: "tennis", strNum: "5", numberF: 50, currency: "5000" },
    //   { sport: "tennis", strNum: "6", numberF: 60, currency: "6000" },
    // ])

    //currencyが数値
    const rowData = ref([
      { sport: "swimming", strNum: "1", numberF: 10, currency: 1000 },
      { sport: "swimming", strNum: "11", numberF: 20, currency: 2000 },
      { sport: "swimming", strNum: "2", numberF: 30, currency: 3000 },
      { sport: "tennis", strNum: "4", numberF: 40, currency: 4000 },
      { sport: "tennis", strNum: "5", numberF: 50, currency: 5000 },
      { sport: "tennis", strNum: "6", numberF: 60, currency: 6000 },
    ])

    //テーブル設定
    const gridOptions: GridOptions = {
      columnDefs,
      rowData: rowData.value,
      defaultColDef,
      groupDisplayType: "singleColumn",
      // autoGroupColumnDef,
      groupDefaultExpanded: -1,
      // postSortRows: (params) => postSortRows(params),
    }

    return { defaultColDef, columnDefs, rowData, gridOptions }
  },
})
</script>
