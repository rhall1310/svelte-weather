<main>
  <slot />
</main>

<style>
  main {
    background-color: rgb(47, 148, 216);
    max-width: 24em;
    min-width: 11em;
    border-radius: 1em;
    box-shadow: 5px 3px;
    max-height: 100%;
  }

  @media only screen and (max-width: 800px) {
    main {
      width: 30vw;
    }
  }
</style>
