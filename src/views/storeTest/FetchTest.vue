<template>
  <div class="pa-10">
    <h2>ユーザー一覧</h2>
    <div v-for="user in state.users" :key="user.id">
      {{ user.id }}
      {{ user.name }}
    </div>

    <h2 class="mt-4">特定ユーザー</h2>
    <div>{{ state.user.id }}: {{ state.user.name }}</div>

    <h2 class="mt-4">投稿一覧</h2>
    <div v-for="post in state.posts" :key="post.id">
      {{ post.id }}: {{ post.title }}
    </div>
    <v-btn @click="sendPost">投稿</v-btn>
    <!-- <pre>{{ state.users }}</pre> -->
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, reactive } from "@vue/composition-api"
import { useFetchTest } from "@/store/vueUseFetchStore"
import { useAxiosFetch } from "@/store/axiosFetchStore"
// import { useRoute } from "@/plugins/router"

export default defineComponent({
  setup() {
    // const route = useRoute()
    const state = reactive({
      users: [],
      user: {},
      posts: [],
    })
    const vueUseFetchStore = useFetchTest()
    const axiosFetchStore = useAxiosFetch()

    //ここに、async-awaitを書くことで、ユーザーデータが描画される。
    onBeforeMount(async () => {
      // await Promise.all([
      //   // Promise.all：一つでも失敗すると、全体がrejectedになる。ただし、複数の失敗があっても最初のエラーキャッチされない。
      //   // Promise.allSettled: 成功失敗に関わらず各々の結果を返す。ただし、エラーをはかない。
      //   vueUseFetchStore.getUsersAsync(),
      //   vueUseFetchStore.getUserByIdAsync(route.params.id),
      //   vueUseFetchStore.getPostsAsync(),
      // ]).then((values) => console.log(values[1]))
      // await vueUseFetchStore.getUsersAsync()
      // state.users = vueUseFetchStore.users

      // await vueUseFetchStore.getUserByIdAsync(route.params.id)
      // state.user = vueUseFetchStore.user

      // await vueUseFetchStore.getPostsAsync()
      // state.posts = vueUseFetchStore.posts

      await axiosFetchStore.getUsersAsync()
      state.users = vueUseFetchStore.users
    })

    // onUpdated((e) => console.log("updated", e))

    const sendPost = () => {
      const newPost = {
        title: "foo",
        body: "bar",
        userId: 1,
      }
      vueUseFetchStore.sendtPostAsync(newPost)
    }

    console.log("hahha")

    return { state, sendPost }
  },
})
</script>
