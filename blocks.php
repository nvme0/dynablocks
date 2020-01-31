<?php

/**
 *    Instructions for Adding new Dynamic Block or Component
 *    1. Append Block Name in "$blockNames" or Component Name in "$componentNames"
 *    2. List attributes dependencies for the block in "$dependencies"
 */

add_action("init", function () {
  // 1. Append Block or Component name
  $blockNames = array(
    "banner-slider",
    "button",
    "container", // Static Block
    "hero-section",
    "image-block",
    "post-carousel",
    "spacer"
  );
  $componentNames = array(
    "Bootstrap/Button",
    "Controls/ResponsiveControls"
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
      "banner-slider" => array_merge(
        $blockAttributes["banner-slider"],
        $componentAttributes["Controls/ResponsiveControls"]
      ),
      "button" => array_merge(
        $blockAttributes["button"],
        $componentAttributes["Bootstrap/Button"],
        $componentAttributes["Controls/ResponsiveControls"]
      ),
      "container" => array_merge(
        $blockAttributes["container"]
      ),
      "hero-section" => array_merge(
        $blockAttributes["hero-section"],
        $componentAttributes["Bootstrap/Button"],
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
        $componentAttributes["Controls/ResponsiveControls"]
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
    if ($block["name"] == "s4tw/dynablocks-container") {
      // is a static block
      register_block_type(
        $block["name"],
        array("attributes" => $block["attributes"])
      );
    } else {
      // is a dynamic block
      register_block_type(
        $block["name"],
        array(
          "render_callback" => function ($attributes, $content) {
            ob_start();
?>
        <div class="<?= $attributes["renderClassName"] ?>">
          <div class="props" style="display: none">
            <?= json_encode($attributes, JSON_UNESCAPED_SLASHES); ?>
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
