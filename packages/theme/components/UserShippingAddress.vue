<template>
  <div>
    <p><strong>{{ address.firstname }} {{ address.lastname }}</strong></p>
    <p v-if="address.company">{{ address.company }}</p>
    <p>
      {{ address.address1 }}
      <br />
      {{ address.address2 }}
      <br />
      {{ city }}
      <br>
      {{ address.country_name }}
    </p>
    <p>{{ address.phone }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserShippingAddress',

  props: {
    address: {
      default: {},
      type: Object
    }
  },

  computed: {
    city() {
      if (this.address.state) {
        return `${this.address.zipcode} ${this.address.city}, ${this.address.state}`
      }

      return `${this.address.zipcode} ${this.address.city}`
    }
  }
};
</script>
