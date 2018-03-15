<template>
  <div>
    <div style="overflow:auto;position:relative">
      <mu-refresh-control :refreshing="refreshing" :trigger="list" @refresh="refresh"/>
      <div class="list-container" ref="list">
        <mu-list>
          <div>
            <mu-sub-header>2108-01-01</mu-sub-header>
            <mu-list-item title="" describeText="东方融资网">
              <div><span style="color:black">总:1000位</span>/<span style="color:green">成功:50位</span>/<span style="color:red">失败:50位</span></div>
              <mu-avatar slot='left' :size="32" src="/static/img/rongzi_logo.png"
                         backgroundColor="transparent"></mu-avatar>
            </mu-list-item>
            <mu-list-item title="" describeText="你我贷">
              <div><span style="color:black">总:1000位</span>/<span style="color:green">成功:50位</span>/<span style="color:red">失败:50位</span></div>
              <mu-avatar slot='left' :size="32" src="/static/img/niwodai_logo.png"
                         backgroundColor="transparent"></mu-avatar>
            </mu-list-item>
            <mu-list-item title="" describeText="好贷">
              <div><span style="color:black">总:1000位</span>/<span style="color:green">成功:50位</span>/<span style="color:red">失败:50位</span></div>
              <mu-avatar slot='left' :size="32" src="/static/img/haodai_logo.png"
                         backgroundColor="transparent"></mu-avatar>
            </mu-list-item>
          </div>
          <mu-divider></mu-divider>
          <div>
            <mu-sub-header>2108-01-02</mu-sub-header>
            <mu-list-item title="" describeText="东方融资网">
              <div><span style="color:black">总:1000位</span>/<span style="color:green">成功:50位</span>/<span style="color:red">失败:50位</span></div>
              <mu-avatar slot='left' :size="32" src="/static/img/rongzi_logo.png"
                         backgroundColor="transparent"></mu-avatar>
            </mu-list-item>
            <mu-list-item title="" describeText="你我贷">
              <div><span style="color:black">总:1000位</span>/<span style="color:green">成功:50位</span>/<span style="color:red">失败:50位</span></div>
              <mu-avatar slot='left' :size="32" src="/static/img/niwodai_logo.png"
                         backgroundColor="transparent"></mu-avatar>
            </mu-list-item>
            <mu-list-item title="" describeText="好贷">
              <div><span style="color:black">总:1000位</span>/<span style="color:green">成功:50位</span>/<span style="color:red">失败:50位</span></div>
              <mu-avatar slot='left' :size="32" src="/static/img/haodai_logo.png"
                         backgroundColor="transparent"></mu-avatar>
            </mu-list-item>
          </div>
        </mu-list>
        <mu-infinite-scroll :scroller="list" :loading="loading" @load="loadMore"/>
      </div>
    </div>
    <mu-toast style="margin-left:10%;width: 80%;bottom:80px" v-if="isHintShow" :message="hint" @close="hideHint"/>
  </div>
</template>

<style>
  .list-container {
    overflow: hidden;
  }
</style>

<script>


  export default {
    data() {
      return {
        isHintShow: false,
        hint: '',
        refreshing: false,
        loading: false,
        list: null
      }
    },
    methods: {
      refresh() {
        let self = this;
        this.refreshing = true;

        setTimeout(() => self.refreshing = false, 5000);
      },
      loadMore() {

      },
      showHint(strHint) {
        this.hint = strHint;
        this.isHintShow = true;
        if (this.hintTimer) clearTimeout(this.hintTimer);
        this.hintTimer = setTimeout(() => {
          this.isHintShow = false;
        }, 50000)
      },
      hideHint() {
        this.isHintShow = false;
        if (this.hintTimer) clearTimeout(this.hintTimer);
      },
    },
    mounted() {
      this.list = this.$refs.list;
    }
  }
</script>
