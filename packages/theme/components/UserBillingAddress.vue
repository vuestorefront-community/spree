<template>
  <div>
    <p><strong>{{ address.firstName }} {{ address.lastName }}</strong></p>
    <p v-if="address.company">{{ address.company }}</p>
    <p>
      {{ address.addressLine1 }}
      <br />
      {{ address.addressLine2 }}
      <br />
      {{ city }}
      <br>
      {{ address.countryName }}
    </p>
    <p>{{ address.phone }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserBillingAddress',

  props: {
    address: {
      default: {},
      type: Object
    }
  },

  computed: {
    city() {
      if (this.address.state) {
        return `${this.address.postalCode} ${this.address.city}, ${this.address.state}`;
      }

      return `${this.address.postalCode} ${this.address.city}`;
    }
  }
};
</script>
