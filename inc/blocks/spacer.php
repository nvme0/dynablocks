<?php

namespace iwdDynablockSpacer;

function renderCallback($attributes, $content)
{
  $height = $attributes["height"];
?>
  <div class=" <?= $attributes["renderClassName"] ?>">
    <div class="props" style="display: none">
      <?= json_encode($attributes, JSON_HEX_QUOT || JSON_UNESCAPED_SLASHES); ?>
    </div>
    <div style="
      height: <?= $height ?>;
    ">
    </div>
  </div>
<?php
}
