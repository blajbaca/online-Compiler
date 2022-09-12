import React, { Component } from "react";
import { API_KEY, API_URL, CREDENTIALS } from "../service/AuthenticationService";
import "./Compiler.css";



class CompilerComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        input: localStorage.getItem('input')||``,
        output: ``,
        language_id:localStorage.getItem('language_Id')|| 2,
        user_input: ``,
      };
    }
    input = (event) => { 
      event.preventDefault();
      this.setState({ input: event.target.value });
      localStorage.setItem('input', event.target.value) 
    };
    
    userInput = (event) => {
      event.preventDefault();
      this.setState({ user_input: event.target.value });
    };
    
    language = (event) => {  
      event.preventDefault();
      this.setState({ language_id: event.target.value });
      localStorage.setItem('language_Id',event.target.value)
     
    };
    
    

    submit = async (e) => {
      e.preventDefault();
      let outputText = document.getElementById("output");
      console.log(this.state.input);
      outputText.innerHTML = "";
      outputText.innerHTML += "Creating Submission ...\n";
      outputText.value = "";
      outputText.value += "Creating Submission ...\n";
      const response = await fetch(
        //"https://judge0-ce.p.rapidapi.com/submissions",
        API_URL +"/submissions",
        {
          method: "POST",
          headers: {
            'Authorization': 'Basic ' + CREDENTIALS,
              "Access-Control-Allow-Origin": "*",
             //"x-rapidapi-host": "judge0-ce.p.rapidapi.com",
             //"x-rapidapi-key": "27c6bc68b6msh98173d4927e8500p1b3caejsn3719b5fd0d36", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            source_code: this.state.input,
            stdin: this.state.user_input,
            language_id: this.state.language_id,
          }),
        }
      );
      
      outputText.innerHTML += "Submission Created ...\n";
      outputText.value += "Submission Created ...\n";
      const jsonResponse = await response.json();
      let jsonGetSolution = {
        status: { description: "Queue" },
        stderr: null,
        compile_output: null,
      };
  
      console.log(jsonResponse);
      while (
        jsonGetSolution.status.description !== "Accepted" &&
        jsonGetSolution.stderr == null &&
        jsonGetSolution.compile_output == null
      ) {
        outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
        outputText.value = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
        
        if (jsonResponse.token) {
          let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
          const getSolution = await fetch(url, {
            method: "GET",
            headers: {
              "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
              "x-rapidapi-key": API_KEY, // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
              "content-type": "application/json",
            },
          });
          jsonGetSolution = await getSolution.json();
        }
      }
      
      if (jsonGetSolution.stdout) {
        const output = atob(jsonGetSolution.stdout);
        outputText.innerHTML = "";
        outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
        outputText.value = "";
        outputText.value += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
      
    } else if (jsonGetSolution.stderr) {
        const error = atob(jsonGetSolution.stderr);
        outputText.innerHTML = "";
        outputText.innerHTML += `\n Error :${error}`;
        outputText.value = "";
        outputText.value += `\n Error :${error}`;
      } else {
        const compilation_error = atob(jsonGetSolution.compile_output);
        outputText.innerHTML = "";
        outputText.innerHTML += `\n Error :${compilation_error}`;
        outputText.value = "";
        outputText.value += `\n Error :${compilation_error}`;
      }
    };
    
    downloadTxtFile = () => {
        const element = document.createElement("a");
        console.log(document.getElementById('output'));
        const file = new Blob([document.getElementById('output').value], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }

    render() { 
      return (
        <>
          <div className="row container-fluid">
            <div className="col-6 ml-4 ">
              <label htmlFor="solution ">
                <span className="badge badge-info heading mt-2 ">
                  <i className="fas fa-code fa-fw fa-lg"></i> Code Here
                </span>
              </label>
              <textarea
                required
                name="solution"
                id="source"
                onChange={this.input}
                className=" source"
                value={this.state.input}
              ></textarea>
              <button
                type="submit"
                className="btn btn-danger ml-2 mr-2 "
                onClick={this.submit}
              >
                <i className="fas fa-cog fa-fw"></i> Run
              </button>
  
              <label htmlFor="tags" className="mr-1">
                <b className="heading">Language:</b>
              </label>
              <select
                value={this.state.language_id}
                onChange={this.language}
                id="tags"
                className="form-control form-inline mb-2 language"
              >
                <option value="54">C++</option>
                <option value="50">C</option>
                <option value="62">Java</option>
                <option value="71">Python</option>
              </select>
            </div>
            <div className="col-5">
              <div>
                <span className="badge badge-info heading my-2 ">
                  <i className="fas fa-exclamation fa-fw fa-md"></i> Output
                </span>
                <button  className="btn btn-danger ml-2 mr-2 " onClick={this.downloadTxtFile}>Download txt</button>
              </div>
              <div>
                <textarea id="output"></textarea>
              </div>
            </div>
          </div>
          <div className="mt-2 ml-5">
            <span className="badge badge-primary heading my-2 ">
              <i className="fas fa-user fa-fw fa-md"></i> User Input
            </span>
            <br />
            <textarea id="input" onChange={this.userInput}></textarea>
          </div>
        </>
      );
    }
  }

export default CompilerComponent
