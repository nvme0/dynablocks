<?php

require_once plugin_dir_path(__FILE__) . "/inc/blocks/generic.php";
require_once plugin_dir_path(__FILE__) . "/inc/blocks/columns.php";
require_once plugin_dir_path(__FILE__) . "/inc/blocks/columns-element.php";
require_once plugin_dir_path(__FILE__) . "/inc/blocks/image-block.php";
require_once plugin_dir_path(__FILE__) . "/inc/blocks/hero-section.php";
require_once plugin_dir_path(__FILE__) . "/inc/blocks/spacer.php";

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

  $root = rtrim(plugin_dir_path(__FILE__), '/');
  $blockAttributes = s4tw_dynablocks_parse_attributes_config_json(
    $root . "/src/blocks/",
    $blockNames,
    "/editor/attributes.config.json"
  );
  $componentAttributes = s4tw_dynablocks_parse_attributes_config_json(
    $root . "/dist/common/Components/",
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

    switch ($block["name"]) {

      case "s4tw/dynablocks-columns":
        register_block_type(
          $block["name"],
          array(
            "render_callback" => function ($attributes, $content) {
              ob_start();
              iwdDynablockColumns\renderCallback($attributes, $content);
              return ob_get_clean();
            },
            "attributes" => $block["attributes"]
          )
        );
        break;

      case "s4tw/dynablocks-columns-element":
        register_block_type(
          $block["name"],
          array(
            "render_callback" => function ($attributes, $content) {
              ob_start();
              iwdDynablockColumnsElement\renderCallback($attributes, $content);
              return ob_get_clean();
            },
            "attributes" => $block["attributes"]
          )
        );
        break;

      case "s4tw/dynablocks-container":
        register_block_type(
          $block["name"],
          array("attributes" => $block["attributes"])
        );
        break;

      case "s4tw/dynablocks-hero-section":
        register_block_type(
          $block["name"],
          array(
            "render_callback" => function ($attributes, $content) {
              ob_start();
              iwdDynablockHeroSection\renderCallback($attributes, $content);
              return ob_get_clean();
            },
            "attributes" => $block["attributes"]
          )
        );
        break;

      case "s4tw/dynablocks-image-block":
        register_block_type(
          $block["name"],
          array(
            "render_callback" => function ($attributes, $content) {
              ob_start();
              iwdDynablockDivider\renderCallback($attributes, $content);
              return ob_get_clean();
            },
            "attributes" => $block["attributes"]
          )
        );
        break;

      case "s4tw/dynablocks-spacer":
        register_block_type(
          $block["name"],
          array(
            "render_callback" => function ($attributes, $content) {
              ob_start();
              iwdDynablockSpacer\renderCallback($attributes, $content);
              return ob_get_clean();
            },
            "attributes" => $block["attributes"]
          )
        );
        break;

      default:
        register_block_type(
          $block["name"],
          array(
            "render_callback" => function ($attributes, $content) {
              ob_start();
              iwdDynablockGeneric\renderCallback($attributes, $content);
              return ob_get_clean();
            },
            "attributes" => $block["attributes"]
          )
        );
        break;
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
