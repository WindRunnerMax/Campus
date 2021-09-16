<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    onLaunch() {
        console.log("App Launch");
    },
    onShow() {
        console.log("App Show");
    },
    onHide() {
        console.log("App Hide");
    },
});
</script>

<style lang="scss">
@import "@/components/styles/asse.css";
@import "@/components/styles/asse.scss";
@import "@/components/styles/iconfont.css";
</style>
