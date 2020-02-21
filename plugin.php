<?php
/**
 * Plugin Name: Dynablocks
 * Plugin URI: https://solutions4theweb.com
 * Description: A Wordpress Gutenberg Blocks Plugin containing a number of useful blocks that add functionality to your website.
 * Author: Solutions 4 the Web
 * Author URI: https://solutions4theweb.com
 * Version: 1.1.6
 * 
 * @package Dynablocks
 */

/**
 * Exit if accessed directly
 */
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path(__FILE__) . 'init.php';
require_once plugin_dir_path(__FILE__) . 'blocks.php';

// Add featured image to json response
add_action('rest_api_init', function() {
	register_rest_field( 
    'post-with-subtitle', // Where to add the field (Here, blog posts. Could be an array)
    's4tw_featured_image_src', // Name of new field (You can call this anything)
    array(
			'get_callback'    => 's4tw_bk1_get_image_src',
			'update_callback' => null,
			'schema'          => null,
		)
	);
});

function s4tw_bk1_get_image_src($object) {
	$feat_img_array = wp_get_attachment_image_src($object['featured_media']);
	$feat_img_array = wp_get_attachment_image_src(
    $object['featured_media'], // Image attachment ID
    'full',  // Size.  Ex. "thumbnail", "large", "full", etc..
    true // Whether the image should be treated as an icon.
  );
  return $feat_img_array[0];
}