package com.med.online.compiler.controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;

import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3002", "http://localhost:3003"})
public class OnlineCompilerController {
	
	private static final String API_KEY ="27c6bc68b6msh98173d4927e8500p1b3caejsn3719b5fd0d36";
	
	@PostMapping( value = "/submissions", consumes = MediaType.APPLICATION_JSON_VALUE)
	public Object submitCode(@RequestBody HashMap<String, String> codebody) throws IOException, InterruptedException {

		JSONObject jo = new JSONObject(codebody);
		
		
		
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://judge0-ce.p.rapidapi.com/submissions?fields=*"))
				.header("content-type", "application/json")
				.header("Content-Type", "application/json")
				.header("X-RapidAPI-Key", API_KEY)
				.header("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com")
				.method("POST", HttpRequest.BodyPublishers.ofString(jo.toString()))
				.build();
		HttpResponse<String> response = null;
		try {
			response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		return response.body();
	}
	
}
