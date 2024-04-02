<template>
  <div class="figureDetails">
    <NuxtImg
      :src="image"
      :alt="name"
      format="webp, jpeg"
      height="200"
      width="200"
      class="figureDetails__image"
    />

    <Text
      weight="bold"
      class="figureDetails__name"
    >
      {{ name }}
    </Text>

    <Text>
      {{ t('minifig_parts', { count: parts.length }) }}
    </Text>

    <ul class="figureDetails__parts">
      <li
        v-for="part in parts"
        :key="part.id"
        class="figureDetails__part"
      >
        <NuxtPicture
          :src="part.image"
          :alt="part.name"
          format="webp, jpeg"
          height="48"
          width="48"
        />

        <div class="figureDetails__content">
          <Text weight="bold">
            {{ part.name }}
          </Text>

          <Text>
            {{ part.id }}
          </Text>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  interface figureDetailsProps {
    name: string;
    image: string;
    parts: Array<{
      id: number;
      name: string;
      image: string;
    }>;
  }

  const { t } = useI18n();

  defineProps<figureDetailsProps>();
</script>

<style lang="scss">
  .figureDetails {
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;

    &__image {
      display: block;
      height: 200px;
      margin-bottom: 12px;
      margin-left: auto;
      margin-right: auto;
      width: auto;
    }

    &__name {
      margin-bottom: 6px;
    }

    &__parts {
      display: flex;
      flex-direction: column;
      margin-top: 24px;
      row-gap: 16px;
    }

    &__part {
      align-items: center;
      column-gap: 12px;
      display: flex;
    }

    &__content {
      display: flex;
      flex-direction: column;
      row-gap: 4px;
    }
  }
</style>
