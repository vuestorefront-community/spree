<template>
  <SfSection :title-heading="title" class="section">
    <SfLoader :class="{ loading }" :loading="loading">
      <SfCarousel
        :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
        class="carousel"
      >
        <SfCarouselItem class="carousel__item" v-for="(product, i) in products" :key="i">
          <SfProductCard
            :title="productGetters.getName(product)"
            :image="productGetters.getCoverImage(product)"
            :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
            :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
            :max-rating="5"
            :score-rating="productGetters.getAverageRating(product)"
            :show-add-to-cart-button="true"
            :is-in-wishlist="isInWishlist({ product })"
            :is-added-to-cart="isInCart({ product })"
            :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
            :wishlist-icon="isWishlistDisabled ? false : undefined"
            class="product-card"
            @click:wishlist="handleWishlistClick(product)"
            @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
          />
        </SfCarouselItem>
      </SfCarousel>
    </SfLoader>
  </SfSection>
</template>

<script>
import {
  SfCarousel,
  SfProductCard,
  SfSection,
  SfLoader
} from '@storefront-ui/vue';
import { productGetters, useWishlist, useCart, useUser, wishlistGetters } from '@vue-storefront/spree';
import { computed } from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';

export default {
  name: 'RelatedProducts',
  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
    SfLoader
  },
  props: {
    title: String,
    products: Array,
    loading: Boolean
  },
  setup() {
    const { addItem: addItemToCart, isInCart } = useCart();
    const { wishlist, addItem: addItemToWishlist, isInWishlist, removeItem: removeItemFromWishlist } = useWishlist();
    const { isAuthenticated } = useUser();
    const { toggleLoginModal } = useUiState();

    const isWishlistDisabled = computed(() => wishlistGetters.isWishlistDisabled(wishlist.value));

    const handleWishlistClick = async (product) => {
      if (!isAuthenticated.value) {
        toggleLoginModal();
      } else if (!isInWishlist({ product })) {
        await addItemToWishlist({ product });
      } else {
        await removeItemFromWishlist({ product });
      }
    };

    return {
      productGetters,
      isInWishlist,
      addItemToCart,
      isInCart,
      handleWishlistClick,
      isWishlistDisabled
    };
  }
};
</script>

<style lang="scss" scoped>
.section {
  margin-top: var(--spacer-base);
}

.carousel {
    margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.9375rem 0 2.4375rem 0;
  }
}

</style>
