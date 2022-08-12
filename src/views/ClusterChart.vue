<template>
  <div>
    <h1>hello</h1>
    <div ref="chartRef" class="white" style="height: 100vh" />
    <v-pagination v-model="page" :length="maxPagingNum" @input="onChagePage" />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "@vue/composition-api"
import { vis, Node, Network, DataSet } from "vis-network"

const originData = [...Array(30)].reduce((pv, cv, idx) => {
  let cid = pv.slice(-1)[0]?.cid ?? 0 //初期値は空配列で要素取得するとundefinedになるため0を設定する
  cid = idx % 5 ? cid : cid + 1 //n個以上になったらcidを１上げる
  return [...pv, { query: `test${idx + 1}`, cid }]
}, [])

export default defineComponent({
  setup() {
    const chartRef = ref()
    const page = ref(1)
    const maxPagingNum = computed(() => chunkedLists.length) //最大ページ数

    //全てのnodesとedgesを持つオブジェクト配列
    const baseDataSet = originData
      .reduce(
        (pv, cv, idx) => {
          if (idx === 0) return pv
          const obj = pv[cv.cid] || (pv[cv.cid] = { nodes: [], edges: [] })
          obj.nodes.push({
            id: idx + 1,
            label: cv.query,
            group: cv.cid, //cidをgroup分け用に使用
          })

          const groupNodeId = obj.nodes[0].id //グループの1番目要素のID
          obj.edges.push({
            //fromとtoのIDが同じ場合は、fromにrootを指定する
            from: groupNodeId === idx + 1 ? "root" : groupNodeId,
            to: idx + 1,
          })
          return pv
        },
        [] //初期オブジェクト配列
      )
      .filter((i) => i) //filterすることで、配列一番目要素のemptyを排除する。
    console.log("baseDataSet", baseDataSet)

    //配列をN個ごとに分割する
    const chunkArray = (array, num) => {
      return array.reduce(
        (pv, _, idx) => (idx % num ? pv : [...pv, array.slice(idx, idx + num)]),
        []
      )
    }

    //各配列のnodesとedgesを各々統合する
    const combineDataSetByGroup = (array) => {
      return array.reduce(
        (pv, cv) => {
          pv.nodes.push(...cv.nodes)
          pv.edges.push(...cv.edges)
          return pv
        },
        { nodes: [], edges: [] }
      )
    }

    //cid10個ずつ配列に分割し、配列内のnodesとedgesをまとめる
    const chunkedLists = chunkArray(baseDataSet, 10).map((i) =>
      combineDataSetByGroup(i)
    )
    console.log("chunkedLists", chunkedLists)

    //初期画面表示時＋ページ変更時に発火。
    //ページindexに合ったデータを取り出し、new netWorkする。
    const onChagePage = (pageNumber = 1) => {
      const rootNode = [{ id: "root", label: "root" }]

      const nodes = rootNode.concat(chunkedLists[pageNumber - 1].nodes)
      const edges = chunkedLists[pageNumber - 1].edges

      // console.log("nodes", nodes)
      // console.log("edges", edges)

      new Network(chartRef.value, { nodes, edges }, {})
    }

    onMounted(() => {
      onChagePage()
    })

    return { chartRef, page, maxPagingNum, onChagePage }
  },
})
</script>
