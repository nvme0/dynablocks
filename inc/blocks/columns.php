<?php

namespace iwdDynablockColumns;

function renderCallback($attributes, $content)
{
  $uuid = "block-" . uniqid();

  $responsive = $attributes["responsive"];
  $scale = array(
    "desktop" => 1,
    "tablet" => $attributes["scaleTablet"],
    "mobile" => $attributes["scaleMobile"]
  );
  $minWidth = array(
    "desktop" => $attributes["minWidthDesktop"],
    "tablet" => $attributes["minWidthTablet"],
    "mobile" => "0px"
  );
  $columns = $attributes["columns"];
  $gridGaps = $attributes["gridGaps"];
  $deviceTypes = array("desktop", "tablet", "mobile");

  $style = array();
  foreach ($deviceTypes as $device) {
    $scaledColumnGap = $gridGaps["column"] * $scale[$device];
    $scaledRowGap = $gridGaps["row"] * $scale[$device];

    $gridTemplateColumns = array_reduce($columns[$device], function ($carry, $entry) use ($scaledColumnGap) {
      return $carry . "calc({$entry}% - " . (1 - $entry / 100) * $scaledColumnGap . "px) ";
    });

    $style[$device] = "
.{$uuid} {
  display: grid;
  grid-template-columns: {$gridTemplateColumns};
  grid-column-gap: {$scaledColumnGap}px;
  grid-row-gap: {$scaledRowGap}px;
}";
  }

  echo
    "<style>";
  if ($responsive == true) {
    echo
      $style["mobile"] . "
@media all and (min-width:" . $minWidth["tablet"] . ") {" .
        $style["tablet"] . "
}
@media all and (min-width:" . $minWidth["desktop"] . ") {" .
        $style["desktop"] . "
}
    ";
  } else {
    echo
      $style["desktop"];
  }
  echo
    "</style>";

?>
  <div class="s4tw-dynablocks-columns <?= $uuid ?>">
    <?= $content ?>
  </div>
<?php
}
