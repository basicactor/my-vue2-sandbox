<template>
  <MainWrapper>
    <div style="height: 600px; background-color: green">
      <v-tabs>
        <v-tab>タブ１</v-tab>
        <v-tab>タブ２</v-tab>
        <v-tab-item style="height: 100%">
          <div class="parent">
            <div
              :style="[
                objStyle,
                { top: `${objState.top}px`, left: `${objState.left}px` },
              ]"
              @mousedown="onMousedown"
              @mousemove="onMousemove"
              @mouseup="onMouseup"
              @mouseleave="onMouseup"
            />
          </div>
        </v-tab-item>
        <v-tab-item> タブ２ </v-tab-item>
      </v-tabs>
    </div>
    <!-- <pre>{{ objState }}</pre> -->
  </MainWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api"

export default defineComponent({
  setup() {
    const objStyle = reactive({
      height: "100px",
      width: "100px",
      "background-color": "#870000",
      position: "absolute",
    })

    const objState = reactive({
      top: 0,
      left: 0,
      isMousedown: false,
      shiftX: 0,
      shiftY: 0,
    })

    //https://ja.javascript.info/mouse-drag-and-drop
    //https://gxy-life.com/2PC/PC/PC20220213.html
    const onMousedown = (e: MouseEvent) => {
      objState.isMousedown = true
      console.log("onMousedown")

      objState.shiftX = e.pageX - objState.left
      objState.shiftY = e.pageY - objState.top
    }
    const onMousemove = (e: MouseEvent) => {
      if (!objState.isMousedown) return

      objState.top = e.pageY - objState.shiftY
      objState.left = e.pageX - objState.shiftX
    }
    const onMouseup = () => {
      objState.isMousedown = false
      console.log("onMouseup")
    }

    return {
      objStyle,
      objState,
      onMousedown,
      onMousemove,
      onMouseup,
    }
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
</style>
