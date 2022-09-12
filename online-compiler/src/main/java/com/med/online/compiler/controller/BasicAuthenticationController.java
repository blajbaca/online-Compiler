package com.med.online.compiler.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.med.online.compiler.model.AuthenticationBean;

//Controller
@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:3002" })
@RestController
public class BasicAuthenticationController {

  @GetMapping(path = "/basicauth")
  public AuthenticationBean helloWorldBean() {
      //throw new RuntimeException("Some Error has Happened! Contact Support at ***-***");
      return new AuthenticationBean("You are authenticated");
  }   
}
