<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");


// Check the token
$my_token = $_GET['mytoken'];

if($my_token === "Replace with the .env file token called REACT_APP_MY_SEARCH_API_TOKEN") {

    // Add your database credentials here
    $servername = "localhost";
    $username = "XXX";
    $password = "XXX";
    $dbname = "XXX";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get the query string
    $search = $_GET['q'];

    // Prepare the query
    $sql = "SELECT MIN(id) as id, name, country 
            FROM mytable 
            WHERE name LIKE ? 
            GROUP BY name, country 
            ORDER BY CASE 
                WHEN name = ? THEN 1
                WHEN name LIKE ? THEN 2
                ELSE 3 
            END, name 
            LIMIT 6";

    // Prepare and execute the statement
    $stmt = $conn->prepare($sql);
    $searchParam = $search;
    $likeSearchParam = $search . '%';
    $stmt->bind_param('sss', $likeSearchParam, $searchParam, $likeSearchParam);

    $stmt->execute();

    $result = $stmt->get_result();
    $cities = $result->fetch_all(MYSQLI_ASSOC);

    // Echo / return the results in JSON format
    echo json_encode($cities);

    $stmt->close();
    $conn->close();

} else {
    // Token is invalid, send a 403 Forbidden response
  http_response_code(403);
  exit;
}



?>
