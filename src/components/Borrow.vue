<template>
  <div>
    <mu-paper :rounded="true" :zDepth="3" style="padding:10px">
      <mu-text-field label="您所在的城市ID" v-model="cityid" hintText="6位城市代码" type="string" labelFloat :fullWidth="true" icon="location_on"/>
      <mu-text-field label="贷款额度" hintText="单位：万元，最高500万" :maxLength=3 type="number" :min=1 :max=500 v-model="amount" labelFloat :fullWidth="true" icon="credit_card"></mu-text-field>
      <div>
          <mu-text-field style="width:60%" label="您的称呼" v-model="name" labelFloat :fullWidth="true" icon="contacts"></mu-text-field>
          <mu-radio label="先生" name="group" nativeValue="1" v-model="gender" style="top:8px;margin-right:10px" />
          <mu-radio label="女士" name="group" nativeValue="0" v-model="gender" style="top:8px"/>
      </div>
      <mu-text-field label="您的手机号码" v-model="phone" hintText="11位手机号码" type="number" labelFloat :fullWidth="true" icon="phone"></mu-text-field>
      <mu-raised-button label="马上提交" @click="onRequestLoan" fullWidth primary></mu-raised-button>
    </mu-paper>
  </div>
</template>

<style>
  .mu-radio-icon{
    margin-right:2px;
  }
</style>

<script>
  export default {
    data() {
      return {
        cityid: '',
        amount: '',
        name: '',
        phone: '',
        gender: '1'
      }
    },
    methods: {
      onRequestLoan() {
        console.log(this.$data);
      }
    }
  }
</script>
