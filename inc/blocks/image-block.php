<?php

namespace iwdDynablockDivider;

function renderCallback($attributes, $content)
{
  $backgroundImage = $attributes["backgroundImage"];
  $filterColor = $attributes["filterColor"];
  $height = $attributes["height"];
  $margin = $attributes["margin"];
  $backgroundPosition = $attributes["backgroundPosition"];

  $backgroundPositionStyle = "";
  if ($backgroundPosition["type"] == "custom") {
    $backgroundPositionStyle = $backgroundPosition["x"]["value"] . $backgroundPosition["x"]["units"] . " "
      . $backgroundPosition["y"]["value"] . $backgroundPosition["y"]["units"];
  } else {
    $backgroundPositionStyle = $backgroundPosition["type"];
  }

  $imageSrc = "";
  if (isset($attributes["backgroundImageSize"])) {
    $imageSrc = $backgroundImage["sizes"]["backgroundImageSize"]["url"];
  } else {
    $imageSrc = $backgroundImage["url"];
  }
?>
  <div class="<?= $attributes["renderClassName"] ?>">
    <div class="props" style="display: none">
      <?= json_encode($attributes, JSON_HEX_QUOT || JSON_UNESCAPED_SLASHES); ?>
    </div>
    <div style="
      height: <?= $height ?>;
      margin: <?= $margin["top"] ?>px <?= $margin["right"] ?>px <?= $margin["bottom"] ?>px <?= $margin[" left"] ?>px;
      background-image: url(<?= $imageSrc ?>);
      background-position: <?= $backgroundPositionStyle ?>;
      background-repeat: no-repeat;
      background-size: cover;
      backgound-color: <?= $filterColor ?>;
    ">
      <div style="
        height: 100%;
        width: 100%;
        backgound-color: <?= $filterColor ?>;
      ">
      </div>
    </div>
  </div>
<?php
}
