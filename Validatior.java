package com.restassured.java;

import io.restassured.response.Response;

public class Validatior {
	public static void main(String[] args) {
		
	
        System.out.println("🧪 Running testMissingQueryParam...");

        Response response = given()
            .baseUri(BASE_URI)
            .header("Authorization", "Bearer valid_token_here")  // Replace with real token
            .when()
            .get(WAREHOUSE_ENDPOINT)
            .then()
            .extract()
            .response();

        System.out.println("Status Code: " + response.statusCode());
        System.out.println(response.asPrettyString());

        assert response.statusCode() == 400 || response.statusCode() == 200 : "Expected graceful handling!";
    }
}


