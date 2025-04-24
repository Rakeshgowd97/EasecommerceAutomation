package com.restassured.java;

		//https://easecommerce.in/api/v2/manage/warehouse/master/all/group=default
		// TODO Auto-generated method stub
		import io.restassured.RestAssured;
		import io.restassured.response.Response;

		import static io.restassured.RestAssured.given;

		public class restinit2
		{
		    public static void main(String[] args)
		    {
		        // Base URI
		    	//String token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYTRmTmJqSFdoN3FSQzVqZEs0ZTJNWiIsIm5hbWUiOiJGQiBUZXN0IFVzZXIifSwidXNlclR5cGUiOiJhZG1pbiIsIm9yZ2FuaXphdGlvbiI6eyJpZCI6InF6ell1b3lVazl5VjFwd3VERWpLQVQifSwicGVybWlzc2lvbnMiOltdLCJpYXQiOjE3NDUzOTAwMzgsImV4cCI6MTc0NTQ3NjQzOH0.wNv1s0NYPvxQOs_1Dq12mzTTW25hiu26rzCGK7AyE58";
		        RestAssured.baseURI = "https://easecommerce.in";
		        // Step 2: Use token to call warehouse API
		        Response warehouseResponse = given()
		                .header("Authorization", "Bearer " + TokenStore.getToken())
		                .queryParam("group", "default")
		                .when()
		                .get("/api/v2/manage/warehouse/master/all")
		                .then()
		                .statusCode(200)
		                .extract()
		                .response();

		        // Step 3: Print warehouse data
		        System.out.println("Warehouse API Response:");
		        System.out.println(warehouseResponse.asPrettyString());
		    }
		


	}


