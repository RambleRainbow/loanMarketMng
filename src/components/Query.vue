<template>
  <div id="#query">
    <mu-date-picker v-model="dateQuery" icon="edit" label="查询日期" :labelFloat="true" hintText="请选择查询日期"
                    :fullWidth="true"/>
    <div class="list-container" ref="list">
      <mu-refresh-control :refreshing="refreshing" :trigger="list" @refresh="refresh"/>
      <mu-list ref="mm">
        <template v-for="loan in loans">
          <mu-list-item :title="loan.phone + ' ' + loan.name + ' ' + loan.city" :describeText="formatTime(loan.time) + ' ' + loan.amount + '万元'">
            <mu-icon :color="getGenderColor(loan.gender)"slot="left" value="person"></mu-icon>
            <mu-avatar slot="right" :size="24" src="/static/img/rongzi_logo.png" backgroundColor="transparent" :class="{ disable: !hasSuccessChannelTask(loan.tasks, 20)}"></mu-avatar>
            <mu-avatar slot="right" :size="24" src="/static/img/niwodai_logo.png" backgroundColor="transparent" :class="{ disable: !hasSuccessChannelTask(loan.tasks, 30)}"></mu-avatar>
            <mu-avatar slot="right" :size="24" src="/static/img/haodai_logo.png" backgroundColor="transparent" :class="{ disable: !hasSuccessChannelTask(loan.tasks, 10)}"></mu-avatar>
          </mu-list-item>
        </template>
      </mu-list>
      <mu-infinite-scroll :scroller="list" :loading="loading" @load="loadMore"/>
    </div>
    <mu-toast style="margin-left:10%;width: 80%;bottom:80px"v-if="isHintShow" :message="hint" @close="hideHint"/>
  </div>
</template>

<style>
  .mu-date-picker {
    height: 80px;
  }

  .list-container {
    height: calc(100% - 80px);
    overflow: scroll;
  }

  .mu-item.show-right {
    padding-right: 120px;
  }
  .mu-item.show-left {
    padding-left: 60px;
  }

  .mu-item-right {
    width: 120px;
  }

  .mu-date-picker{
    background-color:white;
    z-index: 100;
  }

  .mu-avatar {
    margin: 0 5px 0 5px;
  }

  .disable {
    filter: grayscale(1) opacity(0.5);
  }
</style>

<script>
  import moment from 'moment';
  import axios from 'axios';

  const svrLoans = 'http://127.0.0.1:3000/loans'

  export default {
    data() {
      return {
        dateQuery: moment().format('YYYY-MM-DD'),
        loans: [],

        list: null,
        refresher: null,
        loading: false,
        refreshing: false,

        isHintShow: false,
        hint: ''
      }
    },
    watch: {
      dateQuery: function (newValue, oldValue) {
        (async() => {
          await this.loadData();
        })();
      }
    },
    methods: {
      hasSuccessChannelTask(tasks, channelId) {
        let t = _.filter(tasks, it => {
          return it.channelid === channelId && it.state === 3
        }).length > 0;
        return t;
      },
      loadData()  {
        return (async() => {
          let res = await axios({
            method: 'GET',
            url: svrLoans,
            params: {
              filter: 'DATE',
              date: this.dateQuery,
              limit: 20
            }
          });
          this.loans = res.data;
          this.list.scrollTop = 0;
        })();
      },
      loadMore() {
        if(this.loading) {
          console.log('loading');
          return;
        }
        this.loading = true;
        (async () => {
          try{
            let res = await axios({
              method: 'GET',
              url: svrLoans,
              params: {
                filter: 'MINID',
                minid: this.loans[this.loans.length-1].id,
                limit:20
              }
            });
            this.loading = false;
            res.data.forEach(it => this.loans.push(it));
          }
          catch(err) {
            this.loading = false;
            this.showHint('数据读取错误，请刷新重试');
          }

        })();
      },
      refresh() {
        this.refreshing = true;
        (async() => {
          try {
            await this.loadData();
            this.refreshing = false;
          }
          catch(err) {
            this.refreshing = false;
            this.showHint('数据加载失败,请重试');
          }
        })();

      },
      formatTime(time) {
        return moment(time).format('HH:mm:ss');
      },
      getGenderColor(gender) {
        if(gender === '女士') {
          return '#FF72BA';
        }
        else {
          return '#69CDFF';
        }
      },
      showHint(strHint) {
        this.hint = strHint;
        this.isHintShow = true;
        if(this.hintTimer) clearTimeout(this.hintTimer);
        this.hintTimer = setTimeout(() => {this.isHintShow = false;}, 5000)
      },
      hideHint() {
        this.isHintShow = false;
        if(this.hintTimer) clearTimeout(this.hintTimer);
      },
    },
    mounted() {
      this.list = this.$refs.list;

      (async() => {
        await this.loadData();
      })();
    }
  }

</script>
