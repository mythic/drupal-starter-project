<?php

declare(strict_types = 1);

$settings['config_sync_directory'] = DRUPAL_ROOT . '/../config/common';
$settings['file_public_path'] = 'sites/default/files';

/**
 * Salt for one-time login links, cancel links, form tokens, etc.
 */
$settings['hash_salt'] = md5('🦄');

$settings_files = [
  __DIR__ . '/settings.lando.php',
  __DIR__ . '/settings.local.php',
];

foreach ($settings_files as $settings_file) {
  if (file_exists($settings_file)) {
    require $settings_file;
  }
}
