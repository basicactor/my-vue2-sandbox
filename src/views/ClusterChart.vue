<template>
  <div>
    <h1>hello</h1>
    <div ref="chartRef" class="white" style="height: 100vh" />
    <v-pagination
      v-model="page"
      :length="maxPagingNum"
      @input="drawClusterMap"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "@vue/composition-api"
import { Node, Network, Edge } from "vis-network"

const originData: Array<{ query: string; cid: number }> = [
  ...Array(200),
].reduce((pv, cv, idx) => {
  let cid = pv.slice(-1)[0]?.cid ?? 0 //初期値は空配列で要素取得するとundefinedになるため0を設定する
  cid = idx % 10 ? cid : cid + 1 //n個以上になったらcidを１上げる
  return [...pv, { query: `test${idx + 1}`, cid }]
}, [])

//本家のData型を使うと、nodesとedgesを使うときに毎回分岐処理が走るため、型を独自定義する
type DataNodeEdge = {
  nodes: Array<Node>
  edges: Array<Edge>
}

export default defineComponent({
  setup() {
    const chartRef = ref()
    const page = ref(1)
    const maxPagingNum = computed(() => chunkedLists.length) //最大ページ数

    //全てのnodesとedgesを持つオブジェクト配列
    const baseDataNodeEdge: Array<DataNodeEdge> = originData
      .reduce(
        (pv: Array<DataNodeEdge>, cv, idx) => {
          if (idx === 0) return pv
          const obj =
            pv[cv.cid] ||
            (pv[cv.cid] = {
              nodes: [] as Array<Node>,
              edges: [] as Array<Edge>,
            })
          obj.nodes.push({
            id: idx + 1,
            label: cv.query,
            group: `${cv.cid}`, //cidをgroup分け用に使用
          } as Node)

          const groupNodeId = obj.nodes[0].id //グループの1番目要素のID
          obj.edges.push({
            //fromとtoのIDが同じ場合は、fromにrootを指定する
            from: groupNodeId === idx + 1 ? "root" : groupNodeId,
            to: idx + 1,
          } as Edge)
          return pv
        },
        [] //初期オブジェクト配列
      )
      .filter((i: DataNodeEdge) => i) //filterすることで、配列一番目要素のemptyを排除する。
    console.log("baseDataNodeEdge", baseDataNodeEdge)

    //配列をN個ごとに分割する
    const chunkArray = (array: Array<any>, num: number) => {
      return array.reduce(
        (pv, _, idx) => (idx % num ? pv : [...pv, array.slice(idx, idx + num)]),
        []
      )
    }

    //各配列のnodesとedgesを各々統合する
    const combineDataNodeEdgeByGroup = (
      array: Array<DataNodeEdge>
    ): DataNodeEdge => {
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
    const chunkedLists = chunkArray(baseDataNodeEdge, 10).map(
      (i: Array<DataNodeEdge>) => combineDataNodeEdgeByGroup(i)
    )
    console.log("chunkedLists", chunkedLists)

    //初期画面表示時＋ページ変更時に発火。
    //ページindexに合ったデータを取り出し、new netWorkする。
    const drawClusterMap = (pageNumber = 1): void => {
      const rootNode: Array<Node> = [{ id: "root", label: "root" }]

      const nodes: Array<Node> = rootNode.concat(
        chunkedLists[pageNumber - 1].nodes
      )
      const edges: Array<Edge> = chunkedLists[pageNumber - 1].edges

      // console.log("nodes", nodes)
      // console.log("edges", edges)

      new Network(chartRef.value, { nodes, edges }, {})
    }

    onMounted(() => {
      drawClusterMap()
    })

    return { chartRef, page, maxPagingNum, drawClusterMap }
  },
})
</script>
