<template>
  <div>
    <p><strong>{{ address.firstName }} {{ address.lastName }}</strong></p>
    <p v-if="address.company">{{ address.company }}</p>
    <p>{{ address.addressLine1 }}</p>
    <p v-if="address.addressLine2">{{ address.addressLine2 }}</p>
    <p>{{ city }}</p>
    <p>{{ address.countryName }}</p>
    <p>{{ address.phone }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserSavedAddress',

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
