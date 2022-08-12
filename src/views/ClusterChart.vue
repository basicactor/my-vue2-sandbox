<template>
  <div>
    <h1>hello</h1>
    <div ref="chartRef" class="white" style="height: 100vh" />
    <v-pagination v-model="page" :length="10" @input="onChagePage" />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/composition-api"
import { vis, Node, Network } from "vis-network"

const originData = [...Array(100)].reduce((pv, cv, idx) => {
  let cid = pv.slice(-1)[0]?.cid ?? 0 //初期値は空配列で要素取得するとundefinedになるため0を設定する
  cid = idx % 5 ? cid : cid + 1 //n個以上になったらcidを１上げる
  return [...pv, { query: `test${idx + 1}`, cid }]
}, [])
console.log("originData", originData)

export default defineComponent({
  setup() {
    const chartRef = ref()
    const page = ref(1)

    // const nodes = []
    // // const edges = []

    // originData.forEach((i, index) => {
    //   //1. 初めてのcidの場合は、新たな配列を作る＝＞
    //   //[{nodes: [{id:1, label,group:1} x group10個分], edges: [from:"cid", to:自分]}]
    //   //2. cidが既に存在する場合は、既存の配列に追加する
    //   //3. cidごとに作られた配列の数が10個になったら、次の配列に移行する
    //   const node = {
    //     id: index + 1,
    //     label: i.query,
    //     group: i.cid,
    //   }

    //   nodes.push(node)
    // })

    //全てのnodesとedgesを持つオブジェクト配列
    const baseDataSet = originData.reduce(
      (pv, cv, idx) => {
        const obj = pv[cv.cid] || (pv[cv.cid] = { nodes: [], edges: [] })
        // lastStep: cidが10個溜まったら、nodes配列とedges配列にそれぞれpushして、次の配列に移る。
        const { nodes, edges } = obj
        nodes.push({
          id: idx + 1,
          label: cv.query,
          group: cv.cid,
        })

        const groupNodeId = nodes[0].id //グループの1番目要素のID
        //fromとtoのIDが同じ場合は、edgeオブジェクトを生成しない。
        edges.push({
          from: groupNodeId === idx + 1 ? "root" : groupNodeId,
          to: idx + 1,
        })
        return pv
      },
      [{ nodes: [], edges: [] }] //初期オブジェクト配列
    )
    console.log("baseDataSet", baseDataSet)

    //配列をN個ごとに分割する
    const chunkArray = (array, num) => {
      return array.reduce(
        (pv, _, idx) => (idx % num ? pv : [...pv, array.slice(idx, idx + num)]),
        []
      )
    }
    const chunkedLists = chunkArray(baseDataSet, 10).map((i) =>
      i.reduce(
        (pv, cv, idx) => {
          pv.nodes.push(...cv.nodes)
          pv.edges.push(...cv.edges)
          return pv
        },
        { nodes: [], edges: [] }
      )
    )
    console.log("chunkedLists", chunkedLists)

    // const groupBy = (array, pName) => {
    //   return array.reduce((pv, cv, index, src) => {
    //     const key = src[pName]
    //     ;(pv[key] || (pv[key] = [])).push(cv)
    //     return pv
    //   }, {})
    // }

    // const groupedNode = groupBy(nodes, "group")
    // console.log("groupedNode", groupedNode)

    const onChagePage = (pageNumber = 1) => {
      const rootNode = [{ id: "root", label: "root" }]

      const nodes = rootNode.concat(chunkedLists[pageNumber - 1].nodes)
      const edges = chunkedLists[pageNumber - 1].edges

      console.log("nodes", nodes)

      console.log("edges", edges)

      new Network(chartRef.value, { nodes, edges }, {})
    }

    onMounted(() => {
      onChagePage()
    })

    return { chartRef, page, onChagePage }
  },
})
</script>
