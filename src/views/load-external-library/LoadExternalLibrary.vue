<template>
  <div>
    <p>load-library test</p>
    <div id="exscript" />

    <v-btn @click="getTokenAsync">get token</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/composition-api"

type CardInfo = {
  cardno: number
  expire: number // YYYYMM or YYMM
  holdername: string
  securitycode: number
}

type TokenResult = {
  resultCode: `000` | number
  tokenObject: {
    isSecurityCodeSet: boolean | string
    maskedCardNo: string
    toBeExpiredAt: string
    token: string
  }
}

declare const Multipayment: {
  init: (apiKey: string) => void
  getToken: (creditCard: CardInfo, callback: () => any) => TokenResult
}

export default defineComponent({
  setup() {
    const executePayment = () => {
      console.log("executed")
    }

    // const multipayment = new Multipayment()
    // Multipayment.init("tshop00038278")

    const cardInfo = {
      cardno: 12345678977777,
      expire: 202507, // YYYYMM or YYMM
      holdername: "test taro",
      securitycode: 123,
    }

    const getTokenAsync = async () => {
      console.log("get token async called")
      // Multipayment.getToken(cardInfo, executePayment)
    }

    //index.htmlに書いて置かないと、runtime errorがでる。（Multipayment is not defiend)
    // const loadLibraryAsync = async () => {
    //   const scriptEl = document.createElement("script")
    //   scriptEl.setAttribute(
    //     "src",
    //     "https://stg.static.mul-pay.jp/ext/js/token.js"
    //   )
    //   document.getElementById("exscript")?.appendChild(scriptEl)
    // }

    onMounted(async () => {
      // await loadLibraryAsync()
      Multipayment.init("some number")
    })
    return { getTokenAsync }
  },
})
</script>
