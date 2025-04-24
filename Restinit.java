package com.restassured.java;

import static io.restassured.RestAssured.*;

import org.junit.Test;

import io.restassured.RestAssured;
import io.restassured.response.Response;
public class Restinit {
	public static void main(String[] args) {
        // Set the base URI of the API
        RestAssured.baseURI = "https://easecommerce.in";

        // JSON body with login credentials
        //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYTRmTmJqSFdoN3FSQzVqZEs0ZTJNWiIsIm5hbWUiOiJGQiBUZXN0IFVzZXIifSwidXNlclR5cGUiOiJhZG1pbiIsIm9yZ2FuaXphdGlvbiI6eyJpZCI6InF6ell1b3lVazl5VjFwd3VERWpLQVQifSwicGVybWlzc2lvbnMiOltdLCJpYXQiOjE3NDUzOTAwMzgsImV4cCI6MTc0NTQ3NjQzOH0.wNv1s0NYPvxQOs_1Dq12mzTTW25hiu26rzCGK7AyE58
        String requestBody = "{\n" +
        	    "    \"username\": \"demouser@easecommerce.in\",\n" +
        	    "    \"password\": \"cE7iQPP^\"\n" +
        	"}";

        // Send the POST request to the login endpoint
        Response response = given()
                .header("Content-Type", "application/json")
                .body(requestBody)
                .when()
                .post("/api/v2/login") // this is typically the endpoint path
                .then()
                .statusCode(201)
                .extract()
                .response();

        // Extract token from response
        String token = response.jsonPath().getString("token");
        System.out.println("Extracted Token: " + token);
        
        TokenStore.setToken(token);
        //Stroing the token
        TokenStore.token = response.jsonPath().getString("token");
    }
}
