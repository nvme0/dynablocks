<?php

namespace iwdDynablockGeneric;

function renderCallback($attributes, $content)
{
?>
  <div class=" <?= $attributes["renderClassName"] ?>">
    <div class="props" style="display: none">
      <?= json_encode($attributes, JSON_HEX_QUOT || JSON_UNESCAPED_SLASHES); ?>
    </div>
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
<?php
}
