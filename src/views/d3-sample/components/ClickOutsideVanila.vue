<template>
  <MainWrapper>
    <div class="parent">
      <div id="target-child" />
    </div>
  </MainWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/composition-api"

export default defineComponent({
  setup() {
    onMounted(() => {
      document.addEventListener(
        "click",
        {
          handleEvent: (e: PointerEvent) => {
            //e.target.idとすると、idが存在しないと怒られるので、HTMLElemtn型として認識させる
            //参考：https://qiita.com/wamei/items/43753e03821964719f31
            const target = e.target as HTMLElement
            console.log("target", target)

            if (target.id === "target-child") {
              console.log("clicked inside")
            } else {
              console.log("clicked outeside")
            }
          },
        },
        false //第3引数（useCapture) 参考：https://note.affi-sapo-sv.com/js-addeventlistener-usecapture.php
      )
    })

    return {}
  },
})
</script>
<style lang="scss" scoped>
.parent {
  height: 600px;
  width: 600px;
  background-color: white;
  position: relative;
}
#target-child {
  height: 100px;
  width: 100px;
  background-color: #870000;
  position: absolute;
}
</style>
