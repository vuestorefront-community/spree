<template>
  <SfBanner
    class="sf-banner--slim upside-banner"
    subtitle="This demo was developed by the team at Upside."
    description="Get in touch if you'd like to upgrade the customer experience of your Spree-based store."
    buttonText="Learn more"
    link="https://upsidelab.io/services/vue-storefront-development"
  />
</template>

<script>
import { SfBanner, SfButton } from '@storefront-ui/vue';

export default {
  components: {
    SfBanner,
    SfButton
  }
};
</script>

<style lang="scss">
.upside-banner.sf-banner {
  margin-top: var(--spacer-xl);
  --banner-height: auto;
  --banner-background-size: 50%;
  --banner-background-color: black;
  --banner-background-position: center right -2rem;
  --banner-background-image: linear-gradient(to left, transparent, black 85%),
    url('/homepage/bannerImage.jpg');
  --banner-wrapper-width: 50%;
  --banner-color: white;
  --banner-description-font-size: 20px;
  --banner-description-margin: 0 0 var(--spacer-base) 0;

  @include for-mobile {
    --banner-background-size: auto 115%;
    --banner-background-image: linear-gradient(to left, transparent, black 50%),
      url('/homepage/bannerImage.jpg');
    --banner-description-display: flex;
    --banner-description-font-size: 14px;
    --banner-description-margin: 0;
    --banner-padding: 1rem;
    --banner-wrapper-width: 100%;
  }
}

.upside-banner .sf-banner__wrapper {
  @include for-mobile {
    box-sizing: border-box;
  }
}

.upside-banner .sf-banner__description {
  @include for-mobile {
    width: 50%;
  }
}

.upside-banner .sf-banner__call-to-action {
  --button-width: auto;
  --c-secondary: #fd6924;
  --c-secondary-variant: #ffa0739c;
  --c-link-hover: white;
  --link-font-size: var(--font-size--base);
  --link-font-weight: var(--font-weight--semibold);
  --link-text-decoration: none;
}
</style>
