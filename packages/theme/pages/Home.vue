<template>
  <div id="home">
    <SfBanner
      v-if="!content.cmsSections"
      title="Configure the Homepage"
      description="You are seeing this message because your Homepage hasn't been configured yet in the Spree CMS. In order to do that, go to Spree Admin Panel -> Content -> Pages and add a new Homepage or simply click the link below."
      buttonText="Go to panel"
      :link="backendUrl ? `${backendUrl.replace(/\/$/, '')}/admin/cms_pages` : ''"
      image="static/media/Banner2.ed9cc6ce.jpg"
      class="featured-article"
    />

    <div v-else>
      <div v-for="section in content.cmsSections" :key="section.id">
        <LazyHydrate when-idle v-if="section.type.includes('HeroImage')">
          <SfHero class="hero">
            <SfHeroItem
              :title="section.title"
              background="#eceff1"
              :image="section.imgOneXl"
              :buttonText="section.buttonText"
            />
          </SfHero>
        </LazyHydrate>

        <LazyHydrate when-visible v-if="section.type.includes('ImageGallery')">
          <div class="grid">
            <div class="grid__col">
              <SfBanner
                :button-text="section.content.title_one"
                :link="localePath(`/c/${section.content.link_one}`)"
                :image="section.imgOneXl"
                class="grid__col__banner sf-banner--slim desktop-only"
              />
            </div>
            <div class="grid__col">
              <SfBanner
                :button-text="section.content.title_two"
                :link="localePath(`/c/${section.content.link_two}`)"
                :image="section.imgTwoXl"
                class="sf-banner--slim banner__tshirt desktop-only"
              />
              <SfBanner
                :button-text="section.content.title_three"
                :link="localePath(`/c/${section.content.link_three}`)"
                :image="section.imgThreeXl"
                class="sf-banner--slim desktop-only"
              />
            </div>
          </div>
        </LazyHydrate>

        <LazyHydrate when-visible v-if="section.type.includes('FeaturedArticle')">
          <SfBanner
            :title="section.subtitle"
            :subtitle="section.title"
            :description="extractContent(section.content.rte_content)"
            :buttonText="section.content.button_text"
            :link="section.links[0] || ''"
            image="static/media/Banner2.ed9cc6ce.jpg"
            class="featured-article"
          />
        </LazyHydrate>
      </div>

      <LazyHydrate when-visible>
        <div class="similar-products">
          <SfHeading :title="$t('pages.home.similar_products_heading')" :level="2"/>
          <nuxt-link :to="localePath('/c/categories/women')" class="smartphone-only">
            {{ $t('pages.home.see_all') }}
          </nuxt-link>
        </div>
      </LazyHydrate>

      <LazyHydrate when-visible>
        <SfCarousel class="carousel" :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }">
          <template #prev="{go}">
            <SfArrow
              :aria-label="$t('pages.home.aria_label_carousel_arrow_prev')"
              class="sf-arrow--left sf-arrow--long"
              @click="go('prev')"
            />
          </template>
          <template #next="{go}">
            <SfArrow
              :aria-label="$t('pages.home.aria_label_carousel_arrow_next')"
              class="sf-arrow--right sf-arrow--long"
              @click="go('next')"
            />
          </template>
          <SfCarouselItem class="carousel__item" v-for="(product, i) in products" :key="i">
            <SfProductCard
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
              :max-rating="5"
              :score-rating="productGetters.getAverageRating(product)"
              :show-add-to-cart-button="false"
              :is-in-wishlist="isInWishlist({ product })"
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              :wishlist-icon="isWishlistDisabled ? false : undefined"
              class="carousel__item__product"
              @click:wishlist="handleWishlistClick(product)"
            />
          </SfCarouselItem>
        </SfCarousel>
      </LazyHydrate>

      <LazyHydrate when-visible>
        <SfCallToAction
          :title="$t('pages.home.cta_subscribe_title')"
          :button-text="$t('pages.home.cta_subscribe_button_label')"
          :description="$t('pages.home.cta_subscribe_description')"
          image="/homepage/newsletter.webp"
          class="call-to-action"
        >
          <template #button>
            <SfButton
              class="sf-call-to-action__button"
              data-testid="cta-button"
              @click="toggleNewsletterModal"
            >
              {{ $t('pages.home.cta_subscribe_button_label') }}
            </SfButton>
          </template>
        </SfCallToAction>
      </LazyHydrate>

      <LazyHydrate when-visible>
        <NewsletterModal @email-submitted="onSubscribe" />
      </LazyHydrate>
    </div>

  </div>
</template>
<script>
import {
  SfHero,
  SfBanner,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfImage,
  SfBannerGrid,
  SfHeading,
  SfArrow,
  SfButton
} from '@storefront-ui/vue';
import { computed, onMounted } from '@nuxtjs/composition-api';
import { useFacet, facetGetters, productGetters, useUser, useWishlist, wishlistGetters } from '@vue-storefront/spree';
import InstagramFeed from '~/components/InstagramFeed.vue';
import NewsletterModal from '~/components/NewsletterModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { useUiState } from '../composables';
import { useContent } from '@vue-storefront/spree';
import cacheControl from './../helpers/cacheControl';

export default {
  name: 'Home',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  components: {
    InstagramFeed,
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
    NewsletterModal,
    LazyHydrate
  },
  setup(props, context) {
    const { toggleNewsletterModal, toggleLoginModal } = useUiState();
    const { search, result } = useFacet('home');
    const { isAuthenticated } = useUser();
    const { wishlist, addItem: addItemToWishlist, isInWishlist, removeItem: removeItemFromWishlist } = useWishlist();
    const { content, search: searchContent } = useContent();

    const products = computed(() => facetGetters.getProducts(result.value));
    const isWishlistDisabled = computed(() => wishlistGetters.isWishlistDisabled(wishlist.value));
    const carouselSection = computed(() => (((content.value.cmsSections || []).filter(x => x.type.includes('ProductCarousel'))[0] || {}).links || [''])[0]);
    const backendUrl = computed(() => context.root.$options.$config.backendUrl);

    onMounted(async () => {
      await searchContent({ contentPageType: 'home' });
      await search({ categorySlug: carouselSection.value.replace('/c/', '') });
    });

    const onSubscribe = () => {
      toggleNewsletterModal();
    };

    const extractContent = (x) => {
      const span = document.createElement('span');
      span.innerHTML = x;
      return span.textContent || span.innerText;
    };

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
      backendUrl,
      carouselSection,
      toggleNewsletterModal,
      onSubscribe,
      content,
      products,
      productGetters,
      extractContent,
      isInWishlist,
      handleWishlistClick,
      isWishlistDisabled
    };
  }
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        ::v-deep .sf-hero-item__subtitle,
        ::v-deep .sf-hero-item__title {
          text-align: right;
          width: 100%;
          padding-left: var(--spacer-sm);
        }
      }
    }
  }
  ::v-deep .sf-hero__control {
    &--right, &--left {
      display: none;
    }
  }
}

.grid {
  display: flex;
  gap: 20px;
  &__col {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    &__banner {
      height: 100%;
    }
  }
  @include for-desktop {
    ::v-deep .sf-link {
      --button-width: auto;
      text-decoration: none;
    }
  }
}

.featured-article {
  ::v-deep .sf-link {
    --button-width: auto;
    text-decoration: none;
  }
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
      text-decoration: none;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 0 0;
  }
}

.carousel {
    margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);
     -webkit-transform-origin: center;
     transform-origin: center;
  }
}

</style>
