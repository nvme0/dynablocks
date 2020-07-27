<?php

namespace iwdDynablockHeroSection;

function renderCallback($attributes, $content)
{
  $backgroundImage = $attributes["backgroundImage"];
  $height = $attributes["height"];
  $filterColor = $attributes["filterColor"];
  $headingType = $attributes["headingType"];
  $h2Text = $attributes["h2Text"];
  $h2TextAlignment = $attributes["h2TextAlignment"];
  $h2Color = $attributes["h2Color"];
  // $h2FontSize = $attributes["h2FontSize"];
  // $h2MarginBottom = $attributes["h2MarginBottom"];
  $elementsPosition = $attributes["elementsPosition"];
  $elementsTranslate = $attributes["elementsTranslate"];

  $left = $elementsPosition["left"]["value"] . $elementsPosition["left"]["units"];
  $top = $elementsPosition["top"]["value"] . $elementsPosition["top"]["units"];
  $translateX = $elementsTranslate["left"];
  $translateY = $elementsTranslate["top"];

  $imageSrc = "";
  if (isset($attributes["backgroundImageSize"])) {
    $backgroundImageSize = $attributes["backgroundImageSize"];
    $imageSrc = $backgroundImage["sizes"][$backgroundImageSize]["url"];
  } else {
    $imageSrc = $backgroundImage["url"];
  }

?>
  <div class="<?= $attributes["renderClassName"] ?>-wrapper">
    <div class="content <?= $attributes["renderClassName"] ?>" style="
      height: <?= $height ?>;
      width: 100%;
      position: absolute;
    ">
      <div class="props" style="display: none">
        <?= json_encode($attributes, JSON_HEX_QUOT || JSON_UNESCAPED_SLASHES); ?>
      </div>
      <div style="
        display: inline-block;
        position: relative;
        transform: translate(<?= $translateX["value"] . $translateX["units"] ?>, <?= $translateY["value"] . $translateY["units"] ?>);
        left: <?= $left ?>;
        top: <?= $top ?>;
      ">
        <?php
        switch ($headingType) {
          case "h1":
        ?><h1 style="color: <?= $h2Color ?>; text-align: <?= $h2TextAlignment ?>;"><?= $h2Text ?></h1>
          <?php
            break;

          case "h3":
          ?><h3 style="color: <?= $h2Color ?>; text-align: <?= $h2TextAlignment ?>;"><?= $h2Text ?></h3>
          <?php
            break;

          case "h4":
          ?><h4 style="color: <?= $h2Color ?>; text-align: <?= $h2TextAlignment ?>;"><?= $h2Text ?></h4>
          <?php
            break;

          case "h5":
          ?><h5 style="color: <?= $h2Color ?>; text-align: <?= $h2TextAlignment ?>;"><?= $h2Text ?></h5>
          <?php
            break;

          case "h6":
          ?><h6 style="color: <?= $h2Color ?>; text-align: <?= $h2TextAlignment ?>;"><?= $h2Text ?></h6>
          <?php
            break;

          case "h2":
          default:
          ?><h2 style="color: <?= $h2Color ?>; text-align: <?= $h2TextAlignment ?>;"><?= $h2Text ?></h2>
        <?php
            break;
        }
        ?>
      </div>
    </div>
    <div class="wrapper">
      <div class="hero-container" style="
        background-image: url(<?= $imageSrc ?>);
        height: <?= $height ?>; 
      ">
        <div class="dimmer-filter" style="
          background-color: <?= $filterColor ?>;
        "></div>
      </div>
    </div>
  </div>
<?php
}
