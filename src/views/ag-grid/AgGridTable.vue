<template>
  <MainWapper>
    <ag-grid-vue
      style="width: 800px; height: 600px"
      class="ag-theme-alpine"
      :grid-options="gridOptions"
    />
  </MainWapper>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import "ag-grid-enterprise"
import { AgGridVue } from "ag-grid-vue"
import { GridOptions, ColDef, PostSortRowsParams } from "ag-grid-community"
import MainWapper from "@/layouts/MainWrapper.vue"

export default defineComponent({
  components: {
    AgGridVue,
    MainWapper,
  },
  setup() {
    //全カラムに適用される設定
    const defaultColDef: ColDef = {
      resizable: true, //カラム幅変更可能ON
      filter: true, //フィルター機能ON
      floatingFilter: true, //フィルターを下段に表示
      sortable: true,
    }

    // const doCustomSort = (): number => {
    //   console.log("doCustomSort called")

    //   rowData.sort((a, b) => b.gold - a.gold)
    //   gridOptions.api?.setRowData(rowData)
    //   return 0
    // }

    //個別カラム定義
    const columnDefs: Array<ColDef> = [
      { field: "sport", rowGroup: true, hide: true },
      {
        field: "gold",
        // comparator: () => doCustomSort(),
        //  (valueA, valueB, nodeA, nodeB, isDescending) => {
        //   console.log("valueA: ", valueA) //次の値
        //   console.log("valueB: ", valueB) //現在
        //   console.log("nodeA: ", nodeA) //次の値
        //   console.log("nodeB: ", nodeB) //現在

        //   rowData.sort((a, b) => b.gold - a.gold)
        //   console.log("rowData", rowData)

        //   //多分方法としては、グループ内のグループIDとmaxとminを取得する。
        //   //降順の場合：maxが一番高いグループ順に並べる
        //   //昇順の場合：minが一番低いグループ順に並べる
        //   return valueA - valueB
        // },
      },
      { field: "year" },
    ]

    //行データ
    const rowData = ref([
      { sport: "swimming", gold: 1, year: 1991 },
      { sport: "swimming", gold: 2, year: 1992 },
      { sport: "swimming", gold: 3, year: 1993 },
      { sport: "tennis", gold: 4, year: 1994 },
      { sport: "tennis", gold: 5, year: 1995 },
      { sport: "tennis", gold: 6, year: 1996 },
    ])

    const autoGroupColumnDef = {
      headerName: "Sport",
      minWidth: 220,
      // comparator: (
      //   valueA: number,
      //   valueB: number,
      //   nodeA: object,
      //   nodeB: object,
      //   isDescending: boolean
      // ) => {
      //   console.log("valueA: ", valueA) //次の値
      //   console.log("valueB: ", valueB) //現在
      //   console.log("nodeA: ", nodeA) //次の値
      //   console.log("nodeB: ", nodeB) //現在

      //   return 0
      // },
      cellRendererParams: {
        suppressCount: true,
        // checkbox: true,
      },
    }

    const postSortRows = (params: PostSortRowsParams) => {
      //https://www.ag-grid.com/vue-data-grid/row-sorting/#post-sort
      const rowNodes = params.nodes
      // console.log("nodes", rowNodes) //グループの数＋１回呼ばれる

      //グループ情報が入っている要素の時のみ処理を実行する
      if (rowNodes.length > 0 && rowNodes[0].group === true) {
        console.log("this is grou@p", rowNodes)

        //このobjArrは基本的にrowDataと同じ。違いは、グループごとに配列ブロックで分れているところ。
        const objArr = rowNodes.map((i) => i.allLeafChildren.map((i) => i.data))
        console.log("objArr", objArr)

        //goldフィールド基準でソートする
        const sortedArray = objArr.sort((a, b) => b[0].gold - a[0].gold).flat()
        console.log("objArr sorted", sortedArray)

        rowData.value = sortedArray

        // gridOptions.api?.setRowData(sortedArray)
      }

      //グループを集めた配列では, group:true, rowGroupIndex:0, level:0となる
      // + allLeafChildrenとして、グループ内の配列を持っている。
      //   //多分方法としては、グループ内のグループIDとmaxとminを取得する。
      //   //降順の場合：maxが一番高いグループ順に並べる
      //   //昇順の場合：minが一番低いグループ順に並べる

      //グループ内データを集めた配列では, group:false, rowGroupIndex:1となる
    }
    //テーブル設定
    const gridOptions: GridOptions = {
      columnDefs,
      rowData: rowData.value,
      defaultColDef,
      groupDisplayType: "singleColumn",
      autoGroupColumnDef,
      groupDefaultExpanded: -1,
      postSortRows: (params) => postSortRows(params),
    }

    // const getDataAsync = async (): Promise<void> => {
    //   // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    //   //   .then((res) => res.json())
    //   //   .then((data) => {
    //   //     // rowData.value = data.slice(0, 10)
    //   //     gridOptions.api?.setRowData(data.slice(0, 50))
    //   //     console.log("rowData.value", rowData.value)
    //   //   })

    //   const sampleData = [
    //     { sport: "swimming", gold: 1, year: 1990 },
    //     { sport: "swimming", gold: 2, year: 2010 },
    //     { sport: "swimming", gold: 3, year: 2020 },
    //     { sport: "tennis", gold: 10, year: 2012 },
    //     { sport: "tennis", gold: 11, year: 2000 },
    //     { sport: "tennis", gold: 12, year: 2022 },
    //   ]
    //   // gridOptions.api?.setRowData(sampleData)
    // }

    // onBeforeMount(() => getDataAsync())

    return { gridOptions }
  },
})
</script>
