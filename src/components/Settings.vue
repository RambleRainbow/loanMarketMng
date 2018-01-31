<template>
  <div>
    <div style="position:relative;overflow:auto">
      <mu-refresh-control :refreshing="refreshingConfig" :trigger="trigger" @refresh="refreshConfig"></mu-refresh-control>
      <mu-list>
        <mu-sub-header>通道设置</mu-sub-header>
        <mu-list-item v-for="(channel,index) in channels" :title="channel.name" :key="channel.id">
          <mu-switch v-model="channel.isOpen" slot="right" @input="changeChannel(channel.id,channel.isOpen)"/>
        </mu-list-item>
      </mu-list>
    </div>
    <mu-toast style="margin-left:10%;width: 80%;bottom:80px"v-if="isHintShow" :message="hint" @close="hideHint"/>
  </div>
</template>

<script>
  import _ from 'lodash';
  import axios from 'axios';

  let svrChannel = 'http://127.0.0.1:3000/channels'

  export default {
    data() {
      return {
        channels: [],
        refreshingConfig: false,
        trigger: null,

        isHintShow: false,
        hint: ""
      };
    },
    mounted() {
      this.trigger = this.$el;
      this.refreshConfig();
    },
    methods: {
      changeChannel(channelId, isOpen) {
        (async() => {
        try {
          let rtn = await axios({
            method: 'PATCH',
            url: svrChannel + '/' + channelId,
            data: {
              isOpen: isOpen
            }
          });
        }
        catch(err) {
          this.showHint('配置修改错误，请刷新后重试');
        }
        })();
      },
      showHint(strHint) {
        this.hint = strHint;
        this.isHintShow = true;
        if(this.hintTimer) clearTimeout(this.hintTimer);
        this.hintTimer = setTimeout(() => {this.isHintShow = false;}, 50000)
      },
      hideHint() {
        this.isHintShow = false;
        if(this.hintTimer) clearTimeout(this.hintTimer);
      },
      refreshConfig() {
        this.refreshingConfig = true;

        (async () => {
          try {
            let {data} = await axios({
              method: 'GET',
              url: svrChannel
            });
            this.channels = data;
            this.refreshingConfig = false;
          } catch (e) {
            this.showHint('配置更新错误，请刷新重试');
            this.refreshingConfig = false;
          }
        })();
      }
    }
  }
</script>
