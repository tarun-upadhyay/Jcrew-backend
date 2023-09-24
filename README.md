# Set Dynamical value in postman for token
1. go inside login method in postman
2. on sub tabs go tests and write code
    ```
    const jsonData =  pm.response.json();
pm.globals.set("accessToken", jsonData.user.token);
    ```
3. click on eye button to see global variable and variable name is accessToken.
4. Inside the Authorization tab go to bearer token and inside the Token write
5. 
 ```
 {{accessToken}}
   ```

--- 
