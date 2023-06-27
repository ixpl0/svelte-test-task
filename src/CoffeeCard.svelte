<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { createEventDispatcher } from 'svelte';
  import type { Coffee } from './types';
  export let coffee: Coffee;

  const dispatch = createEventDispatcher();
  const img = new Image();
  let isImgLoaded = false;

  img.src = coffee.img;

  img.onload = () => {
    isImgLoaded = true;
    dispatch('imgLoaded');
  }
</script>

<div class="card" in:fly="{{ y: -200, duration: 500, easing: cubicOut }}">
  {#if isImgLoaded}
    <img src={coffee.img} alt={coffee.blend_name}>
  {:else}
    <div class="image-placeholder"></div>
  {/if}

  <p class="origin">{coffee.origin}</p>
  <h2>{coffee.blend_name}</h2>
  <p>{coffee.variety} {coffee.intensifier}</p>

  <div class="notes">
    {#each coffee.notes.split(', ') as note}
      <div class="note">{note}</div>
    {/each}
  </div>
</div>

<style lang="less">
  .card {
    width: 300px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    padding: 10px;
    background-color: white;

    img {
      display: block;
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover; // страховка от нестандартных размеров изображения
    }

    .image-placeholder {
      width: 100%;
      aspect-ratio: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background-color: #e8e8e8;
      color: white;

      &::after {
        content: '\f083';
        font-family: "FontAwesome";
        font-size: 4em;
      }
    }

    .origin {
      font-size: .8em;
      color: #666;
      margin-top: 16px;
    }

    .notes {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      padding: 4px 0;
      margin: 12px 0 6px;
      gap: 10px;

      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      .note {
        font-size: .8em;
        padding: 4px 8px;
        border-radius: 5px;
        white-space: nowrap;
        cursor: pointer; // вероятно, в реальном проекте это будет кликабельным тегом

        &:nth-child(5n+1) {
          background-color: #ffb3ba;
        }

        &:nth-child(5n+2) {
          background-color: #ffdfba;
        }

        &:nth-child(5n+3) {
          background-color: #ffffba;
        }

        &:nth-child(5n+4) {
          background-color: #baffc9;
        }

        &:nth-child(5n+5) {
          background-color: #bae1ff;
        }
      }
    }
  }
</style>
