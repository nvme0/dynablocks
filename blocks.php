<?php

/**
 *    Instructions for Adding new Dynamic Block or Component
 *    1. Append Block Name in "$blockNames" or Component Name in "$componentNames"
 *    2. List attributes dependencies for the block in "$dependencies"
 */

add_action("init", function () {
  // 1. Append Block or Component name
  $blockNames = array(
    "accordion",
    "accordion-column",
    "accordion-column-element",
    "banner-slider",
    "button",
    "button-group",
    "columns",
    "columns-element",
    "container",
    "hero-section",
    "image-block",
    "post-carousel",
    "spacer"
  );
  $componentNames = array(
    "Bootstrap/Button",
    "Controls/ResponsiveControls",
    "Spacer"
  );

  $root = plugin_dir_path(__FILE__);
  $blockAttributes = s4tw_dynablocks_parse_attributes_config_json(
    $root . "/src/blocks/",
    $blockNames,
    "/editor/attributes.config.json"
  );
  $componentAttributes = s4tw_dynablocks_parse_attributes_config_json(
    $root . "/src/common/Components/",
    $componentNames,
    "/attributes.config.json"
  );

  // 2. List attributes dependencies for the block
  $dependencies =
    array(
      "accordion" => array_merge(
        $blockAttributes["accordion"],
        $componentAttributes["Controls/ResponsiveControls"]
      ),
      "accordion-column" => array_merge(
        $blockAttributes["accordion-column"]
      ),
      "accordion-column-element" => array_merge(
        $blockAttributes["accordion-column-element"]
      ),
      "banner-slider" => array_merge(
        $blockAttributes["banner-slider"],
        $componentAttributes["Controls/ResponsiveControls"]
      ),
      "button" => array_merge(
        $blockAttributes["button"],
        $componentAttributes["Bootstrap/Button"],
        $componentAttributes["Controls/ResponsiveControls"]
      ),
      "button-group" => array_merge(
        $blockAttributes["button-group"],
        $componentAttributes["Controls/ResponsiveControls"]
      ),
      "columns" => array_merge(
        $blockAttributes["columns"],
        $componentAttributes["Controls/ResponsiveControls"]
      ),
      "columns-element" => array_merge(
        $blockAttributes["columns-element"]
      ),
      "container" => array_merge(
        $blockAttributes["container"]
      ),
      "hero-section" => array_merge(
        $blockAttributes["hero-section"],
        $componentAttributes["Controls/ResponsiveControls"]
      ),
      "image-block" => array_merge(
        $blockAttributes["image-block"],
      ),
      "post-carousel" => array_merge(
        $blockAttributes["post-carousel"],
        $componentAttributes["Bootstrap/Button"],
        $componentAttributes["Controls/ResponsiveControls"]
      ),
      "spacer" => array_merge(
        $blockAttributes["spacer"],
        $componentAttributes["Controls/ResponsiveControls"],
        $componentAttributes["Spacer"]
      )
    );

  // Register Block Types Handler
  $blocks =
    array_map(
      function ($entry) use ($dependencies) {
        return array(
          "name" => "s4tw/dynablocks-" . $entry,
          "attributes" => array_merge(
            array("renderClassName" => array("type" => "string", "default" => "s4tw-dynablocks-" . $entry)),
            $dependencies[$entry]
          )
        );
      },
      $blockNames
    );

  foreach ($blocks as $block) {
// s4tw/dynablocks-container
    if ($block["name"] == "s4tw/dynablocks-container") {
      register_block_type(
        $block["name"],
        array("attributes" => $block["attributes"])
      );
    
// s4tw/dynablocks-columns
    } else if ($block["name"] == "s4tw/dynablocks-columns") {
      register_block_type(
        $block["name"],
        array(
          "render_callback" => function ($attributes, $content) {
            ob_start();
            $uuid = "block-" . uniqid();

            $responsive = $attributes["responsive"];
            $scale = Array(
              "desktop" => 1,
              "tablet" => $attributes["scaleTablet"],
              "mobile" => $attributes["scaleMobile"]
            );
            $minWidth = Array(
              "desktop" => $attributes["minWidthDesktop"],
              "tablet" => $attributes["minWidthTablet"],
              "mobile" => "0px"
            );
            $columns = $attributes["columns"];
            $columnBreaks = $attributes["columnBreaks"];
            $gridGaps = $attributes["gridGaps"];
            $deviceTypes = Array("desktop", "tablet", "mobile");
            $numberOfItems = sizeof($attributes["blockOrder"]);

            $cols = $columnBreaks["desktop"];
            $rows = ceil($numberOfItems / $cols);
            $columnGap = $gridGaps["column"] / 2.0;
            $rowGap = $gridGaps["row"] / 2.0;
            
            $gridTemplateColumns = Array();
            foreach ($columns as $device => $entry) {
              $gridTemplateColumns[$device] = array_reduce($entry, function($carry, $item) {
                return $carry . "{$item}% ";
              });
            }

            $allButLastColumn = ":not(:nth-child(" . $cols . "n))";
            $allButFirstColumn = ":not(:nth-child(" . $cols . "n - " . ($cols - 1) . "))";
            $allButFirstRow = ":nth-child(n + " . ($cols + 1) . ")";
            $allButLastRow = ":not(:nth-child(n + " . ($cols * ($rows - 1) + 1) . "))";

            $style = Array();
            foreach ($deviceTypes as $device) {
              $scaledColumnGap = $columnGap * $scale[$device];
              $scaledRowGap = $rowGap * $scale[$device];
              $style[$device] = "
.{$uuid} {
  display: grid;
  grid-template-columns: {$gridTemplateColumns[$device]};
}
.{$uuid} > {$allButLastColumn} {
  padding-right: {$scaledColumnGap}px;
}
.{$uuid} > {$allButFirstColumn} {
  padding-left: {$scaledColumnGap}px;
}
.{$uuid} > {$allButFirstRow} {
  padding-top: {$scaledRowGap}px;
}
.{$uuid} > {$allButLastRow} {
  padding-bottom: {$scaledRowGap}px;
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
            return ob_get_clean();
          },
          "attributes" => $block["attributes"]
        )
      );

// s4tw/dynablocks-columns-element
    } else if ($block["name"] == "s4tw/dynablocks-columns-element") {
      register_block_type(
        $block["name"],
        array(
          "render_callback" => function ($attributes, $content) {
            ob_start();
?>
<div class="s4tw-dynablocks-columns-element">
  <?= $content ?>
</div>
<?php
            return ob_get_clean();
          },
          "attributes" => $block["attributes"]
        )
      );

// s4tw/dynablocks-
    } else {
      register_block_type(
        $block["name"],
        array(
          "render_callback" => function ($attributes, $content) {
            ob_start();
?>
<div class="<?= $attributes["renderClassName"] ?>">
  <div class="props" style="display: none">
    <?= json_encode($attributes, JSON_HEX_QUOT || JSON_UNESCAPED_SLASHES); ?>
  </div>
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
<?php
            return ob_get_clean();
          },
          "attributes" => $block["attributes"]
        )
      );
    }
  };
});

function s4tw_dynablocks_parse_attributes_config_json($dir, $names, $configFile)
{
  $attributes = array();
  foreach ($names as $name) {
    $attributes[$name] = json_decode(file_get_contents($dir . $name . $configFile), true);
  }
  return $attributes;
}