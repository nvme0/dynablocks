<?php

/**
 * Block Initializer
 * Enqueue CSS/JS of all the blocks.
 * @since   1.0.0
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Enqueue assets for frontend and backend
 * @since 1.0.0
 */
add_action('init', function () {

	// Enqueue bootstap.min.css
	$script_url = plugins_url('dist/css/bootstrap.min.css', __FILE__);
	wp_enqueue_style(
		's4tw-dynablocks-bootstrap-css',
		$script_url,
		array(),
		null
	);

	// Enqueue the block style
	$deps = s4tw_getScriptDependencies('dist/css/frontend', 'css');
	$script_url = $deps['url'];
	$script_asset = $deps['asset'];
	wp_enqueue_style(
		's4tw-dynablocks-frontend-css',
		$script_url,
		$script_asset['dependencies'],
		$script_asset['version'],
	);
});

/**
 * Enqueue assets for backend
 * @since 1.0.0
 */
add_action('enqueue_block_editor_assets', function () {

	// Enqueue the editor style
	$deps = s4tw_getScriptDependencies('dist/css/editor', 'css');
	$script_url = $deps['url'];
	$script_asset = $deps['asset'];
	wp_enqueue_style(
		's4tw-dynablocks-editor-css',
		$script_url,
		$script_asset['dependencies'],
		$script_asset['version'],
	);

	// Enqueue the editor script
	$deps = s4tw_getScriptDependencies('dist/editor', 'js');
	$script_url = $deps['url'];
	$script_asset = $deps['asset'];
	wp_enqueue_script(
		's4tw-dynablocks-editor-js',
		$script_url,
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);
});

/**
 * Enqueue assets for frontend
 * @since 1.0.0
 */
add_action('wp_enqueue_scripts', function () {

	// Enqueue the frontend script
	$deps = s4tw_getScriptDependencies('dist/frontend', 'js');
	$script_url = $deps['url'];
	$script_asset = $deps['asset'];
	wp_enqueue_script(
		's4tw-dynablocks-frontend-js',
		$script_url,
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);
});

/**
 * Adds the Dynablocks block category.
 * @param array $categories Existing block categories.
 * @return array Updated block categories.
 */
add_filter('block_categories', function ($categories) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 's4tw-dynablocks',
				'title' => 'Dynablocks',
			),
		)
	);
});

/**
 * Get script dependencies dynamically
 *
 * @param $name - name of script, e.g. src = dist/style.build.css, $name = dist/style
 * @param $ext - file extension e.g. src = dist/style.build.css, $ext = css 
 * @since 1.0.0		
 */
function s4tw_getScriptDependencies($name, $ext)
{
	$script_path = $name . '.build.' . $ext;
	$script_asset_path = $name . '.build.asset.php';
	$script_asset = require($script_asset_path);
	$script_url = plugins_url($script_path, __FILE__);
	return array('url' => $script_url, 'asset' => $script_asset);
}