<?php

declare(strict_types = 1);

$lando_info = getenv('LANDO_INFO');
if (!$lando_info) {
  return;
}

$lando = json_decode($lando_info, TRUE);

/**
 * Database credentials.
 */
$databases['default']['default'] = [
  'database' => $lando['database']['creds']['database'],
  'username' => $lando['database']['creds']['user'],
  'password' => $lando['database']['creds']['password'],
  'prefix' => '',
  'host' => $lando['database']['internal_connection']['host'],
  'port' => $lando['database']['internal_connection']['port'],
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
];

/**
 * Trusted host settings.
 */
$settings['trusted_host_patterns'] = [
  '^(.+)$',
];

/**
 * Configuration split.
 */
$config['config_split.config_split.local']['status'] = TRUE;

/**
 * Error logging.
 */
$config['system.logging']['error_level'] = 'verbose';

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';

/**
 * Skip file system permissions hardening.
 */
$settings['skip_permissions_hardening'] = TRUE;
