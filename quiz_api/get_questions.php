<?php
include "db.php";

$sql = "SELECT * FROM questions";
$result = $conn->query($sql);

$questions = [];

while ($row = $result->fetch_assoc()) {
    $questions[] = [
        "id" => (string)$row["id"],
        "title" => $row["title"],
        "options" => json_decode($row["options"], true)
    ];
}

echo json_encode($questions);
