<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import CoffeeCard from './CoffeeCard.svelte';
  import type { Coffee } from './types.ts';
  import { CoffeeResponse } from './types.ts';

  let coffeeList: Coffee[] = [];
  let isLoading = true;
  let interval: NodeJS.Timeout;

  const addCoffee = async () => {
    try {
      isLoading = true;

      const coffeeResponse = await fetch('https://random-data-api.com/api/coffee/random_coffee');
      const coffee: CoffeeResponse = await coffeeResponse.json();

      // уникальный урл нужен, чтобы избежать кеширования картинки, тк у нас один запрос на все картинки
      const img = `https://loremflickr.com/500/500/coffee_bean?${new Date().getTime()}`;

      coffeeList = [...coffeeList, { ...coffee, img }];
    } catch (e) {
      console.error('Перехваченная ошибка', e);
    }
  };

  const resetAutoAddInterval = () => {
    clearInterval(interval);

    interval = setInterval(() => {
      if (!isLoading) {
        addCoffee();
      }
    }, 30000);
  };

  const onAddCoffeeClick = () => {
    if (!isLoading) {
      addCoffee();
      resetAutoAddInterval();
    }
  };

  const onImgLoaded = () => {
    isLoading = false;
  };

  onMount(() => {
    addCoffee();
    resetAutoAddInterval();
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="wrapper">
  <div class="coffee-list">
    {#each coffeeList as coffee (coffee.id)}
      <CoffeeCard {coffee} on:imgLoaded={onImgLoaded} />
    {/each}
  </div>

    <button
      class="round-btn"
      class:hidden={isLoading}
      on:click={onAddCoffeeClick}
    >
      <i class="fas fa-plus"></i>
    </button>
</div>

<style lang="less">
  .coffee-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    max-width: 1000px;
    margin: 24px auto;
    position: relative;
  }

  .round-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px auto 48px;
    width: 60px;
    height: 60px;
    background-color: #444;
    border: none;
    border-radius: 50%;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    transition: background-color .3s ease;

    &:hover {
      background-color: #666;
    }

    &.hidden {
      visibility: hidden;
    }

    i {
      font-size: 1.2em;
    }
  }
</style>
