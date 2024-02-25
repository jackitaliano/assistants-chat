<script>
  import { ASSISTANT_LOGO } from '../assistant/assistant';

  let logoImage = ASSISTANT_LOGO;

</script>

<div class="flex mx-2 justify-center space-x-4">
	<img src={logoImage} alt="" />
</div>

<style>
    img {
        width: 2em;
        height: 2em;
        border: 1px solid rgb(142, 142, 142);
        border-radius: 2em;
        max-width: inherit;
    }
</style>
