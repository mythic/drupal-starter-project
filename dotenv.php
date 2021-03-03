<?php

$dotenv = new Symfony\Component\Dotenv\Dotenv();
$dotenv->usePutenv();

$paths = [
  __DIR__ . '/.env',
  __DIR__ . '/.env.local',
];

foreach ($paths as $path) {
  if (file_exists($path)) {
    $dotenv->load($path);
  }
}
