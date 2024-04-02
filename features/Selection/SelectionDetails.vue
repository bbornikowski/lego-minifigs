<template>
  <Modal
    :title="data?.name"
    @close="handleCloseDetails"
  >
    <FigureDetailsSkeleton v-if="pending" />

    <FigureDetails
      v-if="!pending && data"
      :name="data.name"
      :image="data.image"
      :parts="data.parts"
    />
  </Modal>
</template>

<script lang="ts" setup>
  import { API_MINIFIG } from '~/constants/api';
  import type { MinifigDetailsResponse } from '~/server/types/response';

  interface SelectionDetailsProps {
    id: string;
  }

  const { path } = useRoute();
  const { push } = useRouter();

  const props = defineProps<SelectionDetailsProps>();

  const { data, pending } = useLazyFetch<MinifigDetailsResponse>(
    API_MINIFIG(props.id)
  );

  const handleCloseDetails = () => {
    push(path);
  };
</script>
