<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dataDir = __DIR__ . '/';
$backupDir = $dataDir . 'backups/';

// Create backups directory if it doesn't exist
if (!file_exists($backupDir)) {
    mkdir($backupDir, 0755, true);
}

// GET request - retrieve latest data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $client = $_GET['client'] ?? 'default';
    $file = $dataDir . $client . '-tracker.json';
    
    if (file_exists($file)) {
        echo file_get_contents($file);
    } else {
        echo json_encode(['error' => 'No data found']);
    }
    exit;
}

// POST request - save data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        exit;
    }
    
    $client = $input['client'] ?? 'default';
    $filename = $dataDir . $client . '-tracker.json';
    
    // Save main file
    file_put_contents($filename, json_encode($input, JSON_PRETTY_PRINT));
    
    // Save timestamped backup
    $backupFile = $backupDir . $client . '-' . date('Y-m-d-H-i-s') . '.json';
    file_put_contents($backupFile, json_encode($input, JSON_PRETTY_PRINT));
    
    // Keep only last 10 backups
    $backups = glob($backupDir . $client . '-*.json');
    if (count($backups) > 10) {
        usort($backups, function($a, $b) {
            return filemtime($a) - filemtime($b);
        });
        unlink($backups[0]);
    }
    
    echo json_encode([
        'success' => true,
        'saved' => date('Y-m-d H:i:s'),
        'client' => $client,
        'backup' => basename($backupFile)
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
?>